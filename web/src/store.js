// Learning progress, XP, badges and settings persisted in localStorage.
import { EVENTS, EVENT_BY_ID, COUNTRIES, ERAS } from './data/index.js';
import { todayKey } from './util.js';

const KEY = 'chronoatlas.v1';

const defaults = () => ({
  read: {},
  xp: 0,
  favorites: [],
  models: {},
  people: {},
  countriesVisited: {},
  quiz: { played: 0, answered: 0, correct: 0, perfect: 0, bestStreak: 0, bestTimeAttack: 0, byCountry: {} },
  wrong: [],
  badges: {},
  days: { last: null, streak: 0, total: 0 },
  settings: { sound: true, ttsRate: 1.0 },
});

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaults();
    const d = JSON.parse(raw);
    const base = defaults();
    return { ...base, ...d, quiz: { ...base.quiz, ...(d.quiz || {}) }, settings: { ...base.settings, ...(d.settings || {}) }, days: { ...base.days, ...(d.days || {}) } };
  } catch (e) {
    return defaults();
  }
}

let state = load();
const listeners = {};

function emit(type, payload) {
  (listeners[type] || []).forEach((fn) => fn(payload));
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    /* storage may be unavailable */
  }
}

export const LEVEL_TITLES = ['見習い歴史家', '歴史探検家', '時の旅人', '年表マスター', '歴史博士', '文明の語り部', '時空の賢者', '伝説の歴史家'];

export function xpForLevel(n) {
  return 50 * n * (n - 1);
}

export const BADGES = [
  { id: 'first_read', emoji: '👣', name: 'はじめの一歩', desc: '出来事を1つ読む' },
  { id: 'read_10', emoji: '📚', name: '読書家', desc: '出来事を10個読む' },
  { id: 'read_50', emoji: '🏛️', name: '歴史通', desc: '出来事を50個読む' },
  { id: 'read_100', emoji: '🎓', name: '歴史博士', desc: '出来事を100個読む' },
  { id: 'read_all', emoji: '👑', name: '全史制覇', desc: 'すべての出来事を読む' },
  { id: 'country_master', emoji: '🗺️', name: '国マスター', desc: '1つの国の出来事をすべて読む' },
  { id: 'traveler_5', emoji: '✈️', name: '世界旅行者', desc: '5つの国の出来事を読む' },
  { id: 'traveler_all', emoji: '🌍', name: '地球一周', desc: 'すべての国の出来事を読む' },
  { id: 'era_all', emoji: '⏳', name: 'タイムトラベラー', desc: 'すべての時代の出来事を読む' },
  { id: 'quiz_first', emoji: '❓', name: '初挑戦', desc: 'クイズに1回挑戦する' },
  { id: 'quiz_perfect', emoji: '💯', name: 'パーフェクト', desc: 'クイズで全問正解する' },
  { id: 'quiz_10', emoji: '🔥', name: 'クイズ好き', desc: 'クイズに10回挑戦する' },
  { id: 'streak_10', emoji: '⚡', name: '連続正解10', desc: '10問連続で正解する' },
  { id: 'time_15', emoji: '⏱️', name: 'スピードスター', desc: 'タイムアタックで15問正解' },
  { id: 'model_1', emoji: '🔭', name: '3D見学者', desc: '3Dモデルを1つ見る' },
  { id: 'model_10', emoji: '🏗️', name: '建築ファン', desc: '3Dモデルを10個見る' },
  { id: 'model_all', emoji: '🏆', name: '博物館の主', desc: 'すべての3Dモデルを見る' },
  { id: 'people_20', emoji: '🧑‍🤝‍🧑', name: '人物通', desc: '20人の人物を調べる' },
  { id: 'days_3', emoji: '📅', name: '三日坊主卒業', desc: '3日連続で学習する' },
  { id: 'level_5', emoji: '⭐', name: 'レベル5', desc: 'レベル5に到達する' },
];

function award(id) {
  if (state.badges[id]) return;
  state.badges[id] = Date.now();
  const b = BADGES.find((x) => x.id === id);
  if (b) emit('badge', b);
}

function touchDay() {
  const t = todayKey();
  if (state.days.last === t) return;
  const y = new Date();
  y.setDate(y.getDate() - 1);
  state.days.streak = state.days.last === todayKey(y) ? state.days.streak + 1 : 1;
  state.days.last = t;
  state.days.total += 1;
  if (state.days.streak >= 3) award('days_3');
}

function checkReadBadges() {
  const n = Object.keys(state.read).length;
  if (n >= 1) award('first_read');
  if (n >= 10) award('read_10');
  if (n >= 50) award('read_50');
  if (n >= 100) award('read_100');
  if (n >= EVENTS.length) award('read_all');
  const countriesTouched = new Set(Object.keys(state.read).map((id) => EVENT_BY_ID[id]?.country).filter(Boolean));
  if (countriesTouched.size >= 5) award('traveler_5');
  if (countriesTouched.size >= COUNTRIES.length) award('traveler_all');
  if (COUNTRIES.some((c) => c.events.every((e) => state.read[e.id]))) award('country_master');
  const erasTouched = new Set(Object.keys(state.read).map((id) => EVENT_BY_ID[id]?.era));
  if (ERAS.every((e) => erasTouched.has(e.id))) award('era_all');
}

export const store = {
  on(type, fn) {
    (listeners[type] = listeners[type] || []).push(fn);
  },
  get state() {
    return state;
  },
  level() {
    let n = 1;
    while (state.xp >= xpForLevel(n + 1)) n++;
    return n;
  },
  levelTitle(n = this.level()) {
    return LEVEL_TITLES[Math.min(LEVEL_TITLES.length - 1, Math.floor((n - 1) / 2))];
  },
  addXP(n) {
    const before = this.level();
    state.xp += n;
    touchDay();
    const after = this.level();
    emit('xp', { amount: n, total: state.xp });
    if (after > before) {
      emit('levelup', { level: after, title: this.levelTitle(after) });
      if (after >= 5) award('level_5');
    }
    save();
  },
  isRead(id) {
    return !!state.read[id];
  },
  markRead(id) {
    if (state.read[id]) return false;
    state.read[id] = Date.now();
    checkReadBadges();
    this.addXP(5);
    return true;
  },
  readCount(countryId) {
    if (!countryId) return Object.keys(state.read).length;
    return Object.keys(state.read).filter((id) => id.startsWith(countryId + '-')).length;
  },
  isFavorite(id) {
    return state.favorites.includes(id);
  },
  toggleFavorite(id) {
    const i = state.favorites.indexOf(id);
    if (i >= 0) state.favorites.splice(i, 1);
    else state.favorites.push(id);
    save();
    return i < 0;
  },
  viewModel(id) {
    if (state.models[id]) return;
    state.models[id] = Date.now();
    const n = Object.keys(state.models).length;
    if (n >= 1) award('model_1');
    if (n >= 10) award('model_10');
    if (n >= 28) award('model_all');
    this.addXP(3);
  },
  viewPerson(id) {
    if (state.people[id]) return;
    state.people[id] = Date.now();
    if (Object.keys(state.people).length >= 20) award('people_20');
    save();
  },
  visitCountry(id) {
    state.countriesVisited[id] = (state.countriesVisited[id] || 0) + 1;
    save();
  },
  recordQuiz({ correct, total, mode, countryId, bestStreak, timeAttack }) {
    const q = state.quiz;
    q.played += 1;
    q.answered += total;
    q.correct += correct;
    if (total > 0 && correct === total) {
      q.perfect += 1;
      award('quiz_perfect');
    }
    q.bestStreak = Math.max(q.bestStreak, bestStreak || 0);
    if (timeAttack) q.bestTimeAttack = Math.max(q.bestTimeAttack, correct);
    if (countryId) {
      const c = (q.byCountry[countryId] = q.byCountry[countryId] || { best: 0, played: 0 });
      c.played += 1;
      c.best = Math.max(c.best, Math.round((correct / Math.max(1, total)) * 100));
    }
    award('quiz_first');
    if (q.played >= 10) award('quiz_10');
    if ((bestStreak || 0) >= 10) award('streak_10');
    if (timeAttack && correct >= 15) award('time_15');
    void mode;
    save();
  },
  addWrong(qid) {
    if (!state.wrong.includes(qid)) state.wrong.push(qid);
    if (state.wrong.length > 200) state.wrong.shift();
    save();
  },
  removeWrong(qid) {
    const i = state.wrong.indexOf(qid);
    if (i >= 0) {
      state.wrong.splice(i, 1);
      save();
    }
  },
  settings() {
    return state.settings;
  },
  setSetting(k, v) {
    state.settings[k] = v;
    save();
  },
  reset() {
    state = defaults();
    save();
  },
  save,
};
