// Turns mentions of people, countries, landmarks and family trees inside text into links,
// so that any explanation leads straight to the related pages.
import { PEOPLE, COUNTRIES } from '../data/index.js';
import { FAMILIES } from '../data/relations.js';
import { GLOSSARY } from '../data/glossary-index.js';
import { LANDMARKS } from '../data/landmarks.js';
import { esc } from '../util.js';

const PERSON_ALIASES = {
  napoleon: ['ナポレオン'], caesar: ['カエサル'], leonardo: ['レオナルド', 'ダ・ヴィンチ'], kublai: ['フビライ'],
  genghis: ['チンギス・ハン', 'テムジン'], alexander: ['アレクサンドロス'], nobunaga: ['信長'], hideyoshi: ['秀吉'],
  ieyasu: ['家康'], yoritomo: ['頼朝'], yoshitsune: ['義経'], michinaga: ['道長'], takauji: ['尊氏'], yoshimitsu: ['義満'],
  shotoku: ['厩戸王'], hammurabi: ['ハンムラビ'], augustus: ['オクタウィアヌス'], constantine: ['コンスタンティヌス'],
  mlk: ['キング牧師'], justinian: ['ユスティニアヌス'], peter1: ['ピョートル1世'], kiyomori: ['清盛'], masako: ['政子'],
  oichi: ['お市'], hidetada: ['秀忠'], iemitsu: ['家光'], yoshimune: ['吉宗'], tsunayoshi: ['綱吉'], yoshinobu: ['慶喜'],
  sanetomo: ['実朝'], yoriie: ['頼家'], tokimune: ['時宗'], hideyori: ['秀頼'], cixi: ['西太后'], buddha: ['釈迦'],
  marcopolo: ['マルコ・ポーロ'], vascodagama: ['ヴァスコ・ダ・ガマ'], mansamusa: ['マンサ・ムーサ'], wright: ['ライト兄弟'],
  shihuangdi: ['始皇帝'], kangxi: ['康熙帝'], qianlong: ['乾隆帝'], sejong: ['世宗'], taejo: ['李成桂'],
};
// Names too generic to be linked on their own.
const BLOCK = new Set(['ヴィクトリア', '武帝', '太宗', '高宗', '玄宗', '世祖', 'ワシントン', 'アンナ', 'アリス', 'マリー', 'フランツ']);

const COUNTRY_ALIASES = {
  kr: ['韓国', '朝鮮'], mn: ['モンゴル帝国'], th: ['シャム'], ir: ['ペルシア'], iq: ['メソポタミア', 'バビロン'],
  tr: ['オスマン帝国', 'ビザンツ帝国'], sa: ['アラビア半島'], ml: ['マリ帝国'], gr: ['ギリシア'], it: ['ローマ帝国', '古代ローマ'],
  mm: ['ビルマ'], lk: ['セイロン'], il: ['イスラエル', 'パレスチナ'], cd: ['コンゴ'], ge: ['グルジア'], cz: ['チェコスロヴァキア', 'ボヘミア'], ht: ['サン＝ドマング'], ar: ['ブエノスアイレス'],
  gb: ['イングランド'], de: ['プロイセン'], no: ['ヴァイキング'], ru: ['ソ連'], us: ['合衆国'], mx: ['アステカ'], pe: ['インカ帝国'],
};

const MODEL_ALIASES = {
  pyramid: ['大ピラミッド'], greatwall: ['長城'], pagoda: ['法隆寺', '五重塔'], kofun: ['前方後円墳', '大仙陵古墳'], castle: ['姫路城'],
  mayapyramid: ['エル・カスティーヨ'], blackship: ['黒船'], shinkansen: ['新幹線'], saturnv: ['サターンV'], sputnik: ['スプートニク1号'],
  berlinwall: ['ベルリンの壁', 'ブランデンブルク門'], caravel: ['サンタ・マリア号'], locomotive: ['ロケット号'], flyer: ['ライトフライヤー号'],
  djenne: ['ジェンネ'], turtleship: ['亀甲船'], vikingship: ['オーセベリ船'], ziggurat: ['ジッグラト'],
};

const FAMILY_ALIASES = {
  fujiwara: ['藤原氏', '摂関家'], genji: ['北条氏'], taira: ['平氏', '平家'], tokugawa: ['徳川将軍家', '御三家'],
  mughal: ['ムガル帝国'], joseon: ['朝鮮王朝'], qing: ['愛新覚羅'], habsburg: ['ハプスブルク家', 'ハプスブルク'],
  tudor: ['テューダー朝'], romanov: ['ロマノフ朝', 'ロマノフ家'], imperial: ['皇室'], bonaparte: ['ボナパルト家'],
};

// A katakana term must be a whole word (not part of a longer katakana word).
const KANA = /[゠-ヿｦ-ﾟ]/;
const NOT_AFTER = { インド: ['洋'], アメリカ: ['大陸'], ローマ: ['教皇'], 韓国: ['併合'] };

let index = null;

function build() {
  const terms = new Map(); // term -> target
  const add = (term, target) => {
    if (!term || term.length < 2 || BLOCK.has(term) || terms.has(term)) return;
    terms.set(term, target);
  };
  // People
  const lastParts = new Map();
  for (const p of PEOPLE) {
    const t = `person:${p.id}`;
    add(p.name, t);
    const m = p.name.match(/^(.+?)（(.+)）$/);
    if (m) {
      add(m[1], t);
      add(m[2], t);
    }
    for (const a of PERSON_ALIASES[p.id] || []) add(a, t);
    const base = m ? m[1] : p.name;
    if (base.includes('・')) {
      const last = base.split('・').pop();
      if (last.length >= 3) lastParts.set(last, lastParts.has(last) ? null : t);
    }
  }
  for (const [last, t] of lastParts) if (t) add(last, t);
  // Countries
  for (const c of COUNTRIES) {
    const t = `country:${c.id}`;
    add(c.name.replace(/（.*）/, ''), t);
    for (const a of COUNTRY_ALIASES[c.id] || []) add(a, t);
  }
  // Landmarks
  for (const mo of LANDMARKS) {
    const t = `landmark:${mo.id}`;
    add(mo.name.replace(/（.*）/, ''), t);
    for (const a of MODEL_ALIASES[mo.id] || []) add(a, t);
  }
  // Family trees
  for (const f of FAMILIES) {
    const t = `family:${f.id}`;
    for (const a of FAMILY_ALIASES[f.id] || []) add(a, t);
  }
  // Glossary terms (lowest priority: names of people/places win)
  for (const g of GLOSSARY) {
    const t = `term:${g.id}`;
    for (const a of [g.term, ...(g.aliases || [])]) add(a, t);
  }
  const sorted = [...terms.keys()].sort((a, b) => b.length - a.length);
  const re = new RegExp(sorted.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g');
  index = { terms, re };
}

/**
 * Escapes `text` and wraps known names in links.
 * exclude: targets not to link (e.g. the page's own country "country:jp").
 */
export function linkify(text, { exclude = [] } = {}) {
  if (!index) build();
  const skip = new Set(exclude);
  const used = new Set();
  const s = esc(text);
  return s.replace(index.re, (m, offset) => {
    const target = index.terms.get(m);
    if (!target || skip.has(target) || used.has(target)) return m;
    const prev = s[offset - 1] || '';
    const next = s[offset + m.length] || '';
    if (KANA.test(m[0]) && KANA.test(prev)) return m;
    if (KANA.test(m[m.length - 1]) && KANA.test(next)) return m;
    if ((NOT_AFTER[m] || []).some((w) => s.startsWith(w, offset + m.length))) return m;
    used.add(target);
    const kind = target.split(':')[0];
    return `<a class="lnk lnk-${kind}" data-l="${target}">${m}</a>`;
  });
}

/** Targets mentioned in a text (for computing connections). */
export function mentions(text) {
  if (!index) build();
  const out = new Set();
  const s = esc(text);
  s.replace(index.re, (m, offset) => {
    const target = index.terms.get(m);
    const prev = s[offset - 1] || '';
    const next = s[offset + m.length] || '';
    if (KANA.test(m[0]) && KANA.test(prev)) return m;
    if (KANA.test(m[m.length - 1]) && KANA.test(next)) return m;
    if ((NOT_AFTER[m] || []).some((w) => s.startsWith(w, offset + m.length))) return m;
    if (target) out.add(target);
    return m;
  });
  return out;
}
