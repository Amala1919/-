import * as THREE from 'three';
import {
  box, cyl, cone, sphere, frustum, rectFrustum, gable, extrude, instances, ground, water, rng, mat,
  canvasTexture, tree, lathe, onionPoints, domePoints, person,
} from '../kit.js';

export const hagiasophia = {
  id: 'hagiasophia',
  view: { r: 4.6, cy: 1.6 },
  name: 'アヤソフィア',
  country: 'tr',
  year: 537,
  sky: ['#9fc7ea', '#f3e2cf'],
  desc: 'ビザンツ帝国のユスティニアヌス帝が再建した大聖堂。直径約31mの巨大なドームが、窓の並ぶ基部の上に浮かぶように載っています。1453年のオスマン帝国による征服後はモスクとなり、4本の尖塔（ミナレット）が加えられました。',
  facts: [
    ['完成', '537年'],
    ['ドーム', '直径約31m・床からの高さ約55m'],
    ['役割の変化', '聖堂 → モスク（1453） → 博物館（1934） → モスク（2020）'],
    ['世界遺産', '「イスタンブル歴史地域」'],
  ],
  hotspots: [
    { p: [0, 3.2, 0], t: '大ドーム', d: 'ドームの付け根に40の窓が並び、光の輪の上にドームが浮かんでいるように見えます。' },
    { p: [0, 2.2, 2.0], t: '半ドーム', d: '大ドームの東西に半ドームを置き、ドームの重さを分散させて支えています。' },
    { p: [2.9, 2.8, 2.9], t: 'ミナレット', d: 'モスクになってから加えられた尖塔。礼拝の時間を知らせる呼びかけ（アザーン）を行う場所です。' },
  ],
  build() {
    const g = new THREE.Group();
    g.add(ground(14, '#c9c2b0'));
    const wall = '#d9a98a';
    g.add(box(4.2, 1.5, 4.2, wall, 0, 0.75, 0));
    g.add(box(4.8, 0.9, 5.4, '#d19f80', 0, 0.45, 0));
    for (const [x, z] of [[-1.7, -1.7], [1.7, -1.7], [-1.7, 1.7], [1.7, 1.7]]) g.add(box(0.7, 1.9, 0.7, '#cf9d7d', x, 0.95, z));
    g.add(cyl(1.55, 1.6, 0.35, 40, '#e0b394', 0, 1.68, 0));
    const wins = [];
    for (let i = 0; i < 40; i++) {
      const a = (i / 40) * Math.PI * 2;
      wins.push({ x: Math.cos(a) * 1.58, y: 1.7, z: Math.sin(a) * 1.58, ry: -a });
    }
    g.add(instances(new THREE.BoxGeometry(0.03, 0.18, 0.08), mat('#3c3226'), wins));
    g.add(lathe(domePoints(1.55, 1.0), '#8a9aa6', 40, 0, 1.85, 0, { roughness: 0.5, metalness: 0.3 }));
    g.add(cyl(0.02, 0.02, 0.35, 6, '#d4af37', 0, 3.0, 0));
    for (const s of [-1, 1]) {
      const sd = lathe(domePoints(1.2, 0.8), '#8a9aa6', 32, 0, 1.5, s * 1.6, { roughness: 0.5, metalness: 0.3 });
      sd.scale.set(1, 1, 0.75);
      g.add(sd);
    }
    for (const [x, z] of [[-2.9, -2.9], [2.9, -2.9], [-2.9, 2.9], [2.9, 2.9]]) {
      g.add(cyl(0.1, 0.13, 3.2, 12, '#e5d6c2', x, 1.6, z));
      g.add(cyl(0.16, 0.16, 0.08, 12, '#d8c6ae', x, 2.5, z));
      g.add(cone(0.12, 0.6, 12, '#7f8c97', x, 3.5, z));
    }
    const r = rng(2);
    for (let i = 0; i < 10; i++) g.add(tree(-6 + r() * 12, 5 + r() * 2, 0.9 + r() * 0.4, '#4f8a4f'));
    return g;
  },
};

export const pagoda = {
  id: 'pagoda',
  view: { r: 3.6, cy: 2.3 },
  name: '法隆寺 五重塔',
  country: 'jp',
  year: 607,
  sky: ['#c7e3f5', '#fbe9ef'],
  desc: '奈良県斑鳩町の法隆寺にある五重塔。現存する世界最古級の木造建築群の一つで、7世紀後半から8世紀初めごろの再建とされます。中心を貫く「心柱」が揺れを吸収する構造により、多くの地震に耐えてきました。上の層ほど小さくなる、安定感のある美しい姿が特徴です。',
  facts: [
    ['創建', '607年（法隆寺）。塔は7世紀後半〜8世紀初頭の再建とされる'],
    ['高さ', '約32.5m（相輪を含む）'],
    ['構造', '心柱を中心とした木造'],
    ['世界遺産', '1993年、日本で最初に登録'],
  ],
  hotspots: [
    { p: [0, 4.6, 0], t: '相輪', d: '塔のてっぺんの金属製の飾り。9つの輪（九輪）や水煙が付いています。' },
    { p: [0, 2.0, 0], t: '心柱', d: '塔の中心を貫く太い柱。各層とは固定されておらず、地震のときにやじろべえのように揺れを抑えると考えられています。' },
    { p: [1.4, 0.7, 1.4], t: '深い軒', d: '雨から木の柱や壁を守るため、屋根が大きく張り出しています。雲形の組物がこれを支えています。' },
  ],
  build() {
    const g = new THREE.Group();
    g.add(ground(14, '#d9cdb6'));
    g.add(box(2.6, 0.25, 2.6, '#b8b2a6', 0, 0.125, 0));
    const red = '#b8452f';
    const wallC = '#f3eee1';
    const roofC = '#4a4f55';
    let y = 0.25;
    const levels = 5;
    for (let i = 0; i < levels; i++) {
      const s = 1.55 - i * 0.18;
      const h = i === 0 ? 0.62 : 0.42;
      g.add(box(s, h, s, wallC, 0, y + h / 2, 0));
      const posts = [];
      for (const px of [-1, 0, 1]) for (const pz of [-1, 1]) {
        posts.push({ x: (px * s) / 2.05, y: y + h / 2, z: (pz * s) / 2 });
        posts.push({ x: (pz * s) / 2, y: y + h / 2, z: (px * s) / 2.05 });
      }
      g.add(instances(new THREE.BoxGeometry(0.06, h, 0.06), mat(red), posts));
      y += h;
      const rw = s + 1.05 - i * 0.05;
      g.add(box(s + 0.25, 0.12, s + 0.25, red, 0, y + 0.06, 0));
      const roof = frustum(rw, s * 0.55, 0.32, roofC, 0, y + 0.28, 0);
      g.add(roof);
      // upturned corner tips
      const tips = [];
      for (const cx of [-1, 1]) for (const cz of [-1, 1]) tips.push({ x: (cx * rw) / 2, y: y + 0.15, z: (cz * rw) / 2, ry: Math.atan2(cx, cz), rx: -0.4 });
      g.add(instances(new THREE.BoxGeometry(0.06, 0.04, 0.25), mat(roofC), tips));
      y += 0.44;
    }
    // sorin
    g.add(box(0.25, 0.1, 0.25, '#3d4147', 0, y + 0.05, 0));
    g.add(cyl(0.035, 0.035, 1.5, 8, '#6b5b3e', 0, y + 0.8, 0, { metalness: 0.5, roughness: 0.4 }));
    for (let i = 0; i < 9; i++) g.add(cyl(0.11, 0.11, 0.03, 16, '#7a6a48', 0, y + 0.35 + i * 0.1, 0, { metalness: 0.6, roughness: 0.4 }));
    g.add(sphere(0.07, '#7a6a48', 0, y + 1.58, 0, { metalness: 0.6, roughness: 0.4 }));
    const r = rng(4);
    for (let i = 0; i < 12; i++) {
      const a = r() * Math.PI * 2;
      const d = 4 + r() * 3;
      g.add(tree(Math.cos(a) * d, Math.sin(a) * d, 1 + r() * 0.8, i % 3 ? '#4f8a4f' : '#e7a6b8'));
    }
    return g;
  },
};

export const mayapyramid = {
  id: 'mayapyramid',
  view: { r: 4.6, cy: 1.2 },
  name: 'ククルカンのピラミッド',
  country: 'mx',
  year: 1000,
  sky: ['#9fd3f0', '#eaf6e7'],
  desc: 'メキシコ・ユカタン半島のチチェン・イッツァにある「エル・カスティーヨ」。9段の基壇の四面に91段ずつの階段があり、頂上の神殿の1段を加えると合計365段で、1年の日数を表すといわれます。春分と秋分の日には、北側の階段に羽毛のある蛇（ククルカン）が降りてくるような影が現れます。',
  facts: [
    ['建設', '9〜12世紀ごろ'],
    ['高さ', '約30m（神殿を含む）'],
    ['階段', '各面91段 × 4 ＋ 1 ＝ 365段'],
    ['世界遺産', '1988年「古代都市チチェン・イッツァ」'],
  ],
  hotspots: [
    { p: [0, 2.9, 0], t: '頂上の神殿', d: '羽毛のある蛇の神ククルカンを祀る神殿。' },
    { p: [0, 0.25, 2.9], t: '蛇の頭の彫刻', d: '北側の階段の下には蛇の頭の彫刻があり、春分・秋分には段の影とつながって、大蛇が姿を現します。' },
    { p: [1.9, 1.3, 1.9], t: '9段の基壇', d: '9段の基壇は、マヤの神話で死者の世界の9つの層を表すともいわれます。' },
  ],
  build() {
    const g = new THREE.Group();
    g.add(ground(14, '#9cbf7a'));
    const stone = '#cfc3a3';
    let y = 0;
    const n = 9;
    for (let i = 0; i < n; i++) {
      const w = 5.0 - i * 0.42;
      const h = 0.26;
      g.add(rectFrustum(w, w, w - 0.1, w - 0.1, h, i % 2 ? '#c7bb99' : stone, 0, y + h / 2, 0));
      y += h;
    }
    const topW = 5.0 - (n - 1) * 0.42;
    g.add(box(1.4, 0.55, 1.4, '#d8ccaa', 0, y + 0.275, 0));
    g.add(box(1.5, 0.08, 1.5, '#b9ad8c', 0, y + 0.59, 0));
    g.add(box(0.45, 0.35, 0.05, '#4d4537', 0, y + 0.2, 0.71));
    // four staircases
    const H = y;
    const run = (5.0 - topW) / 2;
    const steps = 22;
    const tf = [];
    for (let side = 0; side < 4; side++) {
      const ry = (side * Math.PI) / 2;
      for (let i = 0; i < steps; i++) {
        const t = (i + 0.5) / steps;
        const d = 2.5 - t * run + 0.12;
        tf.push({ x: Math.sin(ry) * d, y: t * H, z: Math.cos(ry) * d, ry });
      }
    }
    g.add(instances(new THREE.BoxGeometry(0.9, H / steps, 0.12), mat('#e1d7b9'), tf));
    // balustrades on north stairs + serpent heads
    for (const s of [-1, 1]) {
      const bal = box(0.12, 0.12, Math.hypot(run, H) + 0.1, '#bdb090', s * 0.5, H / 2, 2.5 - run / 2 + 0.1);
      bal.rotation.x = Math.atan2(H, run);
      g.add(bal);
      g.add(box(0.26, 0.24, 0.36, '#8c9a6a', s * 0.5, 0.12, 2.85));
      g.add(box(0.2, 0.06, 0.12, '#c94a3a', s * 0.5, 0.06, 3.07));
    }
    const r = rng(12);
    for (let i = 0; i < 18; i++) {
      const a = r() * Math.PI * 2;
      const d = 5.2 + r() * 2.5;
      g.add(tree(Math.cos(a) * d, Math.sin(a) * d, 1.1 + r() * 0.8, '#3e7f42'));
    }
    return g;
  },
};

export const ger = {
  id: 'ger',
  view: { r: 3.4, cy: 0.9 },
  name: 'モンゴルのゲル',
  country: 'mn',
  year: 1206,
  sky: ['#8fc4ef', '#e9f3d9'],
  desc: 'モンゴルの遊牧民が暮らす移動式の住居。木の格子の壁と放射状の垂木に、羊毛のフェルトをかぶせてつくります。1〜2時間ほどで組み立て・解体ができ、家畜とともに季節ごとに移動する暮らしを支えてきました。チンギス・ハンの時代には、車に載せたままの巨大なゲルもあったと記録されています。',
  facts: [
    ['構造', '格子壁（ハナ）・垂木（オニ）・天窓（トーノ）'],
    ['材料', '木材・羊毛のフェルト・馬の毛のロープ'],
    ['組み立て', '1〜2時間ほど'],
    ['扉の向き', '伝統的に南向き'],
  ],
  hotspots: [
    { p: [0, 1.75, 0], t: '天窓（トーノ）', d: '屋根の中心の輪。煙突を通し、明かり取りにもなります。日の差し込む位置で時刻もわかりました。' },
    { p: [0, 0.5, 1.55], t: '扉', d: '色鮮やかに装飾された木の扉。伝統的に南向きにつくられます。' },
    { p: [1.6, 0.6, 0], t: 'フェルトの壁', d: '羊毛を圧縮したフェルトは保温性が高く、マイナス30度の冬にも耐えます。' },
  ],
  build() {
    const g = new THREE.Group();
    g.add(ground(16, '#9fc06e'));
    const mk = (s, x, z, ry) => {
      const t = new THREE.Group();
      t.add(cyl(1.5, 1.5, 1.0, 32, '#f4f1ea', 0, 0.5, 0, { flat: false }));
      t.add(cone(1.62, 0.75, 32, '#efe9dc', 0, 1.37, 0, { flat: false }));
      for (const yy of [0.25, 0.75]) t.add(cyl(1.515, 1.515, 0.04, 32, '#5d4037', 0, yy, 0, { flat: false }));
      t.add(cyl(0.3, 0.3, 0.08, 16, '#d84315', 0, 1.74, 0));
      t.add(box(0.5, 0.75, 0.06, '#e65100', 0, 0.38, 1.5));
      t.add(box(0.38, 0.6, 0.07, '#ffb300', 0, 0.37, 1.51));
      t.add(cyl(0.05, 0.05, 0.5, 8, '#78909c', 0.3, 1.9, 0));
      t.scale.setScalar(s);
      t.position.set(x, 0, z);
      t.rotation.y = ry;
      return t;
    };
    g.add(mk(1, 0, 0, 0));
    g.add(mk(0.75, -3.4, -1.2, 0.3));
    // sheep
    const r = rng(8);
    const sheep = [];
    for (let i = 0; i < 26; i++) sheep.push({ x: 2.5 + r() * 4, y: 0.16, z: -2 + r() * 5, s: 0.8 + r() * 0.3 });
    g.add(instances(new THREE.SphereGeometry(0.2, 8, 6), mat('#f5f5f0'), sheep));
    g.add(instances(new THREE.SphereGeometry(0.08, 6, 5), mat('#333'), sheep.map((p) => ({ ...p, x: p.x + 0.2, y: 0.2 }))));
    // horses (simplified)
    for (let i = 0; i < 3; i++) {
      const h = new THREE.Group();
      h.add(box(0.6, 0.25, 0.2, '#6d4c41', 0, 0.5, 0));
      h.add(box(0.15, 0.32, 0.12, '#6d4c41', 0.32, 0.68, 0));
      h.add(box(0.22, 0.12, 0.11, '#5d4037', 0.42, 0.82, 0));
      for (const [lx, lz] of [[-0.22, -0.07], [-0.22, 0.07], [0.22, -0.07], [0.22, 0.07]]) h.add(box(0.06, 0.4, 0.06, '#4e342e', lx, 0.2, lz));
      h.position.set(-2 + i * 0.9, 0, 3 + i * 0.4);
      h.rotation.y = i * 0.7;
      g.add(h);
    }
    for (let i = 0; i < 5; i++) g.add(cone(4 + i, 2.5 + i * 0.4, 5, '#7c8f6a', -12 + i * 6, 1.2, -12));
    return g;
  },
};

export const djenne = {
  id: 'djenne',
  view: { r: 4.4, cy: 1.2 },
  name: 'ジェンネの泥のモスク',
  country: 'ml',
  year: 1330,
  sky: ['#f4cf8d', '#e9a45f'],
  desc: 'マリのジェンネにある大モスクは、世界最大の泥（日干しレンガ）の建築です。壁から突き出た木の棒（トロン）は、毎年の泥の塗り直しの足場になります。13世紀に最初のモスクが建てられ、現在の建物は1907年に再建されたものです。トンブクトゥのジンガリベリ・モスクも同じ様式で、マンサ・ムーサの時代に建てられました。',
  facts: [
    ['現在の建物', '1907年再建（最初は13世紀）'],
    ['大きさ', '約75m × 75m の基壇'],
    ['材料', '日干しレンガ・泥・ヤシの木'],
    ['世界遺産', '1988年「ジェンネ旧市街」'],
  ],
  hotspots: [
    { p: [0, 3.0, 1.7], t: '3つの塔', d: '正面の塔の頂上には、豊かさを象徴するダチョウの卵が飾られています。' },
    { p: [1.6, 1.2, 1.8], t: 'トロン（木の棒）', d: '壁から突き出たヤシの木の棒は、泥を塗り直すときの足場として使われます。' },
    { p: [-2.6, 0.5, 2.6], t: '泥の祭り', d: '毎年、雨季の前に町じゅうの人が集まり、新しい泥を壁に塗り直す祭りが開かれます。' },
  ],
  build() {
    const g = new THREE.Group();
    g.add(ground(15, '#c99a62'));
    const mud = '#b07a45';
    g.add(box(6.2, 0.4, 5.6, '#a8733f', 0, 0.2, 0));
    g.add(box(5.4, 1.5, 3.6, mud, 0, 1.15, 0));
    // facade towers (front = +z)
    const towerXs = [-1.6, 0, 1.6];
    for (const x of towerXs) {
      const h = x === 0 ? 2.8 : 2.4;
      g.add(rectFrustum(0.9, 0.7, 0.6, 0.5, h, '#b8824b', x, 0.4 + h / 2, 1.85));
      g.add(cone(0.2, 0.35, 8, '#c08a52', x, 0.4 + h + 0.15, 1.85));
      g.add(sphere(0.07, '#f5f0e6', x, 0.4 + h + 0.38, 1.85));
    }
    // buttress pillars along walls
    const pil = [];
    for (let i = -6; i <= 6; i++) {
      pil.push({ x: i * 0.42, y: 1.25, z: 1.8, sy: 1 });
      pil.push({ x: i * 0.42, y: 1.25, z: -1.8, sy: 1 });
    }
    for (let i = -3; i <= 3; i++) {
      pil.push({ x: 2.7, y: 1.25, z: i * 0.5, sy: 1 });
      pil.push({ x: -2.7, y: 1.25, z: i * 0.5, sy: 1 });
    }
    g.add(instances(new THREE.BoxGeometry(0.2, 1.9, 0.2), mat('#b8824b'), pil));
    g.add(instances(new THREE.ConeGeometry(0.1, 0.25, 6), mat('#b8824b'), pil.map((p) => ({ ...p, y: 2.3 }))));
    // torons
    const r = rng(21);
    const tor = [];
    for (let i = 0; i < 160; i++) {
      const side = Math.floor(r() * 4);
      const y = 0.6 + r() * 1.9;
      const u = (r() - 0.5);
      if (side === 0) tor.push({ x: u * 5.2, y, z: 1.95, rx: Math.PI / 2 });
      if (side === 1) tor.push({ x: u * 5.2, y, z: -1.95, rx: Math.PI / 2 });
      if (side === 2) tor.push({ x: 2.85, y, z: u * 3.4, rz: Math.PI / 2 });
      if (side === 3) tor.push({ x: -2.85, y, z: u * 3.4, rz: Math.PI / 2 });
    }
    g.add(instances(new THREE.CylinderGeometry(0.025, 0.025, 0.4, 5), mat('#6d4c2f'), tor));
    for (let i = 0; i < 6; i++) g.add(person(-3 + i * 0.6 + r(), 3 + r(), ['#1e88e5', '#e53935', '#fdd835', '#43a047'][i % 4], 0.45));
    return g;
  },
};

export const machupicchu = {
  id: 'machupicchu',
  view: { r: 5.0, cy: 1.5, cz: -1 },
  name: 'マチュ・ピチュ',
  country: 'pe',
  year: 1450,
  sky: ['#b5d6ee', '#eef4f7'],
  desc: 'アンデス山中、標高約2400mの尾根に築かれたインカの都市。急斜面には段々畑がつくられ、神殿や住居が精巧な石組みで建てられています。背後にそびえる尖った山がワイナ・ピチュです。スペイン人に発見されず、ほぼ完全な姿で残りました。',
  facts: [
    ['建設', '15世紀半ば（パチャクテク帝の時代）'],
    ['標高', '約2400m'],
    ['建物', '約200の建造物'],
    ['世界遺産', '1983年（複合遺産）'],
  ],
  hotspots: [
    { p: [0, 4.4, -4.2], t: 'ワイナ・ピチュ', d: '「若い峰」という意味の山。山頂にも神殿の跡があります。' },
    { p: [2.0, 1.5, 1.5], t: '段々畑（アンデネス）', d: '急な斜面を階段状にして畑にしました。排水も考えられた構造で、崩れにくくなっています。' },
    { p: [-0.8, 1.9, 0.2], t: '石組み', d: '石と石の間にカミソリの刃も入らないほど精密な石組み。地震にも強い構造です。' },
  ],
  build() {
    const g = new THREE.Group();
    // mountains
    const mtn = new THREE.Group();
    mtn.add(cone(2.2, 5.5, 7, '#4f6f3e', 0, 2.2, -4.6));
    mtn.add(cone(4.5, 3.2, 8, '#5f7d47', 0, -0.2, 0, {}));
    mtn.add(cone(3.5, 6, 7, '#6a7f5a', 6, 1.5, -5));
    mtn.add(cone(4, 7, 7, '#6f8460', -6.5, 1.5, -4));
    mtn.add(cone(5, 5, 7, '#77896a', -2, 0.5, -10));
    g.add(mtn);
    g.add(ground(16, '#58743f', -1.5));
    // plateau
    g.add(box(4.4, 0.5, 3.2, '#8ea86b', 0, 1.25, 0));
    // terraces stepping down
    for (let i = 0; i < 6; i++) {
      const w = 4.8 + i * 0.45;
      g.add(box(w, 0.25, 0.4, '#7fa35a', 0.6 + i * 0.1, 1.0 - i * 0.25, 1.7 + i * 0.38));
      g.add(box(w, 0.25, 0.04, '#9a9585', 0.6 + i * 0.1, 1.0 - i * 0.25, 1.9 + i * 0.38));
    }
    // houses
    const r = rng(31);
    for (let i = 0; i < 16; i++) {
      const x = -1.8 + (i % 6) * 0.65 + r() * 0.1;
      const z = -1.2 + Math.floor(i / 6) * 0.9;
      const h = new THREE.Group();
      h.add(box(0.45, 0.32, 0.38, '#a5a093', 0, 0.16, 0));
      if (r() < 0.5) h.add(gable(0.5, 0.35, 0.42, '#c9a35a', 0, 0.32, 0, Math.PI / 2));
      h.position.set(x, 1.5, z);
      h.rotation.y = (r() - 0.5) * 0.3;
      g.add(h);
    }
    g.add(box(1.0, 0.35, 0.6, '#b3ad9f', 1.6, 1.68, -0.9));
    g.add(cyl(0.35, 0.35, 0.3, 16, '#b3ad9f', -1.6, 1.65, 0.9));
    // llamas
    for (let i = 0; i < 3; i++) {
      const l = new THREE.Group();
      l.add(box(0.3, 0.14, 0.12, '#f5f0e6', 0, 0.25, 0));
      l.add(box(0.06, 0.25, 0.06, '#f5f0e6', 0.14, 0.4, 0));
      for (const [lx, lz] of [[-0.1, -0.04], [-0.1, 0.04], [0.1, -0.04], [0.1, 0.04]]) l.add(box(0.03, 0.2, 0.03, '#d7ccc8', lx, 0.1, lz));
      l.position.set(-0.4 + i * 0.5, 1.5, 1.1);
      l.rotation.y = r() * 3;
      g.add(l);
    }
    return g;
  },
};

function stripeTex(c1, c2, diag = true) {
  return canvasTexture(256, 256, (g, w, h) => {
    g.fillStyle = c1;
    g.fillRect(0, 0, w, h);
    g.fillStyle = c2;
    const n = 6;
    for (let i = -n; i < n * 2; i++) {
      g.beginPath();
      const x = (i * w) / n;
      g.moveTo(x, 0);
      g.lineTo(x + w / (n * 2), 0);
      g.lineTo(x + w / (n * 2) + (diag ? w * 0.5 : 0), h);
      g.lineTo(x + (diag ? w * 0.5 : 0), h);
      g.closePath();
      g.fill();
    }
  });
}

export const stbasil = {
  id: 'stbasil',
  name: '聖ワシリー大聖堂',
  country: 'ru',
  year: 1561,
  sky: ['#a9cdf0', '#f2eef7'],
  desc: 'モスクワの赤の広場に建つロシア正教の大聖堂。イヴァン4世（雷帝）がカザン・ハン国の征服を記念して建てさせ、1561年に完成しました。中央の高い尖塔のまわりに、ねじれや縞模様で彩られた色とりどりの玉ねぎ形ドームが並ぶ、おとぎ話のような姿が特徴です。',
  facts: [
    ['完成', '1561年'],
    ['正式名', '堀の生神女庇護大聖堂'],
    ['ドーム', '玉ねぎ形ドーム（色彩は17世紀以降に施された）'],
    ['世界遺産', '1990年「モスクワのクレムリンと赤の広場」'],
  ],
  hotspots: [
    { p: [0, 4.3, 0], t: '中央の尖塔', d: 'テント形と呼ばれるロシア独特の屋根をもつ、最も高い礼拝堂です。' },
    { p: [1.5, 2.6, 0], t: '玉ねぎ形ドーム', d: '雪が積もりにくい形ともいわれます。一つひとつが別の聖人に捧げられた礼拝堂の屋根です。' },
    { p: [0, 0.4, 2.4], t: '赤レンガの基部', d: 'すべての礼拝堂は回廊でつながっています。' },
  ],
  build() {
    const g = new THREE.Group();
    g.add(ground(14, '#9e9a96'));
    const brick = '#a8452e';
    g.add(box(4.6, 0.6, 4.6, brick, 0, 0.3, 0));
    // central tent tower
    g.add(cyl(0.6, 0.7, 1.6, 8, '#b5533a', 0, 1.4, 0));
    g.add(cyl(0.45, 0.6, 0.3, 8, '#e8d6b0', 0, 2.35, 0));
    g.add(cyl(0.05, 0.45, 1.3, 8, '#d6b45a', 0, 3.15, 0));
    g.add(lathe(onionPoints(0.18, 0.4), '#e2b13c', 16, 0, 3.75, 0, { metalness: 0.6, roughness: 0.3 }));
    g.add(cyl(0.015, 0.015, 0.4, 4, '#e2b13c', 0, 4.25, 0));
    const domes = [
      [1.45, 0, 1.9, 0.38, ['#2e7d32', '#f9a825']],
      [-1.45, 0, 1.9, 0.38, ['#c62828', '#f5f5f5']],
      [0, 1.45, 1.9, 0.38, ['#1565c0', '#f5f5f5']],
      [0, -1.45, 1.9, 0.38, ['#f9a825', '#2e7d32']],
      [1.05, 1.05, 1.3, 0.28, ['#c62828', '#2e7d32']],
      [-1.05, 1.05, 1.3, 0.28, ['#00897b', '#f9a825']],
      [1.05, -1.05, 1.3, 0.28, ['#6a1b9a', '#fdd835']],
      [-1.05, -1.05, 1.3, 0.28, ['#2e7d32', '#e53935']],
    ];
    for (const [x, z, h, rad, [c1, c2]] of domes) {
      g.add(cyl(rad * 0.9, rad, h, 8, '#b5533a', x, 0.6 + h / 2, z));
      g.add(cyl(rad * 0.75, rad * 0.9, 0.25, 8, '#e8d6b0', x, 0.6 + h + 0.12, z));
      const top = 0.6 + h + 0.25;
      g.add(lathe(onionPoints(rad * 0.85, rad * 2.0), '#ffffff', 24, x, top, z, { map: stripeTex(c1, c2) }));
      g.add(cyl(0.012, 0.012, 0.3, 4, '#e2b13c', x, top + rad * 2.0 + 0.12, z));
    }
    return g;
  },
};

export const turtleship = {
  id: 'turtleship',
  view: { r: 3.4, cy: 0.8 },
  name: '亀甲船（コブクソン）',
  country: 'kr',
  year: 1592,
  sky: ['#9cc6e3', '#e6eef2'],
  desc: '朝鮮王朝の水軍が用いた、屋根で甲板全体を覆った軍船。屋根には鉄の釘や刃が植えられ、敵が乗り移って斬り込む戦法を防ぎました。船首の竜の頭からは煙を吐いて敵を威嚇し、大砲を放ったともいわれます。李舜臣は亀甲船を用いて日本の水軍を破りました。',
  facts: [
    ['活躍', '1592年〜（壬辰倭乱）'],
    ['全長', '約30〜35m（推定）'],
    ['漕ぎ手', '左右に約10本ずつの櫓'],
    ['特徴', '釘を植えた屋根・竜頭・多数の砲門'],
  ],
  hotspots: [
    { p: [2.4, 1.2, 0], t: '竜の頭', d: '口から煙を出して敵の視界を妨げ、恐怖心を与えたといわれます。' },
    { p: [0, 1.25, 0], t: '釘を植えた屋根', d: '敵が飛び移ってくるのを防ぐため、屋根には鋭い釘が並んでいました。' },
    { p: [0.3, 0.5, 0.95], t: '砲門と櫓', d: '船の側面には大砲を撃つ穴と、漕ぐための櫓が並んでいます。' },
  ],
  build(ctx) {
    const g = new THREE.Group();
    const sea = water(16, '#2c6e9c', 0);
    g.add(sea);
    const ship = new THREE.Group();
    const hullG = new THREE.CylinderGeometry(1, 0.7, 1, 24, 1);
    const hull = new THREE.Mesh(hullG, mat('#6d4c2f'));
    hull.scale.set(2.3, 0.55, 0.85);
    hull.rotation.z = 0;
    hull.position.y = 0.2;
    ship.add(hull);
    const shellG = new THREE.SphereGeometry(1, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2);
    const shell = new THREE.Mesh(shellG, mat('#7a5a3a'));
    shell.scale.set(2.2, 0.62, 0.86);
    shell.position.y = 0.48;
    shell.castShadow = true;
    ship.add(shell);
    // hex pattern lines
    const r = rng(17);
    const spikes = [];
    for (let i = 0; i < 140; i++) {
      const u = r() * Math.PI * 2;
      const v = r() * 0.9 * (Math.PI / 2);
      const x = Math.cos(u) * Math.cos(v) * 2.2;
      const z = Math.sin(u) * Math.cos(v) * 0.86;
      const y = Math.sin(v) * 0.62 + 0.48;
      spikes.push({ x, y: y + 0.04, z, s: 1 });
    }
    ship.add(instances(new THREE.ConeGeometry(0.025, 0.1, 4), mat('#b0bec5', { metalness: 0.6, roughness: 0.4 }), spikes));
    // dragon head
    const head = new THREE.Group();
    head.add(box(0.5, 0.26, 0.3, '#b8862f', 0, 0, 0));
    head.add(box(0.2, 0.1, 0.32, '#c62828', 0.22, -0.08, 0));
    head.add(sphere(0.04, '#ffeb3b', 0.12, 0.1, 0.12));
    head.add(sphere(0.04, '#ffeb3b', 0.12, 0.1, -0.12));
    head.add(cone(0.04, 0.15, 5, '#f5f5f5', -0.05, 0.18, 0.08));
    head.add(cone(0.04, 0.15, 5, '#f5f5f5', -0.05, 0.18, -0.08));
    head.position.set(2.35, 0.75, 0);
    head.rotation.z = 0.25;
    ship.add(head);
    // oars and gunports
    const oars = [];
    const ports = [];
    for (let i = 0; i < 10; i++) {
      const x = -1.6 + i * 0.34;
      for (const s of [-1, 1]) {
        oars.push({ x, y: 0.15, z: s * 1.1, rx: s * 0.9 });
        ports.push({ x: x + 0.15, y: 0.42, z: s * 0.82 });
      }
    }
    const oarMesh = instances(new THREE.BoxGeometry(0.04, 0.04, 0.9), mat('#8d6e63'), oars);
    ship.add(oarMesh);
    ship.add(instances(new THREE.BoxGeometry(0.1, 0.08, 0.06), mat('#212121'), ports));
    ship.add(cyl(0.035, 0.04, 2.0, 8, '#5d4037', -0.3, 1.5, 0));
    const sail = box(0.04, 1.1, 1.2, '#e9d8b4', -0.3, 1.7, 0);
    sail.rotation.y = Math.PI / 2 - 0.15;
    ship.add(sail);
    const flag = box(0.02, 0.2, 0.35, '#c62828', -0.3, 2.55, 0.18);
    ship.add(flag);
    g.add(ship);
    ctx.update = (t) => {
      ship.position.y = Math.sin(t * 1.3) * 0.05;
      ship.rotation.x = Math.sin(t * 0.9) * 0.03;
      ship.rotation.z = Math.sin(t * 1.1) * 0.02;
      oarMesh.rotation.x = Math.sin(t * 2) * 0.12;
    };
    return g;
  },
};

export const castle = {
  id: 'castle',
  view: { r: 4.0, cy: 1.8 },
  name: '姫路城',
  country: 'jp',
  year: 1609,
  sky: ['#b9dcf5', '#fbeef3'],
  desc: '兵庫県姫路市にある城で、白漆喰で塗り固められた美しい姿から「白鷺城（しらさぎじょう）」とも呼ばれます。現在の大天守は池田輝政によって1609年に完成しました。高い石垣の上に、大天守と3つの小天守が渡櫓でつながる「連立式天守」で、一度も戦火に遭わずに残っています。',
  facts: [
    ['完成', '1609年（大天守）'],
    ['高さ', '大天守 約31.5m（石垣を含めると約46m）'],
    ['構造', '外観5重・内部6階・地下1階'],
    ['世界遺産', '1993年（日本初の世界遺産の一つ）'],
  ],
  hotspots: [
    { p: [0, 3.9, 0], t: 'しゃちほこ', d: '屋根の両端の飾り。想像上の生き物で、火事から城を守るまじないとされました。' },
    { p: [1.3, 2.4, 1.3], t: '千鳥破風・唐破風', d: '屋根に付けられた三角形や曲線の飾り。白壁に陰影を与え、城を美しく見せます。' },
    { p: [1.8, 0.5, 1.8], t: '石垣', d: '下はゆるやかで上にいくほど急になる「扇の勾配」。敵がよじ登りにくい形です。' },
    { p: [-1.9, 1.6, -1.2], t: '小天守', d: '大天守と3つの小天守を渡櫓でつないだ「連立式」で、守りを固めています。' },
  ],
  build() {
    const g = new THREE.Group();
    g.add(ground(15, '#a7b88a'));
    const stone = '#9a948a';
    g.add(rectFrustum(4.0, 3.4, 3.2, 2.7, 0.9, stone, 0, 0.45, 0));
    const white = '#f7f6f2';
    const roof = '#59606a';
    const keep = (x, z, scale, levels) => {
      const k = new THREE.Group();
      let y = 0;
      let w = 2.2;
      let d = 1.8;
      for (let i = 0; i < levels; i++) {
        const h = i === 0 ? 0.55 : 0.42;
        k.add(box(w, h, d, white, 0, y + h / 2, 0));
        y += h;
        k.add(rectFrustum(w + 0.55, d + 0.55, w * 0.7, d * 0.7, 0.22, roof, 0, y + 0.11, 0));
        if (i % 2 === 0 && i < levels - 1) {
          k.add(gable(w * 0.45, 0.32, 0.12, white, 0, y + 0.05, d / 2 + 0.2));
          k.add(gable(w * 0.5, 0.36, 0.1, roof, 0, y + 0.06, d / 2 + 0.27));
          k.add(gable(d * 0.45, 0.32, 0.12, white, w / 2 + 0.2, y + 0.05, 0, Math.PI / 2));
          k.add(gable(d * 0.5, 0.36, 0.1, roof, w / 2 + 0.27, y + 0.06, 0, Math.PI / 2));
        }
        y += 0.12;
        w *= 0.8;
        d *= 0.8;
      }
      k.add(gable(w + 0.5, 0.35, d + 0.4, roof, 0, y, 0, Math.PI / 2));
      for (const s of [-1, 1]) {
        const sh = box(0.06, 0.16, 0.08, '#d4af37', s * (w / 2 + 0.2), y + 0.38, 0, 0, { metalness: 0.7, roughness: 0.3 });
        k.add(sh);
      }
      // windows
      const wins = [];
      let wy = 0.3;
      let ww = 2.2;
      let wd = 1.8;
      for (let i = 0; i < levels; i++) {
        for (const s of [-1, 1]) {
          wins.push({ x: -ww * 0.25, y: wy, z: s * (wd / 2 + 0.01) });
          wins.push({ x: ww * 0.25, y: wy, z: s * (wd / 2 + 0.01) });
        }
        wy += (i === 0 ? 0.55 : 0.42) + 0.12;
        ww *= 0.8;
        wd *= 0.8;
      }
      k.add(instances(new THREE.BoxGeometry(0.16, 0.12, 0.02), mat('#3a3f45'), wins));
      k.position.set(x, 0.9, z);
      k.scale.setScalar(scale);
      return k;
    };
    g.add(keep(0.2, 0.3, 1, 5));
    g.add(keep(-1.7, -1.0, 0.5, 3));
    g.add(keep(-0.4, -1.5, 0.45, 3));
    g.add(keep(-1.9, 0.6, 0.45, 3));
    g.add(box(1.4, 0.35, 0.4, white, -1.1, 1.08, -1.25));
    g.add(box(0.4, 0.35, 1.2, white, -1.8, 1.08, -0.2));
    const r = rng(6);
    for (let i = 0; i < 16; i++) {
      const a = r() * Math.PI * 2;
      const d = 4.5 + r() * 2.5;
      g.add(tree(Math.cos(a) * d, Math.sin(a) * d, 0.9 + r() * 0.5, i % 2 ? '#e8a1b8' : '#f3c2d1'));
    }
    return g;
  },
};

function crossSail() {
  return canvasTexture(128, 128, (g, cw, ch) => {
    g.fillStyle = '#f2ead8';
    g.fillRect(0, 0, cw, ch);
    g.fillStyle = '#c62828';
    g.fillRect(cw * 0.42, ch * 0.15, cw * 0.16, ch * 0.7);
    g.fillRect(cw * 0.2, ch * 0.38, cw * 0.6, ch * 0.16);
  });
}

export const caravel = {
  id: 'caravel',
  view: { r: 3.8, cy: 1.8 },
  name: 'サンタ・マリア号',
  country: 'es',
  year: 1492,
  sky: ['#8ec5ea', '#eaf4f8'],
  desc: '1492年、コロンブスが大西洋横断に使った船団の旗艦。ナオ（キャラック）と呼ばれる型の帆船で、全長は20m前後と推定されています。四角い横帆と三角帆を組み合わせ、羅針盤を頼りに約2か月の航海の末、カリブ海の島に到達しました。帆には十字の紋章が描かれていました。',
  facts: [
    ['航海', '1492年8月〜10月'],
    ['全長', '約18〜23m（推定）'],
    ['乗組員', '約40人'],
    ['船団', 'サンタ・マリア号・ピンタ号・ニーニャ号'],
  ],
  hotspots: [
    { p: [0, 2.6, 0], t: '横帆', d: '四角い帆は追い風を効率よく受けます。帆に描かれた赤い十字は、キリスト教の布教の使命を表しました。' },
    { p: [-1.6, 1.0, 0], t: '船尾楼', d: '船尾の高い構造物。船長の部屋があり、舵を操作しました。' },
    { p: [0.2, 3.8, 0], t: '見張り台', d: 'マストの上の見張り台。1492年10月12日、ここから陸地が発見されました。' },
  ],
  build(ctx) {
    const g = new THREE.Group();
    g.add(water(16, '#2a6f9e', 0));
    const ship = new THREE.Group();
    const hull = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), mat('#6b4a2f'));
    hull.scale.set(2.0, 0.85, 0.7);
    hull.position.y = 0.55;
    ship.add(hull);
    ship.add(box(3.6, 0.1, 1.3, '#8d6e4f', 0, 0.55, 0));
    ship.add(box(1.0, 0.55, 1.2, '#7a5a3c', -1.45, 0.85, 0));
    ship.add(box(0.7, 0.35, 1.05, '#7a5a3c', 1.5, 0.75, 0));
    const tex = crossSail();
    const sailMat = mat('#ffffff', { map: tex, side: THREE.DoubleSide, flat: false });
    const masts = [
      [0.2, 3.6, [[1.5, 1.1, 1.6], [0.95, 0.7, 2.75]]],
      [1.3, 2.4, [[0.95, 0.7, 1.4]]],
    ];
    const sails = [];
    for (const [x, h, sl] of masts) {
      ship.add(cyl(0.04, 0.055, h, 8, '#5d4037', x, 0.55 + h / 2, 0));
      for (const [w, sh, y] of sl) {
        const sg = new THREE.CylinderGeometry(2.2, 2.2, sh, 12, 1, true, -w / 4.4, w / 2.2);
        const s = new THREE.Mesh(sg, sailMat);
        s.position.set(x - 2.0, y, 0);
        s.rotation.y = Math.PI / 2;
        ship.add(s);
        sails.push(s);
        const yard = cyl(0.02, 0.02, w + 0.2, 6, '#5d4037', x + 0.05, y + sh / 2, 0);
        yard.rotation.x = Math.PI / 2;
        ship.add(yard);
      }
    }
    ship.add(cyl(0.12, 0.08, 0.18, 10, '#5d4037', 0.2, 3.85, 0));
    const lateen = new THREE.Mesh(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1.6, 0), new THREE.Vector3(-0.9, 0.1, 0)]), mat('#f2ead8', { side: THREE.DoubleSide }));
    lateen.geometry.computeVertexNormals();
    lateen.position.set(-1.25, 1.2, 0);
    ship.add(lateen);
    ship.add(cyl(0.03, 0.03, 1.9, 6, '#5d4037', -1.25, 2.0, 0));
    ship.add(box(0.02, 0.18, 0.3, '#f9a825', 0.2, 4.1, 0.15));
    const bow = box(0.9, 0.05, 0.05, '#5d4037', 2.2, 1.0, 0);
    bow.rotation.z = 0.35;
    ship.add(bow);
    g.add(ship);
    ctx.update = (t) => {
      ship.position.y = Math.sin(t * 1.2) * 0.06;
      ship.rotation.z = Math.sin(t * 0.8) * 0.04;
      ship.rotation.x = Math.sin(t * 1.0) * 0.03;
    };
    return g;
  },
};
