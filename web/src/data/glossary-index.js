// 用語集: key history terms with links to events.
import GLOSSARY from './glossary.js';
import { COUNTRY_BY_ID } from './index.js';

for (const t of GLOSSARY) {
  t.evs = (t.events || []).map(([cid, title]) => COUNTRY_BY_ID[cid]?.events.find((e) => e.title === title)).filter(Boolean);
  t.related = (t.related || []).filter(Boolean);
}
export { GLOSSARY };
export const TERM_BY_ID = Object.fromEntries(GLOSSARY.map((t) => [t.id, t]));
export const TERM_CATS = ['政治', '経済', '社会', '宗教・思想', '文化', '戦争・外交', '科学・技術'];

const byEvent = new Map();
for (const t of GLOSSARY) for (const e of t.evs) {
  if (!byEvent.has(e)) byEvent.set(e, []);
  byEvent.get(e).push(t);
}
/** Terms whose explanation refers to the event, plus terms named in its deep dive. */
export function termsOfEvent(e) {
  const out = new Set(byEvent.get(e) || []);
  for (const name of e.deep?.terms || []) {
    const t = GLOSSARY.find((g) => g.term === name || (g.aliases || []).includes(name));
    if (t) out.add(t);
  }
  return [...out];
}
