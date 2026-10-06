import { REGIONS, COUNTRY_BY_ID } from '../data/index.js';
import { countryShapeSVG } from '../components/geo.js';
import { progressRing } from '../components/ui.js';
import { store } from '../store.js';
import { go } from '../router.js';
import { esc, shortYear } from '../util.js';
import { image } from '../images.js';

const shapeCache = new Map();
function shape(id) {
  if (!shapeCache.has(id)) shapeCache.set(id, countryShapeSVG(id, { size: 72 }));
  return shapeCache.get(id);
}

export default function countries(root) {
  root.innerHTML = `
  <header class="page-head">
    <h1>🗺️ 国で学ぶ</h1>
    <p>国や地域ごとに、はじまりから現代までの歴史をたどろう。</p>
  </header>
  ${REGIONS.map((r) => `
    <section class="region">
      <h2 class="region-title">${r.name}</h2>
      <div class="country-grid">
        ${r.countries.map((id) => {
          const c = COUNTRY_BY_ID[id];
          const n = c.events.length;
          const read = store.readCount(id);
          const ph = image(c.img);
          return `<button class="country-card ${ph ? 'has-photo' : ''}" data-go="/country/${id}" style="--c:${c.color}${ph ? `;--ph:url('${ph.thumb}')` : ''}">
            <div class="cc-shape">${shape(id)}</div>
            <div class="cc-body">
              <div class="cc-name"><span class="cc-flag">${c.flag}</span>${esc(c.name)}</div>
              <div class="cc-meta">${shortYear(c.events[0].year)} 〜 ${shortYear(c.events[n - 1].year)}・${n}の出来事</div>
            </div>
            <div class="cc-ring">${progressRing(read / n, 40, c.color)}</div>
          </button>`;
        }).join('')}
      </div>
    </section>`).join('')}`;

  root.addEventListener('click', (ev) => {
    const t = ev.target.closest('[data-go]');
    if (t) go(t.dataset.go);
  });
}
