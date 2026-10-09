import { THEMES } from '../data/theme-index.js';
import { COUNTRY_BY_ID } from '../data/index.js';
import { image } from '../images.js';
import { go } from '../router.js';
import { esc, shortYear } from '../util.js';

export default function themes(root) {
  root.innerHTML = `
  <header class="page-head compact">
    <button class="back-btn inline" data-back aria-label="戻る">‹</button>
    <h1>🧵 テーマで学ぶ</h1>
    <p>シルクロード、大航海時代、冷戦…。国をこえて世界がつながった大きな流れを、テーマごとにたどろう。</p>
  </header>
  <div class="th-grid">
    ${THEMES.map((t) => {
      const img = image(t.img);
      return `<button class="th-card" data-go="/theme/${t.id}" style="--c:${t.color}">
        <div class="th-thumb">${img ? `<img src="${img.thumb}" alt="" loading="lazy" decoding="async">` : ''}<span class="th-emoji">${t.emoji}</span></div>
        <div class="th-body"><b>${esc(t.name)}</b><small>${shortYear(t.start)}〜${shortYear(t.end)}・${t.allEvents.length}の出来事</small>
        <span class="th-flags">${t.countries.slice(0, 8).map((c) => COUNTRY_BY_ID[c]?.flag || '').join('')}</span></div>
      </button>`;
    }).join('')}
  </div>`;
  root.addEventListener('click', (ev) => {
    const t = ev.target.closest('button');
    if (!t) return;
    if (t.dataset.go) go(t.dataset.go);
    else if (t.hasAttribute('data-back')) history.back();
  });
}
