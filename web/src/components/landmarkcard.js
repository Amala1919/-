import { COUNTRY_BY_ID } from '../data/index.js';
import { image } from '../images.js';
import { esc, shortYear } from '../util.js';

/** Small photo card of a landmark for horizontal lists. */
export function landmarkChip(m) {
  const img = image(m.img);
  const c = COUNTRY_BY_ID[m.country];
  return `<button class="lm-chip" data-go="/landmark/${m.id}">
    <span class="lm-chip-img">${img ? `<img src="${img.thumb}" alt="" loading="lazy" decoding="async">` : '🏛️'}</span>
    <b>${esc(m.name)}</b><small>${c ? c.flag : ''} ${shortYear(m.year)}</small>
  </button>`;
}
