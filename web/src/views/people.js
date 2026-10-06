import { PEOPLE, REGIONS, COUNTRY_BY_ID } from '../data/index.js';
import { avatarSVG } from '../components/avatar.js';
import { openPerson } from '../components/sheets.js';
import { store } from '../store.js';
import { esc, shortYear } from '../util.js';
import { image } from '../images.js';

export default function people(root) {
  let region = 'all';
  const regionOf = (cid) => REGIONS.find((r) => r.countries.includes(cid))?.id;
  root.innerHTML = `
  <header class="page-head compact">
    <button class="back-btn inline" data-back aria-label="戻る">‹</button>
    <h1>🧑‍🎓 人物図鑑</h1>
    <p>歴史をつくった${PEOPLE.length}人。タップするとくわしい説明が見られます。<br>調べた人物 <b>${Object.keys(store.state.people).length}</b> / ${PEOPLE.length}</p>
  </header>
  <div class="chips pad-x" id="reg">
    <button class="chip on" data-r="all">すべて</button>
    ${REGIONS.map((r) => `<button class="chip" data-r="${r.id}">${r.name}</button>`).join('')}
  </div>
  <div class="people-grid" id="grid"></div>`;
  const grid = root.querySelector('#grid');
  const render = () => {
    const list = PEOPLE.filter((p) => region === 'all' || regionOf(p.country) === region).sort((a, b) => (a.born ?? a.died) - (b.born ?? b.died));
    grid.innerHTML = list
      .map(
        (p) => `<button class="person-card ${store.state.people[p.id] ? 'seen' : ''}" data-person="${p.id}">
        ${image(p.img) ? `<span class="pc-photo" style="background-image:url('${image(p.img).thumb}')"></span>` : avatarSVG(p, 76)}
        <b>${esc(p.name)}</b>
        <small>${COUNTRY_BY_ID[p.country].flag} ${p.born != null ? shortYear(p.born) : '?'}〜${shortYear(p.died)}</small>
      </button>`,
      )
      .join('');
  };
  render();
  root.addEventListener('click', (ev) => {
    const t = ev.target.closest('button');
    if (!t) return;
    if (t.dataset.r) {
      region = t.dataset.r;
      root.querySelectorAll('#reg .chip').forEach((c) => c.classList.toggle('on', c === t));
      render();
    } else if (t.dataset.person) {
      openPerson(t.dataset.person);
      t.classList.add('seen');
    } else if (t.hasAttribute('data-back')) history.back();
  });
}
