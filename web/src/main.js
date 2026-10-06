import './styles.css';
import { route, resolve, currentPath, onRoute, go } from './router.js';
import { store } from './store.js';
import { toast, confetti, hasSheet, closeSheet, closeAllSheets, openSheet } from './components/ui.js';
import { sfx } from './audio.js';
import { stopSpeaking } from './native.js';
import { stopActiveStage } from './three/stage.js';
import { openLightbox } from './images.js';
import { MODELS } from './three/models/index.js';
import { MODES } from './quiz/engine.js';
import { COUNTRIES, EVENTS } from './data/index.js';
import home from './views/home.js';
import timeline from './views/timeline.js';
import era from './views/era.js';
import countries from './views/countries.js';
import country from './views/country.js';
import compare from './views/compare.js';
import museum from './views/museum.js';
import model from './views/model.js';
import quizMenu from './views/quiz.js';
import quizPlay from './views/quizplay.js';
import people from './views/people.js';
import me from './views/me.js';
import search from './views/search.js';
import story from './views/story.js';

route('/home', home);
route('/timeline', timeline);
route('/era/:id', era);
route('/countries', countries);
route('/country/:id', country);
route('/compare', compare);
route('/museum', museum);
route('/model/:id', model);
route('/quiz', quizMenu);
route('/quiz/run/:mode/:arg', quizPlay);
route('/people', people);
route('/me', me);
route('/search', search);
route('/story/:kind/:id', story);

const TABS = [
  { id: 'home', icon: '🌍', label: 'ホーム', path: '/home', match: ['/home', '/me', '/search', '/people'] },
  { id: 'timeline', icon: '📜', label: '年表', path: '/timeline', match: ['/timeline', '/era', '/compare', '/story/era'] },
  { id: 'countries', icon: '🗺️', label: '国', path: '/countries', match: ['/countries', '/country', '/story/country'] },
  { id: 'museum', icon: '🏛️', label: '3D', path: '/museum', match: ['/museum', '/model'] },
  { id: 'quiz', icon: '❓', label: 'クイズ', path: '/quiz', match: ['/quiz'] },
];
const TAB_ROOTS = TABS.map((t) => t.path);

const app = document.getElementById('app');
app.innerHTML = `<main id="main"></main>
  <nav class="tabbar">${TABS.map((t) => `<a href="#${t.path}" data-tab="${t.id}"><span class="ti">${t.icon}</span><span class="tl">${t.label}</span></a>`).join('')}</nav>`;
const main = document.getElementById('main');
const tabbar = app.querySelector('.tabbar');

tabbar.addEventListener('click', (e) => {
  const a = e.target.closest('a[data-tab]');
  if (!a) return;
  e.preventDefault();
  sfx.tap();
  const tab = TABS.find((t) => t.id === a.dataset.tab);
  // Tabs replace history so that "back" from a tab root returns home, not through every tab.
  go(tab.path, { replace: currentPath() !== '/home' && TAB_ROOTS.includes(currentPath()) });
});

let cleanup = null;
const scrollPos = new Map();

function render() {
  const path = currentPath();
  const r = resolve(path);
  if (!r) return go('/home', { replace: true });
  if (cleanup) {
    try {
      cleanup();
    } catch (e) {
      /* ignore */
    }
  }
  cleanup = null;
  stopSpeaking();
  stopActiveStage();
  closeAllSheets();
  const view = document.createElement('div');
  view.className = 'view';
  main.replaceChildren(view);
  const ret = r.view(view, r.params);
  cleanup = typeof ret === 'function' ? ret : null;
  const tab = TABS.find((t) => t.match.some((m) => path === m || path.startsWith(m + '/')));
  tabbar.querySelectorAll('a').forEach((a) => a.classList.toggle('on', tab && a.dataset.tab === tab.id));
  document.body.classList.toggle('no-tabbar', path.startsWith('/quiz/run') || path.startsWith('/story'));
  window.scrollTo(0, scrollPos.get(path) || 0);
}

window.addEventListener('scroll', () => scrollPos.set(currentPath(), window.scrollY), { passive: true });

// Android back button
document.addEventListener('click', (e) => {
  const ph = e.target.closest('[data-photo]');
  if (ph) openLightbox(ph.dataset.photo, ph.dataset.caption || '');
});

window.__onBack = () => {
  if (window.__lightboxClose) {
    window.__lightboxClose();
    return true;
  }
  if (hasSheet()) {
    closeSheet();
    return true;
  }
  const p = currentPath();
  if (p === '/home') return false;
  if (TAB_ROOTS.includes(p)) {
    go('/home', { replace: true });
    return true;
  }
  history.back();
  return true;
};

store.on('levelup', ({ level, title }) => {
  setTimeout(() => {
    sfx.levelUp();
    confetti(90);
    toast(`レベルアップ！ <b>Lv.${level}</b>「${title}」`, { icon: '🎉', ms: 3200, cls: 'gold' });
  }, 400);
});
store.on('badge', (b) => {
  setTimeout(() => toast(`バッジ獲得：<b>${b.name}</b>`, { icon: b.emoji, ms: 3000, cls: 'gold' }), 900);
});

onRoute(render);
if (!location.hash) location.replace('#/home');
render();

// Splash
const splash = document.getElementById('splash');
if (splash) {
  setTimeout(() => splash.classList.add('hide'), 900);
  setTimeout(() => splash.remove(), 1600);
}

// First-run welcome
const WELCOME_KEY = 'chronoatlas.welcomed';
let welcomed = true;
try {
  welcomed = !!localStorage.getItem(WELCOME_KEY);
} catch (e) {
  /* storage unavailable */
}
if (!welcomed) {
  setTimeout(() => {
    openSheet(
      (body, close) => {
        body.innerHTML = `
        <div class="welcome">
          <div class="welcome-emoji">🌍⏳</div>
          <h2>クロノアトラスへようこそ！</h2>
          <p>国と時代、ふたつの軸で世界の歴史を旅するアプリです。${COUNTRIES.length}の国と地域、${EVENTS.length}の出来事を、本物の写真や絵とともに学べます。</p>
          <div class="welcome-list">
            <div><span>🌍</span><b>時をかける地球儀</b><small>スライダーで年代を動かすと、その時代に出来事があった国が光ります。国をタップするとその国の歴史へ。</small></div>
            <div><span>📜</span><b>時代で学ぶ・比較年表</b><small>8つの時代ごとに世界を見渡したり、国をならべて同じ時代を比べたりできます。</small></div>
            <div><span>📽️</span><b>ストーリーモード</b><small>国や時代の歴史を紙芝居のように。自動ナレーションで聞くこともできます。</small></div>
            <div><span>🏛️</span><b>3D博物館</b><small>ピラミッドや黒船など${MODELS.length}の3Dモデル。指で回して、番号の点をタップすると解説が出ます。</small></div>
            <div><span>❓</span><b>クイズ</b><small>${Object.keys(MODES).length}種類のモードで確認問題（写真クイズも）。正解するとXPがたまり、レベルアップやバッジ獲得も！</small></div>
          </div>
          <button class="btn-wide accent" data-start>さあ、はじめよう！</button>
        </div>`;
        body.querySelector('[data-start]').addEventListener('click', close);
      },
      {
        onClose: () => {
          try {
            localStorage.setItem(WELCOME_KEY, '1');
          } catch (e) {
            /* ignore */
          }
        },
      },
    );
  }, 1300);
}
