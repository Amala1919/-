import { ERAS, EVENTS, COUNTRIES, PEOPLE } from '../data/index.js';
import { MODELS } from '../three/models/index.js';
import { mountGlobe } from '../three/globe.js';
import { webglAvailable } from '../three/stage.js';
import { eventCard, progressRing } from '../components/ui.js';
import { worldMapSVG } from '../components/geo.js';
import { openEvent } from '../components/sheets.js';
import { store, xpForLevel } from '../store.js';
import { go } from '../router.js';
import { formatYear, hashStr, todayKey, clamp } from '../util.js';

const SLIDER_MAX = 1000;
const PER_ERA = SLIDER_MAX / ERAS.length;

export function sliderToYear(v) {
  const i = clamp(Math.floor(v / PER_ERA), 0, ERAS.length - 1);
  const e = ERAS[i];
  const t = (v - i * PER_ERA) / PER_ERA;
  const end = Math.min(e.end, 2025);
  return Math.round(e.start + t * (end - e.start));
}

export function yearToSlider(y) {
  for (let i = 0; i < ERAS.length; i++) {
    const e = ERAS[i];
    const end = Math.min(e.end, 2025);
    if (y < e.end || i === ERAS.length - 1) return i * PER_ERA + clamp((y - e.start) / (end - e.start), 0, 1) * PER_ERA;
  }
  return 0;
}

function windowFor(year) {
  const e = ERAS.find((x) => year < x.end) || ERAS[ERAS.length - 1];
  return Math.max(25, (Math.min(e.end, 2025) - e.start) * 0.09);
}

function dailyEvent() {
  const k = hashStr(todayKey());
  return EVENTS[k % EVENTS.length];
}

let lastSlider = null;

export default function home(root) {
  const lvl = store.level();
  const xp = store.state.xp;
  const lo = xpForLevel(lvl);
  const hi = xpForLevel(lvl + 1);
  const read = store.readCount();
  const daily = dailyEvent();
  const gl = webglAvailable();

  root.innerHTML = `
  <section class="home-hero">
    <div class="home-top">
      <div>
        <div class="app-title">クロノ<span>アトラス</span></div>
        <div class="app-sub">国と時代をめぐる歴史の旅</div>
      </div>
      <button class="level-chip" data-go="/me" aria-label="マイページ">
        <span class="lv">Lv.${lvl}</span>
        <span class="lv-bar"><i style="width:${((xp - lo) / (hi - lo)) * 100}%"></i></span>
      </button>
    </div>
    <div class="globe-box" id="globe">
      ${gl ? '<div class="globe-hint">👆 ドラッグで回転・国をタップ</div>' : worldMapSVG({ highlight: new Map(COUNTRIES.map((c) => [c.id, true])), width: 360, height: 190 })}
    </div>
    <div class="time-travel">
      <div class="tt-head">
        <span class="tt-label">⏳ 時をかける地球儀</span>
        <span class="tt-year" id="tt-year">すべての時代</span>
        <button class="tt-reset" id="tt-reset" aria-label="すべての時代を表示">全</button>
      </div>
      <input type="range" id="tt" min="0" max="${SLIDER_MAX}" step="1" value="${lastSlider ?? yearToSlider(1600)}" aria-label="年代">
      <div class="tt-ticks">${ERAS.map((e) => `<span style="--c:${e.color}" title="${e.name}">${e.emoji}</span>`).join('')}</div>
      <div class="tt-cards hscroll" id="tt-cards"></div>
    </div>
  </section>

  <section class="menu-grid">
    <button class="menu-tile" data-go="/timeline" style="--c:#d4a54a"><span>📜</span><b>時代で学ぶ</b><small>8つの時代を旅する</small></button>
    <button class="menu-tile" data-go="/countries" style="--c:#4f7cff"><span>🗺️</span><b>国で学ぶ</b><small>${COUNTRIES.length}の国と地域</small></button>
    <button class="menu-tile" data-go="/compare" style="--c:#26a69a"><span>🧭</span><b>比較年表</b><small>国をならべて比べる</small></button>
    <button class="menu-tile" data-go="/museum" style="--c:#a66cff"><span>🏛️</span><b>3D博物館</b><small>${MODELS.length}の建造物・乗り物</small></button>
    <button class="menu-tile" data-go="/people" style="--c:#ef6c3a"><span>🧑‍🎓</span><b>人物図鑑</b><small>${PEOPLE.length}人の偉人</small></button>
    <button class="menu-tile" data-go="/quiz" style="--c:#e8445a"><span>❓</span><b>クイズ</b><small>確認問題に挑戦</small></button>
  </section>

  <section class="card-block">
    <div class="block-head"><h2>📅 今日の歴史カード</h2><span class="muted">毎日かわります</span></div>
    ${eventCard(daily)}
  </section>

  <section class="card-block progress-block" data-go="/me">
    <div class="block-head"><h2>📈 学習の記録</h2><span class="muted">くわしく ›</span></div>
    <div class="progress-row">
      ${progressRing(read / EVENTS.length, 64, '#f2b33d')}
      <div class="progress-stats">
        <div><b>${read}</b> / ${EVENTS.length} の出来事を読んだ</div>
        <div><b>${Object.keys(store.state.models).length}</b> / ${MODELS.length} の3Dモデルを見た</div>
        <div><b>${store.state.quiz.played}</b> 回クイズに挑戦</div>
      </div>
    </div>
  </section>

  <button class="search-fab" data-go="/search" aria-label="検索">🔍 出来事・人物をさがす</button>
  `;

  const ttCards = root.querySelector('#tt-cards');
  const ttYear = root.querySelector('#tt-year');
  const slider = root.querySelector('#tt');
  let globe = null;
  let mode = lastSlider == null ? 'all' : 'year';

  if (gl) {
    try {
      globe = mountGlobe(root.querySelector('#globe'), { onSelect: (id) => go('/country/' + id) });
    } catch (e) {
      root.querySelector('#globe').innerHTML = worldMapSVG({ highlight: new Map(COUNTRIES.map((c) => [c.id, true])) });
    }
  }

  const update = () => {
    if (mode === 'all') {
      ttYear.textContent = 'すべての時代';
      globe && globe.highlight(null);
      const sample = [...EVENTS].sort((a, b) => hashStr(a.id + todayKey()) - hashStr(b.id + todayKey())).slice(0, 8);
      ttCards.innerHTML = `<div class="tt-note">スライダーを動かすと、その時代に世界で起きていたことが地球儀に光ります</div>${sample.map((e) => eventCard(e, { compact: true })).join('')}`;
      return;
    }
    const v = Number(slider.value);
    lastSlider = v;
    const year = sliderToYear(v);
    const w = windowFor(year);
    const near = EVENTS.filter((e) => Math.abs(e.year - year) <= w).sort((a, b) => a.year - b.year);
    const era = ERAS.find((x) => year < x.end) || ERAS[ERAS.length - 1];
    ttYear.innerHTML = `<span style="color:${era.color}">${era.emoji} ${era.name}</span> ${formatYear(year)}`;
    const ids = new Set(near.map((e) => e.country));
    globe && globe.highlight(ids);
    ttCards.innerHTML = near.length
      ? near.map((e) => eventCard(e, { compact: true })).join('')
      : `<div class="tt-note">この前後${Math.round(w)}年に登録された出来事はありません。スライダーを少し動かしてみよう。</div>`;
  };

  let raf = 0;
  slider.addEventListener('input', () => {
    mode = 'year';
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(update);
  });
  root.querySelector('#tt-reset').addEventListener('click', () => {
    mode = 'all';
    lastSlider = null;
    update();
  });
  update();

  const onClick = (ev) => {
    const t = ev.target.closest('[data-event],[data-go]');
    if (!t) return;
    if (t.dataset.event) openEvent(t.dataset.event);
    else if (t.dataset.go) go(t.dataset.go);
  };
  root.addEventListener('click', onClick);

  return () => {
    cancelAnimationFrame(raf);
    globe && globe.destroy();
  };
}

