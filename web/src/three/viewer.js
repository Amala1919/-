import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createStage, getRenderer, disposeScene } from './stage.js';

function setupScene(model) {
  const scene = new THREE.Scene();
  const ctx = { time: 0, update: null, actions: [] };
  const root = model.build(ctx);
  scene.add(root);

  const hemi = new THREE.HemisphereLight(model.space ? 0x8899bb : 0xdfefff, model.space ? 0x000000 : 0x8a7a5a, model.space ? 0.6 : 1.15);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xfff4e0, model.space ? 2.6 : 2.2);
  sun.position.set(6, 10, 5);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  const sc = sun.shadow.camera;
  sc.left = -9;
  sc.right = 9;
  sc.top = 9;
  sc.bottom = -9;
  sc.near = 1;
  sc.far = 30;
  sun.shadow.bias = -0.0008;
  sun.shadow.normalBias = 0.02;
  scene.add(sun);
  scene.add(sun.target);

  // Fit bounds (ignoring big ground discs)
  const bounds = new THREE.Box3();
  root.updateMatrixWorld(true);
  root.traverse((o) => {
    if (o.isMesh && !o.userData.ignoreBounds && !o.isPoints) {
      if (o.geometry && o.geometry.boundingSphere === null) o.geometry.computeBoundingSphere();
      const b = new THREE.Box3().setFromObject(o);
      if (isFinite(b.min.x) && b.getSize(new THREE.Vector3()).length() < 40) bounds.union(b);
    }
  });
  if (bounds.isEmpty()) bounds.set(new THREE.Vector3(-2, 0, -2), new THREE.Vector3(2, 3, 2));
  const size = bounds.getSize(new THREE.Vector3());
  let center = bounds.getCenter(new THREE.Vector3());
  let radius = Math.max(size.x, size.y, size.z) * 0.62 + 0.5;
  if (model.view) {
    center = new THREE.Vector3(model.view.cx || 0, model.view.cy || 0, model.view.cz || 0);
    radius = model.view.r;
  }
  return { scene, ctx, root, center, radius };
}

/** Interactive model viewer with hotspot labels. Returns controller. */
export function mountViewer(container, model, { onHotspot } = {}) {
  const { scene, ctx, center, radius } = setupScene(model);
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 200);
  const home = new THREE.Vector3(center.x + radius * 1.35, center.y + radius * 0.75, center.z + radius * 1.6);
  camera.position.copy(home);

  const renderer = getRenderer();
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.copy(center);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.8;
  controls.minDistance = radius * 0.6;
  controls.maxDistance = radius * 5;
  if (!model.space) controls.maxPolarAngle = Math.PI * 0.49;
  controls.update();

  // Hotspot overlay
  const layer = document.createElement('div');
  layer.className = 'hotspot-layer';
  container.appendChild(layer);
  const spots = (model.hotspots || []).map((h, i) => {
    const el = document.createElement('button');
    el.className = 'hotspot';
    el.textContent = String(i + 1);
    el.setAttribute('aria-label', h.t);
    el.addEventListener('click', (ev) => {
      ev.stopPropagation();
      onHotspot && onHotspot(h, i);
    });
    layer.appendChild(el);
    return { el, pos: new THREE.Vector3(...h.p), h };
  });
  let showSpots = true;
  const v = new THREE.Vector3();
  let W = 1;
  let H = 1;

  const stage = createStage(container, {
    scene,
    camera,
    onResize: (w, h) => {
      W = w;
      H = h;
    },
    frame: (t, dt) => {
      ctx.time = t;
      controls.update();
      ctx.update && ctx.update(t, dt);
      for (const s of spots) {
        v.copy(s.pos).project(camera);
        const vis = showSpots && v.z < 1 && Math.abs(v.x) < 1.1 && Math.abs(v.y) < 1.1;
        s.el.style.display = vis ? '' : 'none';
        if (vis) s.el.style.transform = `translate(${((v.x + 1) / 2) * W}px, ${((1 - v.y) / 2) * H}px) translate(-50%, -50%)`;
      }
    },
  });
  container.appendChild(layer);

  const stopInteraction = () => (controls.autoRotate = false);
  renderer.domElement.addEventListener('pointerdown', stopInteraction);

  return {
    actions: ctx.actions,
    setAutoRotate(on) {
      controls.autoRotate = on;
    },
    get autoRotate() {
      return controls.autoRotate;
    },
    toggleHotspots() {
      showSpots = !showSpots;
      return showSpots;
    },
    reset() {
      camera.position.copy(home);
      controls.target.copy(center);
      controls.autoRotate = true;
    },
    focus(i) {
      const s = spots[i];
      if (!s) return;
      controls.autoRotate = false;
      const dir = camera.position.clone().sub(controls.target).normalize();
      controls.target.lerp(s.pos, 0.6);
      camera.position.copy(controls.target).add(dir.multiplyScalar(radius * 1.4));
    },
    destroy() {
      renderer.domElement.removeEventListener('pointerdown', stopInteraction);
      controls.dispose();
      stage.stop();
      layer.remove();
    },
  };
}

/** Renders a still thumbnail of a model and returns a data URL. */
export function renderThumbnail(model, w = 320, h = 240) {
  const { scene, center, radius } = setupScene(model);
  const bg = document.createElement('canvas');
  bg.width = 4;
  bg.height = 128;
  const g = bg.getContext('2d');
  const grad = g.createLinearGradient(0, 0, 0, 128);
  grad.addColorStop(0, model.sky[0]);
  grad.addColorStop(1, model.sky[1]);
  g.fillStyle = grad;
  g.fillRect(0, 0, 4, 128);
  const bgTex = new THREE.CanvasTexture(bg);
  bgTex.colorSpace = THREE.SRGBColorSpace;
  scene.background = bgTex;
  const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 200);
  camera.position.set(center.x + radius * 1.3, center.y + radius * 0.7, center.z + radius * 1.5);
  camera.lookAt(center);
  const r = getRenderer();
  const prevSize = r.getSize(new THREE.Vector2());
  const prevRatio = r.getPixelRatio();
  r.setPixelRatio(1);
  r.setSize(w, h, false);
  r.render(scene, camera);
  const url = r.domElement.toDataURL('image/jpeg', 0.82);
  r.setPixelRatio(prevRatio);
  r.setSize(prevSize.x, prevSize.y, false);
  disposeScene(scene);
  bgTex.dispose();
  return url;
}
