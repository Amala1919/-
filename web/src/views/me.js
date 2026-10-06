import { EVENTS, COUNTRIES, ERAS, eventsInEra, EVENT_BY_ID } from '../data/index.js';
import { MODELS } from '../three/models/index.js';
import { store, BADGES, xpForLevel } from '../store.js';
import { eventCard, progressRing, toast, openSheet, closeAllSheets } from '../components/ui.js';
import { openEvent } from '../components/sheets.js';
import { go } from '../router.js';
import { esc } from '../util.js';
import { isAndroid } from '../native.js';
import { allCredits, imageCount } from '../images.js';

export default function me(root) {
  const s = store.state;
  const lvl = store.level();
  const lo = xpForLevel(lvl);
  const hi = xpForLevel(lvl + 1);
  const read = store.readCount();
  const acc = s.quiz.answered ? Math.round((s.quiz.correct / s.quiz.answered) * 100) : 0;
  const favs = s.favorites.map((id) => EVENT_BY_ID[id]).filter(Boolean);

  root.innerHTML = `
  <header class="me-hero">
    <button class="back-btn inline" data-back aria-label="戻る">‹</button>
    <div class="me-level"><div class="me-lv">Lv.<b>${lvl}</b></div><div class="me-title">${store.levelTitle()}</div></div>
    <div class="xp-bar"><i style="width:${((s.xp - lo) / (hi - lo)) * 100}%"></i></div>
    <div class="xp-text">${s.xp} XP ・ 次のレベルまで ${hi - s.xp} XP</div>
    <div class="me-stats">
      <div><b>${read}</b><small>読んだ出来事</small></div>
      <div><b>${Object.keys(s.models).length}</b><small>見た3D</small></div>
      <div><b>${acc}%</b><small>クイズ正答率</small></div>
      <div><b>${s.days.streak}</b><small>連続学習日</small></div>
    </div>
  </header>
  <section class="pad">
    <h3 class="sub">🏅 バッジ（${Object.keys(s.badges).length}/${BADGES.length}）</h3>
    <div class="badge-grid">${BADGES.map((b) => `<div class="badge ${s.badges[b.id] ? 'on' : ''}" title="${esc(b.desc)}"><span>${b.emoji}</span><b>${esc(b.name)}</b><small>${esc(b.desc)}</small></div>`).join('')}</div>

    <h3 class="sub">⏳ 時代ごとの進み具合</h3>
    <div class="era-progress">${ERAS.map((e) => {
      const evs = eventsInEra(e.id);
      const n = evs.filter((x) => store.isRead(x.id)).length;
      return `<button data-go="/era/${e.id}">${progressRing(n / evs.length, 52, e.color, e.emoji)}<small>${e.name}</small></button>`;
    }).join('')}</div>

    <h3 class="sub">🗺️ 国ごとの進み具合</h3>
    <div class="country-progress">${COUNTRIES.map((c) => {
      const n = store.readCount(c.id);
      return `<button data-go="/country/${c.id}"><span>${c.flag}</span><span class="cp-name">${esc(c.name.replace(/（.*）/, ''))}</span><span class="bar"><i style="width:${(n / c.events.length) * 100}%;background:${c.color}"></i></span><small>${n}/${c.events.length}</small></button>`;
    }).join('')}</div>

    ${favs.length ? `<h3 class="sub">★ お気に入り</h3><div class="card-list">${favs.map((e) => eventCard(e)).join('')}</div>` : ''}

    <h3 class="sub">⚙️ 設定</h3>
    <div class="settings">
      <label class="set-row"><span>🔊 効果音</span><input type="checkbox" id="snd" ${s.settings.sound ? 'checked' : ''}></label>
      <label class="set-row"><span>🗣️ 読み上げの速さ</span><select id="rate">${[0.8, 1.0, 1.2, 1.5].map((r) => `<option value="${r}" ${s.settings.ttsRate === r ? 'selected' : ''}>${r}倍</option>`).join('')}</select></label>
      <button class="btn-wide" id="credits">📷 画像クレジット（${imageCount()}枚）</button>
      <button class="btn-wide danger" id="reset">学習データをリセット</button>
    </div>
    <p class="about">クロノアトラス v1.0 ・ ${EVENTS.length}の出来事 / ${COUNTRIES.length}の国と地域 / ${MODELS.length}の3Dモデル<br>
    地図データ：Natural Earth（パブリックドメイン）／写真：Wikimedia Commons${isAndroid() ? '' : '<br>ブラウザ版プレビュー'}</p>
  </section>`;

  root.querySelector('#snd').addEventListener('change', (e) => store.setSetting('sound', e.target.checked));
  root.querySelector('#rate').addEventListener('change', (e) => store.setSetting('ttsRate', Number(e.target.value)));
  root.querySelector('#credits').addEventListener('click', () => {
    openSheet((body) => {
      const list = allCredits().sort((a, b) => a.title.localeCompare(b.title));
      body.innerHTML = `<h2 class="sheet-title">📷 画像クレジット</h2>
        <p class="pad-x hint">アプリ内の写真・絵画は、Wikimedia Commons で自由な利用が認められた画像（パブリックドメイン、クリエイティブ・コモンズなど）です。各画像の作者とライセンスは以下のとおりです。タップすると拡大し、元のページを開けます。</p>
        <div class="credit-list">${list
          .map((c) => `<button class="credit-row" data-photo="${esc(c.title)}" data-caption="${esc(c.title)}"><span class="cr-thumb" style="background-image:url('${c.thumb}')"></span><span><b>${esc(c.title)}</b><small>${esc(c.artist || '作者不明')}<br>${esc(c.license)} ・ ${esc(c.file)}</small></span></button>`)
          .join('')}</div>`;
    });
  });
  root.querySelector('#reset').addEventListener('click', () => {
    openSheet((body) => {
      body.innerHTML = `<h2 class="sheet-title">学習データをリセット</h2>
        <p class="pad-x">読んだ記録・XP・バッジ・クイズの成績をすべて消去します。元に戻すことはできません。</p>
        <div class="pad"><button class="btn-wide danger" data-yes>すべて消去する</button><button class="btn-wide" data-no>やめる</button></div>`;
      body.addEventListener('click', (e) => {
        if (e.target.closest('[data-yes]')) {
          store.reset();
          closeAllSheets();
          toast('リセットしました', { icon: '🧹' });
          go('/home', { replace: true });
        } else if (e.target.closest('[data-no]')) closeAllSheets();
      });
    });
  });
  root.addEventListener('click', (ev) => {
    const t = ev.target.closest('button');
    if (!t) return;
    if (t.dataset.event) openEvent(t.dataset.event);
    else if (t.dataset.go) go(t.dataset.go);
    else if (t.hasAttribute('data-back')) history.back();
  });
}
