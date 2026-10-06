import { COUNTRY_BY_ID, ERA_BY_ID, PEOPLE } from '../data/index.js';
import { MODELS } from '../three/models/index.js';
import { countryShapeSVG, locatorSVG } from '../components/geo.js';
import { avatarSVG } from '../components/avatar.js';
import { openEvent, openPerson } from '../components/sheets.js';
import { store } from '../store.js';
import { go } from '../router.js';
import { esc, formatYear, alpha } from '../util.js';
import { speak, stopSpeaking } from '../native.js';

export default function country(root, { id }) {
  const c = COUNTRY_BY_ID[id];
  if (!c) return go('/countries', { replace: true });
  store.visitCountry(id);
  const people = PEOPLE.filter((p) => p.country === id || p.events.some((e) => e.startsWith(id + '-')));
  const models = MODELS.filter((m) => m.country === id);
  const read = store.readCount(id);
  const pct = read / c.events.length;
  const best = store.state.quiz.byCountry[id]?.best;

  let lastEra = null;
  const timeline = c.events
    .map((e) => {
      const era = ERA_BY_ID[e.era];
      let head = '';
      if (era.id !== lastEra) {
        lastEra = era.id;
        head = `<div class="tl-era" style="--c:${era.color}"><span>${era.emoji}</span>${era.name}</div>`;
      }
      const isRead = store.isRead(e.id);
      return `${head}<button class="tl-item ${isRead ? 'read' : ''}" data-event="${e.id}" style="--c:${era.color};--ca:${alpha(era.color, 0.15)}">
        <span class="tl-dot"></span>
        <span class="tl-year">${formatYear(e.year, e.approx)}</span>
        <span class="tl-card"><span class="tl-emoji">${e.emoji}</span><span><b>${esc(e.title)}</b><small>${esc(e.summary)}</small></span>${e.model ? '<span class="ec-chip">3D</span>' : ''}</span>
      </button>`;
    })
    .join('');

  root.innerHTML = `
  <div class="country-hero" style="--c:${c.color};--ca:${alpha(c.color, 0.35)}">
    <button class="back-btn" data-back aria-label="戻る">‹</button>
    <div class="ch-shape">${countryShapeSVG(id, { size: 170 })}</div>
    <div class="ch-locator">${locatorSVG(id, 84)}</div>
    <div class="ch-title"><span class="ch-flag">${c.flag}</span><div><h1>${esc(c.name)}</h1><div class="ch-en">${esc(c.en)} ・ ${esc(c.region)}</div></div></div>
  </div>
  <section class="pad">
    <p class="lead">${esc(c.intro)}</p>
    <button class="story-cta" data-go="/story/country/${id}"><span>📽️</span><span><b>ストーリーで見る</b><small>${c.events.length}枚の紙芝居・自動ナレーション付き</small></span><span class="model-cta-go">›</span></button>
    <button class="btn-pill" data-act="speak">🔊 読み上げ</button>
    <dl class="facts">${c.facts.map((f) => `<div><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`).join('')}</dl>
    <div class="progress-line"><span>学習の進み具合</span><b>${read} / ${c.events.length}</b><div class="bar"><i style="width:${pct * 100}%;background:${c.color}"></i></div></div>
    <h3 class="sub">📜 ${esc(c.name)}の歴史年表</h3>
    <div class="tl">${timeline}</div>
    ${people.length ? `<h3 class="sub">🧑‍🎓 ゆかりの人物</h3><div class="people-row hscroll">${people.map((p) => `<button class="person-chip" data-person="${p.id}">${avatarSVG(p, 60)}<span>${esc(p.name)}</span></button>`).join('')}</div>` : ''}
    ${models.length ? `<h3 class="sub">🏛️ 3Dで見る</h3><div class="hscroll">${models.map((m) => `<button class="model-chip" data-go="/model/${m.id}">🧊 ${esc(m.name)}</button>`).join('')}</div>` : ''}
    <button class="btn-wide accent" data-go="/quiz/run/country/${id}">❓ ${esc(c.name)}のクイズに挑戦${best != null ? `（最高 ${best}点）` : ''}</button>
  </section>`;

  root.addEventListener('click', (ev) => {
    const t = ev.target.closest('button');
    if (!t) return;
    if (t.dataset.event) openEvent(t.dataset.event);
    else if (t.dataset.person) openPerson(t.dataset.person);
    else if (t.dataset.go) go(t.dataset.go);
    else if (t.hasAttribute('data-back')) history.back();
    else if (t.dataset.act === 'speak') speak(`${c.name}。${c.intro}`, store.settings().ttsRate);
  });
  return () => stopSpeaking();
}
