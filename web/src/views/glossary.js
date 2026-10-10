import { GLOSSARY, TERM_CATS } from '../data/glossary-index.js';
import { openTerm } from '../components/sheets.js';
import { go } from '../router.js';
import { esc } from '../util.js';

let cat = 'all';
let query = '';

const norm = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));

export default function glossary(root) {
  const sorted = [...GLOSSARY].sort((a, b) => (a.yomi || a.term).localeCompare(b.yomi || b.term, 'ja'));
  root.innerHTML = `
  <header class="page-head compact">
    <button class="back-btn inline" data-back aria-label="戻る">‹</button>
    <h1>📖 用語集</h1>
    <p>教科書に出てくる大事な歴史用語 ${GLOSSARY.length} 語。説明文の中の点線つきの言葉をタップしても開けます。</p>
  </header>
  <div class="pad-x"><input class="search-input" id="gq" type="search" placeholder="用語・よみがなで探す" value="${esc(query)}" autocomplete="off"></div>
  <div class="chips filter pad-x" id="gcat">
    <button class="chip ${cat === 'all' ? 'on' : ''}" data-c="all">すべて</button>
    ${TERM_CATS.map((c) => `<button class="chip ${cat === c ? 'on' : ''}" data-c="${c}">${c}</button>`).join('')}
  </div>
  <div class="pad"><button class="btn-wide accent" data-go="/quiz/run/term/-">❓ 用語クイズに挑戦</button><div class="term-list" id="glist"></div></div>`;

  const list = root.querySelector('#glist');
  const render = () => {
    const q = norm(query.trim());
    const items = sorted.filter((t) => (cat === 'all' || t.cat === cat) && (!q || norm(t.term + (t.yomi || '') + t.short + (t.aliases || []).join('')).includes(q)));
    list.innerHTML = items.length
      ? items.map((t) => `<button class="term-row" data-term="${t.id}"><b>${esc(t.term)}</b><small>${esc(t.short)}</small><span class="term-cat">${esc(t.cat)}</span></button>`).join('')
      : '<p class="hint">見つかりませんでした。</p>';
  };
  render();
  root.querySelector('#gq').addEventListener('input', (e) => {
    query = e.target.value;
    render();
  });
  root.addEventListener('click', (ev) => {
    const b = ev.target.closest('button');
    if (!b) return;
    if (b.dataset.c) {
      cat = b.dataset.c;
      root.querySelectorAll('#gcat .chip').forEach((x) => x.classList.toggle('on', x === b));
      render();
    } else if (b.dataset.term) openTerm(b.dataset.term);
    else if (b.dataset.go) go(b.dataset.go);
    else if (b.hasAttribute('data-back')) history.back();
  });
}
