// 比較年表: selected countries side by side, rows in chronological order.
import { COUNTRIES, COUNTRY_BY_ID, ERA_BY_ID, ERAS } from '../data/index.js';
import { openEvent } from '../components/sheets.js';
import { go } from '../router.js';
import { esc, shortYear, alpha } from '../util.js';

const KEY = 'chronoatlas.compare';
const MAX = 4;

function loadSel() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (Array.isArray(s) && s.length) return s.filter((id) => COUNTRY_BY_ID[id]).slice(0, MAX);
  } catch (e) {
    /* ignore */
  }
  return ['jp', 'cn', 'fr', 'us'];
}

export default function compare(root) {
  let sel = loadSel();
  let eraFilter = 'all';

  root.innerHTML = `
  <header class="page-head compact">
    <button class="back-btn inline" data-back aria-label="戻る">‹</button>
    <h1>🧭 比較年表</h1>
    <p>最大${MAX}つの国・地域をならべて、同じ時代に何が起きていたかを比べよう。</p>
  </header>
  <div class="chips pad-x" id="picker">
    ${COUNTRIES.map((c) => `<button class="chip pick" data-c="${c.id}" style="--c:${c.color}">${c.flag} ${esc(c.name.replace(/（.*）/, ''))}</button>`).join('')}
  </div>
  <div class="chips pad-x era-filter" id="eras">
    <button class="chip on" data-era="all">全時代</button>
    ${ERAS.map((e) => `<button class="chip" data-era="${e.id}" style="--c:${e.color}">${e.emoji} ${e.name}</button>`).join('')}
  </div>
  <div class="cmp" id="cmp"></div>`;

  const cmp = root.querySelector('#cmp');

  const render = () => {
    root.querySelectorAll('#picker .pick').forEach((b) => {
      const i = sel.indexOf(b.dataset.c);
      b.classList.toggle('on', i >= 0);
      b.style.background = i >= 0 ? alpha(COUNTRY_BY_ID[b.dataset.c].color, 0.35) : '';
    });
    if (!sel.length) {
      cmp.innerHTML = '<p class="hint pad">上のボタンから国を選んでください。</p>';
      return;
    }
    const cols = sel.map((id) => COUNTRY_BY_ID[id]);
    const evs = cols
      .flatMap((c) => c.events)
      .filter((e) => eraFilter === 'all' || e.era === eraFilter)
      .sort((a, b) => a.year - b.year || sel.indexOf(a.country) - sel.indexOf(b.country));
    let html = `<div class="cmp-head" style="grid-template-columns:52px repeat(${cols.length},1fr)"><span></span>${cols.map((c) => `<span style="--c:${c.color}">${c.flag}<b>${esc(c.name.replace(/（.*）/, ''))}</b></span>`).join('')}</div>`;
    let curEra = null;
    // Group events of the same row (close years) together so the table stays compact.
    let i = 0;
    while (i < evs.length) {
      const e = evs[i];
      if (e.era !== curEra) {
        curEra = e.era;
        const era = ERA_BY_ID[curEra];
        html += `<div class="cmp-era" style="--c:${era.color}">${era.emoji} ${era.name}</div>`;
      }
      // A row holds at most one event per column; take following events while their column is empty.
      const row = new Map();
      const tol = Math.max(5, Math.abs(e.year) * 0.02);
      let j = i;
      while (j < evs.length && evs[j].era === curEra && !row.has(evs[j].country) && evs[j].year - e.year <= tol) {
        row.set(evs[j].country, evs[j]);
        j++;
      }
      i = j;
      html += `<div class="cmp-row" style="grid-template-columns:52px repeat(${cols.length},1fr)"><span class="cmp-year">${shortYear(e.year)}</span>${cols
        .map((c) => {
          const x = row.get(c.id);
          return x
            ? `<button class="cmp-cell" data-event="${x.id}" style="--c:${c.color};--ca:${alpha(c.color, 0.18)}"><span class="cmp-emoji">${x.emoji}</span><span class="cmp-t">${esc(x.title)}</span>${x.year !== e.year ? `<span class="cmp-y">${shortYear(x.year)}</span>` : ''}</button>`
            : '<span class="cmp-empty"></span>';
        })
        .join('')}</div>`;
    }
    cmp.innerHTML = html;
  };
  render();

  root.addEventListener('click', (ev) => {
    const t = ev.target.closest('button');
    if (!t) return;
    if (t.dataset.c) {
      const id = t.dataset.c;
      const k = sel.indexOf(id);
      if (k >= 0) sel.splice(k, 1);
      else {
        if (sel.length >= MAX) sel.shift();
        sel.push(id);
      }
      try {
        localStorage.setItem(KEY, JSON.stringify(sel));
      } catch (e) {
        /* ignore */
      }
      render();
    } else if (t.dataset.era) {
      eraFilter = t.dataset.era;
      root.querySelectorAll('#eras .chip').forEach((c) => c.classList.toggle('on', c === t));
      render();
    } else if (t.dataset.event) openEvent(t.dataset.event);
    else if (t.hasAttribute('data-back')) history.back();
    else if (t.dataset.go) go(t.dataset.go);
  });
}
