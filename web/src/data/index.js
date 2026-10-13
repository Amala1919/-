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
import pk from './countries/pk.js';
import bd from './countries/bd.js';
import af from './countries/af.js';
import kz from './countries/kz.js';
import la from './countries/la.js';
import tw from './countries/tw.js';
import sy from './countries/sy.js';
import lb from './countries/lb.js';
import il from './countries/il.js';
import ye from './countries/ye.js';
import ge from './countries/ge.js';
import am from './countries/am.js';
import dz from './countries/dz.js';
import ly from './countries/ly.js';
import sd from './countries/sd.js';
import tz from './countries/tz.js';
import cd from './countries/cd.js';
import sn from './countries/sn.js';
import mg from './countries/mg.js';
import ua from './countries/ua.js';
import ro from './countries/ro.js';
import bg from './countries/bg.js';
import is from './countries/is.js';
import rs from './countries/rs.js';
import hr from './countries/hr.js';
import lt from './countries/lt.js';
import ve from './countries/ve.js';
import bo from './countries/bo.js';
import ec from './countries/ec.js';
import gt from './countries/gt.js';
import jm from './countries/jm.js';
import pa from './countries/pa.js';
import pg from './countries/pg.js';
import fj from './countries/fj.js';
import ae from './countries/ae.js';
import om from './countries/om.js';
import kw from './countries/kw.js';
import az from './countries/az.js';
import bt from './countries/bt.js';
import kg from './countries/kg.js';
import tj from './countries/tj.js';
import bn from './countries/bn.js';
import ee from './countries/ee.js';
import lv from './countries/lv.js';
import sk from './countries/sk.js';
import si from './countries/si.js';
import ba from './countries/ba.js';
import al from './countries/al.js';
import by from './countries/by.js';
import cy from './countries/cy.js';
import mt from './countries/mt.js';
import ao from './countries/ao.js';
import mz from './countries/mz.js';
import ug from './countries/ug.js';
import rw from './countries/rw.js';
import cm from './countries/cm.js';
import bj from './countries/bj.js';
import bw from './countries/bw.js';
import na from './countries/na.js';
import ci from './countries/ci.js';
import uy from './countries/uy.js';
import py from './countries/py.js';
import dom from './countries/do.js';
import cr from './countries/cr.js';
import ni from './countries/ni.js';
import hn from './countries/hn.js';
import tl from './countries/tl.js';
import so from './countries/so.js';
import zm from './countries/zm.js';
import mw from './countries/mw.js';
import mr from './countries/mr.js';
import ne from './countries/ne.js';
import td from './countries/td.js';
import gn from './countries/gn.js';
import sl from './countries/sl.js';
import lr from './countries/lr.js';
import er from './countries/er.js';
import dj from './countries/dj.js';
import ga from './countries/ga.js';
import cg from './countries/cg.js';
import mk from './countries/mk.js';
import me from './countries/me.js';
import md from './countries/md.js';
import lu from './countries/lu.js';
import tm from './countries/tm.js';
import qa from './countries/qa.js';
import sg from './countries/sg.js';
import sv from './countries/sv.js';
import bz from './countries/bz.js';
import bs from './countries/bs.js';
import tt from './countries/tt.js';
import gy from './countries/gy.js';
import sr from './countries/sr.js';
import ws from './countries/ws.js';
import to from './countries/to.js';
import vu from './countries/vu.js';
import sb from './countries/sb.js';

export { ERAS, ERA_BY_ID, eraOfYear, PEOPLE, PERSON_BY_ID };

export const COUNTRIES = [
  jp, cn, kr, tw, mn, kz, kg, tj, inn, pk, bd, np, bt, lk, mm, vn, th, la, kh, mys, sg, bn, idn, ph, tl, uz, tm, af,
  ir, iq, sy, lb, il, jo, tr, cy, ge, am, az, sa, kw, ae, om, qa, ye, eg, ly, tn, dz, ma, mr, sd, er, dj, so, et, ml, ne, td, sn, gn, sl, lr, ci, gh, bj, ng, cm, ga, cg, cd, ug, rw, ke, tz, mw, zm, ao, mz, mg, na, bw, za, zw,
  gr, it, mt, fr, gb, ie, is, de, es, pt, nl, be, lu, ch, at, cz, sk, hu, pl, lt, lv, ee, dk, no, se, fi, ru, by, ua, md, ro, bg, rs, hr, si, ba, me, al, mk,
  us, ca, mx, gt, bz, sv, hn, ni, cr, pa, bs, cu, jm, ht, dom, tt, co, ve, gy, sr, ec, br, pe, bo, py, uy, ar, cl, au, nz, pg, sb, vu, fj, ws, to,
];
export const COUNTRY_BY_ID = Object.fromEntries(COUNTRIES.map((c) => [c.id, c]));

export const REGIONS = [
  { id: 'asia', name: 'アジア', countries: ['jp', 'cn', 'kr', 'tw', 'mn', 'kz', 'in', 'pk', 'bd', 'vn', 'th', 'la', 'kh', 'id', 'my', 'ph', 'mm', 'lk', 'np', 'uz', 'af', 'kg', 'tj', 'bt', 'bn', 'tl', 'tm', 'sg'] },
  { id: 'west', name: '西アジア・アフリカ', countries: ['ir', 'iq', 'sy', 'lb', 'il', 'jo', 'tr', 'ge', 'am', 'sa', 'ye', 'eg', 'ly', 'tn', 'dz', 'ma', 'sd', 'et', 'ml', 'sn', 'gh', 'ng', 'cd', 'ke', 'tz', 'mg', 'za', 'zw', 'cy', 'az', 'kw', 'ae', 'om', 'ci', 'bj', 'cm', 'ug', 'rw', 'ao', 'mz', 'na', 'bw', 'qa', 'so', 'zm', 'mw', 'mr', 'ne', 'td', 'gn', 'sl', 'lr', 'er', 'dj', 'ga', 'cg'] },
  { id: 'europe', name: 'ヨーロッパ', countries: ['gr', 'it', 'fr', 'gb', 'ie', 'is', 'de', 'es', 'pt', 'nl', 'be', 'ch', 'at', 'cz', 'hu', 'pl', 'lt', 'dk', 'no', 'se', 'fi', 'ru', 'ua', 'ro', 'bg', 'rs', 'hr', 'mt', 'sk', 'lv', 'ee', 'by', 'si', 'ba', 'al', 'mk', 'me', 'md', 'lu'] },
  { id: 'america', name: 'アメリカ大陸・オセアニア', countries: ['us', 'ca', 'mx', 'gt', 'cu', 'jm', 'ht', 'pa', 'co', 've', 'ec', 'br', 'pe', 'bo', 'ar', 'cl', 'au', 'nz', 'pg', 'fj', 'hn', 'ni', 'cr', 'do', 'py', 'uy', 'sv', 'bz', 'bs', 'tt', 'gy', 'sr', 'ws', 'to', 'vu', 'sb'] },
];

// Stable event ids: country + short hash of the title (so adding events never shifts ids).
const usedIds = new Set();
function eventId(cid, title) {
  let h = 2166136261;
  for (let i = 0; i < title.length; i++) {
    h ^= title.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  let id = `${cid}-${(h >>> 0).toString(36).slice(0, 5)}`;
  while (usedIds.has(id)) id += 'x';
  usedIds.add(id);
  return id;
}

// Flatten events with stable ids and derived fields.
export const EVENTS = [];
for (const c of COUNTRIES) {
  c.events.sort((a, b) => a.year - b.year);
  c.events.forEach((e, i) => {
    e.id = eventId(c.id, e.title);
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
