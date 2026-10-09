import { linkify } from '../components/linkify.js';
import { MODEL_BY_ID, MODELS } from '../three/models/index.js';
import { mountViewer } from '../three/viewer.js';
import { webglAvailable } from '../three/stage.js';
import { COUNTRY_BY_ID, EVENTS, eraOfYear } from '../data/index.js';
import { openEvent } from '../components/sheets.js';
import { toast } from '../components/ui.js';
import { store } from '../store.js';
import { go } from '../router.js';
import { esc, formatYear } from '../util.js';
import { speak, stopSpeaking } from '../native.js';
import { sfx } from '../audio.js';
import { photoFigure } from '../images.js';

export default function model(root, { id }) {
  const m = MODEL_BY_ID[id];
  if (!m) return go('/museum', { replace: true });
  const c = COUNTRY_BY_ID[m.country];
  const era = eraOfYear(m.year);
  const related = EVENTS.filter((e) => e.model === id);
  const i = MODELS.indexOf(m);
  const prev = MODELS[(i - 1 + MODELS.length) % MODELS.length];
  const next = MODELS[(i + 1) % MODELS.length];

  root.innerHTML = `
  <div class="viewer" id="viewer" style="background:linear-gradient(${m.sky[0]},${m.sky[1]})">
    <button class="back-btn" data-back aria-label="戻る">‹</button>
    <div class="viewer-tools">
      <button class="vt" data-act="rotate" title="自動回転">🔄</button>
      <button class="vt" data-act="spots" title="解説ポイント">📍</button>
      <button class="vt" data-act="reset" title="視点リセット">🎯</button>
    </div>
    <div class="viewer-actions" id="vactions"></div>
    <div class="hotspot-pop" id="pop" hidden></div>
    ${webglAvailable() ? '' : '<div class="no-gl">この端末では3D表示が使えません</div>'}
  </div>
  <section class="pad model-info">
    <div class="mi-meta"><button class="chip chip-flag" data-country="${c.id}">${c.flag} ${esc(c.name)}</button><span class="chip" style="background:${era.color}55">${era.emoji} ${era.name}</span><span class="chip">${formatYear(m.year)}</span></div>
    <h1>${esc(m.name)}</h1>
    <p class="lead">${linkify(m.desc, { exclude: [`model:${m.id}`] })}</p>
    <button class="btn-pill" data-act="speak">🔊 読み上げ</button>
    ${photoFigure(m.img, { caption: '実物の写真' }) ? `<h3 class="sub">📷 実物の写真</h3>${photoFigure(m.img, { caption: m.name })}` : ''}
    <dl class="facts">${m.facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
    <h3 class="sub">📍 見どころ</h3>
    <ol class="spot-list">${(m.hotspots || []).map((h, k) => `<li><button data-spot="${k}"><span class="spot-n">${k + 1}</span><span><b>${esc(h.t)}</b><small>${esc(h.d)}</small></span></button></li>`).join('')}</ol>
    ${related.length ? `<h3 class="sub">📖 関連する出来事</h3>${related.map((e) => `<button class="btn-wide" data-event="${e.id}">${e.emoji} ${esc(e.title)}（${formatYear(e.year, e.approx)}）</button>`).join('')}` : ''}
    <div class="ev-nav">
      <button class="btn-ghost" data-go="/model/${prev.id}">‹ ${esc(prev.name)}</button>
      <button class="btn-ghost" data-go="/model/${next.id}">${esc(next.name)} ›</button>
    </div>
  </section>`;

  const pop = root.querySelector('#pop');
  let viewer = null;
  const showSpot = (h, k) => {
    sfx.tap();
    pop.hidden = false;
    pop.innerHTML = `<div class="pop-n">${k + 1}</div><div><b>${esc(h.t)}</b><p>${esc(h.d)}</p></div><button class="pop-x" aria-label="閉じる">✕</button>`;
  };

  if (webglAvailable()) {
    try {
      viewer = mountViewer(root.querySelector('#viewer'), m, { onHotspot: showSpot });
      const va = root.querySelector('#vactions');
      va.innerHTML = viewer.actions.map((a, k) => `<button class="btn-pill solid" data-action="${k}">${a.label}</button>`).join('');
    } catch (e) {
      console.error('3D model failed', id, e);
      root.querySelector('#viewer').insertAdjacentHTML('beforeend', '<div class="no-gl">3D表示でエラーが発生しました</div>');
    }
  }
  if (!store.state.models[id]) {
    store.viewModel(id);
    toast(`「${esc(m.name)}」を見学！ <b>+3 XP</b>`, { icon: '🔭', ms: 1600 });
  }

  root.addEventListener('click', (ev) => {
    const t = ev.target.closest('button');
    if (!t) return;
    const act = t.dataset.act;
    if (t.classList.contains('pop-x')) pop.hidden = true;
    else if (act === 'rotate' && viewer) {
      viewer.setAutoRotate(!viewer.autoRotate);
      t.classList.toggle('off', !viewer.autoRotate);
    } else if (act === 'spots' && viewer) {
      t.classList.toggle('off', !viewer.toggleHotspots());
    } else if (act === 'reset' && viewer) viewer.reset();
    else if (act === 'speak') speak(`${m.name}。${m.desc}`, store.settings().ttsRate);
    else if (t.dataset.action && viewer) viewer.actions[Number(t.dataset.action)].run();
    else if (t.dataset.spot) {
      const k = Number(t.dataset.spot);
      viewer && viewer.focus(k);
      showSpot(m.hotspots[k], k);
      root.querySelector('#viewer').scrollIntoView({ behavior: 'smooth' });
    } else if (t.dataset.event) openEvent(t.dataset.event);
    else if (t.dataset.country) go('/country/' + t.dataset.country);
    else if (t.dataset.go) go(t.dataset.go, { replace: true });
    else if (t.hasAttribute('data-back')) history.back();
  });

  return () => {
    stopSpeaking();
    viewer && viewer.destroy();
  };
}
