// Minimal hash router.
const routes = [];
let current = null;
let handler = null;

export function route(pattern, view) {
  const keys = [];
  const re = new RegExp('^' + pattern.replace(/:(\w+)/g, (_, k) => (keys.push(k), '([^/]+)')) + '$');
  routes.push({ re, keys, view, pattern });
}

export function resolve(path) {
  for (const r of routes) {
    const m = path.match(r.re);
    if (m) {
      const params = {};
      r.keys.forEach((k, i) => (params[k] = decodeURIComponent(m[i + 1])));
      return { view: r.view, params, pattern: r.pattern };
    }
  }
  return null;
}

export function currentPath() {
  return location.hash.replace(/^#/, '').split('?')[0] || '/home';
}

export function go(path, { replace = false } = {}) {
  if (location.hash.replace(/^#/, '') === path) {
    handler && handler();
    return;
  }
  if (replace) location.replace('#' + path);
  else location.hash = path;
}

export function back() {
  if (history.length > 1) history.back();
  else go('/home', { replace: true });
}

export function onRoute(fn) {
  handler = fn;
  window.addEventListener('hashchange', fn);
}

export const getCurrent = () => current;
export const setCurrent = (c) => (current = c);
