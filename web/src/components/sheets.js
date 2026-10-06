// Detail sheets for events and people.
import { EVENTS, EVENT_BY_ID, COUNTRY_BY_ID, ERA_BY_ID, PERSON_BY_ID } from '../data/index.js';
import { MODEL_BY_ID } from '../three/models/index.js';
import { openSheet, closeAllSheets, eventCard, toast } from './ui.js';
import { avatarSVG } from './avatar.js';
import { worldMapSVG } from './geo.js';
import { store } from '../store.js';
import { esc, formatYear, alpha } from '../util.js';
import { speak, stopSpeaking, share, isSpeaking } from '../native.js';
import { go } from '../router.js';
import { sfx } from '../audio.js';
import { photoFigure, image, openLightbox } from '../images.js';

function contemporaries(e, n = 6) {
  const span = e.year < -1000 ? 400 : e.year < 0 ? 150 : e.year < 1500 ? 80 : 40;
  return EVENTS.filter((x) => x.country !== e.country && Math.abs(x.year - e.year) <= span)
    .sort((a, b) => Math.abs(a.year - e.year) - Math.abs(b.year - e.year))
    .slice(0, n)
    .sort((a, b) => a.year - b.year);
}

function eventHTML(e) {
  const c = COUNTRY_BY_ID[e.country];
  const era = ERA_BY_ID[e.era];
  const idx = c.events.indexOf(e);
  const prev = c.events[idx - 1];
  const next = c.events[idx + 1];
  const model = e.model && MODEL_BY_ID[e.model];
  const ppl = e.people.map((id) => PERSON_BY_ID[id]).filter(Boolean);
  const same = contemporaries(e);
  const fav = store.isFavorite(e.id);
  return `
  <div class="ev-hero" style="--era:${era.color};--era-a:${alpha(era.color, 0.35)}">
    <div class="ev-hero-emoji">${e.emoji}</div>
    <div class="ev-hero-meta">
      <button class="chip chip-flag" data-country="${c.id}">${c.flag} ${esc(c.name)}</button>
      <button class="chip" data-era="${era.id}" style="background:${alpha(era.color, 0.3)}">${era.emoji} ${era.name}</button>
    </div>
    <div class="ev-year">${formatYear(e.year, e.approx)}</div>
    <h2 class="ev-title">${esc(e.title)}</h2>
    <p class="ev-sum">${esc(e.summary)}</p>
  </div>
  <div class="ev-actions">
    <button class="btn-pill" data-act="speak">🔊 読み上げ</button>
    <button class="btn-pill ${fav ? 'on' : ''}" data-act="fav">${fav ? '★' : '☆'} お気に入り</button>
    <button class="btn-pill" data-act="share">📤 共有</button>
  </div>
  <div class="ev-body">
    ${photoFigure(e.img, { cls: 'ev-photo' })}
    <p class="ev-detail">${esc(e.detail)}</p>
    ${e.point ? `<div class="point-box"><div class="point-label">💡 ここがポイント</div><div>${esc(e.point)}</div></div>` : ''}
    ${model ? `<button class="model-cta" data-model="${model.id}"><span class="model-cta-icon">🧊</span><span><b>3Dで見る</b><br><small>${esc(model.name)}</small></span><span class="model-cta-go">›</span></button>` : ''}
    ${ppl.length ? `<h3 class="sub">関連する人物</h3><div class="people-row">${ppl.map((p) => `<button class="person-chip" data-person="${p.id}">${avatarSVG(p, 56)}<span>${esc(p.name)}</span></button>`).join('')}</div>` : ''}
    <h3 class="sub">🌍 同じころの世界</h3>
    <p class="hint">「${esc(e.title)}」と同じ時代に、ほかの国では…</p>
    <div class="map-wrap">${worldMapSVG({ highlight: new Map([[e.country, true], ...same.map((s) => [s.country, alpha(COUNTRY_BY_ID[s.country].color, 0.65)])]), markers: [{ lat: c.lat, lon: c.lon, color: '#fff' }], width: 360, height: 180 })}</div>
    <div class="card-list">${same.map((s) => eventCard(s, { compact: true })).join('') || '<p class="hint">近い時代の出来事はまだ登録されていません。</p>'}</div>
    <div class="ev-nav">
      ${prev ? `<button class="btn-ghost" data-nav="${prev.id}">‹ ${esc(prev.title)}</button>` : '<span></span>'}
      ${next ? `<button class="btn-ghost" data-nav="${next.id}">${esc(next.title)} ›</button>` : '<span></span>'}
    </div>
    <button class="btn-wide" data-country="${c.id}">${c.flag} ${esc(c.name)}の歴史をすべて見る</button>
  </div>`;
}

export function openEvent(id) {
  const e = EVENT_BY_ID[id];
  if (!e) return;
  sfx.page();
  openSheet((body) => {
    const render = (ev) => {
      body.innerHTML = eventHTML(ev);
      body.scrollTop = 0;
      if (store.markRead(ev.id)) {
        toast(`「${esc(ev.title)}」を読んだ！ <b>+5 XP</b>`, { icon: '📖', ms: 1800 });
        document.querySelectorAll(`[data-event="${ev.id}"]`).forEach((n) => n.classList.add('read'));
      }
      body.dataset.event = ev.id;
    };
    render(e);
    const onClick = (evt) => {
      const t = evt.target.closest('button');
      if (!t) return;
      const ev = EVENT_BY_ID[body.dataset.event];
      if (t.dataset.act === 'speak') {
        if (isSpeaking()) {
          stopSpeaking();
          t.textContent = '🔊 読み上げ';
        } else {
          speak(`${formatYear(ev.year, ev.approx)}。${ev.title}。${ev.detail}${ev.point ? 'ここがポイント。' + ev.point : ''}`, store.settings().ttsRate);
          t.textContent = '⏹ 停止';
        }
      } else if (t.dataset.act === 'fav') {
        const on = store.toggleFavorite(ev.id);
        t.classList.toggle('on', on);
        t.textContent = `${on ? '★' : '☆'} お気に入り`;
      } else if (t.dataset.act === 'share') {
        share(`【クロノアトラス】${formatYear(ev.year, ev.approx)} ${ev.title} — ${ev.summary}`);
      } else if (t.dataset.nav) {
        stopSpeaking();
        render(EVENT_BY_ID[t.dataset.nav]);
      } else if (t.dataset.event) {
        openEvent(t.dataset.event);
      } else if (t.dataset.person) {
        openPerson(t.dataset.person);
      } else if (t.dataset.model) {
        closeAllSheets();
        go('/model/' + t.dataset.model);
      } else if (t.dataset.country) {
        closeAllSheets();
        go('/country/' + t.dataset.country);
      } else if (t.dataset.era) {
        closeAllSheets();
        go('/era/' + t.dataset.era);
      }
    };
    body.addEventListener('click', onClick);
    return () => stopSpeaking();
  });
}

export function openPerson(id) {
  const p = PERSON_BY_ID[id];
  if (!p) return;
  store.viewPerson(id);
  sfx.page();
  const c = COUNTRY_BY_ID[p.country];
  const life = p.life || `${formatYear(p.born)}〜${formatYear(p.died)}`;
  const evs = p.events.map((x) => EVENT_BY_ID[x]);
  openSheet((body) => {
    body.innerHTML = `
      <div class="person-hero" style="--c:${c.color}">
        ${image(p.img) ? `<div class="person-photo" data-photo="${esc(p.img)}" data-caption="${esc(p.name)}"><img src="${image(p.img).src}" alt="${esc(p.name)}"><span class="pp-avatar">${avatarSVG(p, 52)}</span></div>` : `<div class="person-avatar">${avatarSVG(p, 132)}</div>`}
        <h2>${esc(p.name)}</h2>
        <div class="person-title">${esc(p.title)}</div>
        <div class="person-life">${esc(life)}</div>
        <button class="chip chip-flag" data-country="${c.id}">${c.flag} ${esc(c.name)}</button>
      </div>
      <div class="ev-body">
        <p class="ev-detail">${esc(p.desc)}</p>
        ${image(p.img) ? `<p class="ph-credit-line">📷 肖像：${esc(image(p.img).artist || '作者不明')} / ${esc(image(p.img).license)}・Wikimedia Commons</p>` : ''}
        ${p.quote ? `<blockquote class="quote">“${esc(p.quote)}”</blockquote>` : ''}
        <div class="ev-actions"><button class="btn-pill" data-act="speak">🔊 読み上げ</button></div>
        ${evs.length ? `<h3 class="sub">登場する出来事</h3><div class="card-list">${evs.map((e) => eventCard(e)).join('')}</div>` : ''}
      </div>`;
    body.addEventListener('click', (evt) => {
      const t = evt.target.closest('button');
      if (!t) return;
      if (t.dataset.act === 'speak') speak(`${p.name}。${p.title}。${p.desc}`, store.settings().ttsRate);
      else if (t.dataset.event) openEvent(t.dataset.event);
      else if (t.dataset.country) {
        closeAllSheets();
        go('/country/' + t.dataset.country);
      }
    });
    return () => stopSpeaking();
  });
}
