// Collects every Wikipedia title referenced by the app data and writes scripts/images.json,
// which .github/workflows/images.yml uses to download the photos.
import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { EVENTS, PEOPLE, COUNTRIES } from '../web/src/data/index.js';
import { LANDMARKS, landmarkPhotos } from '../web/src/data/landmarks.js';

function imgKey(title) {
  let h = 2166136261;
  const s = 'en:' + title;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36);
}

const titles = new Set();
for (const e of EVENTS) if (e.img) titles.add(e.img);
for (const p of PEOPLE) if (p.img) titles.add(p.img);
for (const c of COUNTRIES) if (c.img) titles.add(c.img);
for (const m of LANDMARKS) for (const t of landmarkPhotos(m)) titles.add(t);

const list = [...titles].sort().map((title) => ({ key: imgKey(title), title }));
const out = resolve(dirname(fileURLToPath(import.meta.url)), 'images.json');
writeFileSync(out, JSON.stringify(list, null, 1) + '\n');
console.log(`${list.length} titles -> ${out}`);
