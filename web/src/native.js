// Thin wrappers around the Android bridge with browser fallbacks.
const bridge = () => window.AndroidBridge;

export const isAndroid = () => !!bridge();

export function speak(text, rate = 1) {
  const b = bridge();
  if (b && b.canSpeak && b.canSpeak()) {
    b.speak(text, rate);
    return true;
  }
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ja-JP';
    u.rate = rate;
    window.speechSynthesis.speak(u);
    return true;
  }
  return false;
}

export function stopSpeaking() {
  const b = bridge();
  if (b) b.stopSpeaking();
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

export function isSpeaking() {
  const b = bridge();
  if (b) return b.isSpeaking();
  return 'speechSynthesis' in window && window.speechSynthesis.speaking;
}

export function vibrate(ms = 30) {
  const b = bridge();
  if (b) return b.vibrate(ms);
  if (navigator.vibrate) navigator.vibrate(ms);
}

export function share(text) {
  const b = bridge();
  if (b) return b.share(text);
  if (navigator.share) return navigator.share({ text }).catch(() => {});
  if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {});
}
