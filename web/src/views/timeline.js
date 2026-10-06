import { ERAS, eventsInEra, COUNTRY_BY_ID } from '../data/index.js';
import { eraBannerSVG } from '../components/banner.js';
import { openEvent } from '../components/sheets.js';
import { store } from '../store.js';
import { go } from '../router.js';
import { esc, shortYear, formatYear } from '../util.js';

export default function timeline(root) {
  root.innerHTML = `
  <header class="page-head">
    <h1>📜 時代で学ぶ</h1>
    <p>人類の歴史を8つの時代に分けて旅しよう。時代をタップすると、その時代の世界がわかります。</p>
    <button class="btn-wide accent" data-go="/compare">🧭 国をならべて比較年表を見る</button>
  </header>
  <div class="era-river">
    ${ERAS.map((era, i) => {
      const evs = eventsInEra(era.id);
      const read = evs.filter((e) => store.isRead(e.id)).length;
      const countries = [...new Set(evs.map((e) => e.country))];
      return `
      <article class="era-card" style="--c:${era.color}">
        <div class="era-dot">${i + 1}</div>
        <button class="era-card-main" data-go="/era/${era.id}">
          ${eraBannerSVG(era.id, { height: 120 })}
          <div class="era-card-body">
            <div class="era-range">${era.start < -3000 ? '〜' + formatYear(era.end) : `${formatYear(era.start)} 〜 ${era.end >= 2030 ? '現在' : formatYear(era.end)}`}</div>
            <h2>${era.emoji} ${era.name} <small>${era.en}</small></h2>
            <p>${esc(era.tagline)}</p>
            <div class="era-stats"><span>📖 ${read}/${evs.length}</span><span>${countries.map((c) => COUNTRY_BY_ID[c].flag).join('')}</span></div>
          </div>
        </button>
        <div class="hscroll era-strip">
          ${evs.slice(0, 12).map((e) => `<button class="mini-chip ${store.isRead(e.id) ? 'read' : ''}" data-event="${e.id}"><span>${e.emoji}</span><b>${shortYear(e.year)}</b>${esc(e.title)}</button>`).join('')}
          ${evs.length > 12 ? `<button class="mini-chip more" data-go="/era/${era.id}">ほか${evs.length - 12}件 ›</button>` : ''}
        </div>
      </article>`;
    }).join('')}
  </div>`;

  root.addEventListener('click', (ev) => {
    const t = ev.target.closest('[data-event],[data-go]');
    if (!t) return;
    if (t.dataset.event) openEvent(t.dataset.event);
    else go(t.dataset.go);
  });
}
