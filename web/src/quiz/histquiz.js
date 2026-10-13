// Historical-map quiz: "Around year X, who ruled the highlighted region?" (uses the time-travel globe's borders).
import { geoOrthographic, geoPath, geoGraticule10 } from 'd3-geo';
import { histIndex, loadSnapshot, histName, isCulture, polityColor } from '../three/histmap.js';
import { worldFeaturesLite } from '../components/geo.js';
import { formatYear, shuffle, sample } from '../util.js';

const W = 340;
const H = 240;

function mapSVG(features, target, lon, lat) {
  const proj = geoOrthographic().rotate([-lon, -Math.max(-60, Math.min(60, lat))]).scale(116).translate([W / 2, H / 2]).clipAngle(90);
  const path = geoPath(proj);
  const d = (f) => path(f) || '';
  const land = worldFeaturesLite().features.map(d).join('');
  const others = features
    .filter((f) => f.properties.NAME !== target && d(f))
    .map((f) => `<path d="${d(f)}" fill="${isCulture(f.properties) ? '#5f6b78' : polityColor(f.properties)}" fill-opacity="${isCulture(f.properties) ? 0.5 : 0.55}"/>`)
    .join('');
  const hit = features.filter((f) => f.properties.NAME === target).map(d).join('');
  return `<svg class="hq-map" viewBox="0 0 ${W} ${H}" width="100%">
    <circle cx="${W / 2}" cy="${H / 2}" r="116" fill="#1d4f80"/>
    <path d="${path(geoGraticule10())}" fill="none" stroke="rgba(160,200,255,.18)" stroke-width=".5"/>
    <path d="${land}" fill="#8c8672"/>
    <g stroke="rgba(255,255,255,.5)" stroke-width=".4">${others}</g>
    <path d="${hit}" fill="#ffd54f" stroke="#fff" stroke-width="1.4" class="hq-hit"/>
  </svg>`;
}

/** Builds n questions (async: loads the snapshots). */
export async function buildHistQuiz(n = 10, rnd = Math.random) {
  const idx = await histIndex();
  const years = idx.years.filter((y) => y >= -1500);
  const qs = [];
  let guard = 0;
  while (qs.length < n && guard++ < 60) {
    const year = years[Math.floor(rnd() * years.length)];
    const features = await loadSnapshot(year);
    const cands = (idx.labels[year] || []).filter(([name]) => {
      const f = features.find((x) => x.properties.NAME === name);
      return f && !isCulture(f.properties) && histName(name) !== name;
    });
    if (cands.length < 4) continue;
    const [name, lon, lat] = cands[Math.floor(rnd() * Math.min(cands.length, 18))];
    if (qs.some((q) => q.key === `${year}:${name}`)) continue;
    const ja = histName(name);
    const others = sample(cands.filter((c) => histName(c[0]) !== ja), 3, rnd).map((c) => histName(c[0]));
    const opts = shuffle([ja, ...others], rnd);
    qs.push({
      key: `${year}:${name}`,
      id: `hm:${year}:${name}`,
      type: 'histmap',
      prompt: `${formatYear(year)}ごろ、地図で光っている地域を支配していたのは？`,
      visual: `<div class="q-map">${mapSVG(features, name, lon, lat)}</div>`,
      choices: opts.map((label) => ({ label })),
      answer: opts.indexOf(ja),
      explain: `${formatYear(year)}ごろ、この地域は「${ja}」でした。時をかける地球儀でスライダーを${formatYear(year)}に合わせると、当時の世界地図を見られます。`,
    });
  }
  return qs;
}
