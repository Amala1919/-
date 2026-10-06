// ストーリーモード: 国や時代の歴史を紙芝居のように1枚ずつ（自動ナレーション付き）で見る。
import { COUNTRY_BY_ID, ERA_BY_ID, eventsInEra } from '../data/index.js';
import { countryShapeSVG } from '../components/geo.js';
import { eraBannerSVG } from '../components/banner.js';
import { store } from '../store.js';
import { go } from '../router.js';
import { esc, formatYear, alpha } from '../util.js';
import { speak, stopSpeaking, isSpeaking } from '../native.js';
import { sfx } from '../audio.js';

function slidesFor(kind, id) {
  if (kind === 'country') {
    const c = COUNTRY_BY_ID[id];
    if (!c) return null;
    return {
      title: `${c.flag} ${c.name}の歴史`,
      color: c.color,
      quiz: `/quiz/run/country/${id}`,
      slides: [
        { type: 'intro', html: `<div class="st-shape">${countryShapeSVG(id, { size: 200 })}</div><div class="st-flag">${c.flag}</div><h1>${esc(c.name)}の歴史</h1><p>${esc(c.intro)}</p>`, say: `${c.name}の歴史。${c.intro}` },
        ...c.events.map((e) => ({ type: 'event', e })),
      ],
    };
  }
  const era = ERA_BY_ID[id];
  if (!era) return null;
  return {
    title: `${era.emoji} ${era.name}の世界`,
    color: era.color,
    quiz: `/quiz/run/era/${id}`,
    slides: [
      { type: 'intro', html: `<div class="st-banner">${eraBannerSVG(id, { height: 180 })}</div><h1>${era.emoji} ${era.name}</h1><p>${esc(era.overview)}</p>`, say: `${era.name}。${era.overview}` },
      ...eventsInEra(id).map((e) => ({ type: 'event', e })),
    ],
  };
}

export default function story(root, { kind, id }) {
  const deck = slidesFor(kind, id);
  if (!deck) return go('/home', { replace: true });
  const slides = [...deck.slides, { type: 'outro' }];
  let i = 0;
  let auto = false;
  let poll = 0;
  let advanceTimer = 0;

  root.innerHTML = `
  <div class="story" style="--c:${deck.color}">
    <div class="st-top">
      <div class="st-progress">${slides.map(() => '<i></i>').join('')}</div>
      <div class="st-head"><b>${esc(deck.title)}</b><button class="st-x" data-close aria-label="閉じる">✕</button></div>
    </div>
    <div class="st-stage" id="stage"></div>
    <div class="st-controls">
      <button class="st-btn" data-prev aria-label="前へ">‹</button>
      <button class="st-play" data-play>▶ 自動ナレーション</button>
      <button class="st-btn" data-next aria-label="次へ">›</button>
    </div>
  </div>`;

  const stage = root.querySelector('#stage');
  const bars = [...root.querySelectorAll('.st-progress i')];
  const playBtn = root.querySelector('[data-play]');

  const sayText = (s) => {
    if (s.type === 'intro') return s.say;
    if (s.type === 'event') return `${formatYear(s.e.year, s.e.approx)}。${s.e.title}。${s.e.detail}`;
    return 'おしまい。クイズで確認してみよう。';
  };

  const render = () => {
    const s = slides[i];
    bars.forEach((b, k) => b.classList.toggle('on', k <= i));
    let html = '';
    if (s.type === 'intro') html = `<div class="st-slide intro">${s.html}</div>`;
    else if (s.type === 'event') {
      const e = s.e;
      const era = ERA_BY_ID[e.era];
      const c = COUNTRY_BY_ID[e.country];
      store.markRead(e.id);
      html = `<div class="st-slide ev" style="--e:${era.color};--ea:${alpha(era.color, 0.35)}">
        <div class="st-era">${era.emoji} ${era.name}　${kind === 'era' ? `${c.flag} ${esc(c.name)}` : ''}</div>
        <div class="st-emoji">${e.emoji}</div>
        <div class="st-year">${formatYear(e.year, e.approx)}</div>
        <h2>${esc(e.title)}</h2>
        <p class="st-detail">${esc(e.detail)}</p>
        ${e.point ? `<div class="point-box"><div class="point-label">💡 ここがポイント</div>${esc(e.point)}</div>` : ''}
        ${e.model ? `<button class="btn-pill" data-model="${e.model}">🧊 3Dで見る</button>` : ''}
      </div>`;
    } else {
      html = `<div class="st-slide outro"><div class="st-emoji">🎉</div><h1>おしまい！</h1><p>${slides.length - 2}の出来事をめぐりました。</p>
        <button class="btn-wide accent" data-go="${deck.quiz}">❓ クイズで確認する</button>
        <button class="btn-wide" data-restart>↺ 最初から見る</button>
        <button class="btn-wide" data-close>とじる</button></div>`;
    }
    stage.innerHTML = html;
    stage.scrollTop = 0;
    if (auto) narrate();
  };

  const stopAuto = () => {
    auto = false;
    clearInterval(poll);
    clearTimeout(advanceTimer);
    stopSpeaking();
    playBtn.textContent = '▶ 自動ナレーション';
    playBtn.classList.remove('on');
  };

  const narrate = () => {
    clearInterval(poll);
    clearTimeout(advanceTimer);
    const ok = speak(sayText(slides[i]), store.settings().ttsRate);
    let started = false;
    const t0 = Date.now();
    poll = setInterval(() => {
      const sp = isSpeaking();
      if (sp) started = true;
      // Advance once speech finished (or after a fallback delay when TTS is unavailable).
      if ((started && !sp) || (!ok && Date.now() - t0 > 6000) || (!started && Date.now() - t0 > 4000)) {
        clearInterval(poll);
        if (i < slides.length - 1) advanceTimer = setTimeout(() => move(1), 900);
        else stopAuto();
      }
    }, 400);
  };

  const move = (d) => {
    const n = i + d;
    if (n < 0 || n >= slides.length) return;
    i = n;
    sfx.page();
    if (!auto) stopSpeaking();
    render();
  };

  render();

  // Swipe navigation
  let sx = null;
  stage.addEventListener('touchstart', (e) => (sx = e.touches[0].clientX), { passive: true });
  stage.addEventListener('touchend', (e) => {
    if (sx == null) return;
    const dx = e.changedTouches[0].clientX - sx;
    sx = null;
    if (Math.abs(dx) > 60) move(dx < 0 ? 1 : -1);
  });

  root.addEventListener('click', (ev) => {
    const t = ev.target.closest('button');
    if (!t) return;
    if (t.hasAttribute('data-next')) move(1);
    else if (t.hasAttribute('data-prev')) move(-1);
    else if (t.hasAttribute('data-play')) {
      if (auto) stopAuto();
      else {
        auto = true;
        playBtn.textContent = '⏸ 一時停止';
        playBtn.classList.add('on');
        narrate();
      }
    } else if (t.hasAttribute('data-restart')) {
      i = 0;
      render();
    } else if (t.hasAttribute('data-close')) history.back();
    else if (t.dataset.go) go(t.dataset.go, { replace: true });
    else if (t.dataset.model) go('/model/' + t.dataset.model);
  });

  return () => stopAuto();
}
