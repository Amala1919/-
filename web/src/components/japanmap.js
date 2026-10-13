// Map of Japan (Natural Earth outline) with one tappable dot per prefecture.
import { geoMercator, geoPath } from 'd3-geo';
import { countryFeatures } from './geo.js';

const REGION_COLOR = {
  北海道: '#64b5f6', 東北: '#4db6ac', 関東: '#ffb74d', 中部: '#aed581', 近畿: '#f06292', 中国: '#ba68c8', 四国: '#4dd0e1', '九州・沖縄': '#ff8a65',
};
export const regionColor = (r) => REGION_COLOR[r] || '#ccc';

/** prefs: [{id, lat, lon, region, name}], focus: highlighted id */
export function japanMapSVG(prefs, { width = 360, height = 420, focus = null, okinawaInset = true } = {}) {
  const land = countryFeatures('jp', true);
  const main = { type: 'FeatureCollection', features: land };
  // Fit mainland (exclude far south-west islands so Okinawa goes into an inset).
  const proj = geoMercator().fitExtent([[10, 10], [width - 10, height - 10]], { type: 'MultiPoint', coordinates: [[129.3, 30.8], [146, 45.6]] });
  const path = geoPath(proj);
  const dots = prefs
    .filter((p) => !(okinawaInset && p.id === 'okinawa'))
    .map((p) => {
      const [x, y] = proj([p.lon, p.lat]);
      return dot(p, x, y, focus);
    })
    .join('');
  let inset = '';
  const oki = prefs.find((p) => p.id === 'okinawa');
  if (okinawaInset && oki) {
    const iw = 110;
    const ih = 90;
    const ip = geoMercator().fitExtent([[6, 6], [iw - 6, ih - 6]], { type: 'MultiPoint', coordinates: [[123.5, 24.2], [128.6, 27.0]] });
    const ipath = geoPath(ip);
    const [x, y] = ip([oki.lon, oki.lat]);
    inset = `<g transform="translate(12 22)"><text x="4" y="-4" class="jp-dot-label" style="font-size:10px">沖縄</text><rect width="${iw}" height="${ih}" rx="8" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.2)"/>
      <path d="${land.map((f) => ipath(f) || '').join('')}" fill="#cbbf9a"/>${dot(oki, x, y, focus)}</g>`;
  }
  return `<svg class="jp-map" viewBox="0 0 ${width} ${height}" width="100%">
    <path d="${land.map((f) => path(f) || '').join('')}" fill="#cbbf9a" stroke="rgba(80,60,30,.5)" stroke-width=".6"/>
    ${dots}${inset}
  </svg>`;
  void main;
}

function dot(p, x, y, focus) {
  const on = focus === p.id;
  return `<g class="jp-dot ${on ? 'on' : ''}" data-go="/pref/${p.id}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})">
    <circle r="${on ? 9 : 6.5}" fill="${regionColor(p.region)}" stroke="#fff" stroke-width="${on ? 2.5 : 1.5}"/>
    ${on ? `<text y="-13" text-anchor="middle" class="jp-dot-label">${p.name}</text>` : ''}
  </g>`;
}
