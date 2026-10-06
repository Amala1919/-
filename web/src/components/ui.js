import { esc, shortYear, formatYear, alpha } from '../util.js';
import { COUNTRY_BY_ID, ERA_BY_ID } from '../data/index.js';
import { store } from '../store.js';

// ---------- Toasts ----------
let toastWrap = null;
export function toast(html, { icon = '✨', ms = 2600, cls = '' } = {}) {
  if (!toastWrap) {
    toastWrap = document.createElement('div');
    toastWrap.className = 'toasts';
    document.body.appendChild(toastWrap);
  }
  const t = document.createElement('div');
  t.className = `toast ${cls}`;
  t.innerHTML = `<span class="toast-icon">${icon}</span><span>${html}</span>`;
  toastWrap.appendChild(t);
  requestAnimationFrame(() => t.classList.add('in'));
  setTimeout(() => {
    t.classList.remove('in');
    setTimeout(() => t.remove(), 400);
  }, ms);
}

// ---------- Bottom sheets (stackable) ----------
const sheets = [];
export function openSheet(render, { onClose, cls = '' } = {}) {
  const wrap = document.createElement('div');
  wrap.className = `sheet-wrap ${cls}`;
  wrap.innerHTML = `<div class="sheet-backdrop"></div><div class="sheet" role="dialog"><div class="sheet-grip"></div><button class="sheet-close" aria-label="閉じる">✕</button><div class="sheet-body"></div></div>`;
  document.body.appendChild(wrap);
  const body = wrap.querySelector('.sheet-body');
  const entry = { wrap, onClose, cleanup: null };
  sheets.push(entry);
  const close = () => closeSheet(entry);
  wrap.querySelector('.sheet-backdrop').addEventListener('click', close);
  wrap.querySelector('.sheet-close').addEventListener('click', close);
  // drag-to-close on the grip
  const sheet = wrap.querySelector('.sheet');
  let startY = null;
  const grip = wrap.querySelector('.sheet-grip');
  grip.addEventListener('pointerdown', (e) => {
    startY = e.clientY;
    grip.setPointerCapture(e.pointerId);
  });
  grip.addEventListener('pointermove', (e) => {
    if (startY == null) return;
    const dy = Math.max(0, e.clientY - startY);
    sheet.style.transform = `translateY(${dy}px)`;
  });
  grip.addEventListener('pointerup', (e) => {
    if (startY == null) return;
    const dy = e.clientY - startY;
    startY = null;
    sheet.style.transform = '';
    if (dy > 90) close();
  });
  entry.cleanup = render(body, close) || null;
  requestAnimationFrame(() => wrap.classList.add('open'));
  return close;
}

export function closeSheet(entry = sheets[sheets.length - 1]) {
  if (!entry) return false;
  const i = sheets.indexOf(entry);
  if (i < 0) return false;
  sheets.splice(i, 1);
  entry.cleanup && entry.cleanup();
  entry.onClose && entry.onClose();
  entry.wrap.classList.remove('open');
  setTimeout(() => entry.wrap.remove(), 320);
  return true;
}

export function closeAllSheets() {
  while (sheets.length) closeSheet();
}

export const hasSheet = () => sheets.length > 0;

// ---------- Confetti ----------
export function confetti(n = 120) {
  const c = document.createElement('canvas');
  c.className = 'confetti';
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  c.width = innerWidth * dpr;
  c.height = innerHeight * dpr;
  document.body.appendChild(c);
  const g = c.getContext('2d');
  g.scale(dpr, dpr);
  const colors = ['#f2b33d', '#e8445a', '#4f7cff', '#2bb673', '#a66cff', '#ff8a3d'];
  const parts = [...Array(n)].map(() => ({
    x: innerWidth / 2 + (Math.random() - 0.5) * 80,
    y: innerHeight * 0.35,
    vx: (Math.random() - 0.5) * 12,
    vy: -Math.random() * 12 - 4,
    r: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.3,
    w: 6 + Math.random() * 6,
    h: 4 + Math.random() * 4,
    c: colors[Math.floor(Math.random() * colors.length)],
  }));
  const t0 = performance.now();
  const step = (now) => {
    const t = now - t0;
    g.clearRect(0, 0, innerWidth, innerHeight);
    for (const p of parts) {
      p.vy += 0.32;
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.r += p.vr;
      g.save();
      g.translate(p.x, p.y);
      g.rotate(p.r);
      g.fillStyle = p.c;
      g.globalAlpha = Math.max(0, 1 - t / 2600);
      g.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      g.restore();
    }
    if (t < 2600) requestAnimationFrame(step);
    else c.remove();
  };
  requestAnimationFrame(step);
}

// ---------- Cards & small widgets ----------
export function flag(countryId) {
  return COUNTRY_BY_ID[countryId]?.flag || '🏳️';
}

export function eventCard(e, { showCountry = true, compact = false } = {}) {
  const era = ERA_BY_ID[e.era];
  const c = COUNTRY_BY_ID[e.country];
  const read = store.isRead(e.id);
  return `<button class="event-card ${compact ? 'compact' : ''} ${read ? 'read' : ''}" data-event="${e.id}" style="--era:${era.color};--era-a:${alpha(era.color, 0.16)}">
    <span class="ec-emoji">${e.emoji}</span>
    <span class="ec-main">
      <span class="ec-meta">${showCountry ? `<span class="ec-flag">${c.flag}</span>` : ''}<span class="ec-year">${shortYear(e.year)}${e.approx ? '頃' : ''}</span>${e.model ? '<span class="ec-chip">3D</span>' : ''}</span>
      <span class="ec-title">${esc(e.title)}</span>
      ${compact ? '' : `<span class="ec-sum">${esc(e.summary)}</span>`}
    </span>
  </button>`;
}

export function progressRing(pct, size = 44, color = '#f2b33d', label = '') {
  const r = (size - 6) / 2;
  const c = 2 * Math.PI * r;
  return `<svg class="ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" stroke="rgba(255,255,255,.12)" stroke-width="5" fill="none"/><circle cx="${size / 2}" cy="${size / 2}" r="${r}" stroke="${color}" stroke-width="5" fill="none" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - pct)}" transform="rotate(-90 ${size / 2} ${size / 2})"/><text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" class="ring-text">${label || Math.round(pct * 100) + '%'}</text></svg>`;
}

export function yearBadge(e) {
  return `<span class="year-badge">${formatYear(e.year, e.approx)}</span>`;
}

export function sectionTitle(text, extra = '') {
  return `<div class="section-title"><h2>${text}</h2>${extra}</div>`;
}
