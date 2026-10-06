import { ERAS, ERA_BY_ID, eraOfYear } from './eras.js';
import { PEOPLE, PERSON_BY_ID } from './people.js';
import jp from './countries/jp.js';
import cn from './countries/cn.js';
import kr from './countries/kr.js';
import mn from './countries/mn.js';
import inn from './countries/in.js';
import ir from './countries/ir.js';
import iq from './countries/iq.js';
import tr from './countries/tr.js';
import eg from './countries/eg.js';
import ml from './countries/ml.js';
import gr from './countries/gr.js';
import it from './countries/it.js';
import fr from './countries/fr.js';
import gb from './countries/gb.js';
import de from './countries/de.js';
import es from './countries/es.js';
import ru from './countries/ru.js';
import us from './countries/us.js';
import mx from './countries/mx.js';
import pe from './countries/pe.js';

export { ERAS, ERA_BY_ID, eraOfYear, PEOPLE, PERSON_BY_ID };

export const COUNTRIES = [jp, cn, kr, mn, inn, ir, iq, tr, eg, ml, gr, it, fr, gb, de, es, ru, us, mx, pe];
export const COUNTRY_BY_ID = Object.fromEntries(COUNTRIES.map((c) => [c.id, c]));

export const REGIONS = [
  { id: 'asia', name: 'アジア', countries: ['jp', 'cn', 'kr', 'mn', 'in'] },
  { id: 'west', name: '西アジア・アフリカ', countries: ['ir', 'iq', 'tr', 'eg', 'ml'] },
  { id: 'europe', name: 'ヨーロッパ', countries: ['gr', 'it', 'fr', 'gb', 'de', 'es', 'ru'] },
  { id: 'america', name: 'アメリカ大陸', countries: ['us', 'mx', 'pe'] },
];

// Flatten events with stable ids and derived fields.
export const EVENTS = [];
for (const c of COUNTRIES) {
  c.events.sort((a, b) => a.year - b.year);
  c.events.forEach((e, i) => {
    e.id = `${c.id}-${i}`;
    e.country = c.id;
    e.era = eraOfYear(e.year).id;
    e.people = e.people || [];
    EVENTS.push(e);
  });
}
EVENTS.sort((a, b) => a.year - b.year);
export const EVENT_BY_ID = Object.fromEntries(EVENTS.map((e) => [e.id, e]));

// Reverse index: person -> events
for (const p of PEOPLE) p.events = [];
for (const e of EVENTS) for (const pid of e.people) PERSON_BY_ID[pid]?.events.push(e.id);

export function eventsInEra(eraId) {
  return EVENTS.filter((e) => e.era === eraId);
}

export function eventsNear(year, span) {
  return EVENTS.filter((e) => Math.abs(e.year - year) <= span);
}
