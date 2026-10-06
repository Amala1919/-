// World geometry (Natural Earth via world-atlas) and SVG map helpers.
import { feature } from 'topojson-client';
import { geoNaturalEarth1, geoPath, geoCentroid, geoOrthographic, geoGraticule10, geoDistance } from 'd3-geo';
import world50 from 'world-atlas/countries-50m.json';
import world110 from 'world-atlas/countries-110m.json';
import { COUNTRIES, COUNTRY_BY_ID } from '../data/index.js';

let cache50 = null;
let cache110 = null;

function build(topo) {
  const fc = feature(topo, topo.objects.countries);
  const byIso = new Map(fc.features.map((f) => [f.id, f]));
  return { features: fc.features, byIso };
}

/** Detailed geometry (globe texture, country silhouettes). */
export function worldFeatures() {
  if (!cache50) cache50 = build(world50);
  return cache50;
}

/** Light geometry (world maps). */
export function worldFeaturesLite() {
  if (!cache110) cache110 = build(world110);
  return cache110;
}

const iso3 = (n) => String(n).padStart(3, '0');

export function countryFeatures(countryId, detailed = true) {
  const c = COUNTRY_BY_ID[countryId];
  const { byIso } = detailed ? worldFeatures() : worldFeaturesLite();
  return c.iso.map((i) => byIso.get(iso3(i))).filter(Boolean);
}

const worldPathCache = new Map();

/**
 * World map SVG. highlight: Map(countryId -> color or true). markers: [{lat, lon, color, label}]
 */
export function worldMapSVG({ highlight = new Map(), width = 360, height = 190, markers = [], cls = '' } = {}) {
  const key = `${width}x${height}`;
  let base = worldPathCache.get(key);
  const proj = geoNaturalEarth1().fitExtent([[4, 4], [width - 4, height - 4]], { type: 'Sphere' });
  const path = geoPath(proj);
  if (!base) {
    const { features } = worldFeaturesLite();
    const land = features.map((f) => path(f)).join('');
    base = { land, sphere: path({ type: 'Sphere' }), grat: path(geoGraticule10()) };
    worldPathCache.set(key, base);
  }
  let hl = '';
  for (const [id, color] of highlight) {
    const fs = countryFeatures(id, false);
    const d = fs.map((f) => path(f)).join('');
    const col = color === true ? COUNTRY_BY_ID[id].color : color;
    hl += `<path d="${d}" fill="${col}" stroke="#fff" stroke-width="0.6"/>`;
  }
  let mk = '';
  for (const m of markers) {
    const p = proj([m.lon, m.lat]);
    if (!p) continue;
    mk += `<g transform="translate(${p[0].toFixed(1)},${p[1].toFixed(1)})"><circle r="7" fill="${m.color}" opacity="0.25"><animate attributeName="r" values="4;10;4" dur="2.4s" repeatCount="indefinite"/></circle><circle r="3.4" fill="${m.color}" stroke="#fff" stroke-width="1.2"/>${m.label ? `<text y="-7" text-anchor="middle" class="map-label">${m.label}</text>` : ''}</g>`;
  }
  return `<svg class="world-map ${cls}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" role="img">
    <path d="${base.sphere}" class="map-ocean"/>
    <path d="${base.grat}" class="map-grat"/>
    <path d="${base.land}" class="map-land"/>
    ${hl}${mk}</svg>`;
}

// Drop far-away overseas territories so the silhouette shows the main land.
const SHAPE_MAX_DEG = { fr: 15, us: 45, es: 20 };
function trimFeature(f, center, maxDeg) {
  if (f.geometry.type !== 'MultiPolygon' || !maxDeg) return f;
  const max = (maxDeg * Math.PI) / 180;
  const coords = f.geometry.coordinates.filter((poly) => geoDistance(geoCentroid({ type: 'Polygon', coordinates: poly }), center) <= max);
  return { ...f, geometry: { type: 'MultiPolygon', coordinates: coords } };
}

/** Silhouette of a country, fitted to the box, with glow. */
export function countryShapeSVG(countryId, { size = 140, color } = {}) {
  const c = COUNTRY_BY_ID[countryId];
  const fs = countryFeatures(countryId, true).map((f) => trimFeature(f, [c.lon, c.lat], SHAPE_MAX_DEG[countryId]));
  const fc = { type: 'FeatureCollection', features: fs };
  const centroid = geoCentroid(fc);
  const proj = geoOrthographic().rotate([-centroid[0], -centroid[1]]).fitExtent([[8, 8], [size - 8, size - 8]], fc);
  const path = geoPath(proj);
  const d = fs.map((f) => path(f)).join('');
  const col = color || c.color;
  const id = `glow-${countryId}-${size}`;
  return `<svg class="country-shape" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
    <defs><filter id="${id}" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <path d="${d}" fill="${col}" stroke="rgba(255,255,255,.85)" stroke-width="1" filter="url(#${id})"/></svg>`;
}

/** Small orthographic locator globe centered on the country. */
export function locatorSVG(countryId, size = 120) {
  const c = COUNTRY_BY_ID[countryId];
  const proj = geoOrthographic().rotate([-c.lon, -c.lat]).fitExtent([[3, 3], [size - 3, size - 3]], { type: 'Sphere' });
  const path = geoPath(proj);
  const { features } = worldFeaturesLite();
  const land = features.map((f) => path(f)).join('');
  const hl = countryFeatures(countryId, false).map((f) => path(f)).join('');
  return `<svg class="locator" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
    <path d="${path({ type: 'Sphere' })}" fill="#1d4f80"/>
    <path d="${path(geoGraticule10())}" fill="none" stroke="rgba(255,255,255,.12)" stroke-width=".5"/>
    <path d="${land}" fill="#c9b994" stroke="rgba(80,60,30,.4)" stroke-width=".4"/>
    <path d="${hl}" fill="${c.color}" stroke="#fff" stroke-width=".8"/></svg>`;
}

export { COUNTRIES };
