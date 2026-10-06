import * as THREE from 'three';
import {
  box, cyl, cone, sphere, frustum, rectFrustum, gable, extrude, instances, ground, water, rng, mat,
  canvasTexture, tree, lathe, onionPoints, domePoints, person,
} from '../kit.js';

export const tajmahal = {
  id: 'tajmahal',
  view: { r: 5.2, cy: 1.6, cz: 1 },
  name: 'タージ・マハル',
  country: 'in',
  year: 1653,
  sky: ['#f8d7b9', '#f6eef0'],
  desc: 'ムガル帝国の皇帝シャー・ジャハーンが、亡き妃ムムターズ・マハルのために建てた白大理石の墓廟。中央の大ドームのまわりに4つの小さなドーム（チャトリ）、基壇の四隅に4本のミナレットが立ち、完璧な左右対称を描きます。正面の長い池には、建物の姿が鏡のように映ります。',
  facts: [
    ['建設', '1632年ごろ〜1653年ごろ'],
    ['高さ', '約73m（ドームの頂上まで）'],
    ['材料', '白大理石（宝石の象嵌細工）'],
    ['世界遺産', '1983年'],
  ],
  hotspots: [
    { p: [0, 3.6, 0], t: '玉ねぎ形の大ドーム', d: '二重構造のドーム。外側のドームは内側の天井よりはるかに高く、遠くからでも堂々と見えるようにつくられています。' },
    { p: [2.6, 2.4, 2.6], t: 'ミナレット', d: '4本の塔はわずかに外側へ傾けて建てられています。地震で倒れても墓廟を傷つけないための工夫といわれます。' },
    { p: [0, 0.1, 4.4], t: '水路の庭園', d: 'イスラームの楽園を表す「チャハル・バーグ（四分庭園）」。水面に墓廟が映ります。' },
  ],
  build() {
    const g = new THREE.Group();
    g.add(ground(15, '#8fb070'));
    const marble = '#f4f1ea';
    g.add(box(6.4, 0.35, 6.4, '#ebe5da', 0, 0.175, 0));
    const body = new THREE.Group();
    body.add(box(3.0, 1.7, 3.0, marble, 0, 0.85, 0));
    for (const [x, z] of [[-1.5, -1.5], [1.5, -1.5], [-1.5, 1.5], [1.5, 1.5]]) {
      const c = box(0.6, 1.7, 0.6, '#efebe3', x * 0.95, 0.85, z * 0.95);
      c.rotation.y = Math.PI / 4;
      body.add(c);
    }
    const iwan = [];
    for (let s = 0; s < 4; s++) {
      const a = (s * Math.PI) / 2;
      iwan.push({ x: Math.sin(a) * 1.51, y: 0.85, z: Math.cos(a) * 1.51, ry: a });
    }
    body.add(instances(new THREE.BoxGeometry(0.9, 1.3, 0.04), mat('#d9d2c4'), iwan));
    body.add(instances(new THREE.BoxGeometry(0.6, 0.9, 0.05), mat('#8a8070'), iwan.map((p) => ({ ...p, y: 0.7 }))));
    body.position.y = 0.35;
    g.add(body);
    g.add(cyl(0.9, 0.95, 0.5, 24, marble, 0, 2.3, 0));
    g.add(lathe(onionPoints(1.0, 1.4), marble, 32, 0, 2.55, 0));
    g.add(cyl(0.02, 0.03, 0.45, 6, '#d4af37', 0, 4.1, 0, { metalness: 0.7, roughness: 0.3 }));
    for (const [x, z] of [[-1.0, -1.0], [1.0, -1.0], [-1.0, 1.0], [1.0, 1.0]]) {
      g.add(cyl(0.3, 0.3, 0.35, 8, marble, x, 2.22, z));
      g.add(lathe(domePoints(0.3, 0.32), marble, 16, x, 2.4, z));
    }
    for (const [x, z] of [[-3.0, -3.0], [3.0, -3.0], [-3.0, 3.0], [3.0, 3.0]]) {
      g.add(cyl(0.13, 0.17, 2.6, 12, marble, x, 1.65, z));
      for (const y of [1.2, 1.9, 2.6]) g.add(cyl(0.2, 0.2, 0.06, 12, '#e5dfd2', x, y, z));
      g.add(lathe(domePoints(0.17, 0.2), marble, 12, x, 2.95, z));
    }
    // reflecting pool and cypresses
    const pool = box(0.8, 0.03, 7, '#5fa8d3', 0, 0.02, 7, 0, { roughness: 0.2, metalness: 0.2 });
    g.add(pool);
    g.add(box(1.6, 0.02, 7.2, '#d8d0c0', 0, 0.01, 7));
    const cyp = [];
    for (let i = 0; i < 8; i++) for (const s of [-1, 1]) cyp.push({ x: s * 1.2, y: 0.45, z: 3.8 + i * 0.85 });
    g.add(instances(new THREE.ConeGeometry(0.18, 0.9, 7), mat('#2f5f35'), cyp));
    return g;
  },
};

export const locomotive = {
  id: 'locomotive',
  view: { r: 3.4, cy: 1.0 },
  name: 'ロケット号',
  country: 'gb',
  year: 1829,
  sky: ['#c7d8e4', '#efe6d6'],
  desc: 'ジョージ・スティーブンソンと息子ロバートが製作した蒸気機関車。1829年、リヴァプール・アンド・マンチェスター鉄道の機関車を決める競技会（レインヒル・トライアル）で優勝しました。煙管を多数通したボイラーや、斜めに配置したシリンダーなど、その後の蒸気機関車の基本となる工夫が詰まっています。',
  facts: [
    ['製作', '1829年'],
    ['最高速度', '約47km/h（競技会の記録）'],
    ['重量', '約4.3トン'],
    ['現存', 'ロンドン科学博物館などで展示'],
  ],
  hotspots: [
    { p: [1.4, 2.0, 0], t: '煙突', d: '高い煙突は、ボイラーの火の勢いを強める通風の役目も果たしました。' },
    { p: [0.3, 1.0, 0.5], t: '多管式ボイラー', d: '25本の銅の管を通して湯を効率よく沸かし、強い蒸気を生み出しました。' },
    { p: [0.8, 0.5, 0.7], t: 'ピストンと動輪', d: '蒸気の力でピストンが動き、ロッドで大きな車輪を回します。' },
    { p: [-1.8, 0.8, 0], t: '炭水車', d: '燃料の石炭と、水の樽を積んだ車両です。' },
  ],
  build(ctx) {
    const g = new THREE.Group();
    g.add(ground(15, '#a4a37a'));
    // track
    const sleepers = [];
    for (let i = -20; i <= 20; i++) sleepers.push({ x: i * 0.35, y: 0.04, z: 0 });
    g.add(instances(new THREE.BoxGeometry(0.12, 0.06, 1.3), mat('#6d4c41'), sleepers));
    for (const s of [-1, 1]) g.add(box(14, 0.05, 0.05, '#8d8d8d', 0, 0.1, s * 0.45, 0, { metalness: 0.7, roughness: 0.3 }));
    const train = new THREE.Group();
    const yellow = '#f2c230';
    const boiler = cyl(0.38, 0.38, 1.6, 20, yellow, 0.4, 0.95, 0, { flat: false });
    boiler.rotation.z = Math.PI / 2;
    train.add(boiler);
    for (const x of [-0.2, 0.4, 1.0]) {
      const band = cyl(0.39, 0.39, 0.04, 20, '#3e2723', x, 0.95, 0, { flat: false });
      band.rotation.z = Math.PI / 2;
      train.add(band);
    }
    train.add(cyl(0.11, 0.12, 1.35, 12, '#f5f5f5', 1.15, 1.9, 0));
    train.add(cyl(0.16, 0.12, 0.08, 12, '#f5f5f5', 1.15, 2.58, 0));
    train.add(box(0.4, 0.75, 0.75, yellow, -0.55, 0.85, 0));
    for (const s of [-1, 1]) {
      const c = cyl(0.07, 0.07, 0.7, 10, '#9e9e9e', 0.55, 0.85, s * 0.48, { metalness: 0.6, roughness: 0.3 });
      c.rotation.z = 0.6;
      train.add(c);
    }
    const wheels = [];
    const mkWheel = (r, x, z) => {
      const w = new THREE.Group();
      const rim = new THREE.Mesh(new THREE.TorusGeometry(r, 0.035, 6, 24), mat('#212121'));
      w.add(rim);
      for (let i = 0; i < 6; i++) {
        const sp = box(0.03, r * 2, 0.025, '#f2c230', 0, 0, 0);
        sp.rotation.z = (i / 6) * Math.PI;
        w.add(sp);
      }
      const hub = cyl(0.07, 0.07, 0.06, 10, '#424242', 0, 0, 0);
      hub.rotation.x = Math.PI / 2;
      w.add(hub);
      w.position.set(x, r + 0.1, z);
      wheels.push(w);
      return w;
    };
    for (const s of [-1, 1]) {
      train.add(mkWheel(0.5, 0.75, s * 0.45));
      train.add(mkWheel(0.27, -0.45, s * 0.45));
    }
    train.add(box(2.0, 0.08, 0.9, '#5d4037', 0.15, 0.5, 0));
    // tender
    const tender = new THREE.Group();
    tender.add(box(1.2, 0.12, 0.95, '#5d4037', 0, 0.45, 0));
    const barrel = cyl(0.3, 0.3, 0.9, 16, '#8d6e63', 0, 0.82, 0);
    barrel.rotation.z = Math.PI / 2;
    tender.add(barrel);
    for (const s of [-1, 1]) for (const x of [-0.35, 0.35]) tender.add(mkWheel(0.25, x, s * 0.45));
    tender.position.x = -1.9;
    train.add(tender);
    g.add(train);
    // smoke puffs
    const puffs = [];
    const puffMat = mat('#e0e0e0', { transparent: true, opacity: 0.7, flat: false });
    for (let i = 0; i < 10; i++) {
      const p = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 6), puffMat);
      g.add(p);
      puffs.push(p);
    }
    ctx.update = (t) => {
      const x = ((t * 0.6) % 8) - 4;
      train.position.x = x;
      for (const w of wheels) {
        const r = w.position.y - 0.1;
        w.rotation.z = -(t * 0.6) / r;
      }
      puffs.forEach((p, i) => {
        const k = ((t * 0.8 + i / puffs.length) % 1);
        p.position.set(x + 1.15 - k * 1.5, 2.6 + k * 1.4, Math.sin(i) * 0.1);
        p.scale.setScalar(0.5 + k * 2);
      });
    };
    return g;
  },
};

export const blackship = {
  id: 'blackship',
  view: { r: 4.2, cy: 1.3 },
  name: '黒船（サスケハナ号）',
  country: 'jp',
  year: 1853,
  sky: ['#9cbfd6', '#e7ecef'],
  desc: '1853年にペリーが率いて浦賀に来航した艦隊の旗艦・サスケハナ号は、外輪で進む蒸気軍艦でした。船体が黒く塗られていたことから「黒船」と呼ばれ、煙を吐いて風に逆らって進む姿は人々を驚かせました。江戸では「泰平の眠りをさます上喜撰（蒸気船） たった四杯で夜も寝られず」という狂歌が詠まれました。',
  facts: [
    ['来航', '1853年7月（嘉永6年6月）浦賀沖'],
    ['全長', '約78m'],
    ['推進', '蒸気機関による外輪＋帆'],
    ['艦隊', '蒸気船2隻・帆船2隻の計4隻'],
  ],
  hotspots: [
    { p: [0, 0.95, 1.05], t: '外輪', d: '船の両側にある大きな水車のような車輪。蒸気機関の力で回して進みます。' },
    { p: [0, 2.2, 0], t: '煙突', d: '石炭を燃やした煙を出します。日本の人々にとって、煙を吐く船は初めて見る光景でした。' },
    { p: [-2.1, 0.7, 0], t: '黒い船体', d: '防腐のためにタールで黒く塗られていました。これが「黒船」の名の由来です。' },
  ],
  build(ctx) {
    const g = new THREE.Group();
    g.add(water(16, '#2f6d93', 0));
    const ship = new THREE.Group();
    const hull = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), mat('#1d1d1f'));
    hull.scale.set(3.0, 0.8, 0.75);
    hull.position.y = 0.55;
    ship.add(hull);
    ship.add(box(5.6, 0.12, 1.45, '#3e2f25', 0, 0.58, 0));
    ship.add(box(5.4, 0.12, 1.5, '#222', 0, 0.48, 0));
    const ports = [];
    for (let i = 0; i < 12; i++) for (const s of [-1, 1]) ports.push({ x: -2.3 + i * 0.4, y: 0.38, z: s * 0.72 });
    ship.add(instances(new THREE.BoxGeometry(0.12, 0.08, 0.04), mat('#eeeeee'), ports));
    const wheels = [];
    for (const s of [-1, 1]) {
      const paddleBox = cyl(0.6, 0.6, 0.3, 20, '#2b2b2b', 0, 0.75, s * 0.88);
      paddleBox.rotation.x = Math.PI / 2;
      ship.add(paddleBox);
      const w = new THREE.Group();
      for (let i = 0; i < 8; i++) {
        const p = box(0.06, 1.05, 0.22, '#5a3d2b', 0, 0, 0);
        p.rotation.z = (i / 8) * Math.PI;
        w.add(p);
      }
      w.position.set(0, 0.65, s * 1.08);
      ship.add(w);
      wheels.push(w);
    }
    ship.add(cyl(0.16, 0.16, 1.4, 14, '#1a1a1a', 0.35, 1.3, 0));
    ship.add(cyl(0.17, 0.17, 0.08, 14, '#b71c1c', 0.35, 1.95, 0));
    for (const [x, h] of [[1.8, 3.2], [-0.8, 3.4], [-2.2, 2.6]]) {
      ship.add(cyl(0.04, 0.06, h, 8, '#4e342e', x, 0.6 + h / 2, 0));
      for (const y of [0.45, 0.75]) {
        const yard = cyl(0.025, 0.025, 1.2 - y * 0.6, 6, '#4e342e', x, 0.6 + h * y, 0);
        yard.rotation.x = Math.PI / 2;
        ship.add(yard);
        ship.add(box(0.12, 0.12, 1.0 - y * 0.5, '#e8e2d2', x, 0.6 + h * y - 0.06, 0));
      }
    }
    const flagTex = canvasTexture(64, 40, (c, w, h) => {
      for (let i = 0; i < 7; i++) {
        c.fillStyle = i % 2 ? '#ffffff' : '#c62828';
        c.fillRect(0, (i * h) / 7, w, h / 7 + 1);
      }
      c.fillStyle = '#1a237e';
      c.fillRect(0, 0, w * 0.45, h * 0.55);
    });
    const flag = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.3), mat('#ffffff', { map: flagTex, side: THREE.DoubleSide }));
    flag.position.set(-2.55, 2.9, 0);
    ship.add(flag);
    g.add(ship);
    const puffMat = mat('#6b6b6b', { transparent: true, opacity: 0.6, flat: false });
    const puffs = [];
    for (let i = 0; i < 10; i++) {
      const p = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 6), puffMat);
      g.add(p);
      puffs.push(p);
    }
    ctx.update = (t) => {
      ship.position.y = Math.sin(t * 1.1) * 0.05;
      ship.rotation.x = Math.sin(t * 0.8) * 0.025;
      for (const w of wheels) w.rotation.z = -t * 1.5;
      flag.rotation.y = Math.sin(t * 3) * 0.2;
      puffs.forEach((p, i) => {
        const k = (t * 0.25 + i / puffs.length) % 1;
        p.position.set(0.35 - k * 3.5, 2.1 + k * 1.5 + ship.position.y, Math.sin(i * 1.7) * 0.2);
        p.scale.setScalar(0.6 + k * 2.4);
      });
    };
    return g;
  },
};

function latticeTex() {
  const t = canvasTexture(64, 64, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    g.strokeStyle = '#ffffff';
    g.lineWidth = 6;
    g.strokeRect(0, 0, w, h);
    g.lineWidth = 4;
    g.beginPath();
    g.moveTo(0, 0);
    g.lineTo(w, h);
    g.moveTo(w, 0);
    g.lineTo(0, h);
    g.stroke();
  });
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.RepeatWrapping;
  return t;
}

export const eiffel = {
  id: 'eiffel',
  view: { r: 4.4, cy: 3.4 },
  name: 'エッフェル塔',
  country: 'fr',
  year: 1889,
  sky: ['#b7d2ec', '#f7e3d7'],
  desc: '1889年のパリ万国博覧会のために建てられた鉄の塔。約1万8000個の鉄の部材を約250万本のリベットで組み立て、わずか2年あまりで完成しました。完成当時は高さ約300mで世界一高い建造物でした。網目のような骨組みは、強い風を受け流すように計算されています。',
  facts: [
    ['完成', '1889年3月'],
    ['高さ', '約330m（現在、アンテナを含む）'],
    ['重さ', '約7300トン（鉄骨部分）'],
    ['塗り直し', '約7年ごとに約60トンの塗料で塗装'],
  ],
  hotspots: [
    { p: [0, 0.9, 1.4], t: '4本の脚とアーチ', d: '脚の間のアーチは主に装飾ですが、塔の姿を優雅に見せています。' },
    { p: [0, 1.6, 0], t: '第1展望台', d: '高さ約57m。レストランやガラス張りの床があります。' },
    { p: [0, 3.2, 0], t: '第2展望台', d: '高さ約116m。パリの街を一望できる人気の展望台です。' },
    { p: [0, 7.2, 0], t: '頂上', d: '高さ約276mの最上階展望台。エッフェルの執務室が再現されています。' },
  ],
  build(ctx) {
    const g = new THREE.Group();
    g.add(ground(14, '#8fb36f'));
    g.add(box(6, 0.02, 6, '#d8cdb2', 0, 0.01, 0));
    const iron = '#7d5f45';
    const lt = latticeTex();
    const lattice = (repeatY) => {
      const tex = lt.clone();
      tex.needsUpdate = true;
      tex.repeat.set(2, repeatY);
      return mat(iron, { map: tex, alphaTest: 0.5, side: THREE.DoubleSide, flat: true });
    };
    const legH = 1.65;
    for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.32, legH, 4, 1, true), lattice(6));
      leg.geometry.rotateY(Math.PI / 4);
      leg.position.set(sx * 1.15, legH / 2, sz * 1.15);
      leg.rotation.z = sx * 0.33;
      leg.rotation.x = -sz * 0.33;
      leg.castShadow = true;
      g.add(leg);
    }
    for (let s = 0; s < 4; s++) {
      const arc = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.04, 6, 24, Math.PI), mat(iron));
      arc.position.y = 0.4;
      arc.rotation.y = (s * Math.PI) / 2;
      const a = (s * Math.PI) / 2;
      arc.position.x = Math.sin(a) * 1.3;
      arc.position.z = Math.cos(a) * 1.3;
      arc.rotation.y = a + Math.PI / 2;
      arc.scale.set(1, 0.85, 1);
      g.add(arc);
    }
    g.add(box(2.1, 0.18, 2.1, iron, 0, 1.6, 0));
    g.add(box(2.2, 0.06, 2.2, '#5d4636', 0, 1.72, 0));
    const mid = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 1.1, 1.5, 4, 1, true), lattice(5));
    mid.geometry.rotateY(Math.PI / 4);
    mid.position.y = 2.45;
    mid.castShadow = true;
    g.add(mid);
    g.add(box(1.0, 0.12, 1.0, iron, 0, 3.2, 0));
    const top = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.6, 3.8, 4, 1, true), lattice(12));
    top.geometry.rotateY(Math.PI / 4);
    top.position.y = 5.15;
    top.castShadow = true;
    g.add(top);
    g.add(box(0.28, 0.2, 0.28, iron, 0, 7.1, 0));
    g.add(cyl(0.015, 0.03, 0.6, 6, '#bdbdbd', 0, 7.5, 0));
    const beacon = sphere(0.05, '#ffeb3b', 0, 7.82, 0, { emissive: '#ffeb3b', emissiveIntensity: 1.5 });
    g.add(beacon);
    const r = rng(14);
    for (let i = 0; i < 14; i++) g.add(tree(-5 + r() * 10, 3.5 + r() * 3, 0.8 + r() * 0.4, '#4c8a4a'));
    ctx.update = (t) => {
      beacon.visible = Math.sin(t * 4) > 0;
    };
    return g;
  },
};

export const flyer = {
  id: 'flyer',
  view: { r: 3.0, cy: 1.0 },
  name: 'ライトフライヤー号',
  country: 'us',
  year: 1903,
  sky: ['#a6cdee', '#f1ead9'],
  desc: '1903年12月17日、ライト兄弟がノースカロライナ州キティホークで人類初の有人動力飛行に成功した飛行機。木の骨組みに布を張った複葉機で、自作の12馬力のガソリンエンジンが2つのプロペラを回しました。主翼をねじって機体を傾ける「たわみ翼」の発明が、操縦を可能にしました。',
  facts: [
    ['初飛行', '1903年12月17日'],
    ['記録', '1回目：12秒・約36m／4回目：59秒・約260m'],
    ['翼幅', '約12.3m'],
    ['エンジン', '自作の約12馬力ガソリンエンジン'],
  ],
  hotspots: [
    { p: [0, 0.75, 1.6], t: '複葉の主翼', d: '上下2枚の翼。翼の端をねじる「たわみ翼」で、機体の傾きを操りました。' },
    { p: [1.8, 0.75, 0], t: '昇降舵（前）', d: '機首側にある小さな翼。機首の上げ下げを操作します。' },
    { p: [-0.9, 0.75, 0.65], t: 'プロペラ', d: '2つのプロペラを逆向きに回してバランスを取りました。プロペラの形も兄弟が風洞実験で設計しました。' },
    { p: [0, 0.45, -0.3], t: '操縦士', d: 'パイロットは下の翼にうつ伏せになって操縦しました。最初の飛行はオーヴィルが担当しました。' },
  ],
  build(ctx) {
    const g = new THREE.Group();
    g.add(ground(15, '#e8d9b4'));
    const r = rng(19);
    for (let i = 0; i < 6; i++) {
      const d = sphere(2 + r() * 2, '#e2cf9f', -8 + i * 3, -1.4, -6 - r() * 3);
      d.scale.y = 0.4;
      g.add(d);
    }
    const plane = new THREE.Group();
    const fabric = '#efe6cf';
    const wood = '#8d6e4f';
    const span = 4.6;
    plane.add(box(0.7, 0.03, span, fabric, 0, 0, 0));
    plane.add(box(0.7, 0.03, span, fabric, 0, 0.7, 0));
    const struts = [];
    for (let i = 0; i < 7; i++) {
      const z = -span / 2 + 0.1 + (i * (span - 0.2)) / 6;
      struts.push({ x: 0.3, y: 0.35, z });
      struts.push({ x: -0.3, y: 0.35, z });
    }
    plane.add(instances(new THREE.CylinderGeometry(0.015, 0.015, 0.7, 5), mat(wood), struts));
    // canard
    plane.add(box(0.35, 0.02, 1.1, fabric, 1.7, 0.18, 0));
    plane.add(box(0.35, 0.02, 1.1, fabric, 1.7, 0.42, 0));
    for (const s of [-1, 1]) {
      const rod = box(1.4, 0.025, 0.025, wood, 1.0, 0.25, s * 0.4);
      plane.add(rod);
    }
    // rudders
    plane.add(box(0.25, 0.6, 0.02, fabric, -1.6, 0.4, 0.15));
    plane.add(box(0.25, 0.6, 0.02, fabric, -1.6, 0.4, -0.15));
    for (const s of [-1, 1]) plane.add(box(1.3, 0.025, 0.025, wood, -1.0, 0.35, s * 0.3));
    // skids
    for (const s of [-1, 1]) plane.add(box(2.6, 0.04, 0.04, wood, 0.6, -0.3, s * 0.4));
    // engine + pilot
    plane.add(box(0.25, 0.18, 0.25, '#424242', 0, 0.12, 0.35));
    const pilot = person(0, 0, '#455a64', 0.5);
    plane.add(pilot);
    pilot.rotation.z = Math.PI / 2;
    pilot.position.set(0.25, 0.08, -0.3);
    const props = [];
    for (const s of [-1, 1]) {
      const p = box(0.03, 0.9, 0.07, wood, -0.4, 0.35, s * 0.85);
      plane.add(p);
      props.push(p);
    }
    plane.position.y = 0.9;
    g.add(plane);
    // launching rail
    g.add(box(6, 0.05, 0.08, '#6d4c41', 1, 0.03, 0));
    ctx.update = (t) => {
      plane.position.y = 0.9 + Math.sin(t * 1.4) * 0.12;
      plane.rotation.z = Math.sin(t * 0.9) * 0.04;
      plane.rotation.x = Math.sin(t * 0.7) * 0.03;
      props.forEach((p, i) => (p.rotation.x = t * 20 * (i ? 1 : -1)));
    };
    return g;
  },
};

export const genbaku = {
  id: 'genbaku',
  view: { r: 3.6, cy: 1.3 },
  name: '原爆ドーム',
  country: 'jp',
  year: 1945,
  sky: ['#c9dbe8', '#f0ece4'],
  desc: '1945年8月6日、広島に投下された原子爆弾は、この建物（広島県産業奨励館）のほぼ真上約600mで炸裂しました。建物は大破・全焼しましたが、爆風がほぼ真上から加わったため壁の一部が倒れずに残りました。核兵器の悲惨さを伝え、平和を願う象徴として保存され、1996年に世界遺産に登録されています。',
  facts: [
    ['建設', '1915年（広島県物産陳列館）'],
    ['被爆', '1945年8月6日 午前8時15分'],
    ['爆心地', '建物の南東約160m・上空約600m'],
    ['世界遺産', '1996年'],
  ],
  hotspots: [
    { p: [0, 2.7, 0], t: '鉄骨のドーム', d: 'ドームの銅板は溶け落ち、鉄骨だけが残りました。この姿から「原爆ドーム」と呼ばれるようになりました。' },
    { p: [1.8, 1.0, 1.2], t: '崩れた壁', d: '建物の中にいた人々は全員が亡くなったと考えられています。' },
    { p: [0, 0.1, 3.2], t: '元安川', d: 'ドームのそばを流れる川。毎年8月6日には、犠牲者を慰める灯籠流しが行われます。' },
  ],
  build() {
    const g = new THREE.Group();
    g.add(ground(15, '#9fb58a'));
    const river = box(16, 0.02, 2.0, '#4f87a8', 0, 0.01, 3.6, 0, { roughness: 0.3 });
    g.add(river);
    const brick = '#9b8c7a';
    const r = rng(45);
    // main 3-storey body with broken walls
    const walls = [
      [0, 2.6, 0.15, 3.4, -1.6, 0, 0],
      [0, 2.6, 0.15, 3.4, 1.6, 0, 0],
      [0, 2.2, 3.2, 0.15, 0, 0, 1.7],
      [0, 2.6, 3.2, 0.15, 0, 0, -1.7],
    ];
    for (const [, h, w, d, x, , z] of walls) {
      const n = 7;
      for (let i = 0; i < n; i++) {
        const t = (i + 0.5) / n - 0.5;
        const hh = h * (0.4 + r() * 0.6);
        const px = w > d ? x + t * w : x;
        const pz = w > d ? z : z + t * d;
        g.add(box(w > d ? w / n - 0.02 : w, hh, w > d ? d : d / n - 0.02, i % 2 ? brick : '#a69885', px, hh / 2, pz));
      }
    }
    // windows (dark holes)
    const holes = [];
    for (let i = 0; i < 6; i++) for (const y of [0.6, 1.4]) holes.push({ x: -1.3 + i * 0.52, y, z: 1.78 });
    g.add(instances(new THREE.BoxGeometry(0.22, 0.38, 0.02), mat('#2e2a26'), holes));
    // central tower + dome skeleton
    g.add(cyl(0.95, 1.0, 0.9, 8, '#a69885', 0, 2.25, 0));
    g.add(cyl(0.88, 0.88, 0.08, 24, '#5a5048', 0, 2.72, 0, { flat: false }));
    for (let i = 0; i < 12; i++) {
      // Quarter arc from the drum ring up to the apex, rotated around the dome axis.
      const rib = new THREE.Mesh(new THREE.TorusGeometry(0.88, 0.025, 4, 16, Math.PI / 2), mat('#3d3833'));
      rib.position.y = 2.72;
      rib.rotation.y = (i / 12) * Math.PI * 2;
      g.add(rib);
    }
    for (const y of [3.05, 3.35]) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.88 * Math.cos(Math.asin((y - 2.72) / 0.88)), 0.02, 4, 24), mat('#3d3833'));
      ring.rotation.x = Math.PI / 2;
      ring.position.y = y;
      g.add(ring);
    }
    // rubble
    const rub = [];
    for (let i = 0; i < 50; i++) rub.push({ x: (r() - 0.5) * 3, y: 0.06, z: (r() - 0.5) * 3, ry: r() * 3, s: 0.5 + r() });
    g.add(instances(new THREE.BoxGeometry(0.18, 0.1, 0.14), mat('#8a7d6c'), rub));
    for (let i = 0; i < 8; i++) g.add(tree(-5 + i * 1.4, -4, 0.9, '#4f8a4f'));
    return g;
  },
};

export const sputnik = {
  id: 'sputnik',
  view: { r: 2.6, cy: 0.3 },
  name: 'スプートニク1号',
  country: 'ru',
  year: 1957,
  space: true,
  sky: ['#020412', '#0b1030'],
  desc: '1957年10月4日、ソ連が打ち上げた世界初の人工衛星。直径58cmのアルミ合金の球体に4本のアンテナを持ち、約96分で地球を1周しながら「ピー、ピー」という電波を送り続けました。この成功はアメリカに大きな衝撃を与え（スプートニク・ショック）、米ソの宇宙開発競争が始まりました。4年後、ガガーリンが人類初の宇宙飛行に成功します。',
  facts: [
    ['打ち上げ', '1957年10月4日'],
    ['大きさ', '直径58cm・重さ83.6kg'],
    ['周回', '約96分で地球を1周'],
    ['運用', '約3か月後に大気圏に再突入して消滅'],
  ],
  hotspots: [
    { p: [0, 0.6, 0], t: '球体の本体', d: '内部には電池と無線送信機が入っていました。表面は太陽光を反射するよう磨かれていました。' },
    { p: [-1.8, 0, 0.4], t: '4本のアンテナ', d: '長さ2.4〜2.9mのアンテナから電波を送信し、世界中のアマチュア無線家も受信しました。' },
    { p: [0, -5, 0], t: '地球', d: '衛星は高度約215〜939kmの楕円軌道を回りました。' },
  ],
  build(ctx) {
    const g = new THREE.Group();
    const stars = [];
    const r = rng(77);
    for (let i = 0; i < 400; i++) {
      const v = new THREE.Vector3(r() - 0.5, r() - 0.5, r() - 0.5).normalize().multiplyScalar(40);
      stars.push(v.x, v.y, v.z);
    }
    const sg = new THREE.BufferGeometry();
    sg.setAttribute('position', new THREE.Float32BufferAttribute(stars, 3));
    g.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xffffff, size: 0.15 })));
    const earthTex = canvasTexture(512, 256, (c, w, h) => {
      c.fillStyle = '#1f5fa8';
      c.fillRect(0, 0, w, h);
      const rr = rng(3);
      c.fillStyle = '#3f8f4f';
      for (let i = 0; i < 26; i++) {
        c.beginPath();
        c.ellipse(rr() * w, h * 0.2 + rr() * h * 0.6, 20 + rr() * 60, 10 + rr() * 30, rr() * 3, 0, Math.PI * 2);
        c.fill();
      }
      c.fillStyle = 'rgba(255,255,255,0.75)';
      for (let i = 0; i < 40; i++) {
        c.beginPath();
        c.ellipse(rr() * w, rr() * h, 20 + rr() * 50, 4 + rr() * 8, rr() * 0.5, 0, Math.PI * 2);
        c.fill();
      }
    });
    const earth = new THREE.Mesh(new THREE.SphereGeometry(4.5, 48, 32), mat('#ffffff', { map: earthTex, flat: false, roughness: 0.8 }));
    earth.position.set(0, -6.2, -2);
    g.add(earth);
    const atm = new THREE.Mesh(new THREE.SphereGeometry(4.65, 48, 32), new THREE.MeshBasicMaterial({ color: 0x6fb6ff, transparent: true, opacity: 0.18 }));
    atm.position.copy(earth.position);
    g.add(atm);
    const sat = new THREE.Group();
    sat.add(sphere(0.55, '#eef1f5', 0, 0, 0, { metalness: 0.45, roughness: 0.25, flat: false, emissive: '#3a4250', emissiveIntensity: 0.6 }, 32, 24));
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.03, 8, 32), mat('#b0b6bd', { metalness: 0.9, roughness: 0.2 }));
    ring.rotation.x = Math.PI / 2;
    sat.add(ring);
    for (const [y, z] of [[0.22, 0.22], [0.22, -0.22], [-0.22, 0.22], [-0.22, -0.22]]) {
      const ant = cyl(0.012, 0.012, 2.6, 6, '#c0c6cc', 0, 0, 0, { metalness: 0.9, roughness: 0.2 });
      ant.geometry.translate(0, -1.3, 0);
      ant.position.set(-0.3, y, z);
      const dir = new THREE.Vector3(-1, y * 1.4, z * 1.4).normalize();
      ant.quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), dir);
      sat.add(ant);
    }
    sat.position.y = 0.6;
    g.add(sat);
    ctx.update = (t) => {
      earth.rotation.y = t * 0.05;
      sat.rotation.y = t * 0.3;
      sat.rotation.x = Math.sin(t * 0.4) * 0.2;
    };
    return g;
  },
};

export const shinkansen = {
  id: 'shinkansen',
  view: { r: 5.0, cy: 1.4, cz: -1 },
  name: '新幹線0系と富士山',
  country: 'jp',
  year: 1964,
  sky: ['#9ccdf0', '#eaf3fa'],
  desc: '1964年10月1日、東京オリンピックの開幕直前に開業した東海道新幹線の初代車両「0系」。営業最高速度は210km/hで、当時世界最速の鉄道でした。団子鼻と呼ばれる丸い先頭と、白に青の帯の車体は、高度経済成長期の日本の象徴となりました。東京〜新大阪間を開業時は4時間（翌年から3時間10分）で結びました。',
  facts: [
    ['開業', '1964年10月1日'],
    ['最高速度', '210km/h（開業当時）'],
    ['区間', '東京〜新大阪 約515km'],
    ['0系の引退', '2008年'],
  ],
  hotspots: [
    { p: [2.6, 0.95, 0], t: '団子鼻', d: '空気抵抗を減らすための丸い先頭形状。飛行機の設計技術が生かされました。' },
    { p: [0, 1.0, 0.36], t: '青い帯', d: '白い車体に青い帯の配色は、その後の東海道新幹線の伝統となりました。' },
    { p: [-3, 4.2, -8], t: '富士山', d: '新幹線の車窓から見える富士山は、日本を代表する風景の一つです。' },
  ],
  build(ctx) {
    const g = new THREE.Group();
    g.add(ground(18, '#8cb46a'));
    const fuji = new THREE.Group();
    fuji.add(cone(6, 4.6, 32, '#5d6f8f', 0, 2.3, 0, { flat: false }));
    fuji.add(cone(2.0, 1.55, 32, '#f8fbff', 0, 3.85, 0, { flat: false }));
    fuji.position.set(-3, 0, -9);
    g.add(fuji);
    // viaduct
    g.add(box(18, 0.2, 0.9, '#bdbdbd', 0, 0.5, 0));
    const piers = [];
    for (let i = -8; i <= 8; i++) piers.push({ x: i * 1.0, y: 0.2, z: 0 });
    g.add(instances(new THREE.BoxGeometry(0.2, 0.4, 0.6), mat('#9e9e9e'), piers));
    for (const s of [-1, 1]) g.add(box(18, 0.03, 0.04, '#757575', 0, 0.62, s * 0.22));
    const train = new THREE.Group();
    const car = (x, nose) => {
      const c = new THREE.Group();
      c.add(box(2.2, 0.55, 0.62, '#f4f4f0', 0, 0.95, 0));
      c.add(box(2.2, 0.12, 0.63, '#1f4fa3', 0, 0.75, 0));
      c.add(box(2.0, 0.1, 0.635, '#2a3540', 0, 1.05, 0));
      if (nose) {
        const n = sphere(0.33, '#f4f4f0', 1.1, 0.95, 0, { flat: false });
        n.scale.set(1.6, 0.85, 0.95);
        c.add(n);
        const s = sphere(0.32, '#1f4fa3', 1.05, 0.8, 0, { flat: false });
        s.scale.set(1.55, 0.3, 1);
        c.add(s);
        c.add(box(0.25, 0.12, 0.5, '#2a3540', 1.15, 1.12, 0));
      }
      c.position.x = x;
      return c;
    };
    train.add(car(1.2, true));
    train.add(car(-1.05, false));
    train.add(car(-3.3, false));
    g.add(train);
    const r = rng(22);
    for (let i = 0; i < 20; i++) {
      const x = -8 + r() * 16;
      const z = 2 + r() * 5;
      g.add(tree(x, z, 0.7 + r() * 0.5, '#4d8a43'));
    }
    const fields = [];
    for (let i = 0; i < 6; i++) fields.push({ x: -7 + i * 2.6, y: 0.01, z: -3.2 });
    g.add(instances(new THREE.BoxGeometry(2.4, 0.02, 2.4), mat('#c9c45b'), fields));
    ctx.update = (t) => {
      train.position.x = ((t * 2.2) % 14) - 6;
    };
    return g;
  },
};

function saturnTex() {
  return canvasTexture(256, 512, (c, w, h) => {
    c.fillStyle = '#f5f5f5';
    c.fillRect(0, 0, w, h);
    c.fillStyle = '#111';
    // S-IC black/white roll pattern (bottom part)
    for (let i = 0; i < 4; i++) {
      if (i % 2 === 0) c.fillRect((i * w) / 4, h * 0.72, w / 4, h * 0.2);
    }
    c.fillRect(0, h * 0.94, w, h * 0.06);
    c.fillRect(0, h * 0.52, w, h * 0.03);
    c.fillRect(0, h * 0.36, w, h * 0.02);
    c.fillStyle = '#333';
    c.font = 'bold 26px sans-serif';
    c.save();
    c.translate(w * 0.62, h * 0.5);
    c.rotate(-Math.PI / 2);
    c.fillText('USA', 0, 0);
    c.restore();
  });
}

export const saturnv = {
  id: 'saturnv',
  view: { r: 4.4, cy: 4.0 },
  name: 'サターンVロケット',
  country: 'us',
  year: 1969,
  sky: ['#86b9e3', '#f1eadf'],
  desc: 'アポロ計画で宇宙飛行士を月へ送った3段式の巨大ロケット。高さ約110m、打ち上げ時の重さは約2900トンにもなります。第1段の5基のF-1エンジンは、合わせて約3400トンの推力を生み出しました。1969年7月16日、アポロ11号を乗せて打ち上げられ、人類初の月面着陸を実現しました。',
  facts: [
    ['高さ', '約110.6m'],
    ['重さ', '約2900トン（打ち上げ時）'],
    ['構成', '第1段 S-IC・第2段 S-II・第3段 S-IVB・アポロ宇宙船'],
    ['打ち上げ', '13回（積み荷を失ったことは一度もない）'],
  ],
  hotspots: [
    { p: [0, 1.4, 0.55], t: '第1段（S-IC）', d: '5基のF-1エンジンで約2分半燃焼し、高度約65kmまで上昇します。' },
    { p: [0, 4.2, 0.55], t: '第2段（S-II）', d: '液体水素を燃料とする5基のJ-2エンジンで、宇宙空間近くまで加速します。' },
    { p: [0, 6.2, 0.45], t: '第3段（S-IVB）', d: '地球周回軌道に入った後、再点火して月へ向かう軌道に乗せます。' },
    { p: [0, 7.9, 0.3], t: 'アポロ宇宙船と脱出塔', d: '先端の塔は、打ち上げ失敗時に乗員の入ったカプセルを引き離すための脱出用ロケットです。' },
  ],
  build(ctx) {
    const g = new THREE.Group();
    g.add(ground(14, '#9aa58a'));
    g.add(box(4, 0.3, 4, '#8a8a8a', 0, 0.15, 0));
    const tex = saturnTex();
    const rocket = new THREE.Group();
    const s1 = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 2.8, 32), mat('#ffffff', { map: tex, flat: false }));
    s1.position.y = 1.8;
    rocket.add(s1);
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2 + Math.PI / 4;
      const fin = box(0.04, 0.6, 0.35, '#212121', Math.cos(a) * 0.62, 0.65, Math.sin(a) * 0.62);
      fin.rotation.y = -a;
      rocket.add(fin);
    }
    for (const [x, z] of [[0, 0], [0.25, 0.25], [-0.25, 0.25], [0.25, -0.25], [-0.25, -0.25]]) rocket.add(cone(0.14, 0.3, 12, '#3a3a3a', x, 0.28, z));
    rocket.add(cyl(0.5, 0.5, 0.2, 32, '#f5f5f5', 0, 3.3, 0, { flat: false }));
    rocket.add(cyl(0.5, 0.5, 2.0, 32, '#f7f7f7', 0, 4.4, 0, { flat: false }));
    rocket.add(cyl(0.505, 0.505, 0.1, 32, '#111', 0, 4.0, 0, { flat: false }));
    rocket.add(cyl(0.33, 0.5, 0.4, 32, '#f0f0f0', 0, 5.6, 0, { flat: false }));
    rocket.add(cyl(0.33, 0.33, 1.2, 32, '#f7f7f7', 0, 6.4, 0, { flat: false }));
    rocket.add(cyl(0.335, 0.335, 0.25, 32, '#111', 0, 6.2, 0, { flat: false }));
    rocket.add(cyl(0.33, 0.33, 0.08, 32, '#bdbdbd', 0, 7.04, 0, { flat: false }));
    rocket.add(cyl(0.2, 0.33, 0.55, 32, '#f0f0f0', 0, 7.35, 0, { flat: false }));
    rocket.add(cone(0.2, 0.35, 32, '#e0e0e0', 0, 7.8, 0, { flat: false }));
    rocket.add(cyl(0.02, 0.06, 0.7, 6, '#c62828', 0, 8.3, 0));
    rocket.add(cone(0.05, 0.12, 8, '#c62828', 0, 8.7, 0));
    rocket.position.y = 0.3;
    g.add(rocket);
    // launch umbilical tower
    const tower = new THREE.Group();
    tower.add(box(0.7, 9, 0.7, '#c0392b', 0, 4.5, 0, 0, {}));
    const arms = [];
    for (let i = 1; i < 9; i++) arms.push({ x: 0.85, y: i * 0.95, z: 0 });
    tower.add(instances(new THREE.BoxGeometry(1.0, 0.06, 0.12), mat('#b03a2e'), arms));
    tower.position.set(-1.6, 0.3, 0);
    g.add(tower);
    const flame = cone(0.45, 1.6, 16, '#ffb300', 0, -0.5, 0, { emissive: '#ff6f00', emissiveIntensity: 1.2, transparent: true, opacity: 0.85 });
    flame.rotation.x = Math.PI;
    flame.visible = false;
    rocket.add(flame);
    let launchAt = null;
    ctx.actions = [
      {
        label: '🚀 打ち上げ',
        run: () => {
          launchAt = ctx.time;
        },
      },
    ];
    ctx.update = (t) => {
      if (launchAt == null) {
        rocket.position.y = 0.3;
        flame.visible = false;
        return;
      }
      const k = t - launchAt;
      flame.visible = true;
      flame.scale.setScalar(0.9 + Math.random() * 0.25);
      rocket.position.y = 0.3 + Math.max(0, k - 0.8) ** 2 * 0.9;
      if (k > 7) launchAt = null;
    };
    return g;
  },
};

function graffitiTex(seed) {
  return canvasTexture(256, 256, (c, w, h) => {
    c.fillStyle = '#d8d4cc';
    c.fillRect(0, 0, w, h);
    const r = rng(seed);
    const colors = ['#e53935', '#fdd835', '#1e88e5', '#43a047', '#8e24aa', '#fb8c00', '#00acc1', '#ec407a'];
    for (let i = 0; i < 18; i++) {
      c.fillStyle = colors[Math.floor(r() * colors.length)];
      c.globalAlpha = 0.85;
      c.beginPath();
      c.ellipse(r() * w, r() * h, 10 + r() * 40, 6 + r() * 26, r() * 3, 0, Math.PI * 2);
      c.fill();
    }
    c.globalAlpha = 1;
    c.font = 'bold 34px sans-serif';
    c.fillStyle = '#111';
    const words = ['FREE', 'PEACE', 'LOVE', '1989', 'BERLIN', 'HOPE'];
    for (let i = 0; i < 3; i++) c.fillText(words[Math.floor(r() * words.length)], r() * w * 0.6, 40 + r() * (h - 60));
  });
}

export const berlinwall = {
  id: 'berlinwall',
  view: { r: 5.2, cy: 1.2, cz: -1.8 },
  name: 'ベルリンの壁とブランデンブルク門',
  country: 'de',
  year: 1989,
  sky: ['#9fb8cf', '#e9e4dc'],
  desc: '1961年、東ドイツは西ベルリンを囲むようにコンクリートの壁を築き、住民が西側へ逃げるのを防ぎました。壁は全長約155kmにおよび、越えようとして多くの人が命を落としました。1989年11月9日に国境が開かれると、市民が壁に上って喜び合い、壁は打ち壊されました。後ろに見えるブランデンブルク門は、分断と統一の象徴です。',
  facts: [
    ['建設', '1961年8月13日'],
    ['崩壊', '1989年11月9日'],
    ['全長', '約155km（西ベルリンを囲む）'],
    ['ドイツ統一', '1990年10月3日'],
  ],
  hotspots: [
    { p: [0, 1.25, 1.0], t: '壁', d: '高さ約3.6mのコンクリートの壁。西側の面には、人々が自由を求める落書きを描きました。' },
    { p: [3.6, 1.8, -1.6], t: '監視塔', d: '東側には監視塔や「死の帯」と呼ばれる無人地帯があり、逃亡者は銃撃されました。' },
    { p: [0, 2.6, -5], t: 'ブランデンブルク門', d: '1791年に完成した門。壁の時代は東西の境界にあって通れませんでしたが、今は統一の象徴です。' },
  ],
  build() {
    const g = new THREE.Group();
    g.add(ground(15, '#a3a596'));
    g.add(box(15, 0.02, 3, '#8c8a80', 0, 0.01, -1.8));
    const N = 12;
    for (let i = 0; i < N; i++) {
      if (i === 5 || i === 6) continue;
      const x = -5.5 + i * 1.0;
      const seg = new THREE.Group();
      const slab = new THREE.Mesh(new THREE.BoxGeometry(0.98, 1.6, 0.15), [
        mat('#cfcac0'), mat('#cfcac0'), mat('#cfcac0'), mat('#cfcac0'),
        mat('#ffffff', { map: graffitiTex(i + 1) }), mat('#cfcac0'),
      ]);
      slab.position.y = 0.8;
      slab.castShadow = true;
      seg.add(slab);
      const pipe = cyl(0.12, 0.12, 0.98, 12, '#d6d1c7', 0, 1.65, 0, { flat: false });
      pipe.rotation.z = Math.PI / 2;
      seg.add(pipe);
      seg.add(box(0.98, 0.1, 0.8, '#bdb8ad', 0, 0.05, -0.3));
      seg.position.set(x, 0, 0.4);
      g.add(seg);
    }
    // broken pieces
    g.add(box(0.5, 0.7, 0.15, '#cfcac0', 0.1, 0.25, 1.2, 0.8));
    g.add(box(0.4, 0.5, 0.15, '#cfcac0', -0.6, 0.2, 1.6, -0.5));
    // celebrating people
    const colors = ['#e53935', '#1e88e5', '#fdd835', '#43a047', '#8e24aa', '#fb8c00'];
    const r = rng(9);
    for (let i = 0; i < 14; i++) {
      const p = person(-5 + r() * 10, 1.4 + r() * 1.6, colors[i % colors.length], 0.5);
      g.add(p);
    }
    for (let i = 0; i < 5; i++) {
      const p = person(-5 + i * 2.1, 0.4, colors[(i + 2) % colors.length], 0.45);
      p.position.y = 1.78;
      g.add(p);
    }
    // watch tower
    const wt = new THREE.Group();
    wt.add(box(0.45, 1.8, 0.45, '#b5b0a5', 0, 0.9, 0));
    wt.add(box(0.75, 0.45, 0.75, '#c5c0b5', 0, 2.0, 0));
    wt.add(box(0.78, 0.15, 0.78, '#5f6a6a', 0, 2.3, 0));
    wt.add(box(0.76, 0.15, 0.76, '#2c3e50', 0, 2.05, 0));
    wt.position.set(3.6, 0, -1.6);
    g.add(wt);
    // Brandenburg Gate
    const gate = new THREE.Group();
    const sand = '#d8c9a3';
    gate.add(box(5.2, 0.25, 1.1, sand, 0, 0.125, 0));
    const cols = [];
    for (let i = 0; i < 6; i++) for (const z of [-0.4, 0.4]) cols.push({ x: -2.3 + i * 0.92, y: 1.15, z });
    gate.add(instances(new THREE.CylinderGeometry(0.12, 0.13, 1.8, 14), mat(sand), cols));
    gate.add(box(5.4, 0.35, 1.2, sand, 0, 2.22, 0));
    gate.add(box(2.4, 0.4, 0.9, '#cdbd96', 0, 2.6, 0));
    const quad = new THREE.Group();
    quad.add(box(0.6, 0.18, 0.3, '#3f6e5a', 0, 0, 0, 0, { metalness: 0.4 }));
    for (let i = 0; i < 4; i++) quad.add(box(0.12, 0.25, 0.08, '#3f6e5a', -0.2 + i * 0.13, 0.18, 0.15));
    quad.add(cyl(0.05, 0.06, 0.3, 8, '#3f6e5a', 0, 0.3, -0.05));
    quad.position.y = 2.93;
    gate.add(quad);
    gate.position.set(0, 0, -5.2);
    g.add(gate);
    return g;
  },
};
