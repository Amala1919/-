import { PREF_BY_ID, PREFS } from '../data/pref-index.js';
import { PERSON_BY_ID } from '../data/index.js';
import { japanMapSVG, regionColor } from '../components/japanmap.js';
import { personChip } from '../components/avatar.js';
import { openEvent, openPerson } from '../components/sheets.js';
import { linkify } from '../components/linkify.js';
import { image, creditText } from '../images.js';
import { store } from '../store.js';
import { speak, stopSpeaking } from '../native.js';
import { go } from '../router.js';
import { esc, formatYear } from '../util.js';

export default function pref(root, { id }) {
  const p = PREF_BY_ID[id];
  if (!p) return go('/japan', { replace: true });
  const i = PREFS.indexOf(p);
  const prev = PREFS[(i - 1 + PREFS.length) % PREFS.length];
  const next = PREFS[(i + 1) % PREFS.length];
  const img = image(p.img);
  const c = regionColor(p.region);

  root.innerHTML = `
  <div class="lm-hero ${img ? '' : 'no-photo'}" style="--c:${c}" ${img ? `data-photo="${esc(p.img)}" data-caption="${esc(p.name)}"` : ''}>
    ${img ? `<img src="${img.src}" alt="${esc(p.name)}">` : '<div class="lm-hero-emoji">🗾</div>'}
    <button class="back-btn" data-back aria-label="戻る">‹</button>
    ${img ? `<div class="lm-hero-credit">📷 ${esc(creditText(img))}・Wikimedia Commons</div>` : ''}
  </div>
  <section class="pad">
    <div class="mi-meta"><span class="chip" style="background:${c}44">${esc(p.region)}</span><span class="chip">県庁所在地：${esc(p.capital)}</span></div>
    <h1 class="pref-title">${esc(p.name)}</h1>
    <div class="pref-catch">${esc(p.catch)}</div>
    <p class="lead">${linkify(p.intro, { exclude: ['country:jp'] })}</p>
    <button class="btn-pill" data-act="speak">🔊 読み上げ</button>
    <h3 class="sub">📍 歴史の舞台</h3>
    <div class="pref-spots">${p.spots
      .map(
        (s) => `<div class="pref-spot" style="--c:${c}">
        <div class="ps-year">${formatYear(s.year)}</div>
        <div class="ps-body"><b>${s.emoji || '📍'} ${esc(s.title)}</b><p>${linkify(s.desc, { exclude: ['country:jp'] })}</p>
          ${s.ev ? `<button class="th-link" data-event="${s.ev.id}">📖 ${esc(s.ev.title)} ›</button>` : ''}
          ${s.people.length ? `<div class="people-row">${s.people.map((pid) => personChip(PERSON_BY_ID[pid], 44)).join('')}</div>` : ''}
        </div>
      </div>`,
      )
      .join('')}</div>
    ${p.famous.length ? `<h3 class="sub">🧑‍🎓 ゆかりの人物</h3><div class="people-row hscroll">${p.famous.map((pid) => personChip(PERSON_BY_ID[pid], 56)).join('')}</div>` : ''}
    <h3 class="sub">🗺️ 場所</h3>
    <div class="jp-map-wrap small">${japanMapSVG(PREFS, { focus: p.id })}</div>
    <div class="ev-nav">
      <button class="btn-ghost" data-go="/pref/${prev.id}">‹ ${esc(prev.name)}</button>
      <button class="btn-ghost" data-go="/pref/${next.id}">${esc(next.name)} ›</button>
    </div>
    <button class="btn-wide" data-go="/japan">🗾 都道府県の一覧へ</button>
  </section>`;

  root.addEventListener('click', (ev) => {
    const t = ev.target.closest('button, [data-go]');
    if (!t) return;
    if (t.dataset.act === 'speak') speak(`${p.name}。${p.intro}`, store.settings().ttsRate);
    else if (t.dataset.event) openEvent(t.dataset.event);
    else if (t.dataset.person) openPerson(t.dataset.person);
    else if (t.dataset.go) go(t.dataset.go, { replace: /^\/pref\//.test(t.dataset.go) });
    else if (t.hasAttribute('data-back')) history.back();
  });
  return () => stopSpeaking();
}
