export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ESC[c]);

function withMan(n) {
  if (n < 10000) return String(n);
  const man = Math.floor(n / 10000);
  const rest = n % 10000;
  return `${man}万${rest ? rest : ''}`;
}

/** 紀元前221年 / 1868年 (+ ごろ) */
export function formatYear(year, approx = false) {
  const s = year < 0 ? `紀元前${withMan(-year)}年` : `${year}年`;
  return approx ? s + 'ごろ' : s;
}

/** Compact: 前221 / 1868 */
export function shortYear(year) {
  return year < 0 ? `前${withMan(-year)}` : String(year);
}

export function centuryLabel(year) {
  if (year < 0) {
    const c = Math.ceil(-year / 100);
    return `紀元前${c}世紀`;
  }
  return `${Math.floor((year - 1) / 100) + 1}世紀`;
}

export function shuffle(arr, rnd = Math.random) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function sample(arr, n, rnd = Math.random) {
  return shuffle(arr, rnd).slice(0, n);
}

export function pick(arr, rnd = Math.random) {
  return arr[Math.floor(rnd() * arr.length)];
}

export function seeded(seed) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function todayKey(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function el(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

export function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

/** Hex color with alpha (0..1) -> rgba() */
export function alpha(hex, a) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}
