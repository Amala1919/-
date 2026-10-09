// Historical world maps for the time-travel globe.
// Borders: aourednik/historical-basemaps (GPL-3.0), simplified into web/public/hist/<year>.json.
import { feature } from 'topojson-client';
import { geoContains } from 'd3-geo';
import NAMES_JA from '../data/hist-names-ja.js';

let indexPromise = null;
const cache = new Map();

/** { years: [...], labels: { year: [[name, lon, lat, area], ...] } } */
export function histIndex() {
  if (!indexPromise) {
    indexPromise = fetch('hist/index.json')
      .then((r) => r.json())
      .catch((e) => {
        indexPromise = null;
        throw e;
      });
  }
  return indexPromise;
}

/** The latest snapshot at or before `year` (the earliest one for older years). */
export function snapshotFor(year, years) {
  let s = years[0];
  for (const y of years) if (y <= year) s = y;
  return s;
}

export function loadSnapshot(year) {
  if (!cache.has(year)) {
    const p = fetch(`hist/${year}.json`)
      .then((r) => r.json())
      .then((t) => feature(t, t.objects[Object.keys(t.objects)[0]]).features.filter((f) => f.geometry && f.properties.NAME))
      .catch((e) => {
        cache.delete(year);
        throw e;
      });
    cache.set(year, p);
  }
  return cache.get(year);
}

export const histName = (n) => NAMES_JA[n] || n;

const CULTURE = /hunter|gatherer|farmer|nomad|pastoral|tribes|culture|peoples|herder|fisher|forager|cultivator|mesolithic|neolithic|aboriginal|savanna|bantu|khoisan|pygm|indians|amerindian/i;

const PALETTE = [
  '#e57373', '#f06292', '#ba68c8', '#9575cd', '#7986cb', '#64b5f6', '#4fc3f7', '#4dd0e1', '#4db6ac', '#81c784',
  '#aed581', '#dce775', '#fff176', '#ffd54f', '#ffb74d', '#ff8a65', '#a1887f', '#90a4ae', '#d4a5a5', '#c5a3ff',
  '#7fd1b9', '#f7a072', '#e6c84f', '#6fa8dc',
];

function hash(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function isCulture(props) {
  return CULTURE.test(props.NAME || '') && (!props.SUBJECTO || props.SUBJECTO === props.NAME);
}

/** Same ruler (SUBJECTO) → same colour, so empires and their colonies read as one block. */
export function polityColor(props) {
  if (isCulture(props)) {
    const k = hash(props.NAME || '') % 4;
    return ['#b8ad8f', '#a9a487', '#bdb197', '#aea38a'][k];
  }
  const key = props.SUBJECTO || props.NAME || '';
  return PALETTE[hash(key) % PALETTE.length];
}

/** Draws the historical layer onto a 2D equirectangular canvas context. */
export function drawHistorical(g, path, features) {
  for (const f of features) {
    if (!f.geometry) continue;
    g.beginPath();
    path(f);
    g.fillStyle = polityColor(f.properties);
    g.fill();
  }
  g.strokeStyle = 'rgba(255,255,255,0.75)';
  g.lineWidth = 1.1;
  for (const f of features) {
    if (!f.geometry || isCulture(f.properties)) continue;
    g.beginPath();
    path(f);
    g.stroke();
  }
}

export function polityAt(features, lon, lat) {
  // Prefer states over cultural regions when both contain the point.
  let culture = null;
  for (const f of features) {
    if (!f.geometry || !geoContains(f, [lon, lat])) continue;
    if (!isCulture(f.properties)) return f.properties;
    culture = culture || f.properties;
  }
  return culture;
}
