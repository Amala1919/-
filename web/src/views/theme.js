import { THEME_BY_ID, THEMES } from '../data/theme-index.js';
import { COUNTRY_BY_ID, PERSON_BY_ID } from '../data/index.js';
import { LANDMARK_BY_ID } from '../data/landmarks.js';
import { eventCard } from '../components/ui.js';
import { personChip } from '../components/avatar.js';
import { landmarkChip } from '../components/landmarkcard.js';
import { openEvent, openPerson } from '../components/sheets.js';
import { linkify } from '../components/linkify.js';
import { worldMapSVG } from '../components/geo.js';
import { photoFigure } from '../images.js';
import { store } from '../store.js';
import { speak, stopSpeaking } from '../native.js';
import { go } from '../router.js';
import { esc, shortYear, alpha } from '../util.js';

export default function theme(root, { id }) {
  const t = THEME_BY_ID[id];
  if (!t) return go('/themes', { replace: true });
  const i = THEMES.indexOf(t);
  const prev = THEMES[(i - 1 + THEMES.length) % THEMES.length];
  const next = THEMES[(i + 1) % THEMES.length];
  const lms = (t.landmarks || []).map((l) => LANDMARK_BY_ID[l]).filter(Boolean);
  const ppl = t.people.map((p) => PERSON_BY_ID[p]);
  const cts = t.countries.filter((c) => COUNTRY_BY_ID[c]);

  root.innerHTML = `
  <header class="page-head compact th-head" style="--c:${t.color}">
    <button class="back-btn inline" data-back aria-label="戻る">‹</button>
    <h1>${t.emoji} ${esc(t.name)}</h1>
    <p>テーマ史・${shortYear(t.start)}〜${shortYear(t.end)}・${t.allEvents.length}の出来事・${cts.length}か国</p>
  </header>
  <section class="pad">
    ${photoFigure(t.img, { caption: t.name })}
    <p class="lead">${linkify(t.intro)}</p>
    <button class="btn-pill" data-act="speak">🔊 読み上げ</button>
    <div class="map-wrap">${worldMapSVG({ highlight: new Map(cts.map((c) => [c, alpha(t.color, 0.85)])), markers: cts.map((c) => ({ lat: COUNTRY_BY_ID[c].lat, lon: COUNTRY_BY_ID[c].lon, color: '#fff' })), width: 360, height: 185 })}</div>
    <div class="chips">${cts.map((c) => `<button class="chip" data-go="/country/${c}">${COUNTRY_BY_ID[c].flag} ${esc(COUNTRY_BY_ID[c].name.replace(/（.*）/, ''))}</button>`).join('')}</div>
    <ol class="th-sections">
      ${t.sections
        .map(
          (s, k) => `<li class="th-sec" style="--c:${t.color}">
        <div class="th-sec-n">${k + 1}</div>
        <div class="th-sec-body">
          <h3>${esc(s.title)}</h3>
          <p>${linkify(s.text)}</p>
          <div class="card-list">${s.evs.map((e) => eventCard(e, { compact: true })).join('')}</div>
        </div>
      </li>`,
        )
        .join('')}
    </ol>
    ${ppl.length ? `<h3 class="sub">🧑‍🎓 このテーマの人物</h3><div class="people-row hscroll">${ppl.map((p) => personChip(p, 56)).join('')}</div>` : ''}
    ${lms.length ? `<h3 class="sub">🏛️ 関係する名所</h3><div class="hscroll lm-row">${lms.map((m) => landmarkChip(m)).join('')}</div>` : ''}
    <button class="btn-wide accent" data-go="/quiz/run/theme/${t.id}">❓ 「${esc(t.name)}」のクイズに挑戦</button>
    <div class="ev-nav">
      <button class="btn-ghost" data-go="/theme/${prev.id}">‹ ${esc(prev.name)}</button>
      <button class="btn-ghost" data-go="/theme/${next.id}">${esc(next.name)} ›</button>
    </div>
  </section>`;

  root.addEventListener('click', (ev) => {
    const b = ev.target.closest('button');
    if (!b) return;
    if (b.dataset.act === 'speak') speak(`${t.name}。${t.intro}`, store.settings().ttsRate);
    else if (b.dataset.event) openEvent(b.dataset.event);
    else if (b.dataset.person) openPerson(b.dataset.person);
    else if (b.dataset.go) go(b.dataset.go);
    else if (b.hasAttribute('data-back')) history.back();
  });
  return () => stopSpeaking();
}
