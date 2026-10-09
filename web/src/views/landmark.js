import { linkify } from '../components/linkify.js';
import { LANDMARK_BY_ID, LANDMARKS } from '../data/landmarks.js';
import { COUNTRY_BY_ID, EVENTS, eraOfYear } from '../data/index.js';
import { openEvent } from '../components/sheets.js';
import { toast } from '../components/ui.js';
import { locatorSVG } from '../components/geo.js';
import { store } from '../store.js';
import { go } from '../router.js';
import { esc, formatYear } from '../util.js';
import { speak, stopSpeaking } from '../native.js';
import { image, photoFigure, creditText } from '../images.js';

export default function landmark(root, { id }) {
  const m = LANDMARK_BY_ID[id];
  if (!m) return go('/landmarks', { replace: true });
  const c = COUNTRY_BY_ID[m.country];
  const era = eraOfYear(m.year);
  const related = EVENTS.filter((e) => e.model === id);
  const i = LANDMARKS.indexOf(m);
  const prev = LANDMARKS[(i - 1 + LANDMARKS.length) % LANDMARKS.length];
  const next = LANDMARKS[(i + 1) % LANDMARKS.length];
  const hero = image(m.img);
  const extra = m.extra.filter((t) => image(t));

  root.innerHTML = `
  <div class="lm-hero ${hero ? '' : 'no-photo'}" style="--c:${era.color}" ${hero ? `data-photo="${esc(m.img)}" data-caption="${esc(m.name)}"` : ''}>
    ${hero ? `<img src="${hero.src}" alt="${esc(m.name)}">` : `<div class="lm-hero-emoji">${era.emoji}</div>`}
    <button class="back-btn" data-back aria-label="戻る">‹</button>
    ${hero ? `<div class="lm-hero-credit">📷 ${esc(creditText(hero))}・Wikimedia Commons</div>` : ''}
  </div>
  <section class="pad model-info">
    <div class="mi-meta"><button class="chip chip-flag" data-country="${c.id}">${c.flag} ${esc(c.name)}</button><span class="chip" style="background:${era.color}55">${era.emoji} ${era.name}</span><span class="chip">${formatYear(m.year)}</span></div>
    <h1>${esc(m.name)}</h1>
    <p class="lead">${linkify(m.desc, { exclude: [`landmark:${m.id}`] })}</p>
    <button class="btn-pill" data-act="speak">🔊 読み上げ</button>
    <dl class="facts">${m.facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
    <h3 class="sub">📍 見どころ</h3>
    <div class="lm-highlights">${m.highlights
      .map((h, k) => {
        const img = image(h.img);
        return `<div class="lm-hl ${img ? 'has-photo' : ''}">
          ${img ? `<div class="lm-hl-photo" data-photo="${esc(h.img)}" data-caption="${esc(h.t)}"><img src="${img.thumb}" alt="" loading="lazy" decoding="async"></div>` : `<span class="spot-n">${k + 1}</span>`}
          <div><b>${esc(h.t)}</b><p>${linkify(h.d, { exclude: [`landmark:${m.id}`] })}</p></div>
        </div>`;
      })
      .join('')}</div>
    ${extra.length ? `<h3 class="sub">📷 ほかの写真</h3>${extra.map((t) => photoFigure(t, { caption: m.name })).join('')}` : ''}
    <h3 class="sub">🗺️ 場所</h3>
    <button class="lm-where" data-country="${c.id}"><span class="lm-loc">${locatorSVG(c.id, 84)}</span><span>${c.flag} <b>${esc(c.name)}</b><small>${esc(c.region)}・この国の歴史を見る ›</small></span></button>
    ${related.length ? `<h3 class="sub">📖 関連する出来事</h3>${related.map((e) => `<button class="btn-wide" data-event="${e.id}">${e.emoji} ${esc(e.title)}（${formatYear(e.year, e.approx)}）</button>`).join('')}` : ''}
    <div class="ev-nav">
      <button class="btn-ghost" data-go="/landmark/${prev.id}">‹ ${esc(prev.name)}</button>
      <button class="btn-ghost" data-go="/landmark/${next.id}">${esc(next.name)} ›</button>
    </div>
  </section>`;

  if (!store.state.models[id]) {
    store.viewModel(id);
    toast(`「${esc(m.name)}」を見学！ <b>+3 XP</b>`, { icon: '🔭', ms: 1600 });
  }

  root.addEventListener('click', (ev) => {
    const t = ev.target.closest('button');
    if (!t) return;
    if (t.dataset.act === 'speak') speak(`${m.name}。${m.desc}`, store.settings().ttsRate);
    else if (t.dataset.event) openEvent(t.dataset.event);
    else if (t.dataset.country) go('/country/' + t.dataset.country);
    else if (t.dataset.go) go(t.dataset.go, { replace: true });
    else if (t.hasAttribute('data-back')) history.back();
  });

  return () => stopSpeaking();
}
