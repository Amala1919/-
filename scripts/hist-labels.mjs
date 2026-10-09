import fs from 'fs';
import { feature } from 'topojson-client';
import { geoArea, geoCentroid } from 'd3-geo';
const dir = process.argv[2];
const years = fs.readdirSync(dir).filter((f) => f !== "index.json").map((f) => +f.replace('.json', '')).filter((y) => y !== 1492).sort((a, b) => a - b);
const out = { years: [], labels: {} };
const allNames = new Map();
for (const y of years) {
  const topo = JSON.parse(fs.readFileSync(`${dir}/${y}.json`));
  const fc = feature(topo, topo.objects[Object.keys(topo.objects)[0]]);
  const by = new Map();
  for (const f of fc.features) {
    const n = f.properties.NAME;
    if (!n || !f.geometry) continue;
    const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
    for (const p of polys) {
      const g = { type: 'Polygon', coordinates: p };
      let a = geoArea(g);
      if (a > 2 * Math.PI) a = 4 * Math.PI - a; // wrong winding
      const cur = by.get(n) || { area: 0, best: 0, pt: null };
      cur.area += a;
      if (a > cur.best) { cur.best = a; cur.pt = geoCentroid(g); }
      by.set(n, cur);
    }
  }
  const labels = [...by.entries()].filter(([, v]) => v.area > 0.002).sort((a, b) => b[1].area - a[1].area).slice(0, 45)
    .map(([n, v]) => [n, Math.round(v.pt[0] * 10) / 10, Math.round(v.pt[1] * 10) / 10, Math.round(v.area * 1000)]);
  for (const l of labels) allNames.set(l[0], (allNames.get(l[0]) || 0) + 1);
  out.years.push(y);
  out.labels[y] = labels;
}
fs.writeFileSync(process.argv[3], JSON.stringify(out));
fs.writeFileSync(process.argv[4], [...allNames.keys()].sort().join('\n'));
console.log(years.length, 'years', allNames.size, 'label names');
