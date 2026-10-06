// Procedural SVG portraits for the people encyclopedia.
import { COUNTRY_BY_ID } from '../data/index.js';

const SKIN = ['#f6d7bf', '#eac39a', '#c98e5e', '#8d5a3b'];

function hair(a) {
  const c = a.hc || '#2b2b2b';
  if (a.f) {
    if (a.h === 'hime') return `<path d="M27,44 Q26,20 50,19 Q74,20 73,44 L76,96 L24,96 Z" fill="${c}"/>`;
    if (a.h === 'updo') return '';
    return `<path d="M29,50 Q27,22 50,21 Q73,22 71,50 L72,70 Q60,64 50,64 Q40,64 28,70 Z" fill="${c}"/>`;
  }
  return '';
}

function hairFront(a) {
  const c = a.hc || '#2b2b2b';
  switch (a.h) {
    case 'bald':
      return `<path d="M31,46 Q30,40 33,38 L34,48 Z M69,46 Q70,40 67,38 L66,48 Z" fill="${c}"/>`;
    case 'tonsure':
      return `<path d="M30,48 Q29,30 36,28 Q50,36 64,28 Q71,30 70,48 L67,48 Q66,36 50,40 Q34,36 33,48 Z" fill="${c}"/>`;
    case 'chonmage':
      return `<path d="M31,46 Q31,34 35,32 L37,46 Z M69,46 Q69,34 65,32 L63,46 Z" fill="${c}"/><path d="M44,30 Q50,24 56,30 L53,22 Q50,18 47,22 Z" fill="${c}"/><rect x="47" y="14" width="6" height="10" rx="2" fill="${c}"/>`;
    case 'hime':
      return `<path d="M30,44 Q32,24 50,23 Q68,24 70,44 Q62,30 50,30 Q38,30 30,44 Z" fill="${c}"/>`;
    case 'buddha':
      return `<path d="M30,42 Q30,22 50,22 Q70,22 70,42 Q62,32 50,32 Q38,32 30,42 Z" fill="#1d1d2b"/><circle cx="50" cy="20" r="8" fill="#1d1d2b"/>${[...Array(8)].map((_, i) => `<circle cx="${36 + i * 4}" cy="${30 - Math.sin((i / 7) * Math.PI) * 4}" r="1.4" fill="#33334a"/>`).join('')}`;
    case 'wig':
      return `<path d="M28,48 Q28,22 50,21 Q72,22 72,48 Q64,30 50,30 Q36,30 28,48 Z" fill="${c}"/><circle cx="29" cy="48" r="5" fill="${c}"/><circle cx="29" cy="57" r="5" fill="${c}"/><circle cx="71" cy="48" r="5" fill="${c}"/><circle cx="71" cy="57" r="5" fill="${c}"/>`;
    case 'updo':
      return `<path d="M30,44 Q28,6 50,4 Q72,6 70,44 Q62,30 50,30 Q38,30 30,44 Z" fill="${c}"/><circle cx="62" cy="12" r="4" fill="#f48fb1"/><circle cx="40" cy="16" r="2.5" fill="#fff"/>`;
    case 'space':
    case 'pharaoh':
    case 'turban':
    case 'mongol':
    case 'helmet':
    case 'morion':
    case 'tophat':
    case 'bicorne':
    case 'kepi':
    case 'kanmuri':
    case 'eboshi':
    case 'futou':
    case 'mianguan':
    case 'cap':
    case 'laurel':
    case 'crown':
    case 'tiara':
    case 'inca':
    case 'none':
    default:
      if (a.f) return `<path d="M30,44 Q32,24 50,23 Q68,24 70,44 Q62,30 50,30 Q38,30 30,44 Z" fill="${c}"/>`;
      return `<path d="M30,46 Q29,22 50,21 Q71,22 70,46 Q66,32 50,31 Q34,32 30,46 Z" fill="${c}"/>`;
  }
}

function hat(a) {
  switch (a.h) {
    case 'crown':
      return `<path d="M32,30 L34,14 L41,24 L50,10 L59,24 L66,14 L68,30 Z" fill="#f2c230" stroke="#b8860b" stroke-width="1"/><circle cx="50" cy="25" r="2.6" fill="#e53935"/><circle cx="40" cy="27" r="1.8" fill="#1e88e5"/><circle cx="60" cy="27" r="1.8" fill="#43a047"/>`;
    case 'tiara':
      return `<path d="M36,26 L40,18 L45,23 L50,14 L55,23 L60,18 L64,26 Q50,22 36,26 Z" fill="#f2c230" stroke="#b8860b" stroke-width=".8"/><circle cx="50" cy="20" r="2" fill="#e91e63"/>`;
    case 'kanmuri':
      return `<path d="M34,32 Q34,18 50,17 Q66,18 66,32 Z" fill="#1d1d1d"/><path d="M47,18 Q46,2 56,0 L58,2 Q52,6 53,18 Z" fill="#1d1d1d"/>`;
    case 'eboshi':
      return `<path d="M34,32 Q32,10 44,4 Q60,0 64,18 L66,32 Z" fill="#1d1d1d"/><path d="M40,14 Q50,12 60,16" stroke="#3a3a3a" stroke-width="1.2" fill="none"/>`;
    case 'futou':
      return `<path d="M33,32 Q33,16 50,15 Q67,16 67,32 Z" fill="#1d1d1d"/><path d="M42,16 Q42,8 50,8 Q58,8 58,16 Z" fill="#1d1d1d"/><ellipse cx="24" cy="26" rx="10" ry="3" fill="#1d1d1d"/><ellipse cx="76" cy="26" rx="10" ry="3" fill="#1d1d1d"/>`;
    case 'mianguan':
      return `<path d="M35,32 Q35,20 50,19 Q65,20 65,32 Z" fill="#1d1d1d"/><rect x="26" y="13" width="48" height="5" rx="1" fill="#1d1d1d"/>${[...Array(7)].map((_, i) => `<line x1="${31 + i * 6.4}" y1="18" x2="${31 + i * 6.4}" y2="${30 + (i % 2) * 3}" stroke="#d4af37" stroke-width="1"/><circle cx="${31 + i * 6.4}" cy="${31 + (i % 2) * 3}" r="1.5" fill="#e53935"/>`).join('')}`;
    case 'laurel':
      return `${[...Array(7)].map((_, i) => `<ellipse cx="${32 + i * 6}" cy="${30 - Math.sin((i / 6) * Math.PI) * 6}" rx="4" ry="2" fill="#4caf50" transform="rotate(${-40 + i * 13} ${32 + i * 6} ${30 - Math.sin((i / 6) * Math.PI) * 6})"/>`).join('')}`;
    case 'turban':
      return `<ellipse cx="50" cy="24" rx="22" ry="13" fill="${a.rc === '#f5f5f5' ? '#f9a825' : '#f5f5f0'}"/><path d="M30,26 Q50,14 70,26" stroke="#ddd" stroke-width="2" fill="none"/><path d="M32,30 Q50,20 68,30" stroke="#ddd" stroke-width="2" fill="none"/><circle cx="50" cy="20" r="3" fill="#e53935"/><path d="M50,17 Q54,6 58,8" stroke="#fff" stroke-width="2" fill="none"/>`;
    case 'tophat':
      return `<rect x="36" y="0" width="28" height="24" rx="2" fill="#1d1d1d"/><rect x="28" y="22" width="44" height="5" rx="2" fill="#1d1d1d"/><rect x="36" y="17" width="28" height="3" fill="#444"/>`;
    case 'bicorne':
      return `<path d="M16,28 Q50,-6 84,28 Q50,20 16,28 Z" fill="#1d1d1d"/><circle cx="50" cy="16" r="4" fill="#1e88e5" stroke="#fff" stroke-width="1.4"/><circle cx="50" cy="16" r="1.5" fill="#e53935"/>`;
    case 'pharaoh':
      return `<path d="M30,30 Q30,14 50,13 Q70,14 70,30 L76,70 L64,70 L66,42 L34,42 L36,70 L24,70 Z" fill="#1e5aa8"/>${[...Array(6)].map((_, i) => `<path d="M${29 - i * 0.4},${36 + i * 6} L${35},${36 + i * 6} M${65},${36 + i * 6} L${71 + i * 0.4},${36 + i * 6}" stroke="#f2c230" stroke-width="2.4"/>`).join('')}<path d="M33,24 Q50,18 67,24" stroke="#f2c230" stroke-width="3" fill="none"/><path d="M48,22 Q50,12 52,22 Z" fill="#f2c230"/>`;
    case 'helmet':
      return `<path d="M30,40 Q28,14 50,13 Q72,14 70,40 L66,40 Q66,26 50,26 Q34,26 34,40 Z" fill="#c9a24a" stroke="#8a6d2a" stroke-width="1"/><path d="M28,16 Q50,-8 72,16 Q50,6 28,16 Z" fill="#c62828"/>`;
    case 'mongol':
      return `<path d="M34,26 Q36,6 50,4 Q64,6 66,26 Z" fill="#b71c1c"/><rect x="29" y="22" width="42" height="9" rx="4" fill="#795548"/><circle cx="50" cy="5" r="3" fill="#f2c230"/>`;
    case 'cap':
      return `<ellipse cx="50" cy="24" rx="22" ry="9" fill="#2b2b2b"/><path d="M30,28 Q50,32 70,28" stroke="#111" stroke-width="2" fill="none"/>`;
    case 'kepi':
      return `<path d="M34,30 L36,12 L64,12 L66,30 Z" fill="#4e5d3b"/><path d="M30,30 Q50,36 70,30 L70,28 L30,28 Z" fill="#1d1d1d"/><rect x="36" y="20" width="28" height="3" fill="#d4af37"/>`;
    case 'morion':
      return `<path d="M20,30 Q50,16 80,30 Q50,24 20,30 Z" fill="#9ea7ad" stroke="#6b7378" stroke-width="1"/><path d="M34,28 Q34,10 50,8 Q66,10 66,28 Z" fill="#b0bac0"/><path d="M42,10 Q50,-2 58,10 Z" fill="#9ea7ad"/>`;
    case 'inca':
      return `<rect x="31" y="26" width="38" height="6" rx="3" fill="#c62828"/>${[...Array(7)].map((_, i) => `<rect x="${39 + i * 3.2}" y="32" width="2" height="8" fill="#e53935"/>`).join('')}<path d="M50,26 L46,6 L50,10 L54,6 Z" fill="#f2c230"/>`;
    case 'space':
      return '';
    default:
      return '';
  }
}

function beard(a) {
  const c = a.hc || '#2b2b2b';
  switch (a.b) {
    case 'm':
      return `<path d="M41,60 Q50,56 59,60 Q55,63 50,61 Q45,63 41,60 Z" fill="${c}"/>`;
    case 's':
      return `<path d="M33,52 Q35,72 50,74 Q65,72 67,52 Q64,64 58,62 Q50,58 42,62 Q36,64 33,52 Z" fill="${c}"/>`;
    case 'l':
      return `<path d="M32,50 Q32,74 42,84 Q50,92 58,84 Q68,74 68,50 Q64,64 58,62 Q50,58 42,62 Q36,64 32,50 Z" fill="${c}"/>`;
    default:
      return '';
  }
}

/** Returns an inline SVG string for a person. */
export function avatarSVG(p, size = 64) {
  const a = p.a || {};
  const skin = SKIN[a.sk ?? 1];
  const bg = COUNTRY_BY_ID[p.country]?.color || '#5c6bc0';
  const id = `av-${p.id}-${size}`;
  const space = a.h === 'space';
  return `<svg class="avatar" viewBox="0 0 100 100" width="${size}" height="${size}" aria-hidden="true">
  <defs><radialGradient id="${id}" cx="50%" cy="35%" r="70%"><stop offset="0" stop-color="${bg}" stop-opacity=".95"/><stop offset="1" stop-color="${bg}" stop-opacity=".45"/></radialGradient>
  <clipPath id="${id}c"><circle cx="50" cy="50" r="49"/></clipPath></defs>
  <circle cx="50" cy="50" r="49" fill="url(#${id})"/>
  <g clip-path="url(#${id}c)">
  ${hair(a)}
  <path d="M8,104 Q12,74 50,71 Q88,74 92,104 Z" fill="${space ? '#eceff1' : a.rc || '#555'}"/>
  ${a.f ? '' : `<path d="M42,71 L50,82 L58,71" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="2"/>`}
  <rect x="44" y="62" width="12" height="11" fill="${skin}"/>
  <ellipse cx="32" cy="49" rx="3.4" ry="5" fill="${skin}"/><ellipse cx="68" cy="49" rx="3.4" ry="5" fill="${skin}"/>
  <ellipse cx="50" cy="47" rx="18" ry="21" fill="${skin}"/>
  ${hairFront(a)}
  <path d="M40,41 Q43,39 46,41 M54,41 Q57,39 60,41" stroke="#3b2a20" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <ellipse cx="43" cy="46" rx="2" ry="2.4" fill="#2b2118"/><ellipse cx="57" cy="46" rx="2" ry="2.4" fill="#2b2118"/>
  <circle cx="43.6" cy="45.2" r=".7" fill="#fff"/><circle cx="57.6" cy="45.2" r=".7" fill="#fff"/>
  <path d="M50,48 Q48,53 50,54" stroke="rgba(0,0,0,.25)" stroke-width="1.2" fill="none"/>
  ${a.f ? '<ellipse cx="39" cy="54" rx="3.5" ry="2" fill="#f48fb1" opacity=".5"/><ellipse cx="61" cy="54" rx="3.5" ry="2" fill="#f48fb1" opacity=".5"/>' : ''}
  <path d="M45,58 Q50,61 55,58" stroke="#8a4b3a" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  ${beard(a)}
  ${a.g ? '<circle cx="43" cy="46" r="5" fill="none" stroke="#333" stroke-width="1.2"/><circle cx="57" cy="46" r="5" fill="none" stroke="#333" stroke-width="1.2"/><path d="M48,46 L52,46" stroke="#333" stroke-width="1.2"/>' : ''}
  ${hat(a)}
  ${space ? '<circle cx="50" cy="47" r="30" fill="rgba(180,220,255,.25)" stroke="#eceff1" stroke-width="5"/><path d="M30,30 Q38,22 48,20" stroke="#fff" stroke-width="2.5" fill="none" opacity=".7"/>' : ''}
  </g></svg>`;
}
