// Derived "connections" between countries and people, based on who/what each text mentions.
import { COUNTRIES, EVENTS, PEOPLE, COUNTRY_BY_ID, PERSON_BY_ID } from '../data/index.js';
import { mentions } from './linkify.js';

let countryGraph = null;

/** Countries most connected to `cid`: [{ country, count }] */
export function connectedCountries(cid, n = 8) {
  if (!countryGraph) {
    countryGraph = new Map(COUNTRIES.map((c) => [c.id, new Map()]));
    const bump = (a, b, k = 1) => {
      if (a === b || !countryGraph.has(a) || !countryGraph.has(b)) return;
      countryGraph.get(a).set(b, (countryGraph.get(a).get(b) || 0) + k);
      countryGraph.get(b).set(a, (countryGraph.get(b).get(a) || 0) + k);
    };
    for (const e of EVENTS) {
      for (const t of mentions(e.title + '。' + e.detail)) {
        const [kind, id] = t.split(':');
        if (kind === 'country') bump(e.country, id);
        if (kind === 'person' && PERSON_BY_ID[id]) bump(e.country, PERSON_BY_ID[id].country);
      }
      for (const pid of e.people) if (PERSON_BY_ID[pid]) bump(e.country, PERSON_BY_ID[pid].country);
    }
  }
  return [...countryGraph.get(cid).entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([id, count]) => ({ country: COUNTRY_BY_ID[id], count }));
}

/** People mentioned in a person's description or events. */
export function mentionedPeople(p) {
  const ids = new Set();
  const texts = [p.desc, ...p.events.map((eid) => EVENTS.find((e) => e.id === eid)?.detail || '')];
  for (const t of texts) for (const m of mentions(t)) if (m.startsWith('person:')) ids.add(m.slice(7));
  ids.delete(p.id);
  return [...ids].map((i) => PERSON_BY_ID[i]).filter(Boolean);
}

export { PEOPLE };
