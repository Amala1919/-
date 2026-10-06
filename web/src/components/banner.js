// Illustrated SVG scenes for each era (used as headers and cards).
const SKY = {
  prehistory: ['#f7b267', '#f4845f', '#5b3a29'],
  ancient: ['#ffd27a', '#f59e5b', '#a0522d'],
  classical: ['#7fc8f8', '#cfe9ff', '#2f6f9f'],
  medieval: ['#5a4e9c', '#c48bb5', '#2c2347'],
  earlymodern: ['#79d2c0', '#e6f7f1', '#1f6f78'],
  modern: ['#c9a27e', '#f2d7b6', '#4a3428'],
  worldwars: ['#5b1f1f', '#c0573e', '#1d1414'],
  contemporary: ['#0b1d4a', '#3b5ba5', '#0a0f24'],
};

const hills = (y, amp, color, seed = 1, w = 400) => {
  let d = `M0,${y}`;
  for (let x = 0; x <= w; x += 20) {
    const yy = y - Math.abs(Math.sin(x * 0.013 * seed + seed) * amp) - Math.sin(x * 0.041 + seed * 3) * amp * 0.25;
    d += ` L${x},${yy.toFixed(1)}`;
  }
  return `<path d="${d} L${w},160 L0,160 Z" fill="${color}"/>`;
};

const palm = (x, y, s = 1, c = '#2b1d14') =>
  `<g transform="translate(${x},${y}) scale(${s})" fill="${c}"><path d="M-2,0 Q0,-20 3,-38 L6,-38 Q3,-20 2,0 Z"/><path d="M4,-38 Q-10,-46 -22,-36 Q-10,-40 4,-36 Z M4,-38 Q18,-48 30,-36 Q16,-40 4,-36 Z M4,-38 Q-2,-52 -14,-54 Q0,-48 4,-38 Z M4,-38 Q12,-54 24,-52 Q10,-48 4,-38 Z"/></g>`;

const pyramid = (x, base, h, c1, c2) =>
  `<path d="M${x - base / 2},130 L${x},${130 - h} L${x + base / 2},130 Z" fill="${c1}"/><path d="M${x},${130 - h} L${x + base / 2},130 L${x + base * 0.12},130 Z" fill="${c2}"/>`;

const temple = (x, y, w, c) => {
  let cols = '';
  const n = 6;
  for (let i = 0; i < n; i++) cols += `<rect x="${x + 6 + (i * (w - 16)) / (n - 1)}" y="${y + 14}" width="4" height="34" fill="${c}"/>`;
  return `<g><path d="M${x - 4},${y + 14} L${x + w / 2},${y} L${x + w + 4},${y + 14} Z" fill="${c}"/><rect x="${x - 4}" y="${y + 12}" width="${w + 8}" height="4" fill="${c}"/>${cols}<rect x="${x - 6}" y="${y + 48}" width="${w + 12}" height="4" fill="${c}"/><rect x="${x - 10}" y="${y + 52}" width="${w + 20}" height="4" fill="${c}"/></g>`;
};

const castle = (x, y, c) =>
  `<g fill="${c}"><rect x="${x}" y="${y}" width="60" height="40"/><rect x="${x - 10}" y="${y - 20}" width="16" height="60"/><rect x="${x + 54}" y="${y - 20}" width="16" height="60"/><rect x="${x + 22}" y="${y - 34}" width="18" height="74"/>${[0, 1, 2, 3].map((i) => `<rect x="${x + i * 16}" y="${y - 6}" width="8" height="6"/>`).join('')}<path d="M${x - 12},${y - 20} L${x - 2},${y - 34} L${x + 8},${y - 20} Z M${x + 52},${y - 20} L${x + 62},${y - 34} L${x + 72},${y - 20} Z M${x + 20},${y - 34} L${x + 31},${y - 54} L${x + 42},${y - 34} Z"/><path d="M${x + 31},${y - 54} L${x + 31},${y - 64} L${x + 42},${y - 60} L${x + 31},${y - 57}" stroke="${c}" stroke-width="1.5"/><path d="M${x + 24},${y + 40} L${x + 24},${y + 24} Q${x + 31},${y + 16} ${x + 38},${y + 24} L${x + 38},${y + 40} Z" fill="rgba(255,220,150,.6)"/></g>`;

const pagoda = (x, y, c) => {
  let s = '';
  for (let i = 0; i < 5; i++) {
    const w = 40 - i * 6;
    const yy = y - i * 13;
    s += `<rect x="${x - w / 4}" y="${yy - 8}" width="${w / 2}" height="8"/><path d="M${x - w / 2 - 4},${yy - 6} Q${x},${yy - 16} ${x + w / 2 + 4},${yy - 6} L${x + w / 2 - 2},${yy - 10} Q${x},${yy - 17} ${x - w / 2 + 2},${yy - 10} Z"/>`;
  }
  return `<g fill="${c}">${s}<rect x="${x - 1}" y="${y - 84}" width="2" height="22"/></g>`;
};

const ship = (x, y, s, c, sail) =>
  `<g transform="translate(${x},${y}) scale(${s})"><path d="M-40,0 L40,0 L30,14 L-32,14 Z" fill="${c}"/><path d="M-30,0 L-30,-8 L-44,-10 L-40,0 Z M30,0 L30,-6 L42,-8 L40,0 Z" fill="${c}"/><rect x="-1" y="-60" width="2" height="60" fill="${c}"/><rect x="-22" y="-44" width="2" height="44" fill="${c}"/><rect x="20" y="-40" width="2" height="40" fill="${c}"/><path d="M-16,-56 Q0,-48 16,-56 L16,-30 Q0,-24 -16,-30 Z M-34,-40 Q-21,-34 -8,-40 L-8,-20 Q-21,-14 -34,-20 Z M8,-36 Q21,-30 34,-36 L34,-16 Q21,-10 8,-16 Z" fill="${sail}"/><path d="M-4,-48 L4,-48 M0,-52 L0,-36" stroke="#c62828" stroke-width="3"/></g>`;

const factory = (x, y, c) =>
  `<g fill="${c}"><path d="M${x},${y} L${x},${y - 20} L${x + 16},${y - 30} L${x + 16},${y - 20} L${x + 32},${y - 30} L${x + 32},${y - 20} L${x + 48},${y - 30} L${x + 48},${y} Z"/><rect x="${x + 52}" y="${y - 60}" width="8" height="60"/><rect x="${x + 64}" y="${y - 48}" width="7" height="48"/></g>
  <g fill="rgba(80,70,70,.45)"><circle cx="${x + 58}" cy="${y - 68}" r="7"/><circle cx="${x + 66}" cy="${y - 80}" r="10"/><circle cx="${x + 80}" cy="${y - 92}" r="13"/><circle cx="${x + 69}" cy="${y - 56}" r="6"/><circle cx="${x + 78}" cy="${y - 64}" r="9"/></g>`;

const train = (x, y, c) =>
  `<g fill="${c}"><rect x="${x}" y="${y - 16}" width="34" height="14" rx="3"/><rect x="${x + 22}" y="${y - 26}" width="14" height="24"/><rect x="${x + 4}" y="${y - 28}" width="6" height="12"/><path d="M${x - 6},${y - 2} L${x},${y - 10} L${x},${y - 2} Z"/>${[6, 18, 30].map((dx) => `<circle cx="${x + dx}" cy="${y}" r="5"/>`).join('')}<rect x="${x + 40}" y="${y - 14}" width="28" height="12" rx="2"/><circle cx="${x + 46}" cy="${y}" r="4"/><circle cx="${x + 62}" cy="${y}" r="4"/><rect x="${x + 72}" y="${y - 14}" width="28" height="12" rx="2"/><circle cx="${x + 78}" cy="${y}" r="4"/><circle cx="${x + 94}" cy="${y}" r="4"/></g><g fill="rgba(255,255,255,.6)"><circle cx="${x + 7}" cy="${y - 34}" r="5"/><circle cx="${x - 4}" cy="${y - 42}" r="7"/><circle cx="${x - 20}" cy="${y - 48}" r="9"/></g>`;

const plane = (x, y, s, c) =>
  `<g transform="translate(${x},${y}) scale(${s})" fill="${c}"><rect x="-18" y="-2" width="36" height="5" rx="2"/><rect x="-6" y="-12" width="4" height="22"/><rect x="-14" y="-14" width="22" height="3"/><rect x="-14" y="9" width="22" height="3"/><path d="M18,-1 L26,-6 L26,4 Z"/><circle cx="-19" cy="0" r="3"/></g>`;

const skyline = (y, c) => {
  const b = [[10, 50], [32, 80], [52, 40], [70, 100], [94, 60], [116, 120], [140, 70], [162, 90], [184, 50], [206, 130], [232, 75], [254, 95], [278, 55], [300, 110], [324, 65], [346, 85], [370, 45]];
  return `<g fill="${c}">${b.map(([x, h], i) => `<rect x="${x}" y="${y - h}" width="${18 + (i % 3) * 3}" height="${h}"/>`).join('')}<rect x="213" y="${y - 150}" width="3" height="22"/></g>
  <g fill="rgba(255,230,140,.75)">${b.map(([x, h], i) => [...Array(Math.floor(h / 14))].map((_, j) => ((i + j) % 3 ? `<rect x="${x + 4}" y="${y - h + 6 + j * 14}" width="3" height="4"/><rect x="${x + 11}" y="${y - h + 6 + j * 14}" width="3" height="4"/>` : '')).join('')).join('')}</g>`;
};

const mammoth = (x, y, c) =>
  `<g fill="${c}"><ellipse cx="${x}" cy="${y - 24}" rx="26" ry="20"/><circle cx="${x + 24}" cy="${y - 34}" r="13"/><path d="M${x + 32},${y - 30} Q${x + 42},${y - 10} ${x + 34},${y + 2} L${x + 30},${y} Q${x + 36},${y - 12} ${x + 28},${y - 26} Z"/><rect x="${x - 20}" y="${y - 10}" width="9" height="12"/><rect x="${x - 6}" y="${y - 10}" width="9" height="12"/><rect x="${x + 8}" y="${y - 10}" width="9" height="12"/><path d="M${x + 30},${y - 26} Q${x + 50},${y - 22} ${x + 46},${y - 38}" stroke="#f3ead8" stroke-width="3" fill="none"/></g>`;

const people = (x, y, n, c) =>
  [...Array(n)].map((_, i) => `<g fill="${c}"><circle cx="${x + i * 14}" cy="${y - 22}" r="3.5"/><path d="M${x + i * 14 - 4},${y - 17} L${x + i * 14 + 4},${y - 17} L${x + i * 14 + 3},${y - 4} L${x + i * 14 - 3},${y - 4} Z"/><rect x="${x + i * 14 - 3}" y="${y - 4}" width="2" height="5"/><rect x="${x + i * 14 + 1}" y="${y - 4}" width="2" height="5"/><path d="M${x + i * 14 + 5},${y - 30} L${x + i * 14 + 5},${y}" stroke="${c}" stroke-width="1.4"/></g>`).join('');

function sceneBody(id) {
  switch (id) {
    case 'prehistory':
      return `<circle cx="300" cy="50" r="22" fill="#ffe08a" opacity=".9"/>${hills(110, 30, '#8b5a3c', 2)}${hills(130, 14, '#5b3a29', 3)}
        ${mammoth(120, 140, '#2b1a12')}${mammoth(210, 142, '#3a2418')}${people(290, 146, 3, '#1f130c')}
        <path d="M350,150 L360,132 L370,150 Z" fill="#ff8f3c"/><path d="M355,150 L360,138 L365,150 Z" fill="#ffd54f"/>`;
    case 'ancient':
      return `<circle cx="320" cy="44" r="24" fill="#fff3c4"/>${hills(118, 8, '#e0a96d', 1)}
        ${pyramid(150, 120, 80, '#c98f4f', '#a8703a')}${pyramid(240, 90, 60, '#d39b5c', '#b07a41')}${pyramid(80, 60, 38, '#d9a566', '#b88449')}
        <path d="M0,140 Q100,132 200,140 T400,138 L400,160 L0,160 Z" fill="#3f86b8"/>${palm(30, 140, 1)}${palm(330, 140, 1.2)}${palm(360, 142, 0.9)}`;
    case 'classical':
      return `<circle cx="70" cy="42" r="18" fill="#fffbe6"/>${hills(112, 20, '#9ccc9c', 2)}
        <path d="M0,132 L400,128 L400,160 L0,160 Z" fill="#2f78b5"/>${hills(132, 12, '#d8cfa8', 4)}
        ${temple(150, 64, 100, '#f3efe4')}
        <g fill="#56794a"><circle cx="60" cy="118" r="14"/><circle cx="80" cy="122" r="10"/><circle cx="330" cy="116" r="16"/><circle cx="352" cy="122" r="11"/></g>`;
    case 'medieval':
      return `<circle cx="330" cy="40" r="14" fill="#fff8e1"/><circle cx="324" cy="36" r="13" fill="#5a4e9c"/>
        ${[...Array(18)].map((_, i) => `<circle cx="${(i * 47) % 400}" cy="${(i * 29) % 70}" r="1" fill="#fff" opacity=".7"/>`).join('')}
        ${hills(118, 26, '#4a3f78', 1.4)}${castle(70, 96, '#231c3d')}${pagoda(300, 136, '#231c3d')}${hills(140, 10, '#2c2347', 5)}`;
    case 'earlymodern':
      return `<circle cx="80" cy="44" r="20" fill="#fffde7"/><path d="M0,104 L400,104 L400,160 L0,160 Z" fill="#1f8a95"/>
        <path d="M0,112 Q50,108 100,112 T200,112 T300,112 T400,112" stroke="rgba(255,255,255,.4)" fill="none"/>
        ${ship(140, 118, 0.9, '#3e2a1e', '#fbf3e0')}${ship(280, 112, 0.55, '#3e2a1e', '#fbf3e0')}
        <g transform="translate(360,40)" stroke="#1f6f78" stroke-width="1.4" fill="none"><circle r="16"/><path d="M0,-22 L4,0 L0,22 L-4,0 Z M-22,0 L0,4 L22,0 L0,-4 Z" fill="#1f6f78"/></g>`;
    case 'modern':
      return `<circle cx="330" cy="48" r="22" fill="#fff3d6" opacity=".9"/>${hills(118, 18, '#b48a68', 2)}
        ${factory(40, 130, '#4a3428')}${factory(250, 128, '#5a4032')}<rect x="0" y="134" width="400" height="4" fill="#3a2a20"/>
        ${train(140, 132, '#2a1d16')}${hills(146, 4, '#4a3428', 6)}`;
    case 'worldwars':
      return `<path d="M60,160 L120,0 L135,0 Z" fill="rgba(255,240,200,.12)"/><path d="M300,160 L250,0 L268,0 Z" fill="rgba(255,240,200,.12)"/>
        ${plane(110, 50, 1.1, '#1d1414')}${plane(250, 36, 0.8, '#1d1414')}${plane(330, 64, 0.6, '#1d1414')}
        ${hills(124, 14, '#3a1f1a', 3)}<g fill="rgba(60,40,40,.6)"><circle cx="200" cy="112" r="16"/><circle cx="220" cy="100" r="22"/><circle cx="246" cy="110" r="16"/></g>${hills(142, 8, '#1d1414', 7)}`;
    case 'contemporary':
      return `${[...Array(40)].map((_, i) => `<circle cx="${(i * 73) % 400}" cy="${(i * 37) % 90}" r="${i % 5 ? 0.8 : 1.4}" fill="#fff" opacity=".8"/>`).join('')}
        <circle cx="60" cy="40" r="14" fill="#e8eefc"/><circle cx="56" cy="36" r="3" fill="#c9d3ea"/><circle cx="66" cy="44" r="2" fill="#c9d3ea"/>
        <g transform="translate(300,30) rotate(20)"><rect x="-3" y="-14" width="6" height="22" rx="3" fill="#eceff1"/><path d="M-3,-10 L0,-20 L3,-10 Z" fill="#e53935"/><path d="M-2,8 L0,30 L2,8 Z" fill="#ffb300"/></g>
        <path d="M300,40 Q280,90 260,140" stroke="rgba(255,255,255,.25)" stroke-width="5" fill="none"/>
        <g transform="translate(170,36)" fill="#cfd8dc"><rect x="-4" y="-3" width="8" height="6"/><rect x="-18" y="-2" width="12" height="4" fill="#5c8fd6"/><rect x="6" y="-2" width="12" height="4" fill="#5c8fd6"/></g>
        ${skyline(160, '#0a0f24')}`;
    default:
      return '';
  }
}

export function eraBannerSVG(eraId, { height = 160, cls = '' } = {}) {
  const [a, b, ground] = SKY[eraId] || SKY.classical;
  const gid = `sky-${eraId}`;
  return `<svg class="era-banner ${cls}" viewBox="0 0 400 160" preserveAspectRatio="xMidYMid slice" style="height:${height}px" aria-hidden="true">
    <defs><linearGradient id="${gid}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>
    <rect width="400" height="160" fill="url(#${gid})"/>${sceneBody(eraId)}<rect y="156" width="400" height="4" fill="${ground}"/></svg>`;
}
