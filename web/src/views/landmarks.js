import { LANDMARKS } from '../data/landmarks.js';
import { COUNTRY_BY_ID, ERAS, eraOfYear } from '../data/index.js';
import { image } from '../images.js';
import { store } from '../store.js';
import { go } from '../router.js';
import { esc, shortYear } from '../util.js';

let filter = 'all';

export default function landmarks(root) {
  const seen = store.state.models;
  root.innerHTML = `
  <header class="page-head">
    <h1>🏛️ 世界の名所</h1>
    <p>ピラミッドから新幹線まで、歴史の舞台となった建物や乗り物を<b>本物の写真</b>で見てみよう。写真をタップすると大きく表示されます。</p>
    <div class="museum-count">見学済み <b>${Object.keys(seen).length}</b> / ${LANDMARKS.length}</div>
  </header>
  <div class="chips filter pad-x" id="lm-filter">
    <button class="chip ${filter === 'all' ? 'on' : ''}" data-f="all">すべて</button>
    ${ERAS.filter((e) => LANDMARKS.some((m) => eraOfYear(m.year).id === e.id)).map((e) => `<button class="chip ${filter === e.id ? 'on' : ''}" data-f="${e.id}">${e.emoji} ${e.name}</button>`).join('')}
  </div>
  <div class="lm-grid" id="lm-grid"></div>`;

  const grid = root.querySelector('#lm-grid');
  const render = () => {
    const list = filter === 'all' ? LANDMARKS : LANDMARKS.filter((m) => eraOfYear(m.year).id === filter);
    grid.innerHTML = list
      .map((m) => {
        const era = eraOfYear(m.year);
        const c = COUNTRY_BY_ID[m.country];
        const img = image(m.img);
        return `<button class="lm-card ${seen[m.id] ? 'seen' : ''}" data-go="/landmark/${m.id}" style="--c:${era.color}">
        <div class="lm-thumb">${img ? `<img src="${img.thumb}" alt="" loading="lazy" decoding="async">` : `<span>${era.emoji}</span>`}${seen[m.id] ? '<i class="lm-seen">✓</i>' : ''}</div>
        <div class="lm-body"><div class="lm-name">${esc(m.name)}</div><div class="lm-meta">${c ? c.flag : ''} ${shortYear(m.year)}・${era.name}</div></div>
      </button>`;
      })
      .join('');
  };
  render();

  root.addEventListener('click', (ev) => {
    const f = ev.target.closest('[data-f]');
    if (f) {
      filter = f.dataset.f;
      root.querySelectorAll('#lm-filter .chip').forEach((c) => c.classList.toggle('on', c === f));
      return render();
    }
    const t = ev.target.closest('[data-go]');
    if (t) go(t.dataset.go);
  });
}
