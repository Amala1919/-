import { FAMILY_BY_ID, familyEvents, relatedFamilies, countriesOfFamily } from '../data/relations.js';
import { PERSON_BY_ID, COUNTRY_BY_ID } from '../data/index.js';
import { familyTreeHTML, FAMILY_LEGEND } from '../components/familytree.js';
import { personChip, personIcon } from '../components/avatar.js';
import { eventCard } from '../components/ui.js';
import { openEvent, openPerson } from '../components/sheets.js';
import { linkify } from '../components/linkify.js';
import { photoFigure } from '../images.js';
import { go } from '../router.js';
import { esc, shortYear } from '../util.js';

export default function family(root, { id }) {
  const f = FAMILY_BY_ID[id];
  if (!f) return go('/families', { replace: true });
  const focus = new URLSearchParams(location.hash.split('?')[1] || '').get('focus');
  const tree = familyTreeHTML(f, { focus });
  const evs = familyEvents(f);
  const rel = relatedFamilies(f);
  const countries = countriesOfFamily(f);
  const members = f.members.map(([pid]) => PERSON_BY_ID[pid]).filter(Boolean);

  root.innerHTML = `
  <header class="page-head compact fam-head">
    <button class="back-btn inline" data-back aria-label="戻る">‹</button>
    <h1>${f.emoji} ${esc(f.name)}</h1>
    <p>${f.kind === 'mentor' ? '師弟の系譜' : '家系図'}・${f.period}・${members.length}人</p>
  </header>
  <div class="chips pad-x">${countries.map((c) => `<button class="chip" data-go="/country/${c}">${COUNTRY_BY_ID[c].flag} ${esc(COUNTRY_BY_ID[c].name)}</button>`).join('')}</div>
  <section class="pad-x"><p class="lead">${linkify(f.desc, { exclude: [`family:${f.id}`] })}</p></section>
  <div class="ft-wrap">
    <div class="ft-tools">
      <button data-zoom="-1" aria-label="縮小">－</button><button data-zoom="0" aria-label="全体">⤢</button><button data-zoom="1" aria-label="拡大">＋</button>
    </div>
    <div class="ft-viewport" id="ftv"><div class="ft-canvas" id="ftc">${tree.html}</div></div>
  </div>
  ${FAMILY_LEGEND}
  <section class="pad">
    <p class="hint">👆 人物をタップすると詳しい説明が開きます。そこから国・出来事・ほかの家系図へも移動できます。</p>
    ${photoFigure(f.img, { caption: f.name })}
    <h3 class="sub">🧑‍🤝‍🧑 登場する人物（${members.length}）</h3>
    <div class="people-row">${members.map((p) => personChip(p, 52)).join('')}</div>
    ${evs.length ? `<h3 class="sub">📖 関係する出来事（${evs.length}）</h3><div class="card-list">${evs.map((e) => eventCard(e)).join('')}</div>` : ''}
    ${rel.length ? `<h3 class="sub">🔗 つながる家系図</h3><div class="card-list">${rel.map((g) => {
      const shared = g.members.filter(([m]) => f.members.some(([n]) => n === m)).map(([m]) => PERSON_BY_ID[m]);
      return `<button class="fam-link" data-go="/family/${g.id}"><span class="fam-emoji">${g.emoji}</span><span><b>${esc(g.name)}</b><small>共通の人物：${shared.map((p) => esc(p.name)).join('、')}</small></span><span class="fam-faces mini">${shared.slice(0, 3).map((p) => personIcon(p, 32)).join('')}</span></button>`;
    }).join('')}</div>` : ''}
    <button class="btn-wide accent" data-go="/quiz/run/family/${f.id}">❓ この家系図のクイズに挑戦</button>
    <button class="btn-wide" data-go="/families">🌳 ほかの家系図を見る</button>
  </section>`;

  // Zoom
  const vp = root.querySelector('#ftv');
  const canvas = root.querySelector('#ftc');
  const inner = canvas.firstElementChild;
  let scale = 1;
  const fitScale = () => Math.min(1, (vp.clientWidth - 8) / tree.width);
  const apply = () => {
    inner.style.transform = `scale(${scale})`;
    canvas.style.width = `${tree.width * scale}px`;
    canvas.style.height = `${tree.height * scale}px`;
  };
  scale = Math.max(0.55, fitScale());
  apply();
  const focusNode = focus && root.querySelector(`.ft-node.focus`);
  if (focusNode) {
    requestAnimationFrame(() => {
      vp.scrollLeft = focusNode.offsetLeft * scale - vp.clientWidth / 2 + 50 * scale;
      vp.scrollTop = focusNode.offsetTop * scale - 60;
    });
  }

  root.addEventListener('click', (ev) => {
    const t = ev.target.closest('button');
    if (!t) return;
    if (t.dataset.zoom != null) {
      const z = Number(t.dataset.zoom);
      scale = z === 0 ? fitScale() : Math.min(1.6, Math.max(0.35, scale * (z > 0 ? 1.25 : 0.8)));
      apply();
    } else if (t.dataset.person) openPerson(t.dataset.person);
    else if (t.dataset.event) openEvent(t.dataset.event);
    else if (t.dataset.go) go(t.dataset.go);
    else if (t.hasAttribute('data-back')) history.back();
  });
}
