// One shared WebGL renderer (Android WebView limits the number of live
// contexts), moved between screens. Only one "stage" is active at a time.
import * as THREE from 'three';

let renderer = null;
let active = null;

export function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch (e) {
    return false;
  }
}

export function getRenderer() {
  if (!renderer) {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.className = 'gl-canvas';
  }
  return renderer;
}

/**
 * Mounts the shared renderer into `container` and runs `frame(t, dt)` each animation frame.
 * Returns a stop() function.
 */
export function createStage(container, { scene, camera, frame, onResize }) {
  if (active) active.stop();
  const r = getRenderer();
  container.appendChild(r.domElement);
  let running = true;
  let last = performance.now();
  const t0 = last;
  let raf = 0;

  const resize = () => {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    r.setSize(w, h, false);
    r.domElement.style.width = w + 'px';
    r.domElement.style.height = h + 'px';
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    onResize && onResize(w, h);
  };
  resize();
  const ro = 'ResizeObserver' in window ? new ResizeObserver(resize) : null;
  ro ? ro.observe(container) : window.addEventListener('resize', resize);

  const visible = () => document.visibilityState !== 'hidden';
  const loop = (now) => {
    if (!running) return;
    raf = requestAnimationFrame(loop);
    if (!visible()) return;
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    frame && frame((now - t0) / 1000, dt);
    r.render(scene, camera);
  };
  raf = requestAnimationFrame(loop);

  const stage = {
    renderer: r,
    stop() {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
      ro ? ro.disconnect() : window.removeEventListener('resize', resize);
      if (r.domElement.parentNode === container) container.removeChild(r.domElement);
      disposeScene(scene);
      if (active === stage) active = null;
    },
  };
  active = stage;
  return stage;
}

export function disposeScene(root) {
  root.traverse((o) => {
    if (o.geometry) o.geometry.dispose();
    const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
    for (const m of mats) {
      if (m.map) m.map.dispose();
      if (!m.userData.cached) m.dispose();
    }
  });
}

export function stopActiveStage() {
  if (active) active.stop();
}
