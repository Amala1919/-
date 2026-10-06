// Small helpers for building low-poly procedural models.
import * as THREE from 'three';

const matCache = new Map();
export function mat(color, opts = {}) {
  const key = color + JSON.stringify(opts);
  if (!opts.map && matCache.has(key)) return matCache.get(key);
  const m = new THREE.MeshStandardMaterial({
    color,
    roughness: opts.roughness ?? 0.85,
    metalness: opts.metalness ?? 0,
    flatShading: opts.flat ?? true,
    side: opts.side ?? THREE.FrontSide,
    transparent: opts.transparent ?? false,
    opacity: opts.opacity ?? 1,
    map: opts.map ?? null,
    alphaTest: opts.alphaTest ?? 0,
    emissive: opts.emissive ?? 0x000000,
    emissiveIntensity: opts.emissiveIntensity ?? 1,
  });
  if (!opts.map) {
    m.userData.cached = true;
    matCache.set(key, m);
  }
  return m;
}

export function clearMatCache() {
  for (const m of matCache.values()) m.dispose();
  matCache.clear();
}

function place(mesh, x = 0, y = 0, z = 0, ry = 0) {
  mesh.position.set(x, y, z);
  if (ry) mesh.rotation.y = ry;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export function box(w, h, d, color, x = 0, y = 0, z = 0, ry = 0, opts) {
  return place(new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(color, opts)), x, y, z, ry);
}

export function cyl(rt, rb, h, seg, color, x = 0, y = 0, z = 0, opts) {
  return place(new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat(color, opts)), x, y, z);
}

export function cone(r, h, seg, color, x = 0, y = 0, z = 0, opts) {
  return place(new THREE.Mesh(new THREE.ConeGeometry(r, h, seg), mat(color, opts)), x, y, z);
}

export function sphere(r, color, x = 0, y = 0, z = 0, opts, ws = 16, hs = 12) {
  return place(new THREE.Mesh(new THREE.SphereGeometry(r, ws, hs), mat(color, opts)), x, y, z);
}

// Square pyramid / frustum whose base edges are axis aligned.
export function frustum(wb, wt, h, color, x = 0, y = 0, z = 0, opts) {
  const g = new THREE.CylinderGeometry(wt / Math.SQRT2, wb / Math.SQRT2, h, 4, 1);
  g.rotateY(Math.PI / 4);
  return place(new THREE.Mesh(g, mat(color, opts)), x, y, z);
}

// Rectangular frustum (different width/depth).
export function rectFrustum(wb, db, wt, dt, h, color, x = 0, y = 0, z = 0, opts) {
  const m = frustum(1, 1, h, color, x, y, z, opts);
  const g = m.geometry;
  const pos = g.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const top = pos.getY(i) > 0;
    const sx = top ? wt : wb;
    const sz = top ? dt : db;
    pos.setX(i, pos.getX(i) * sx);
    pos.setZ(i, pos.getZ(i) * sz);
  }
  pos.needsUpdate = true;
  g.computeVertexNormals();
  return m;
}

export function lathe(points, color, seg = 24, x = 0, y = 0, z = 0, opts) {
  const pts = points.map(([r, h]) => new THREE.Vector2(r, h));
  return place(new THREE.Mesh(new THREE.LatheGeometry(pts, seg), mat(color, { flat: false, ...opts })), x, y, z);
}

// Onion dome profile.
export function onionPoints(r = 1, h = 2) {
  return [
    [0, 0],
    [r * 0.8, 0],
    [r * 1.05, h * 0.18],
    [r * 1.1, h * 0.32],
    [r * 0.95, h * 0.5],
    [r * 0.6, h * 0.7],
    [r * 0.25, h * 0.86],
    [r * 0.08, h * 0.96],
    [0, h],
  ];
}

export function domePoints(r = 1, h = 1, n = 10) {
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * (Math.PI / 2);
    pts.push([Math.cos(a) * r, Math.sin(a) * h]);
  }
  pts[pts.length - 1][0] = 0;
  return pts;
}

// Extrude a 2D outline (array of [x,y]) by depth along Z, centred.
export function extrude(outline, depth, color, opts) {
  const s = new THREE.Shape(outline.map(([x, y]) => new THREE.Vector2(x, y)));
  const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false });
  g.translate(0, 0, -depth / 2);
  const m = new THREE.Mesh(g, mat(color, opts));
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

// Triangular prism (gable roof) of width w (x), height h, length l (z).
export function gable(w, h, l, color, x = 0, y = 0, z = 0, ry = 0, opts) {
  const m = extrude([[-w / 2, 0], [w / 2, 0], [0, h]], l, color, opts);
  return place(m, x, y, z, ry);
}

// Many copies of one geometry as an InstancedMesh. transforms: [{x,y,z,ry,s,sx,sy,sz,rx,rz}]
export function instances(geometry, material, transforms) {
  const im = new THREE.InstancedMesh(geometry, material, transforms.length);
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  const p = new THREE.Vector3();
  const s = new THREE.Vector3();
  transforms.forEach((t, i) => {
    e.set(t.rx || 0, t.ry || 0, t.rz || 0);
    q.setFromEuler(e);
    p.set(t.x || 0, t.y || 0, t.z || 0);
    const k = t.s ?? 1;
    s.set((t.sx ?? 1) * k, (t.sy ?? 1) * k, (t.sz ?? 1) * k);
    m.compose(p, q, s);
    im.setMatrixAt(i, m);
  });
  im.castShadow = true;
  im.receiveShadow = true;
  return im;
}

export function ground(radius, color, y = 0) {
  const g = new THREE.CircleGeometry(radius, 48);
  g.rotateX(-Math.PI / 2);
  const m = new THREE.Mesh(g, mat(color, { flat: false, roughness: 1 }));
  m.position.y = y;
  m.receiveShadow = true;
  m.userData.ignoreBounds = true;
  return m;
}

export function water(radius, color = '#2f7fb8', y = 0) {
  const g = new THREE.CircleGeometry(radius, 48);
  g.rotateX(-Math.PI / 2);
  const m = new THREE.Mesh(g, mat(color, { flat: false, roughness: 0.25, metalness: 0.1, transparent: true, opacity: 0.92 }));
  m.position.y = y;
  m.receiveShadow = true;
  m.userData.ignoreBounds = true;
  return m;
}

// Deterministic pseudo random generator so models look the same each time.
export function rng(seed = 1) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function canvasTexture(w, h, draw) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

export function tree(x, z, h = 1, color = '#3f8f4a', trunk = '#6d4c41') {
  const g = new THREE.Group();
  g.add(cyl(0.06 * h, 0.08 * h, 0.4 * h, 6, trunk, 0, 0.2 * h, 0));
  g.add(cone(0.35 * h, 0.9 * h, 7, color, 0, 0.75 * h, 0));
  g.position.set(x, 0, z);
  return g;
}

export function palm(x, z, h = 1.4) {
  const g = new THREE.Group();
  const trunk = cyl(0.05, 0.08, h, 6, '#8d6e63', 0, h / 2, 0);
  trunk.rotation.z = 0.08;
  g.add(trunk);
  for (let i = 0; i < 6; i++) {
    const leaf = box(0.7, 0.03, 0.16, '#4caf50', 0, h, 0);
    leaf.geometry.translate(0.35, 0, 0);
    leaf.rotation.y = (i / 6) * Math.PI * 2;
    leaf.rotation.z = -0.35;
    g.add(leaf);
  }
  g.position.set(x, 0, z);
  return g;
}

export function person(x, z, color = '#e57373', h = 0.5) {
  const g = new THREE.Group();
  g.add(cyl(h * 0.14, h * 0.18, h * 0.6, 8, color, 0, h * 0.3, 0));
  g.add(sphere(h * 0.12, '#f1c27d', 0, h * 0.72, 0));
  g.position.set(x, 0, z);
  return g;
}
