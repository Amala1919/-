// 都道府県から見る日本史
import PREFS from './prefectures.js';
import { COUNTRY_BY_ID, PERSON_BY_ID } from './index.js';

export const PREF_REGIONS = ['北海道', '東北', '関東', '中部', '近畿', '中国', '四国', '九州・沖縄'];
for (const p of PREFS) {
  for (const s of p.spots) {
    s.ev = s.event ? COUNTRY_BY_ID[s.event[0]]?.events.find((e) => e.title === s.event[1]) || null : null;
    s.people = (s.people || []).filter((id) => PERSON_BY_ID[id]);
  }
  p.famous = (p.famous || []).filter((id) => PERSON_BY_ID[id]);
}
export { PREFS };
export const PREF_BY_ID = Object.fromEntries(PREFS.map((p) => [p.id, p]));

/** Prefectures connected to a person (famous or appearing in a spot). */
export function prefsOfPerson(pid) {
  return PREFS.filter((p) => p.famous.includes(pid) || p.spots.some((s) => s.people.includes(pid)));
}
/** Prefectures whose spots refer to the event. */
export function prefsOfEvent(e) {
  return PREFS.filter((p) => p.spots.some((s) => s.ev === e));
}
