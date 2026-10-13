import { PREFS, PREF_REGIONS } from '../data/pref-index.js';
import { japanMapSVG, regionColor } from '../components/japanmap.js';
import { go } from '../router.js';
import { esc } from '../util.js';

export default function japan(root) {
  root.innerHTML = `
  <header class="page-head compact">
    <button class="back-btn inline" data-back aria-label="戻る">‹</button>
    <h1>🗾 都道府県から見る日本史</h1>
    <p>47都道府県それぞれの歴史の舞台をたどろう。地図の点か、下の一覧から選んでください。</p>
  </header>
  <div class="jp-map-wrap">${japanMapSVG(PREFS)}</div>
  <div class="pad">
    ${PREF_REGIONS.map((r) => {
      const ps = PREFS.filter((p) => p.region === r);
      return `<h3 class="sub"><span class="reg-dot" style="background:${regionColor(r)}"></span>${r}</h3>
      <div class="pref-grid">${ps.map((p) => `<button class="pref-card" data-go="/pref/${p.id}" style="--c:${regionColor(r)}"><b>${esc(p.name)}</b><small>${esc(p.catch)}</small></button>`).join('')}</div>`;
    }).join('')}
  </div>`;
  root.addEventListener('click', (ev) => {
    const t = ev.target.closest('[data-go],[data-back]');
    if (!t) return;
    if (t.dataset.go) go(t.dataset.go);
    else history.back();
  });
}
