import { ERAS, ERA_BY_ID, eraOfYear } from './eras.js';
import { PEOPLE, PERSON_BY_ID } from './people.js';
import { EVENT_IMG, PERSON_IMG, COUNTRY_IMG } from './wiki.js';
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
import vn from './countries/vn.js';
import th from './countries/th.js';
import kh from './countries/kh.js';
import idn from './countries/id.js';
import sa from './countries/sa.js';
import et from './countries/et.js';
import za from './countries/za.js';
import zw from './countries/zw.js';
import pt from './countries/pt.js';
import nl from './countries/nl.js';
import at from './countries/at.js';
import pl from './countries/pl.js';
import no from './countries/no.js';
import br from './countries/br.js';
import ca from './countries/ca.js';
import au from './countries/au.js';
import uz from './countries/uz.js';
import ph from './countries/ph.js';
import mm from './countries/mm.js';
import lk from './countries/lk.js';
import np from './countries/np.js';
import mys from './countries/my.js';
import jo from './countries/jo.js';
import ma from './countries/ma.js';
import tn from './countries/tn.js';
import ng from './countries/ng.js';
import ke from './countries/ke.js';
import gh from './countries/gh.js';
import ch from './countries/ch.js';
import hu from './countries/hu.js';
import cz from './countries/cz.js';
import se from './countries/se.js';
import ie from './countries/ie.js';
import fi from './countries/fi.js';
import be from './countries/be.js';
import dk from './countries/dk.js';
import ar from './countries/ar.js';
import cl from './countries/cl.js';
import cu from './countries/cu.js';
import co from './countries/co.js';
import ht from './countries/ht.js';
import nz from './countries/nz.js';

export { ERAS, ERA_BY_ID, eraOfYear, PEOPLE, PERSON_BY_ID };

export const COUNTRIES = [
  jp, cn, kr, mn, inn, vn, th, kh, idn, mys, ph, mm, lk, np, uz,
  ir, iq, tr, sa, jo, eg, ma, tn, et, ml, gh, ng, ke, za, zw,
  gr, it, fr, gb, ie, de, es, pt, nl, be, ch, at, cz, hu, pl, dk, no, se, fi, ru,
  us, ca, mx, cu, ht, co, br, pe, ar, cl, au, nz,
];
export const COUNTRY_BY_ID = Object.fromEntries(COUNTRIES.map((c) => [c.id, c]));

export const REGIONS = [
  { id: 'asia', name: 'アジア', countries: ['jp', 'cn', 'kr', 'mn', 'in', 'vn', 'th', 'kh', 'id', 'my', 'ph', 'mm', 'lk', 'np', 'uz'] },
  { id: 'west', name: '西アジア・アフリカ', countries: ['ir', 'iq', 'tr', 'sa', 'jo', 'eg', 'ma', 'tn', 'et', 'ml', 'gh', 'ng', 'ke', 'za', 'zw'] },
  { id: 'europe', name: 'ヨーロッパ', countries: ['gr', 'it', 'fr', 'gb', 'ie', 'de', 'es', 'pt', 'nl', 'be', 'ch', 'at', 'cz', 'hu', 'pl', 'dk', 'no', 'se', 'fi', 'ru'] },
  { id: 'america', name: 'アメリカ大陸・オセアニア', countries: ['us', 'ca', 'mx', 'cu', 'ht', 'co', 'br', 'pe', 'ar', 'cl', 'au', 'nz'] },
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
    e.img = e.img || EVENT_IMG[c.id]?.[e.title] || null;
    EVENTS.push(e);
  });
}
EVENTS.sort((a, b) => a.year - b.year);
export const EVENT_BY_ID = Object.fromEntries(EVENTS.map((e) => [e.id, e]));

for (const c of COUNTRIES) c.img = c.img || COUNTRY_IMG[c.id] || null;

// Reverse index: person -> events
for (const p of PEOPLE) {
  p.events = [];
  p.img = p.img || PERSON_IMG[p.id] || null;
}
for (const e of EVENTS) for (const pid of e.people) PERSON_BY_ID[pid]?.events.push(e.id);

export function eventsInEra(eraId) {
  return EVENTS.filter((e) => e.era === eraId);
}

export function eventsNear(year, span) {
  return EVENTS.filter((e) => Math.abs(e.year - year) <= span);
}
