// Renders a family tree / lineage chart: HTML portrait nodes over an SVG of connectors.
import { PERSON_BY_ID, COUNTRY_BY_ID } from '../data/index.js';
import { personIcon } from './avatar.js';
import { esc, shortYear } from '../util.js';

const COL = 108;
const ROW = 158;
const NODE_W = 100;
const ICON = 60;
const PAD = 22;
const NODE_H = 122;

function pos(member) {
  const [, g, c] = member;
  return { x: PAD + c * COL + NODE_W / 2, y: PAD + g * ROW };
}

function shortName(p) {
  return p.name.replace(/（.*）/, '');
}

function years(p) {
  if (p.life && p.born == null) return '';
  const b = p.born != null ? shortYear(p.born) : '?';
  const d = p.died != null ? shortYear(p.died) : '';
  return `${b}〜${d}`;
}

const label = (x, y, text, cls = '') =>
  text ? `<text x="${x}" y="${y}" class="ft-label ${cls}" text-anchor="middle">${esc(text)}</text>` : '';

/** Returns { html, width, height } for the chart. */
export function familyTreeHTML(f, { focus } = {}) {
  const P = new Map(f.members.map((m) => [m[0], { m, ...pos(m) }]));
  const maxC = Math.max(...f.members.map((m) => m[2]));
  const maxG = Math.max(...f.members.map((m) => m[1]));
  const width = PAD * 2 + maxC * COL + NODE_W;
  const height = PAD * 2 + maxG * ROW + NODE_H;
  const iconCY = (n) => n.y + ICON / 2 + 4;
  const parts = [];

  // Parent → child connectors (two parents share a junction on their spouse line).
  const parentsOf = new Map();
  for (const [a, b, t] of f.links) {
    if (t !== 'parent' || !P.has(a) || !P.has(b)) continue;
    if (!parentsOf.has(b)) parentsOf.set(b, []);
    parentsOf.get(b).push(a);
  }
  for (const [child, parents] of parentsOf) {
    const c = P.get(child);
    const ps = parents.map((p) => P.get(p));
    const midY = c.y - 20;
    let sx;
    let sy;
    if (ps.length >= 2 && ps[0].y === ps[1].y) {
      sx = (ps[0].x + ps[1].x) / 2;
      sy = iconCY(ps[0]);
    } else {
      sx = ps[0].x;
      sy = ps[0].y + NODE_H - 6;
    }
    parts.push(`<path class="ft-line" d="M${sx},${sy} V${midY} H${c.x} V${c.y + 2}"/>`);
  }

  for (const [a, b, t, text] of f.links) {
    const A = P.get(a);
    const B = P.get(b);
    if (!A || !B || t === 'parent') continue;
    if (t === 'spouse') {
      const y = iconCY(A);
      const [L, R] = A.x < B.x ? [A, B] : [B, A];
      if (Math.abs(A.x - B.x) <= COL * 1.35 && A.y === B.y) {
        parts.push(`<path class="ft-spouse" d="M${L.x + ICON / 2},${y} H${R.x - ICON / 2}"/>`);
        parts.push(`<circle class="ft-ring" cx="${(L.x + R.x) / 2}" cy="${y}" r="4"/>`);
        if (text) parts.push(label((L.x + R.x) / 2, y - 9, text));
      } else {
        const top = Math.min(A.y, B.y) - 6;
        parts.push(`<path class="ft-spouse" d="M${L.x},${L.y + 2} C${L.x},${top - 26} ${R.x},${top - 26} ${R.x},${R.y + 2}"/>`);
        if (text) parts.push(label((L.x + R.x) / 2, top - 14, text));
      }
    } else if (t === 'descent' || t === 'adopt' || t === 'teacher') {
      const x1 = A.x;
      const y1 = A.y + NODE_H - 6;
      const x2 = B.x;
      const y2 = B.y + 2;
      const my = (y1 + y2) / 2;
      parts.push(`<path class="ft-${t}" d="M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}" marker-end="url(#ft-arrow)"/>`);
      parts.push(label((x1 + x2) / 2, my + 4, text || (t === 'teacher' ? '師弟' : '')));
    } else {
      // sibling / served / rival : curve between icons
      const y1 = iconCY(A);
      const y2 = iconCY(B);
      const same = A.y === B.y;
      const bend = same ? -Math.max(30, Math.abs(A.x - B.x) * 0.25) : 0;
      const mx = (A.x + B.x) / 2 + (same ? 0 : 30);
      const my = (y1 + y2) / 2 + bend;
      const off = same ? ICON / 2 : 0;
      const [sx1, sx2] = A.x < B.x ? [A.x + off, B.x - off] : [A.x - off, B.x + off];
      parts.push(`<path class="ft-${t}" d="M${sx1},${y1} Q${mx},${my} ${sx2},${y2}"/>`);
      parts.push(label(mx, (y1 + y2) / 2 + bend / 2 - 2, text, `ft-label-${t}`));
    }
  }

  const nodes = f.members
    .map((m) => {
      const p = PERSON_BY_ID[m[0]];
      if (!p) return '';
      const { x, y } = P.get(m[0]);
      const c = COUNTRY_BY_ID[p.country];
      return `<button class="ft-node ${focus === p.id ? 'focus' : ''}" data-person="${p.id}" style="left:${x - NODE_W / 2}px;top:${y}px;width:${NODE_W}px">
        ${m[3] ? `<span class="ft-badge">${esc(m[3])}</span>` : ''}
        <span class="ft-icon">${personIcon(p, ICON)}<span class="ft-flag">${c ? c.flag : ''}</span></span>
        <b>${esc(shortName(p))}</b>
        <small>${years(p)}</small>
      </button>`;
    })
    .join('');

  const html = `<div class="ft-inner" style="width:${width}px;height:${height}px">
    <svg class="ft-svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs><marker id="ft-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="ft-arrowhead"/></marker></defs>
      ${parts.join('')}
    </svg>
    ${nodes}
  </div>`;
  return { html, width, height };
}

export const FAMILY_LEGEND = `<div class="ft-legend">
  <span><i class="lg-parent"></i>親子</span><span><i class="lg-spouse"></i>夫婦</span><span><i class="lg-descent"></i>子孫・養子</span>
  <span><i class="lg-teacher"></i>師弟</span><span><i class="lg-served"></i>主従・盟友</span><span><i class="lg-rival"></i>対立</span>
</div>`;
