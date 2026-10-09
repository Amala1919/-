import { FAMILY_BY_ID } from '../data/relations.js';
import { buildQuiz, MODES } from '../quiz/engine.js';
import { COUNTRY_BY_ID, ERA_BY_ID } from '../data/index.js';
import { store } from '../store.js';
import { go } from '../router.js';
import { confetti } from '../components/ui.js';
import { openEvent } from '../components/sheets.js';
import { sfx } from '../audio.js';
import { vibrate } from '../native.js';
import { esc } from '../util.js';

const TIME_LIMIT = 60;

export default function quizPlay(root, { mode, arg }) {
  const m = MODES[mode] || MODES.quick;
  const questions = buildQuiz(mode, arg, store.state.wrong);
  if (!questions.length) return go('/quiz', { replace: true });
  const isTime = mode === 'time';
  let i = 0;
  let correct = 0;
  let streak = 0;
  let bestStreak = 0;
  let answered = 0;
  let locked = false;
  let timer = 0;
  let timeLeft = TIME_LIMIT;
  let done = false;
  const results = [];

  const title =
    mode === 'country' ? `${COUNTRY_BY_ID[arg].flag} ${COUNTRY_BY_ID[arg].name}` : mode === 'era' ? `${ERA_BY_ID[arg].emoji} ${ERA_BY_ID[arg].name}` : mode === 'family' && FAMILY_BY_ID[arg] ? `${FAMILY_BY_ID[arg].emoji} ${FAMILY_BY_ID[arg].name}` : `${m.emoji} ${m.name}`;

  root.innerHTML = `
  <div class="quiz" style="--c:${m.color}">
    <div class="quiz-top">
      <button class="back-btn inline" data-quit aria-label="やめる">✕</button>
      <div class="quiz-title">${esc(title)}</div>
      <div class="quiz-score"><span id="streak"></span><b id="score">0</b></div>
    </div>
    <div class="quiz-bar"><i id="bar"></i></div>
    <div id="qbox" class="qbox"></div>
  </div>`;

  const qbox = root.querySelector('#qbox');
  const bar = root.querySelector('#bar');
  const scoreEl = root.querySelector('#score');
  const streakEl = root.querySelector('#streak');

  const updateTop = () => {
    scoreEl.textContent = isTime ? `${correct}問` : `${correct}/${questions.length}`;
    streakEl.textContent = streak >= 2 ? `🔥${streak}` : '';
    bar.style.width = isTime ? `${(timeLeft / TIME_LIMIT) * 100}%` : `${(i / questions.length) * 100}%`;
  };

  const finish = () => {
    if (done) return;
    done = true;
    clearInterval(timer);
    const total = isTime ? answered : questions.length;
    const xp = correct * 10 + (correct === total && total >= 5 ? 20 : 0);
    store.recordQuiz({ correct, total, mode, countryId: mode === 'country' ? arg : null, bestStreak, timeAttack: isTime });
    if (xp) store.addXP(xp);
    const pct = total ? correct / total : 0;
    const stars = pct >= 0.95 ? 3 : pct >= 0.7 ? 2 : pct >= 0.4 ? 1 : 0;
    if (stars >= 2) {
      sfx.fanfare();
      confetti();
    }
    const msg = ['もう一度チャレンジ！', 'いい調子！', 'すばらしい！', 'パーフェクト！歴史マスター！'][stars];
    qbox.innerHTML = `
      <div class="result">
        <div class="stars">${[0, 1, 2].map((k) => `<span class="${k < stars ? 'on' : ''}">★</span>`).join('')}</div>
        <div class="result-score">${correct}<small> / ${total}</small></div>
        <div class="result-msg">${msg}</div>
        <div class="result-xp">+${xp} XP${bestStreak >= 3 ? `　🔥最高${bestStreak}連続` : ''}</div>
        <div class="result-list">${results
          .map((r) => `<button class="rl ${r.ok ? 'ok' : 'ng'}" ${r.eventId ? `data-event="${r.eventId}"` : ''}><span>${r.ok ? '⭕' : '❌'}</span><span>${esc(r.prompt)}</span>${r.eventId ? '<span class="rl-go">›</span>' : ''}</button>`)
          .join('')}</div>
        <div class="result-actions">
          <button class="btn-wide accent" data-retry>もう一度</button>
          <button class="btn-wide" data-menu>クイズメニューへ</button>
        </div>
      </div>`;
    bar.style.width = '100%';
  };

  const answer = (q, ok, chosenLabel) => {
    locked = true;
    answered++;
    results.push({ prompt: q.prompt.length > 34 ? q.prompt.slice(0, 34) + '…' : q.prompt, ok, eventId: q.eventId });
    if (ok) {
      correct++;
      streak++;
      bestStreak = Math.max(bestStreak, streak);
      sfx.correct();
      if (q.type !== 'order') store.removeWrong(q.id);
    } else {
      streak = 0;
      sfx.wrong();
      vibrate(80);
      if (q.type !== 'order') store.addWrong(q.id);
    }
    updateTop();
    if (isTime) {
      setTimeout(() => {
        if (done) return;
        i++;
        if (i >= questions.length || timeLeft <= 0) finish();
        else show();
      }, ok ? 350 : 900);
      return;
    }
    const fb = document.createElement('div');
    fb.className = `feedback ${ok ? 'ok' : 'ng'}`;
    fb.innerHTML = `<div class="fb-head">${ok ? '⭕ 正解！' : '❌ ざんねん…'}${!ok && chosenLabel ? `<small>あなたの答え：${esc(chosenLabel)}</small>` : ''}</div>
      <div class="fb-explain">${esc(q.explain)}</div>
      <div class="fb-actions">${q.eventId ? `<button class="btn-ghost" data-event="${q.eventId}">📖 くわしく読む</button>` : ''}<button class="btn-next" data-next>${i + 1 >= questions.length ? '結果を見る' : '次へ ›'}</button></div>`;
    qbox.appendChild(fb);
    fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const show = () => {
    locked = false;
    const q = questions[i];
    updateTop();
    if (q.type === 'order') {
      const picked = [];
      qbox.innerHTML = `
        <div class="qcard">
          <div class="q-num">${isTime ? '' : `Q${i + 1}`}</div>
          <div class="q-prompt">${esc(q.prompt)}</div>
          <div class="order-slots">${q.items.map((_, k) => `<div class="slot" data-slot="${k}"><span>${k + 1}</span></div>`).join('')}</div>
          <div class="choices">${q.items.map((it) => `<button class="choice" data-item="${it.id}">${it.flag} ${esc(it.label)}</button>`).join('')}</div>
          <button class="btn-ghost small" data-undo>↩ やりなおす</button>
        </div>`;
      const slots = [...qbox.querySelectorAll('.slot')];
      const refresh = () => {
        slots.forEach((s, k) => {
          const it = q.items.find((x) => x.id === picked[k]);
          s.innerHTML = `<span>${k + 1}</span>${it ? esc(it.label) : ''}`;
          s.classList.toggle('filled', !!it);
        });
        qbox.querySelectorAll('[data-item]').forEach((b) => (b.disabled = picked.includes(b.dataset.item)));
      };
      qbox.onclick = (ev) => {
        const t = ev.target.closest('button');
        if (!t || locked) return handleCommon(ev);
        if (t.dataset.undo != null && !locked) {
          picked.length = 0;
          refresh();
          return;
        }
        if (!t.dataset.item) return handleCommon(ev);
        sfx.tap();
        picked.push(t.dataset.item);
        refresh();
        if (picked.length === q.items.length) {
          const ok = picked.every((id, k) => id === q.correctOrder[k]);
          slots.forEach((s, k) => s.classList.add(picked[k] === q.correctOrder[k] ? 'right' : 'wrong'));
          answer(q, ok);
        }
      };
      return;
    }
    qbox.innerHTML = `
      <div class="qcard">
        <div class="q-num">${isTime ? '' : `Q${i + 1}`}</div>
        <div class="q-visual">${q.visual || ''}</div>
        <div class="q-prompt">${esc(q.prompt)}</div>
        <div class="choices">${q.choices.map((c, k) => `<button class="choice" data-k="${k}"><span class="ck">${'ABCD'[k]}</span>${esc(c.label)}</button>`).join('')}</div>
      </div>`;
    qbox.onclick = (ev) => {
      const t = ev.target.closest('[data-k]');
      if (!t || locked) return handleCommon(ev);
      const k = Number(t.dataset.k);
      const ok = k === q.answer;
      const btns = qbox.querySelectorAll('[data-k]');
      btns.forEach((b, j) => {
        b.disabled = true;
        if (j === q.answer) b.classList.add('right');
      });
      if (!ok) t.classList.add('wrong');
      answer(q, ok, q.choices[k].label);
    };
  };

  const handleCommon = (ev) => {
    const t = ev.target.closest('button');
    if (!t) return;
    if (t.dataset.next != null) {
      i++;
      if (i >= questions.length) finish();
      else show();
    } else if (t.dataset.event) openEvent(t.dataset.event);
  };

  root.addEventListener('click', (ev) => {
    const t = ev.target.closest('button');
    if (!t) return;
    if (t.dataset.quit != null) go('/quiz', { replace: true });
    else if (t.dataset.retry != null) go(`/quiz/run/${mode}/${arg}?${Date.now()}`, { replace: true });
    else if (t.dataset.menu != null) go('/quiz', { replace: true });
    else if (t.closest('.result') && t.dataset.event) openEvent(t.dataset.event);
  });

  if (isTime) {
    qbox.innerHTML = `<div class="ta-intro"><div class="ta-big">⚡</div><p>60秒間でできるだけ多く正解しよう！</p><button class="btn-wide accent" id="ta-start">スタート</button></div>`;
    qbox.querySelector('#ta-start').addEventListener('click', () => {
      timer = setInterval(() => {
        timeLeft -= 0.25;
        updateTop();
        if (timeLeft <= 0) {
          finish();
        }
      }, 250);
      show();
    });
    updateTop();
  } else show();

  return () => clearInterval(timer);
}

