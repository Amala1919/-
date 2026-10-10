// "もっと詳しく" deep dives (背景・流れ・影響・豆知識・語呂合わせ) attached to events as e.deep.
import JP from './deep-jp.js';
import WORLD from './deep-world.js';
import { COUNTRY_BY_ID } from './index.js';

let count = 0;
for (const d of [...JP, ...WORLD]) {
  const [cid, title] = d.ref;
  const e = COUNTRY_BY_ID[cid]?.events.find((x) => x.title === title);
  if (!e) continue;
  e.deep = d;
  count++;
}
export const DEEP_COUNT = count;
