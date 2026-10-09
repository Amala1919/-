import { EVENTS, PEOPLE, COUNTRIES, ERAS } from '../data/index.js';
import { LANDMARKS } from '../data/landmarks.js';
import { eventCard } from '../components/ui.js';
import { personChip } from '../components/avatar.js';
import { openEvent, openPerson } from '../components/sheets.js';
import { go } from '../router.js';
import { esc } from '../util.js';
import { FAMILIES } from '../data/relations.js';
import { THEMES } from '../data/theme-index.js';

let lastQuery = '';

function norm(s) {
  // Katakana -> Hiragana and lower-case, so 「ろーま」 matches 「ローマ」.
  return String(s)
    .toLowerCase()
    .replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));
}

export default function search(root) {
  root.innerHTML = `
  <header class="page-head compact">
    <button class="back-btn inline" data-back aria-label="戻る">‹</button>
    <h1>🔍 さがす</h1>
  </header>
  <div class="pad-x"><input class="search-input" id="q" type="search" placeholder="例：ピラミッド、ナポレオン、1868、江戸" value="${esc(lastQuery)}" autocomplete="off"></div>
  <div class="chips pad-x">${['ピラミッド', '革命', '独立', '戦争', '皇帝', '将軍', '宇宙', '仏教', '鉄道'].map((w) => `<button class="chip" data-w="${w}">${w}</button>`).join('')}</div>
  <div id="res" class="pad"></div>`;

  const input = root.querySelector('#q');
  const res = root.querySelector('#res');
  const run = () => {
    const q = norm(input.value.trim());
    lastQuery = input.value.trim();
    if (!q) {
      res.innerHTML = '<p class="hint">キーワードや年（例：1600）を入れてみよう。</p>';
      return;
    }
    const num = /^-?\d+$/.test(q) ? Number(q) : null;
    const evs = EVENTS.filter((e) => (num != null ? Math.abs(e.year - num) <= 10 : norm(e.title + e.summary + e.detail).includes(q))).slice(0, 40);
    const ppl = PEOPLE.filter((p) => norm(p.name + p.title + p.desc).includes(q)).slice(0, 20);
    const cts = COUNTRIES.filter((c) => norm(c.name + c.en + c.capital).includes(q));
    const eras = ERAS.filter((e) => norm(e.name + e.keywords.join('')).includes(q));
    const mdl = LANDMARKS.filter((m) => norm(m.name + m.desc).includes(q));
    const fams = FAMILIES.filter((f) => norm(f.name + f.desc).includes(q) || f.members.some(([pid]) => ppl.some((p) => p.id === pid)));
    const blocks = [];
    if (cts.length) blocks.push(`<h3 class="sub">国・地域</h3><div class="chips">${cts.map((c) => `<button class="chip" data-go="/country/${c.id}">${c.flag} ${esc(c.name)}</button>`).join('')}</div>`);
    if (eras.length) blocks.push(`<h3 class="sub">時代</h3><div class="chips">${eras.map((e) => `<button class="chip" data-go="/era/${e.id}">${e.emoji} ${e.name}</button>`).join('')}</div>`);
    if (mdl.length) blocks.push(`<h3 class="sub">名所</h3><div class="chips">${mdl.map((m) => `<button class="chip" data-go="/landmark/${m.id}">🏛️ ${esc(m.name)}</button>`).join('')}</div>`);
    const ths = THEMES.filter((t) => norm(t.name + t.intro).includes(q));
    if (ths.length) blocks.push(`<h3 class="sub">テーマ史</h3><div class="chips">${ths.map((t) => `<button class="chip" data-go="/theme/${t.id}">${t.emoji} ${esc(t.name)}</button>`).join('')}</div>`);
    if (fams.length) blocks.push(`<h3 class="sub">家系図</h3><div class="chips">${fams.map((f) => `<button class="chip" data-go="/family/${f.id}">${f.emoji} ${esc(f.name)}</button>`).join('')}</div>`);
    if (ppl.length) blocks.push(`<h3 class="sub">人物（${ppl.length}）</h3><div class="people-row hscroll">${ppl.map((p) => personChip(p, 56)).join('')}</div>`);
    if (evs.length) blocks.push(`<h3 class="sub">出来事（${evs.length}）</h3><div class="card-list">${evs.map((e) => eventCard(e)).join('')}</div>`);
    res.innerHTML = blocks.join('') || '<p class="hint">見つかりませんでした。別のことばで試してみよう。</p>';
  };
  input.addEventListener('input', run);
  run();
  if (!lastQuery) setTimeout(() => input.focus(), 250);

  root.addEventListener('click', (ev) => {
    const t = ev.target.closest('button');
    if (!t) return;
    if (t.dataset.w) {
      input.value = t.dataset.w;
      run();
    } else if (t.dataset.event) openEvent(t.dataset.event);
    else if (t.dataset.person) openPerson(t.dataset.person);
    else if (t.dataset.go) go(t.dataset.go);
    else if (t.hasAttribute('data-back')) history.back();
  });
}

