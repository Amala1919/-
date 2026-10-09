// Cross-references between people, families, countries and events.
import { FAMILIES } from './families.js';
import { shortYear } from '../util.js';
import { PEOPLE, PERSON_BY_ID, EVENTS, EVENT_BY_ID, COUNTRY_BY_ID } from './index.js';

export { FAMILIES };
export const FAMILY_BY_ID = Object.fromEntries(FAMILIES.map((f) => [f.id, f]));

for (const f of FAMILIES) {
  f.kind = f.kind || 'family';
  for (const [pid] of f.members) if (!PERSON_BY_ID[pid]) console.warn('family member missing', f.id, pid);
  const ppl = f.members.map(([pid]) => PERSON_BY_ID[pid]).filter(Boolean);
  const now = new Date().getFullYear();
  const years = ppl.flatMap((p) => [p.born, p.died ?? (p.born != null ? now : null)]).filter((y) => y != null);
  f.start = Math.min(...years);
  f.end = Math.max(...years);
  f.period = `${shortYear(f.start)}〜${f.end >= now ? '現在' : shortYear(f.end)}`;
}

const female = (p) => !!p?.a?.f;

export function familiesOf(pid) {
  return FAMILIES.filter((f) => f.members.some(([m]) => m === pid));
}

/** Relatives of a person across all family trees: [{ person, label, kind }] */
export function relativesOf(pid) {
  const out = new Map();
  const add = (oid, label, kind) => {
    const person = PERSON_BY_ID[oid];
    if (!person || oid === pid) return;
    const prev = out.get(oid);
    if (!prev || (prev.kind === 'sibling' && kind !== 'sibling')) out.set(oid, { person, label, kind });
  };
  for (const f of FAMILIES) {
    for (const [a, b, type, label] of f.links) {
      if (a !== pid && b !== pid) continue;
      const self = a === pid;
      const o = self ? b : a;
      const op = PERSON_BY_ID[o];
      switch (type) {
        case 'parent':
          add(o, self ? (female(op) ? '娘' : '息子') : female(op) ? '母' : '父', self ? 'child' : 'parent');
          break;
        case 'spouse':
          add(o, label === 'パートナー' ? 'パートナー' : female(op) ? '妻' : '夫', 'spouse');
          break;
        case 'sibling':
          add(o, label || 'きょうだい', 'sibling');
          break;
        case 'descent':
          {
            const inner = (label || '').replace(/^子孫|[（）]/g, '');
            const tail = inner ? `（${inner}）` : '';
            add(o, self ? `子孫${tail}` : `祖先${tail}`, self ? 'descendant' : 'ancestor');
          }
          break;
        case 'adopt':
          add(o, self ? '養子' : '養父', self ? 'child' : 'parent');
          break;
        case 'teacher':
          add(o, self ? '弟子' : '師', self ? 'student' : 'teacher');
          break;
        case 'served':
          add(o, self ? label || '仕えた相手' : label === '盟友' ? '盟友' : '仕えた人', 'served');
          break;
        case 'rival':
          add(o, `対立：${label || ''}`, 'rival');
          break;
        default:
      }
    }
    // siblings: share a parent in this family
    const parents = f.links.filter(([, b, t]) => t === 'parent' && b === pid).map(([a]) => a);
    for (const par of parents) {
      for (const [a, b, t] of f.links) {
        if (t === 'parent' && a === par && b !== pid) add(b, female(PERSON_BY_ID[b]) ? '姉妹' : '兄弟', 'sibling');
      }
    }
  }
  const order = ['parent', 'ancestor', 'teacher', 'spouse', 'sibling', 'child', 'student', 'descendant', 'served', 'rival'];
  return [...out.values()].sort((x, y) => order.indexOf(x.kind) - order.indexOf(y.kind));
}

/** People who lived at the same time in other countries (largest overlap first). */
export function contemporariesOf(p, n = 8) {
  if (p.born == null || p.died == null) return [];
  return PEOPLE.filter((q) => q.id !== p.id && q.country !== p.country && q.born != null && q.died != null)
    .map((q) => ({ q, overlap: Math.min(p.died, q.died) - Math.max(p.born, q.born) }))
    .filter((x) => x.overlap > 5)
    .sort((a, b) => b.q.events.length - a.q.events.length || b.overlap - a.overlap)
    .slice(0, n)
    .map((x) => x.q);
}

/** People appearing in the same events as p. */
export function coActorsOf(pid) {
  const p = PERSON_BY_ID[pid];
  const ids = new Set();
  for (const eid of p.events) for (const o of EVENT_BY_ID[eid].people) if (o !== pid) ids.add(o);
  return [...ids].map((i) => PERSON_BY_ID[i]).filter(Boolean);
}

/** Events involving any member of the family. */
export function familyEvents(f) {
  const ids = new Set(f.members.map(([m]) => m));
  return EVENTS.filter((e) => e.people.some((p) => ids.has(p)));
}

/** Other families sharing members with f. */
export function relatedFamilies(f) {
  const ids = new Set(f.members.map(([m]) => m));
  return FAMILIES.filter((g) => g !== f && g.members.some(([m]) => ids.has(m)));
}

export function familiesOfCountry(cid) {
  return FAMILIES.filter((f) => f.countries.includes(cid));
}

export function countriesOfFamily(f) {
  const set = new Set(f.countries);
  for (const [m] of f.members) if (PERSON_BY_ID[m]) set.add(PERSON_BY_ID[m].country);
  return [...set].filter((c) => COUNTRY_BY_ID[c]);
}
