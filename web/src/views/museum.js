import { MODELS } from '../three/models/index.js';
import { renderThumbnail } from '../three/viewer.js';
import { webglAvailable } from '../three/stage.js';
import { COUNTRY_BY_ID, eraOfYear } from '../data/index.js';
import { store } from '../store.js';
import { go } from '../router.js';
import { esc, shortYear } from '../util.js';

const thumbs = new Map();

export default function museum(root) {
  const seen = store.state.models;
  root.innerHTML = `
  <header class="page-head">
    <h1>🏛️ 3D博物館</h1>
    <p>世界の建造物や乗り物を3Dで見てみよう。指でぐるぐる回したり、ピンチで拡大したりできます。番号のついた点をタップすると解説が出ます。</p>
    <div class="museum-count">見学済み <b>${Object.keys(seen).length}</b> / ${MODELS.length}</div>
  </header>
  <div class="model-grid">
    ${MODELS.map((m) => {
      const era = eraOfYear(m.year);
      const c = COUNTRY_BY_ID[m.country];
      return `<button class="model-card ${seen[m.id] ? 'seen' : ''}" data-go="/model/${m.id}" style="--c:${era.color}">
        <div class="mc-thumb" data-thumb="${m.id}" style="background:linear-gradient(${m.sky[0]},${m.sky[1]})">${thumbs.has(m.id) ? `<img src="${thumbs.get(m.id)}" alt="">` : '<span class="mc-spin">🧊</span>'}</div>
        <div class="mc-body"><div class="mc-name">${esc(m.name)}</div><div class="mc-meta">${c.flag} ${shortYear(m.year)}・${era.name}</div></div>
      </button>`;
    }).join('')}
  </div>`;

  root.addEventListener('click', (ev) => {
    const t = ev.target.closest('[data-go]');
    if (t) go(t.dataset.go);
  });

  // Render thumbnails progressively in idle time.
  let cancelled = false;
  if (webglAvailable()) {
    const queue = MODELS.filter((m) => !thumbs.has(m.id));
    const next = () => {
      if (cancelled || !queue.length) return;
      const m = queue.shift();
      try {
        thumbs.set(m.id, renderThumbnail(m, 320, 220));
        const holder = root.querySelector(`[data-thumb="${m.id}"]`);
        if (holder) holder.innerHTML = `<img src="${thumbs.get(m.id)}" alt="">`;
      } catch (e) {
        /* skip */
      }
      setTimeout(next, 30);
    };
    setTimeout(next, 120);
  }
  return () => {
    cancelled = true;
  };
}
