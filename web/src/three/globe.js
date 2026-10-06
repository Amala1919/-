import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { geoEquirectangular, geoPath, geoGraticule10, geoContains } from 'd3-geo';
import { createStage, getRenderer } from './stage.js';
import { worldFeatures } from '../components/geo.js';
import { COUNTRIES } from '../data/index.js';

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

let textureCanvas = null;
function globeCanvas() {
  if (textureCanvas) return textureCanvas;
  const W = 2048;
  const H = 1024;
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const g = c.getContext('2d');
  const proj = geoEquirectangular().scale(W / (2 * Math.PI)).translate([W / 2, H / 2]);
  const path = geoPath(proj, g);
  const ocean = g.createLinearGradient(0, 0, 0, H);
  ocean.addColorStop(0, '#163a63');
  ocean.addColorStop(0.5, '#1d4f80');
  ocean.addColorStop(1, '#163a63');
  g.fillStyle = ocean;
  g.fillRect(0, 0, W, H);
  g.strokeStyle = 'rgba(160,200,255,0.18)';
  g.lineWidth = 1;
  g.beginPath();
  path(geoGraticule10());
  g.stroke();
  const { features, byIso } = worldFeatures();
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
  textureCanvas = c;
  void byIso;
  return c;
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
export function mountGlobe(container, { onSelect, labels = true } = {}) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 200);
  camera.position.set(0, 0.9, 3.3);
  const renderer = getRenderer();

  const tex = new THREE.CanvasTexture(globeCanvas());
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

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.rotateSpeed = 0.55;
  controls.minDistance = 1.6;
  controls.maxDistance = 5;
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
      camera.position.setLength(w < 420 ? 3.6 : 3.2);
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
        const pulse = p.active ? 1 + Math.sin(t * 3 + p.pos.x * 5) * 0.15 : 1;
        p.head.scale.setScalar(p.base * pulse);
        p.ring.scale.setScalar(p.active ? 1 + ((t * 0.8 + p.pos.y) % 1) * 1.6 : 0.001);
        p.ring.material.opacity = p.active ? 0.8 * (1 - ((t * 0.8 + p.pos.y) % 1)) : 0;
        const el = labelEls.get(id);
        if (!el) continue;
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
    },
  });
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
    for (const ct of COUNTRIES) {
      for (const iso of ct.iso) {
        const f = features.find((x) => x.id === String(iso).padStart(3, '0'));
        if (f && geoContains(f, [lon, lat])) return onSelect && onSelect(ct.id);
      }
    }
  };
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
    destroy() {
      renderer.domElement.removeEventListener('pointerdown', onDown);
      renderer.domElement.removeEventListener('pointerup', onUp);
      controls.dispose();
      stage.stop();
      layer.remove();
    },
  };
}
