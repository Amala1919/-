import * as THREE from 'three';
import {
  box, cyl, cone, sphere, frustum, rectFrustum, gable, extrude, instances, ground, water, rng, mat,
  canvasTexture, tree, palm, person,
} from '../kit.js';

function coursesTexture(base, line, n = 60) {
  return canvasTexture(64, 512, (g, w, h) => {
    g.fillStyle = base;
    g.fillRect(0, 0, w, h);
    g.strokeStyle = line;
    g.lineWidth = 2;
    for (let i = 0; i < n; i++) {
      const y = (i / n) * h;
      g.beginPath();
      g.moveTo(0, y);
      g.lineTo(w, y);
      g.stroke();
    }
  });
}

export const pyramid = {
  id: 'pyramid',
  view: { r: 7.4, cy: 1.2, cx: -0.6, cz: -0.8 },
  name: 'ギザの大ピラミッド',
  country: 'eg',
  year: -2560,
  sky: ['#f6d59a', '#f2a65a'],
  desc: '古代エジプト古王国時代、クフ王の墓として建てられた世界最大級のピラミッド。約230万個の石灰岩ブロックが積まれ、底辺の各辺は東西南北にほぼ正確に向いています。手前にはスフィンクス、奥にはカフラー王とメンカウラー王のピラミッドが並びます。',
  facts: [
    ['建設', '紀元前2560年ごろ'],
    ['高さ', '約146m（現在は約139m）'],
    ['底辺', '約230m × 230m'],
    ['石の数', '約230万個（平均2.5トン）'],
  ],
  hotspots: [
    { p: [0, 3.0, 0], t: '頂上', d: 'もとの頂上には「キャップストーン」と呼ばれる石があったと考えられていますが、失われています。' },
    { p: [0, 0.45, -2.0], t: '入口', d: '北側の面にある入口。北極星の方向を向く通路は、王の魂が星へ昇ることと関係があるともいわれます。' },
    { p: [0, 1.0, 0], t: '王の間', d: 'ピラミッド内部の花崗岩でできた部屋。空の石棺が置かれていますが、ミイラは見つかっていません。' },
    { p: [-3.6, 2.85, -3.6], t: '化粧石', d: 'カフラー王のピラミッドの頂上付近には、表面を覆っていた白い化粧石が今も残っています。' },
    { p: [3.4, 0.6, 2.4], t: 'スフィンクス', d: 'ライオンの体に王の顔をもつ巨大な像。全長約73m。カフラー王の顔だと考えられています。' },
  ],
  build() {
    const g = new THREE.Group();
    g.add(ground(14, '#e3c38b'));
    const tex = coursesTexture('#d9b77c', '#b9965d', 70);
    const m1 = frustum(4.6, 0, 2.92, '#d9b77c', 0, 1.46, 0, { map: tex });
    g.add(m1);
    const tex2 = coursesTexture('#d2ae74', '#b08d58', 64);
    g.add(frustum(4.3, 0, 2.75, '#d2ae74', -3.6, 1.375, -3.6, { map: tex2 }));
    g.add(frustum(0.7, 0, 0.45, '#f2e6cf', -3.6, 2.53, -3.6));
    g.add(frustum(2.1, 0, 1.3, '#c9a46b', -6.4, 0.65, -6.8));
    for (let i = 0; i < 3; i++) g.add(frustum(0.9, 0, 0.6, '#cfab72', 3.0, 0.3, -1.4 + i * 1.1));
    // Sphinx
    const s = new THREE.Group();
    s.add(box(1.25, 0.28, 0.36, '#c8a46a', 0, 0.14, 0));
    s.add(box(0.5, 0.08, 0.1, '#c8a46a', 0.85, 0.04, -0.11));
    s.add(box(0.5, 0.08, 0.1, '#c8a46a', 0.85, 0.04, 0.11));
    s.add(box(0.26, 0.28, 0.32, '#c8a46a', 0.55, 0.4, 0));
    s.add(frustum(0.42, 0.18, 0.2, '#b99257', 0.5, 0.55, 0));
    s.add(box(0.12, 0.16, 0.18, '#c8a46a', 0.69, 0.42, 0));
    s.position.set(2.8, 0, 2.4);
    g.add(s);
    // Causeway & palms
    g.add(box(0.25, 0.04, 4.2, '#cbb08a', 1.4, 0.02, 0.2, -0.6));
    const r = rng(7);
    for (let i = 0; i < 9; i++) g.add(palm(5 + r() * 3, 2 + r() * 6, 1.1 + r() * 0.6));
    return g;
  },
};

export const stonehenge = {
  id: 'stonehenge',
  view: { r: 3.6, cy: 0.5 },
  name: 'ストーンヘンジ',
  country: 'gb',
  year: -2500,
  sky: ['#b8d4e8', '#e8eef2'],
  desc: 'イングランド南部ソールズベリー平原にある先史時代の環状列石。外側のサーセン・サークルと、内側に馬蹄形に並ぶ5組の巨大な門のような「トリリトン」からなります。石は夏至の日の出と冬至の日没の方向に合わせて配置されています。',
  facts: [
    ['建設', '紀元前3000年〜前2000年ごろ（段階的）'],
    ['サークルの直径', '約33m'],
    ['最大の石', '高さ約7m・重さ約30トン'],
    ['ブルーストーン', '約200km以上離れたウェールズから運ばれた'],
  ],
  hotspots: [
    { p: [2.0, 1.0, 0], t: 'サーセン・サークル', d: '30本の立石の上に、横石（まぐさ石）を環状に載せていました。石どうしは木工のようなほぞ穴で組み合わされています。' },
    { p: [0, 1.5, -0.9], t: 'トリリトン', d: '2本の柱石と1本の横石からなる「三石塔」。中央に向かって高くなるよう馬蹄形に配置されています。' },
    { p: [2.9, 0.7, 2.9], t: 'ヒール・ストーン', d: 'サークルの外にある石。夏至の朝、サークルの中心から見るとこの石の近くから太陽が昇ります。' },
    { p: [0.6, 0.3, 0.6], t: 'ブルーストーン', d: '青みを帯びた小さめの石。遠くウェールズの山から運ばれたことが分かっています。' },
  ],
  build() {
    const g = new THREE.Group();
    g.add(ground(14, '#7fae5a'));
    const bank = new THREE.Mesh(new THREE.RingGeometry(4.2, 4.6, 64), mat('#6a9a4a', { flat: false, side: THREE.DoubleSide }));
    bank.rotation.x = -Math.PI / 2;
    bank.position.y = 0.01;
    g.add(bank);
    const stone = '#9b978c';
    const r = rng(42);
    const N = 30;
    const R = 2.1;
    const up = [];
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2;
      if (r() < 0.25 && i > 4) {
        if (r() < 0.5) {
          const fallen = box(0.85, 0.2, 0.28, stone, Math.cos(a) * (R + 0.5), 0.1, Math.sin(a) * (R + 0.5), -a + 0.4);
          g.add(fallen);
        }
        up.push(false);
        continue;
      }
      up.push(true);
      const s = box(0.28, 0.85 + r() * 0.06, 0.22, stone, Math.cos(a) * R, 0.43, Math.sin(a) * R, -a + Math.PI / 2);
      s.rotation.z = (r() - 0.5) * 0.05;
      g.add(s);
    }
    for (let i = 0; i < N; i++) {
      if (!up[i] || !up[(i + 1) % N] || r() < 0.35) continue;
      const a = ((i + 0.5) / N) * Math.PI * 2;
      const len = 2 * R * Math.sin(Math.PI / N) + 0.25;
      g.add(box(len, 0.13, 0.22, '#8f8b80', Math.cos(a) * R, 0.93, Math.sin(a) * R, -a + Math.PI / 2));
    }
    // Trilithons (horseshoe opening to NE = +x+z)
    const tri = [
      [-2.4, 1.1, 1.05], [-1.7, 1.25, 1.2], [-0.8, 1.15, 1.45], [0.1, 1.25, 1.2], [0.8, 1.1, 1.05],
    ];
    tri.forEach(([a0, rad, h], i) => {
      const a = a0 + Math.PI * 0.25 + Math.PI;
      const cx = Math.cos(a) * rad;
      const cz = Math.sin(a) * rad;
      const t = new THREE.Group();
      t.add(box(0.3, h, 0.24, stone, -0.2, h / 2, 0));
      t.add(box(0.3, h, 0.24, stone, 0.2, h / 2, 0));
      if (i !== 3) t.add(box(0.78, 0.16, 0.26, '#8f8b80', 0, h + 0.08, 0));
      t.position.set(cx, 0, cz);
      t.rotation.y = -a + Math.PI / 2;
      g.add(t);
    });
    // Bluestones
    for (let i = 0; i < 22; i++) {
      const a = (i / 22) * Math.PI * 2;
      if (r() < 0.3) continue;
      g.add(box(0.12, 0.35 + r() * 0.15, 0.1, '#6f7f8f', Math.cos(a) * 1.65, 0.2, Math.sin(a) * 1.65, -a));
    }
    const heel = box(0.4, 0.9, 0.35, '#a39f92', 3.2, 0.42, 3.2, 0.5);
    heel.rotation.z = 0.15;
    g.add(heel);
    // Avenue
    g.add(box(1.4, 0.01, 6, '#749f50', 4.8, 0.005, 4.8, -Math.PI / 4));
    return g;
  },
};

export const ziggurat = {
  id: 'ziggurat',
  view: { r: 4.6, cy: 1.4 },
  name: 'ウルのジッグラト',
  country: 'iq',
  year: -2100,
  sky: ['#f3d3a0', '#d98b5f'],
  desc: '古代メソポタミアの都市ウルに、月の神ナンナを祀るために建てられた聖塔。日干しレンガを芯にし、表面を焼きレンガとアスファルトで固めた階段状の建物で、頂上には神殿がありました。正面の3本の階段が頂上へと続いています。',
  facts: [
    ['建設', '紀元前2100年ごろ（ウル・ナンム王）'],
    ['基部', '約64m × 46m'],
    ['推定の高さ', '約30m（神殿を含む）'],
    ['材料', '日干しレンガ・焼きレンガ・瀝青（アスファルト）'],
  ],
  hotspots: [
    { p: [0, 3.0, 0], t: '頂上の神殿', d: '月の神ナンナを祀る神殿があったと考えられています。現在は失われています。' },
    { p: [0, 0.7, 2.6], t: '3本の階段', d: '正面の中央と左右から3本の階段が延び、第1テラスの門で合流します。' },
    { p: [2.9, 0.6, 0], t: 'バットレス（控え壁）', d: '壁に付けられた縦の凹凸は、強度を高め、見た目にも美しい陰影をつくります。' },
  ],
  build() {
    const g = new THREE.Group();
    g.add(ground(14, '#d8b98a'));
    const brick = '#b9875a';
    g.add(rectFrustum(6.2, 4.4, 5.6, 3.8, 1.3, brick, 0, 0.65, 0));
    g.add(rectFrustum(4.0, 2.8, 3.6, 2.4, 0.8, '#c39363', 0, 1.7, -0.3));
    g.add(rectFrustum(2.4, 1.7, 2.2, 1.5, 0.55, '#cc9d6b', 0, 2.37, -0.5));
    g.add(box(1.1, 0.55, 0.8, '#e0c08e', 0, 2.92, -0.5));
    g.add(frustum(1.25, 0.6, 0.2, '#3f6db3', 0, 3.3, -0.5));
    // Buttress ribs
    const ribs = [];
    for (let i = -6; i <= 6; i++) {
      ribs.push({ x: i * 0.45, y: 0.6, z: 2.12 });
      ribs.push({ x: i * 0.45, y: 0.6, z: -2.12 });
    }
    for (let i = -4; i <= 4; i++) {
      ribs.push({ x: 2.92, y: 0.6, z: i * 0.45 });
      ribs.push({ x: -2.92, y: 0.6, z: i * 0.45 });
    }
    g.add(instances(new THREE.BoxGeometry(0.12, 1.1, 0.12), mat('#a9784d'), ribs));
    // Stairs: one central, two side
    const steps = [];
    const n = 14;
    for (let i = 0; i < n; i++) {
      steps.push({ x: 0, y: (i + 0.5) * (1.3 / n), z: 2.15 + (n - i) * 0.12, sx: 1 });
    }
    g.add(instances(new THREE.BoxGeometry(0.55, 1.3 / n, 0.14), mat('#d3a676'), steps));
    for (const side of [-1, 1]) {
      const st = [];
      for (let i = 0; i < n; i++) {
        st.push({ x: side * (2.7 - i * 0.17), y: (i + 0.5) * (1.3 / n), z: 2.35, ry: 0 });
      }
      g.add(instances(new THREE.BoxGeometry(0.2, 1.3 / n, 0.45), mat('#d3a676'), st));
    }
    g.add(box(0.8, 0.5, 0.5, '#d9b07f', 0, 1.55, 1.9));
    const r = rng(3);
    for (let i = 0; i < 8; i++) g.add(palm(-6 + r() * 2.5, -3 + r() * 7, 1.2 + r() * 0.5));
    return g;
  },
};

export const persepolis = {
  id: 'persepolis',
  view: { r: 5.0, cy: 1.0 },
  name: 'ペルセポリス',
  country: 'ir',
  year: -518,
  sky: ['#f7dcb0', '#d7a77b'],
  desc: 'アケメネス朝ペルシアのダレイオス1世が建設を始めた宮殿都市。巨大な基壇の上に、高さ約20mの柱が並ぶ謁見の間（アパダーナ）などが建てられました。紀元前330年にアレクサンドロス大王によって焼き払われ、今は林立する柱と精巧なレリーフが残ります。',
  facts: [
    ['建設開始', '紀元前518年ごろ'],
    ['基壇', '約450m × 300m'],
    ['アパダーナの柱', '72本（現存は十数本）'],
    ['世界遺産', '1979年登録'],
  ],
  hotspots: [
    { p: [0.5, 2.6, -0.5], t: 'アパダーナ（謁見の間）', d: '王が各地の使節を迎えた大広間。72本の柱が杉の屋根を支えていました。' },
    { p: [-2.6, 1.3, 2.0], t: '万国の門', d: '人の頭をもつ有翼の牡牛像（ラマッス）が守る門。帝国中の民族がここを通りました。' },
    { p: [1.5, 0.45, 2.7], t: '大階段', d: '馬に乗ったまま上れるほど緩やかな階段。貢ぎ物を運ぶ諸民族のレリーフが刻まれています。' },
  ],
  build() {
    const g = new THREE.Group();
    g.add(ground(15, '#d2b48c'));
    for (let i = 0; i < 4; i++) g.add(cone(3 + i * 0.6, 4 + i, 6, '#a98e6f', -8 + i * 4.5, 2 + i * 0.5, -9));
    g.add(box(8, 0.45, 5.6, '#cdb796', 0, 0.225, 0));
    const r = rng(11);
    const colG = new THREE.CylinderGeometry(0.07, 0.085, 1, 12);
    const cols = [];
    const caps = [];
    for (let i = 0; i < 6; i++)
      for (let j = 0; j < 6; j++) {
        const x = -1.2 + i * 0.6 + 0.5;
        const z = -1.8 + j * 0.6;
        const standing = r() < 0.32;
        const h = standing ? 2.2 : 0.15 + r() * 0.5;
        cols.push({ x, y: 0.45 + h / 2, z, sy: h });
        if (standing) caps.push({ x, y: 0.45 + h + 0.08, z });
      }
    g.add(instances(colG, mat('#d9c7a8', { flat: false }), cols));
    g.add(instances(new THREE.BoxGeometry(0.42, 0.16, 0.14), mat('#cbb48d'), caps));
    // Gate of all nations
    const gate = new THREE.Group();
    gate.add(box(0.5, 1.6, 0.4, '#c7b08a', -0.5, 0.8, 0));
    gate.add(box(0.5, 1.6, 0.4, '#c7b08a', 0.5, 0.8, 0));
    gate.add(box(0.45, 0.5, 0.75, '#bfa47b', -0.5, 0.45, 0.45));
    gate.add(box(0.45, 0.5, 0.75, '#bfa47b', 0.5, 0.45, 0.45));
    gate.add(box(0.3, 0.25, 0.35, '#bfa47b', -0.5, 0.82, 0.68));
    gate.add(box(0.3, 0.25, 0.35, '#bfa47b', 0.5, 0.82, 0.68));
    gate.position.set(-2.6, 0.45, 1.6);
    g.add(gate);
    // Double staircase
    const steps = [];
    for (let i = 0; i < 9; i++) {
      steps.push({ x: 1.0, y: (i + 0.5) * 0.05, z: 3.3 - i * 0.07 });
      steps.push({ x: 2.0, y: (i + 0.5) * 0.05, z: 3.3 - i * 0.07 });
    }
    g.add(instances(new THREE.BoxGeometry(0.6, 0.05, 0.08), mat('#d9c7a8'), steps));
    g.add(box(1.8, 0.4, 0.1, '#bfa47b', 1.5, 0.2, 2.85));
    return g;
  },
};

export const parthenon = {
  id: 'parthenon',
  name: 'パルテノン神殿',
  country: 'gr',
  year: -432,
  sky: ['#9ccdf2', '#e7f3fb'],
  desc: 'アテネのアクロポリスの丘に建つ、女神アテナを祀る神殿（復元した姿）。ペリクレスの時代に建てられ、ドーリア式建築の最高傑作とされます。柱をわずかに内側へ傾け、中央を膨らませるなど、目の錯覚まで計算した精密な設計で知られます。',
  facts: [
    ['建設', '紀元前447年〜前432年'],
    ['大きさ', '約69.5m × 30.9m'],
    ['柱', 'ドーリア式46本（高さ約10.4m）'],
    ['材料', 'ペンテリコン山の大理石'],
  ],
  hotspots: [
    { p: [3.3, 0.8, 1.45], t: 'ドーリア式の柱', d: '台座のない太い柱。中央がわずかに膨らむ「エンタシス」で、まっすぐ力強く見えるよう工夫されています。' },
    { p: [3.5, 1.75, 0], t: 'ペディメント', d: '屋根の下の三角形の部分。アテナ誕生などの神話の場面を表す彫刻が飾られていました。' },
    { p: [0, 1.35, 1.6], t: 'フリーズ', d: '柱の上の帯状の部分。神殿の内側には、アテナの祭りの行列が彫られていました。' },
    { p: [0, 0.6, 0], t: 'アテナ像', d: '神殿の内部には、金と象牙で飾られた高さ約12mのアテナ像が安置されていました。' },
  ],
  build() {
    const g = new THREE.Group();
    g.add(ground(14, '#b9a98a'));
    const marble = '#eee6d6';
    for (let i = 0; i < 3; i++) g.add(box(7.4 - i * 0.2, 0.12, 3.5 - i * 0.2, i % 2 ? '#e6dccb' : marble, 0, 0.06 + i * 0.12, 0));
    const base = 0.36;
    const H = 1.04;
    const colG = new THREE.CylinderGeometry(0.078, 0.098, H, 16);
    const cols = [];
    const nx = 17;
    const nz = 8;
    const X = 3.2;
    const Z = 1.38;
    for (let i = 0; i < nx; i++) {
      const x = -X + (i * 2 * X) / (nx - 1);
      cols.push({ x, y: base + H / 2, z: Z });
      cols.push({ x, y: base + H / 2, z: -Z });
    }
    for (let j = 1; j < nz - 1; j++) {
      const z = -Z + (j * 2 * Z) / (nz - 1);
      cols.push({ x: X, y: base + H / 2, z });
      cols.push({ x: -X, y: base + H / 2, z });
    }
    g.add(instances(colG, mat(marble), cols));
    g.add(instances(new THREE.BoxGeometry(0.24, 0.05, 0.24), mat('#e8decd'), cols.map((c) => ({ ...c, y: base + H + 0.025 }))));
    const top = base + H + 0.05;
    g.add(box(6.75, 0.13, 3.0, marble, 0, top + 0.065, 0));
    g.add(box(6.75, 0.13, 3.0, '#e3d8c4', 0, top + 0.195, 0));
    // triglyphs
    const tri = [];
    for (let i = 0; i < 34; i++) {
      const x = -3.3 + i * 0.2;
      tri.push({ x, y: top + 0.195, z: 1.51 });
      tri.push({ x, y: top + 0.195, z: -1.51 });
    }
    g.add(instances(new THREE.BoxGeometry(0.07, 0.12, 0.02), mat('#3f5a8a'), tri));
    g.add(box(6.95, 0.05, 3.2, marble, 0, top + 0.285, 0));
    // pediments + roof
    const rh = 0.42;
    for (const s of [-1, 1]) {
      const p = extrude([[-1.6, 0], [1.6, 0], [0, rh]], 0.08, '#e9dfcd');
      p.rotation.y = Math.PI / 2;
      p.position.set(s * 3.42, top + 0.31, 0);
      g.add(p);
      const tp = extrude([[-1.35, 0.03], [1.35, 0.03], [0, rh - 0.06]], 0.02, '#c25b4a');
      tp.rotation.y = Math.PI / 2;
      tp.position.set(s * 3.47, top + 0.31, 0);
      g.add(tp);
    }
    const roofLen = 6.95;
    const slope = Math.atan2(rh, 1.6);
    const half = Math.hypot(1.6, rh);
    for (const s of [-1, 1]) {
      const rf = box(roofLen, 0.04, half, '#c9775b', 0, top + 0.31 + rh / 2, (s * 1.6) / 2);
      rf.rotation.x = s * slope;
      g.add(rf);
    }
    // cella + Athena
    g.add(box(5.0, 1.0, 1.9, '#e2d7c3', 0, base + 0.5, 0));
    g.add(cyl(0.12, 0.2, 0.7, 10, '#d4af37', 0, base + 0.95, 0, { metalness: 0.6, roughness: 0.4 }));
    return g;
  },
};

export const greatwall = {
  id: 'greatwall',
  view: { r: 8.0, cy: 1.6 },
  name: '万里の長城',
  country: 'cn',
  year: -221,
  sky: ['#a8cbe6', '#f0e5d2'],
  desc: '北方の遊牧民の侵入を防ぐため、中国の歴代王朝が築いた長大な城壁。秦の始皇帝が戦国時代の長城をつなぎ合わせ、現在見られるレンガ造りの姿の多くは明の時代に整えられました。山の尾根に沿って延々と続き、一定の間隔で見張りの塔が置かれています。',
  facts: [
    ['始まり', '紀元前7世紀ごろ（戦国時代の諸国）'],
    ['秦の修築', '紀元前221年以降'],
    ['総延長', '約2万km（2012年の中国政府の調査）'],
    ['現在の姿', '主に明の時代（14〜17世紀）'],
  ],
  hotspots: [
    { p: [0, 2.6, 0], t: '城壁', d: '上は兵士や馬が移動できる通路になっていました。外側には矢を射るための凹凸（女牆）があります。' },
    { p: [4.5, 3.2, 0], t: '敵台（見張り塔）', d: '敵を見つけると、のろし（煙や火）を上げて次の塔へと知らせました。' },
    { p: [-6, 1.5, 3], t: '山の尾根', d: '長城は、敵が越えにくい険しい山の尾根に沿って築かれました。' },
  ],
  build() {
    const g = new THREE.Group();
    const pathZ = (x) => 1.6 * Math.sin(x * 0.38 + 0.4);
    const ridgeH = (x) => 1.3 + 0.8 * Math.sin(x * 0.45 + 1.2) + 0.35 * Math.sin(x * 1.1);
    const height = (x, z) => {
      const d = z - pathZ(x);
      const ridge = ridgeH(x) * Math.exp(-(d * d) / 7);
      const hills = 0.5 * Math.sin(x * 0.7 + z * 0.4) * Math.cos(z * 0.5) + 0.3;
      return Math.max(ridge, ridge * 0.4 + hills * (1 - Math.exp(-(d * d) / 20)));
    };
    const terrain = new THREE.PlaneGeometry(22, 22, 90, 90);
    terrain.rotateX(-Math.PI / 2);
    const pos = terrain.attributes.position;
    const colors = [];
    const cLow = new THREE.Color('#6f9b4f');
    const cHigh = new THREE.Color('#8f8a5a');
    const tmp = new THREE.Color();
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const h = height(x, z);
      pos.setY(i, h);
      tmp.copy(cLow).lerp(cHigh, Math.min(1, h / 2.4));
      colors.push(tmp.r, tmp.g, tmp.b);
    }
    terrain.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    terrain.computeVertexNormals();
    const tm = new THREE.Mesh(terrain, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, flatShading: true }));
    tm.receiveShadow = true;
    g.add(tm);
    const segs = [];
    const crens = [];
    const towers = [];
    const step = 0.22;
    let k = 0;
    for (let x = -10; x < 10; x += step, k++) {
      const x2 = x + step;
      const z1 = pathZ(x);
      const z2 = pathZ(x2);
      const y1 = height(x, z1);
      const y2 = height(x2, z2);
      const dx = x2 - x;
      const dz = z2 - z1;
      const dy = y2 - y1;
      const hl = Math.hypot(dx, dz);
      const len = Math.hypot(hl, dy);
      const yaw = Math.atan2(dz, dx);
      const pitch = Math.atan2(dy, hl);
      const cx = (x + x2) / 2;
      const cz = (z1 + z2) / 2;
      const cy = (y1 + y2) / 2;
      segs.push({ x: cx, y: cy + 0.1, z: cz, sx: len + 0.02, ry: -yaw, rz: pitch });
      const nx = -Math.sin(yaw);
      const nz = Math.cos(yaw);
      for (const s of [-1, 1]) crens.push({ x: cx + nx * 0.14 * s, y: cy + 0.32, z: cz + nz * 0.14 * s, ry: -yaw, rz: pitch });
      if (k % 12 === 6) towers.push({ x: cx, y: cy, z: cz, ry: -yaw });
    }
    g.add(instances(new THREE.BoxGeometry(1, 0.42, 0.32), mat('#a99f8c'), segs));
    g.add(instances(new THREE.BoxGeometry(0.1, 0.1, 0.04), mat('#9b917e'), crens));
    for (const t of towers) {
      const tw = new THREE.Group();
      tw.add(box(0.6, 0.75, 0.6, '#b1a690', 0, 0.38, 0));
      tw.add(box(0.66, 0.06, 0.66, '#9b917e', 0, 0.78, 0));
      tw.add(frustum(0.62, 0.1, 0.25, '#6d5f52', 0, 0.94, 0));
      tw.position.set(t.x, t.y, t.z);
      tw.rotation.y = t.ry;
      g.add(tw);
    }
    const r = rng(5);
    const trees = [];
    for (let i = 0; i < 70; i++) {
      const x = -10 + r() * 20;
      const z = -10 + r() * 20;
      if (Math.abs(z - pathZ(x)) < 1.0) continue;
      trees.push({ x, y: height(x, z) + 0.2, z, s: 0.5 + r() * 0.5 });
    }
    g.add(instances(new THREE.ConeGeometry(0.25, 0.6, 6), mat('#3d6e3a'), trees));
    return g;
  },
};

export const colosseum = {
  id: 'colosseum',
  view: { r: 5.0, cy: 1.0 },
  name: 'コロッセオ',
  country: 'it',
  year: 80,
  sky: ['#a7d0f0', '#f5e9d6'],
  desc: '古代ローマの円形闘技場。正式名称はフラウィウス円形闘技場で、約5万人を収容できました。剣闘士の戦いや猛獣狩りの見世物が行われ、床下の地下構造（ヒポゲウム）からは、エレベーターで猛獣が登場しました。中世の地震や石材の持ち去りで、南側の外壁は失われています。',
  facts: [
    ['完成', '80年（ティトゥス帝）'],
    ['大きさ', '長径約188m・短径約156m'],
    ['高さ', '約48m（4層）'],
    ['収容人数', '約5万人'],
  ],
  hotspots: [
    { p: [0, 2.7, -3.0], t: '4層の外壁', d: '1層目はドーリア式、2層目はイオニア式、3層目はコリント式の柱で飾られ、4層目には日よけ布を張る柱の受け口がありました。' },
    { p: [0, 0.4, 0], t: 'ヒポゲウム（地下構造）', d: '闘技場の床下には通路と小部屋があり、剣闘士や猛獣が出番を待っていました。' },
    { p: [2.4, 1.3, 1.1], t: '観客席', d: '身分によって座る場所が決められていました。最前列は元老院議員の席です。' },
    { p: [0, 1.2, 3.1], t: '崩れた南側', d: '1349年の地震などで外壁が崩れ、その石材はほかの建物に再利用されました。' },
  ],
  build() {
    const g = new THREE.Group();
    g.add(ground(15, '#c9b99a'));
    const A = 3.7;
    const B = 3.05;
    const stone = '#d6c4a0';
    const N = 56;
    const stories = [0.66, 0.62, 0.62, 0.55];
    const piers = [];
    const bands = [];
    const ruinFrom = Math.PI * 0.18;
    const ruinTo = Math.PI * 0.82;
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2;
      const ruined = a > ruinFrom && a < ruinTo;
      const x = Math.cos(a) * A;
      const z = Math.sin(a) * B;
      const ry = -Math.atan2(Math.sin(a) * A, Math.cos(a) * B) + Math.PI / 2;
      let y = 0;
      const nStories = ruined ? 1 : 4;
      for (let s = 0; s < nStories; s++) {
        const h = stories[s];
        if (s < 3) piers.push({ x, y: y + h / 2, z, ry, sy: h });
        const a2 = ((i + 0.5) / N) * Math.PI * 2;
        const bx = Math.cos(a2) * A;
        const bz = Math.sin(a2) * B;
        const bry = -Math.atan2(Math.sin(a2) * A, Math.cos(a2) * B) + Math.PI / 2;
        const segLen = (2 * Math.PI * Math.sqrt((A * A + B * B) / 2)) / N + 0.03;
        if (s < 3) bands.push({ x: bx, y: y + h - 0.09, z: bz, ry: bry, sx: segLen, sy: 1 });
        else bands.push({ x: bx, y: y + h / 2, z: bz, ry: bry, sx: segLen, sy: h / 0.18 });
        y += h;
      }
    }
    g.add(instances(new THREE.BoxGeometry(0.15, 1, 0.34), mat(stone), piers));
    g.add(instances(new THREE.BoxGeometry(1, 0.18, 0.34), mat('#cdb994'), bands));
    // inner ring wall
    const inner = [];
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2;
      inner.push({ x: Math.cos(a) * A * 0.86, y: 0.9, z: Math.sin(a) * B * 0.86, ry: -a + Math.PI / 2 });
    }
    g.add(instances(new THREE.BoxGeometry(0.4, 1.8, 0.2), mat('#c7b38e'), inner));
    // seating bowl
    const bowlG = new THREE.CylinderGeometry(A * 0.86, A * 0.52, 1.55, 64, 1, true);
    bowlG.scale(1, 1, B / A);
    const bowl = new THREE.Mesh(bowlG, mat('#bfa983', { side: THREE.DoubleSide }));
    bowl.position.y = 1.0;
    bowl.receiveShadow = true;
    g.add(bowl);
    // arena + hypogeum
    const floorG = new THREE.CircleGeometry(A * 0.52, 48);
    floorG.rotateX(-Math.PI / 2);
    floorG.scale(1, 1, B / A);
    const floor = new THREE.Mesh(floorG, mat('#9a8466', { flat: false }));
    floor.position.y = 0.06;
    g.add(floor);
    const walls = [];
    for (let i = -6; i <= 6; i++) walls.push({ x: i * 0.26, y: 0.2, z: 0, sz: 2.4 });
    for (let j = -3; j <= 3; j++) walls.push({ x: 0, y: 0.2, z: j * 0.3, sx: 3.2, sz: 0.05 });
    g.add(instances(new THREE.BoxGeometry(0.05, 0.28, 1), mat('#b39f80'), walls));
    const deck = box(1.8, 0.05, 1.6, '#8d6e4f', -0.9, 0.36, 0);
    g.add(deck);
    return g;
  },
};

export const kofun = {
  id: 'kofun',
  view: { r: 5.6, cy: 0.6 },
  name: '前方後円墳（大仙陵古墳）',
  country: 'jp',
  year: 450,
  sky: ['#bfe1f7', '#f2f6e9'],
  desc: '円形の後円部と方形の前方部をつなげた、鍵穴のような形の古墳。3世紀後半から近畿地方を中心に全国につくられ、ヤマト政権の勢力の広がりを示します。大阪府堺市の大仙陵古墳（仁徳天皇陵とされる）は全長約486mで、三重の濠に囲まれています。斜面は葺石で覆われ、埴輪が並べられていました。',
  facts: [
    ['築造', '5世紀中ごろ（大仙陵古墳）'],
    ['全長', '約486m（墳丘）'],
    ['高さ', '約35m（後円部）'],
    ['世界遺産', '2019年「百舌鳥・古市古墳群」'],
  ],
  hotspots: [
    { p: [1.6, 1.2, 0], t: '後円部', d: '円形の部分。頂上付近の地下に、遺体を納めた石室や棺がありました。' },
    { p: [-2.2, 0.9, 0], t: '前方部', d: '方形の部分。祭りや儀式を行う場だったと考えられています。' },
    { p: [0.2, 0.4, 2.3], t: '濠（ほり）', d: '古墳のまわりは水をたたえた濠で囲まれています。大仙陵古墳は三重の濠をもちます。' },
    { p: [2.9, 0.65, 0.9], t: '埴輪', d: '古墳の上や周りに並べられた素焼きの焼き物。円筒形のほか、人・家・馬などの形のものもあります。' },
  ],
  build() {
    const g = new THREE.Group();
    g.add(ground(15, '#7fa860'));
    const w = water(1, '#3b7fae', 0.02);
    w.scale.set(5.8, 1, 3.4);
    g.add(w);
    const bank = new THREE.Mesh(new THREE.RingGeometry(0.995, 1.12, 64), mat('#78a55a', { flat: false, side: THREE.DoubleSide }));
    bank.rotation.x = -Math.PI / 2;
    bank.scale.set(5.8, 3.4, 1);
    bank.position.y = 0.04;
    g.add(bank);
    const green = ['#4f7f3a', '#5a8c42', '#66994b'];
    const tiers = [
      [2.3, 2.0, 0.45],
      [1.9, 1.55, 0.42],
      [1.45, 1.05, 0.42],
    ];
    let y = 0.03;
    tiers.forEach(([rb, rt, h], i) => {
      g.add(cyl(rt, rb, h, 40, green[i], 1.6, y + h / 2, 0, { flat: false }));
      const fw = 2.4 + (2 - i) * 0.35;
      g.add(rectFrustum(4.2 - i * 0.55, fw + 0.4, 4.0 - i * 0.55, fw, h * 0.85, green[i], -1.2 - i * 0.15, y + (h * 0.85) / 2, 0));
      y += h * (i === 2 ? 1 : 0.92);
    });
    const r = rng(9);
    const trees = [];
    for (let i = 0; i < 160; i++) {
      const round = r() < 0.55;
      let x;
      let z;
      if (round) {
        const a = r() * Math.PI * 2;
        const rr = Math.sqrt(r()) * 1.9;
        x = 1.6 + Math.cos(a) * rr;
        z = Math.sin(a) * rr;
      } else {
        x = -3.2 + r() * 3.6;
        z = (r() - 0.5) * (2.2 + (-x) * 0.25);
      }
      const d = round ? Math.hypot(x - 1.6, z) : 0;
      const hh = round ? (d < 1.05 ? 1.3 : d < 1.55 ? 0.85 : 0.45) : 0.75;
      trees.push({ x, y: hh + 0.12, z, s: 0.5 + r() * 0.5 });
    }
    g.add(instances(new THREE.SphereGeometry(0.2, 7, 5), mat('#2f5f2a'), trees));
    const haniwa = [];
    for (let i = 0; i < 40; i++) {
      const a = (i / 40) * Math.PI * 2;
      if (Math.cos(a) < -0.4) continue;
      haniwa.push({ x: 1.6 + Math.cos(a) * 2.32, y: 0.12, z: Math.sin(a) * 2.32 });
    }
    g.add(instances(new THREE.CylinderGeometry(0.04, 0.045, 0.18, 8), mat('#c46b3c'), haniwa));
    return g;
  },
};
