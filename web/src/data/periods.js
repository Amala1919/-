// What each modern country's land was called, and which flag (if any) it flew, at a given time.
import ASIA from './periods-asia.js';
import MEA from './periods-mea.js';
import EUR from './periods-eur.js';
import AMER from './periods-amer.js';
import { COUNTRY_BY_ID } from './index.js';
import { image } from '../images.js';
import { esc } from '../util.js';

export const PERIODS = { ...ASIA, ...MEA, ...EUR, ...AMER };

/** The period of country `cid` that contains `year` (or null if unknown). */
export function periodAt(cid, year) {
  const list = PERIODS[cid];
  if (!list || year == null) return null;
  return list.find((p) => year >= p.from && year < p.to) || null;
}

/** Name of the country's land at that time (falls back to the modern name). */
export function nameAt(cid, year) {
  const p = periodAt(cid, year);
  return p ? p.name : COUNTRY_BY_ID[cid]?.name.replace(/（.*）/, '') || '';
}

// A file named like "Flag of X (1844–1922).svg" is only shown within those years.
function flagInUse(file, year) {
  const m = file.match(/\((\d{3,4})[–-][^)]*?(\d{3,4})\)/);
  return !m || (year >= Number(m[1]) && year <= Number(m[2]));
}

/** Flag HTML of that time: emoji, a small historical flag image, or '' when there was no flag. */
export function flagAt(cid, year) {
  const p = periodAt(cid, year);
  if (!p) return COUNTRY_BY_ID[cid]?.flag || '';
  if (p.flag) return p.flag;
  if (p.flagFile && flagInUse(p.flagFile, year)) {
    const img = image(p.flagFile);
    if (img) return `<img class="hflag" src="${img.thumb}" alt="" loading="lazy">`;
  }
  return '';
}

/** Flag + name of that time, e.g. "🇯🇵 日本" or "<img> オスマン帝国" or "日本（平安時代）". */
export function badgeAt(cid, year) {
  const f = flagAt(cid, year);
  return `${f ? f + ' ' : ''}${esc(nameAt(cid, year))}`;
}

/** Every flag file referenced (for the image manifest). */
export function flagFiles() {
  return Object.values(PERIODS).flatMap((l) => l.map((p) => p.flagFile).filter(Boolean));
}
