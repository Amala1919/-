import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { geoEquirectangular, geoPath, geoGraticule10, geoContains } from 'd3-geo';
import { createStage, getRenderer } from './stage.js';
import { worldFeatures } from '../components/geo.js';
import { COUNTRIES } from '../data/index.js';
import { drawHistorical, histIndex, histName, loadSnapshot, polityAt, snapshotFor } from './histmap.js';

const DEG = Math.PI / 180;

export function latLonToVec3(lat, lon, r = 1) {
  const phi = (lon + 180) * DEG;
  const c = Math.cos(lat * DEG);
  return new THREE.Vector3(-Math.cos(phi) * c * r, Math.sin(lat * DEG) * r, Math.sin(phi) * c * r);
}

function vec3ToLatLon(v) {
  const n = v.clone().normalize();
  const lat = Math.asin(n.y) / DEG;
  let lon = Math.atan2(n.z, -n.x) / DEG - 180;
  if (lon < -180) lon += 360;
  return [lat, lon];
}

const TEX_W = 2048;
const TEX_H = 1024;
let modernCanvas = null;

function newCanvas() {
  const c = document.createElement('canvas');
  c.width = TEX_W;
  c.height = TEX_H;
  return c;
}

function texPath(g) {
  return geoPath(geoEquirectangular().scale(TEX_W / (2 * Math.PI)).translate([TEX_W / 2, TEX_H / 2]), g);
}

function drawOcean(g, path) {
  const ocean = g.createLinearGradient(0, 0, 0, TEX_H);
  ocean.addColorStop(0, '#163a63');
  ocean.addColorStop(0.5, '#1d4f80');
  ocean.addColorStop(1, '#163a63');
  g.fillStyle = ocean;
  g.fillRect(0, 0, TEX_W, TEX_H);
  g.strokeStyle = 'rgba(160,200,255,0.18)';
  g.lineWidth = 1;
  g.beginPath();
  path(geoGraticule10());
  g.stroke();
}

// Present-day map: countries covered by the app are coloured.
function modernMap() {
  if (modernCanvas) return modernCanvas;
  const c = newCanvas();
  const g = c.getContext('2d');
  const path = texPath(g);
  drawOcean(g, path);
  const { features } = worldFeatures();
  const featured = new Map();
  for (const ct of COUNTRIES) for (const iso of ct.iso) featured.set(String(iso).padStart(3, '0'), ct);
  for (const f of features) {
    const ct = featured.get(f.id);
    g.beginPath();
    path(f);
    g.fillStyle = ct ? ct.color : '#c9b994';
    g.fill();
    g.strokeStyle = ct ? 'rgba(255,255,255,0.9)' : 'rgba(90,70,40,0.45)';
    g.lineWidth = ct ? 1.6 : 0.7;
    g.stroke();
  }
  modernCanvas = c;
  return c;
}

// Historical map of one snapshot year: present-day land as a muted base, then the polities of that time.
function historicalMap(c, features) {
  const g = c.getContext('2d');
  const path = texPath(g);
  drawOcean(g, path);
  g.fillStyle = '#9d9580';
  for (const f of worldFeatures().features) {
    g.beginPath();
    path(f);
    g.fill();
  }
  drawHistorical(g, path, features);
}

function atmosphere() {
  const mat = new THREE.ShaderMaterial({
    uniforms: { c: { value: new THREE.Color('#6fb7ff') } },
    vertexShader: `varying vec3 vN; varying vec3 vP;
      void main(){ vN = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix * vec4(position,1.0); vP = mv.xyz; gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `uniform vec3 c; varying vec3 vN; varying vec3 vP;
      void main(){ float d = dot(vN, normalize(-vP)); float i = pow(clamp(-d * 1.7, 0.0, 1.0), 2.2); gl_FragColor = vec4(c, i * 0.85); }`,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true,
    depthWrite: false,
  });
  return new THREE.Mesh(new THREE.SphereGeometry(1.13, 48, 32), mat);
}

function stars() {
  const pts = [];
  for (let i = 0; i < 900; i++) {
    const v = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize().multiplyScalar(30 + Math.random() * 20);
    pts.push(v.x, v.y, v.z);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  return new THREE.Points(g, new THREE.PointsMaterial({ color: 0xffffff, size: 0.12, transparent: true, opacity: 0.8 }));
}

/**
 * Interactive globe. onSelect(countryId) when a country/pin is tapped.
 * Returns controller with highlight(ids, scoreMap), focus(id), destroy().
 */
export function mountGlobe(container, { onSelect, onPick, labels = true } = {}) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 200);
  camera.position.set(0, 0.9, 3.3);
  const renderer = getRenderer();

  const canvas = newCanvas();
  canvas.getContext('2d').drawImage(modernMap(), 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 64), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9, metalness: 0 }));
  const world = new THREE.Group();
  world.add(earth);
  scene.add(world);
  scene.add(atmosphere());
  scene.add(stars());
  scene.add(new THREE.AmbientLight(0xffffff, 1.3));
  const sun = new THREE.DirectionalLight(0xffffff, 1.6);
  sun.position.set(3, 2, 4);
  scene.add(sun);

  // Pins
  const pins = new Map();
  const pinGeo = new THREE.SphereGeometry(0.028, 16, 12);
  const stemGeo = new THREE.CylinderGeometry(0.004, 0.004, 0.09, 6);
  stemGeo.translate(0, 0.045, 0);
  const ringGeo = new THREE.RingGeometry(0.03, 0.045, 32);
  for (const ct of COUNTRIES) {
    const pos = latLonToVec3(ct.lat, ct.lon, 1);
    const grp = new THREE.Group();
    grp.position.copy(pos);
    grp.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pos.clone().normalize());
    const stem = new THREE.Mesh(stemGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
    const head = new THREE.Mesh(pinGeo, new THREE.MeshBasicMaterial({ color: ct.color }));
    head.position.y = 0.09;
    head.userData.country = ct.id;
    const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: ct.color, transparent: true, opacity: 0.8, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.003;
    grp.add(stem, head, ring);
    world.add(grp);
    pins.set(ct.id, { grp, head, ring, base: 1, pos, active: true, ct });
  }

  // DOM labels
  const layer = document.createElement('div');
  layer.className = 'globe-labels';
  const labelEls = new Map();
  if (labels) {
    for (const ct of COUNTRIES) {
      const el = document.createElement('button');
      el.className = 'globe-label';
      el.innerHTML = `<span>${ct.flag}</span>${ct.name.replace(/（.*）/, '')}`;
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        onSelect && onSelect(ct.id);
      });
      layer.appendChild(el);
      labelEls.set(ct.id, el);
    }
  }

  // Historical polity names (DOM), shown in time-travel mode
  const histLayer = document.createElement('div');
  histLayer.className = 'globe-labels hist';
  let histLabels = [];
  let hist = null; // { snapshot, features }
  let pinsOn = true;
  let histNamesOn = true;
  let wantYear = null;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.rotateSpeed = 0.55;
  controls.minDistance = 1.6;
  controls.maxDistance = 9;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.5;

  let W = 1;
  let H = 1;
  const v = new THREE.Vector3();
  const camDir = new THREE.Vector3();
  let focusAnim = null;

  const stage = createStage(container, {
    scene,
    camera,
    onResize: (w, h) => {
      W = w;
      H = h;
      // Keep the whole globe (with its glow) inside narrow / tall views.
      const half = Math.atan(Math.tan((camera.fov * DEG) / 2) * Math.min(1, w / h));
      camera.position.setLength(Math.max(w < 420 ? 3.6 : 3.2, 1.22 / Math.sin(half)));
    },
    frame: (t) => {
      if (focusAnim) {
        const k = Math.min(1, (performance.now() - focusAnim.start) / 900);
        const e = 1 - Math.pow(1 - k, 3);
        camera.position.copy(focusAnim.from).lerp(focusAnim.to, e).setLength(focusAnim.len);
        if (k >= 1) focusAnim = null;
      }
      controls.update();
      camDir.copy(camera.position).normalize();
      for (const [id, p] of pins) {
        p.grp.visible = pinsOn;
        const pulse = p.active ? 1 + Math.sin(t * 3 + p.pos.x * 5) * 0.15 : 1;
        p.head.scale.setScalar(p.base * pulse);
        p.ring.scale.setScalar(p.active ? 1 + ((t * 0.8 + p.pos.y) % 1) * 1.6 : 0.001);
        p.ring.material.opacity = p.active ? 0.8 * (1 - ((t * 0.8 + p.pos.y) % 1)) : 0;
        const el = labelEls.get(id);
        if (!el) continue;
        if (!pinsOn) {
          el.style.display = 'none';
          continue;
        }
        v.copy(p.pos).multiplyScalar(1.1).applyMatrix4(world.matrixWorld);
        const facing = v.clone().normalize().dot(camDir);
        v.project(camera);
        const vis = facing > 0.25;
        el.style.display = vis ? '' : 'none';
        if (vis) {
          el.style.transform = `translate(${((v.x + 1) / 2) * W}px, ${((1 - v.y) / 2) * H}px) translate(-50%, -130%)`;
          el.style.opacity = String(Math.min(1, (facing - 0.25) * 3) * (p.active ? 1 : 0.35));
          el.classList.toggle('dim', !p.active);
        }
      }
      // Historical names: biggest first, skip ones that would overlap.
      if (histLabels.length) {
        const boxes = [];
        for (const L of histLabels) {
          v.copy(L.pos).applyMatrix4(world.matrixWorld);
          const facing = v.clone().normalize().dot(camDir);
          if (!histNamesOn || facing < 0.2) {
            L.el.style.display = 'none';
            continue;
          }
          v.project(camera);
          const x = ((v.x + 1) / 2) * W;
          const y = ((1 - v.y) / 2) * H;
          const hw = L.w / 2;
          const box = [x - hw, y - 9, x + hw, y + 9];
          if (boxes.some((b) => b[0] < box[2] && box[0] < b[2] && b[1] < box[3] && box[1] < b[3])) {
            L.el.style.display = 'none';
            continue;
          }
          boxes.push(box);
          L.el.style.display = '';
          L.el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
          L.el.style.opacity = String(Math.min(1, (facing - 0.2) * 3));
        }
      }
    },
  });
  container.appendChild(histLayer);
  container.appendChild(layer);

  // Tap to select (distinguish from drag)
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let down = null;
  const onDown = (e) => {
    down = { x: e.clientX, y: e.clientY, t: performance.now() };
    controls.autoRotate = false;
  };
  const onUp = (e) => {
    if (!down) return;
    const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
    down = null;
    if (moved > 8) return;
    const rect = renderer.domElement.getBoundingClientRect();
    ndc.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const heads = [...pins.values()].map((p) => p.head);
    const hit = ray.intersectObjects(heads, false)[0];
    if (hit) return onSelect && onSelect(hit.object.userData.country);
    const eh = ray.intersectObject(earth, false)[0];
    if (!eh) return;
    const local = world.worldToLocal(eh.point.clone());
    const [lat, lon] = vec3ToLatLon(local);
    const { features } = worldFeatures();
    let country = null;
    for (const ct of COUNTRIES) {
      for (const iso of ct.iso) {
        const f = features.find((x) => x.id === String(iso).padStart(3, '0'));
        if (f && geoContains(f, [lon, lat])) country = ct.id;
      }
      if (country) break;
    }
    if (hist && onPick) {
      const polity = polityAt(hist.features, lon, lat);
      return onPick({ polity: polity && { name: histName(polity.NAME), ruler: polity.SUBJECTO && polity.SUBJECTO !== polity.NAME ? histName(polity.SUBJECTO) : null }, country, snapshot: hist.snapshot, x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
    if (country) onSelect && onSelect(country);
  };
  function setHistLabels(list) {
    histLayer.replaceChildren();
    histLabels = list.map(([name, lon, lat]) => {
      const el = document.createElement('span');
      el.className = 'hist-label';
      const ja = histName(name);
      el.textContent = ja;
      histLayer.appendChild(el);
      return { el, pos: latLonToVec3(lat, lon, 1.005), w: ja.length * 11 + 10 };
    });
  }

  renderer.domElement.addEventListener('pointerdown', onDown);
  renderer.domElement.addEventListener('pointerup', onUp);

  return {
    highlight(activeIds) {
      for (const [id, p] of pins) {
        p.active = !activeIds || activeIds.has(id);
        p.base = p.active ? 1.25 : 0.6;
        p.head.material.color.set(p.active ? p.ct.color : '#8a93a6');
      }
    },
    focus(id) {
      const p = pins.get(id);
      if (!p) return;
      controls.autoRotate = false;
      const len = camera.position.length();
      focusAnim = { start: performance.now(), from: camera.position.clone(), to: p.pos.clone().normalize().multiplyScalar(len).add(new THREE.Vector3(0, 0.3, 0)), len };
    },
    setAutoRotate(on) {
      controls.autoRotate = on;
    },
    /** Shows the borders of the snapshot nearest before `year` (null = present-day map). Resolves to the snapshot year. */
    async setYear(year) {
      wantYear = year;
      if (year == null) {
        if (hist) {
          hist = null;
          canvas.getContext('2d').drawImage(modernMap(), 0, 0);
          tex.needsUpdate = true;
          setHistLabels([]);
        }
        return null;
      }
      const idx = await histIndex();
      const snap = snapshotFor(year, idx.years);
      if (hist && hist.snapshot === snap) return snap;
      const features = await loadSnapshot(snap);
      if (wantYear == null || snapshotFor(wantYear, idx.years) !== snap) return snap; // superseded
      historicalMap(canvas, features);
      tex.needsUpdate = true;
      hist = { snapshot: snap, features };
      setHistLabels(idx.labels[snap] || []);
      return snap;
    },
    setPins(on) {
      pinsOn = on;
    },
    setHistNames(on) {
      histNamesOn = on;
    },
    destroy() {
      renderer.domElement.removeEventListener('pointerdown', onDown);
      renderer.domElement.removeEventListener('pointerup', onUp);
      controls.dispose();
      stage.stop();
      layer.remove();
      histLayer.remove();
    },
  };
}
