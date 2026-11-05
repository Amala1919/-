// Collects every Wikipedia title referenced by the app data and writes scripts/images.json,
// which .github/workflows/images.yml uses to download the photos.
import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { EVENTS, PEOPLE, COUNTRIES } from '../web/src/data/index.js';
import { LANDMARKS, landmarkPhotos } from '../web/src/data/landmarks.js';
import { FAMILIES } from '../web/src/data/relations.js';
import { THEMES } from '../web/src/data/theme-index.js';
import { PREFS } from '../web/src/data/pref-index.js';
import P1 from '../web/src/data/periods-asia.js';
import P2 from '../web/src/data/periods-mea.js';
import P3 from '../web/src/data/periods-eur.js';
import P4 from '../web/src/data/periods-amer.js';

const flagFiles = () => [P1, P2, P3, P4].flatMap((m) => Object.values(m).flatMap((l) => l.map((p) => p.flagFile).filter(Boolean)));

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
for (const f of FAMILIES) if (f.img) titles.add(f.img);
for (const t of THEMES) if (t.img) titles.add(t.img);
for (const p of PREFS) if (p.img) titles.add(p.img);
for (const f of flagFiles()) titles.add(f);

const list = [...titles].sort().map((title) => ({ key: imgKey(title), title }));
const out = resolve(dirname(fileURLToPath(import.meta.url)), 'images.json');
writeFileSync(out, JSON.stringify(list, null, 1) + '\n');
console.log(`${list.length} titles -> ${out}`);
