import { ERAS, ERA_BY_ID, eventsInEra, COUNTRY_BY_ID } from '../data/index.js';
import { MODELS } from '../three/models/index.js';
import { eraBannerSVG } from '../components/banner.js';
import { worldMapSVG } from '../components/geo.js';
import { eventCard } from '../components/ui.js';
import { eraOfYear } from '../data/eras.js';
import { go } from '../router.js';
import { esc, formatYear } from '../util.js';
import { speak, stopSpeaking } from '../native.js';
import { store } from '../store.js';
import { linkify } from '../components/linkify.js';
import { personChip } from '../components/avatar.js';
import { openEvent, openPerson } from '../components/sheets.js';
import { FAMILIES } from '../data/relations.js';
import { PEOPLE } from '../data/index.js';

export default function era(root, { id }) {
  const e = ERA_BY_ID[id];
  if (!e) return go('/timeline', { replace: true });
  const idx = ERAS.indexOf(e);
  const evs = eventsInEra(id);
  const countries = [...new Set(evs.map((x) => x.country))];
  const models = MODELS.filter((m) => eraOfYear(m.year).id === id);
  let filter = 'all';
  const evIds = new Set(evs.map((x) => x.id));
  const people = PEOPLE.filter((p) => p.events.some((x) => evIds.has(x)));
  const fams = FAMILIES.filter((f) => f.start < e.end && f.end > e.start && eraOfYear(Math.round((f.start + f.end) / 2)).id === id);

  root.innerHTML = `
  <div class="era-hero" style="--c:${e.color}">
    ${eraBannerSVG(id, { height: 190 })}
    <button class="back-btn" data-back aria-label="戻る">‹</button>
    <div class="era-hero-text">
      <div class="era-range">${e.start < -3000 ? '〜' + formatYear(e.end) : `${formatYear(e.start)} 〜 ${e.end >= 2030 ? '現在' : formatYear(e.end)}`}</div>
      <h1>${e.emoji} ${e.name}</h1>
      <p>${esc(e.tagline)}</p>
    </div>
  </div>
  <section class="pad">
    <p class="lead">${linkify(e.overview)}</p>
    <button class="story-cta" data-go="/story/era/${id}"><span>📽️</span><span><b>ストーリーで見る</b><small>${evs.length}枚の紙芝居・自動ナレーション付き</small></span><span class="model-cta-go">›</span></button>
    <button class="btn-pill" data-act="speak">🔊 読み上げ</button>
    <div class="chips">${e.keywords.map((k) => `<span class="kw">#${esc(k)}</span>`).join('')}</div>
    <h3 class="sub">🗺️ この時代に登場する国・地域</h3>
    <div class="map-wrap">${worldMapSVG({ highlight: new Map(countries.map((c) => [c, true])), markers: countries.map((c) => ({ lat: COUNTRY_BY_ID[c].lat, lon: COUNTRY_BY_ID[c].lon, color: COUNTRY_BY_ID[c].color })), width: 360, height: 185 })}</div>
    <div class="chips filter" id="filter">
      <button class="chip on" data-f="all">すべて (${evs.length})</button>
      ${countries.map((c) => `<button class="chip" data-f="${c}">${COUNTRY_BY_ID[c].flag} ${esc(COUNTRY_BY_ID[c].name.replace(/（.*）/, ''))}</button>`).join('')}
    </div>
    <div class="card-list" id="list"></div>
    ${people.length ? `<h3 class="sub">🧑‍🎓 この時代の人物（${people.length}）</h3><div class="people-row hscroll">${people.map((p) => personChip(p, 56)).join('')}</div>` : ''}
    ${fams.length ? `<h3 class="sub">🌳 この時代の家系図</h3><div class="card-list">${fams.map((f) => `<button class="fam-link" data-go="/family/${f.id}"><span class="fam-emoji">${f.emoji}</span><span><b>${esc(f.name)}</b><small>${f.members.length}人のつながり</small></span></button>`).join('')}</div>` : ''}
    ${models.length ? `<h3 class="sub">🏛️ この時代の3Dモデル</h3><div class="hscroll">${models.map((m) => `<button class="model-chip" data-go="/model/${m.id}"><span>${COUNTRY_BY_ID[m.country].flag}</span>${esc(m.name)}</button>`).join('')}</div>` : ''}
    <button class="btn-wide accent" data-go="/quiz/run/era/${id}">❓ ${e.name}のクイズに挑戦</button>
    <div class="ev-nav">
      ${idx > 0 ? `<button class="btn-ghost" data-go="/era/${ERAS[idx - 1].id}">‹ ${ERAS[idx - 1].name}</button>` : '<span></span>'}
      ${idx < ERAS.length - 1 ? `<button class="btn-ghost" data-go="/era/${ERAS[idx + 1].id}">${ERAS[idx + 1].name} ›</button>` : '<span></span>'}
    </div>
  </section>`;

  const list = root.querySelector('#list');
  const renderList = () => {
    const items = filter === 'all' ? evs : evs.filter((x) => x.country === filter);
    list.innerHTML = items.map((x) => eventCard(x)).join('');
  };
  renderList();

  root.addEventListener('click', (ev) => {
    const t = ev.target.closest('button');
    if (!t) return;
    if (t.dataset.f) {
      filter = t.dataset.f;
      root.querySelectorAll('#filter .chip').forEach((c) => c.classList.toggle('on', c === t));
      renderList();
    } else if (t.dataset.event) openEvent(t.dataset.event);
    else if (t.dataset.person) openPerson(t.dataset.person);
    else if (t.dataset.go) go(t.dataset.go);
    else if (t.hasAttribute('data-back')) history.back();
    else if (t.dataset.act === 'speak') speak(`${e.name}。${e.overview}`, store.settings().ttsRate);
  });
  return () => stopSpeaking();
}
