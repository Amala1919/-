// Thematic history units ("テーマ史") with their events resolved from [country, title].
import THEMES from './themes.js';
import { COUNTRY_BY_ID, PERSON_BY_ID } from './index.js';

for (const t of THEMES) {
  for (const s of t.sections) {
    s.evs = s.events
      .map(([cid, title]) => COUNTRY_BY_ID[cid]?.events.find((e) => e.title === title))
      .filter(Boolean);
  }
  t.allEvents = [...new Set(t.sections.flatMap((s) => s.evs))].sort((a, b) => a.year - b.year);
  t.people = (t.people || []).filter((id) => PERSON_BY_ID[id]);
  t.start = t.allEvents.length ? t.allEvents[0].year : 0;
  t.end = t.allEvents.length ? t.allEvents[t.allEvents.length - 1].year : 0;
}

export { THEMES };
export const THEME_BY_ID = Object.fromEntries(THEMES.map((t) => [t.id, t]));

/** Themes that include the event. */
export function themesOfEvent(e) {
  return THEMES.filter((t) => t.allEvents.includes(e));
}
