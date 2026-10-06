import { MODES } from '../quiz/engine.js';
import { COUNTRIES, ERAS } from '../data/index.js';
import { store } from '../store.js';
import { go } from '../router.js';
import { openSheet, closeAllSheets } from '../components/ui.js';
import { esc } from '../util.js';

export default function quizMenu(root) {
  const q = store.state.quiz;
  const acc = q.answered ? Math.round((q.correct / q.answered) * 100) : 0;
  const wrong = store.state.wrong.length;
  root.innerHTML = `
  <header class="page-head">
    <h1>❓ クイズ</h1>
    <p>学んだことを確認しよう。正解するとXPがもらえます。</p>
    <div class="quiz-stats">
      <div><b>${q.played}</b><small>挑戦</small></div>
      <div><b>${acc}%</b><small>正答率</small></div>
      <div><b>${q.bestStreak}</b><small>最高連続</small></div>
      <div><b>${q.bestTimeAttack}</b><small>TA最高</small></div>
    </div>
  </header>
  <div class="mode-grid">
    ${Object.entries(MODES).map(([id, m]) => `
      <button class="mode-card ${id === 'review' && !wrong ? 'disabled' : ''}" data-mode="${id}" style="--c:${m.color}">
        <span class="mode-emoji">${m.emoji}</span>
        <b>${m.name}</b>
        <small>${id === 'review' ? (wrong ? `${wrong}問たまっています` : 'まちがえた問題はありません') : m.desc}</small>
      </button>`).join('')}
  </div>`;

  root.addEventListener('click', (ev) => {
    const t = ev.target.closest('[data-mode]');
    if (!t) return;
    const mode = t.dataset.mode;
    if (mode === 'review' && !wrong) return;
    if (mode === 'country') {
      openSheet((body) => {
        body.innerHTML = `<h2 class="sheet-title">国・地域をえらぶ</h2><div class="pick-grid">${COUNTRIES.map((c) => `<button data-c="${c.id}" style="--c:${c.color}"><span>${c.flag}</span>${esc(c.name.replace(/（.*）/, ''))}${q.byCountry[c.id] ? `<small>最高${q.byCountry[c.id].best}点</small>` : ''}</button>`).join('')}</div>`;
        body.addEventListener('click', (e) => {
          const b = e.target.closest('[data-c]');
          if (!b) return;
          closeAllSheets();
          go('/quiz/run/country/' + b.dataset.c);
        });
      });
    } else if (mode === 'era') {
      openSheet((body) => {
        body.innerHTML = `<h2 class="sheet-title">時代をえらぶ</h2><div class="pick-grid">${ERAS.map((e) => `<button data-e="${e.id}" style="--c:${e.color}"><span>${e.emoji}</span>${e.name}</button>`).join('')}</div>`;
        body.addEventListener('click', (e) => {
          const b = e.target.closest('[data-e]');
          if (!b) return;
          closeAllSheets();
          go('/quiz/run/era/' + b.dataset.e);
        });
      });
    } else go('/quiz/run/' + mode + '/-');
  });
}
