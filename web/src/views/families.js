import { FAMILIES } from '../data/relations.js';
import { PERSON_BY_ID, COUNTRY_BY_ID } from '../data/index.js';
import { personIcon } from '../components/avatar.js';
import { go } from '../router.js';
import { esc, shortYear } from '../util.js';

export default function families(root) {
  root.innerHTML = `
  <header class="page-head compact">
    <button class="back-btn inline" data-back aria-label="戻る">‹</button>
    <h1>🌳 家系図・つながり図</h1>
    <p>王家や将軍家の家系図、師弟の系譜をたどろう。人物をタップすると詳しい説明、国や出来事へもすぐに飛べます。</p>
  </header>
  <div class="fam-grid">
    ${FAMILIES.map((f) => `
      <button class="fam-card" data-go="/family/${f.id}">
        <div class="fam-card-head"><span class="fam-emoji">${f.emoji}</span><span><b>${esc(f.name)}</b><small>${f.period}・${f.members.length}人</small></span></div>
        <div class="fam-faces">${f.members.slice(0, 7).map(([pid]) => (PERSON_BY_ID[pid] ? personIcon(PERSON_BY_ID[pid], 40) : '')).join('')}</div>
        <div class="fam-flags">${f.countries.map((c) => COUNTRY_BY_ID[c]?.flag || '').join(' ')}</div>
      </button>`).join('')}
  </div>`;
  root.addEventListener('click', (ev) => {
    const t = ev.target.closest('button');
    if (!t) return;
    if (t.dataset.go) go(t.dataset.go);
    else if (t.hasAttribute('data-back')) history.back();
  });
}
