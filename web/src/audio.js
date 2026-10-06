// Tiny synthesized sound effects (no audio files needed).
import { store } from './store.js';

let ctx = null;
function ac() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone(freq, start, dur, type = 'sine', gain = 0.15) {
  const a = ac();
  if (!a) return;
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = type;
  o.frequency.value = freq;
  const t = a.currentTime + start;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(a.destination);
  o.start(t);
  o.stop(t + dur + 0.02);
}

const on = () => store.settings().sound !== false;

export const sfx = {
  tap() {
    if (on()) tone(660, 0, 0.06, 'triangle', 0.06);
  },
  correct() {
    if (!on()) return;
    tone(784, 0, 0.12, 'triangle');
    tone(1175, 0.09, 0.22, 'triangle');
  },
  wrong() {
    if (!on()) return;
    tone(220, 0, 0.18, 'sawtooth', 0.08);
    tone(185, 0.12, 0.25, 'sawtooth', 0.08);
  },
  fanfare() {
    if (!on()) return;
    [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.11, 0.25, 'triangle', 0.12));
    tone(1319, 0.48, 0.5, 'triangle', 0.12);
  },
  levelUp() {
    if (!on()) return;
    [392, 523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.07, 0.2, 'square', 0.05));
  },
  page() {
    if (on()) tone(520, 0, 0.05, 'sine', 0.04);
  },
};
