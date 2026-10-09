// Quiz generation. Every question: { id, type, prompt, visual?, choices:[{label, sub?}], answer, explain, eventId? }
import { EVENTS, EVENT_BY_ID, COUNTRIES, COUNTRY_BY_ID, ERAS, ERA_BY_ID, PEOPLE, PERSON_BY_ID, eventsInEra } from '../data/index.js';
import { formatYear, shuffle, sample, pick, esc } from '../util.js';
import { personIcon } from '../components/avatar.js';
import { worldMapSVG } from '../components/geo.js';
import { image, creditText } from '../images.js';
import { FAMILIES, FAMILY_BY_ID } from '../data/relations.js';
import { LANDMARKS, LANDMARK_BY_ID } from '../data/landmarks.js';

const KEYWORDS = {
  jp: ['日本'], cn: ['中国', '中華'], kr: ['韓国', '朝鮮'], mn: ['モンゴル'], in: ['インド'], ir: ['イラン', 'ペルシア'],
  iq: ['イラク', 'メソポタミア', 'バグダード', 'バビロ'], tr: ['トルコ', 'オスマン'], eg: ['エジプト'], ml: ['マリ', 'アフリカ'],
  gr: ['ギリシ'], it: ['イタリア', 'ローマ'], fr: ['フランス', 'パリ'], gb: ['イギリス', 'イングランド'], de: ['ドイツ', 'ベルリン'],
  es: ['スペイン'], ru: ['ロシア', 'ソ連'], us: ['アメリカ'], mx: ['メキシコ', 'アステカ', 'マヤ'], pe: ['ペルー', 'インカ'],
  vn: ['ベトナム', 'ハノイ'], th: ['タイ', 'シャム', 'アユタヤ'], kh: ['カンボジア', 'アンコール'], id: ['インドネシア', 'ジャワ'],
  sa: ['サウジ', 'アラビア', 'メッカ'], et: ['エチオピア'], za: ['南アフリカ'], zw: ['ジンバブエ'], pt: ['ポルトガル'],
  nl: ['オランダ'], at: ['オーストリア', 'ウィーン', 'ハプスブルク'], pl: ['ポーランド'], no: ['ノルウェー', 'ヴァイキング', '北欧'],
  br: ['ブラジル'], ca: ['カナダ', 'ケベック'], au: ['オーストラリア'],
  uz: ['ウズベキスタン', 'ウズベク', 'サマルカンド', 'ティムール', 'ウルグ・ベク', 'ソグド', 'サーマーン', 'ブハラ'],
  ph: ['フィリピン', 'ラプラプ', 'マニラ', 'リサール', 'ピープルパワー', 'マヌングル', 'ラグナ銅板'],
  mm: ['ミャンマー', 'ビルマ', 'バガン', 'ピュー', 'コンバウン', 'バインナウン', 'アウンサン', '泰緬鉄道'],
  lk: ['スリランカ', 'セイロン', 'アヌラーダプラ', 'シーギリヤ', 'キャンディ', 'パラークラマバーフ', 'ポロンナルワ'],
  np: ['ネパール', 'ルンビニ', 'リッチャヴィ', 'アニコ', 'マッラ', 'ゴルカ', 'グルカ', 'ラナ家', 'エベレスト'],
  my: ['マレーシア', 'マラッカ', 'マラヤ', 'ブジャン', '海峡植民地', 'スズとゴム', 'マレー作戦', 'ルックイースト'],
  ch: ['スイス', 'ジュネーヴ', 'ヘルウェティイ', 'カルヴァン', '赤十字', 'アインシュタイン', 'CERN', '国際連盟'],
  hu: ['ハンガリー', 'マジャル', 'イシュトヴァーン', 'モヒ', 'モハーチ', 'アウスグライヒ'],
  cz: ['チェコ', 'プラハ', 'ボヘミア', 'フス', 'カール4世', 'ミュンヘン', 'ビロード革命'],
  se: ['スウェーデン', 'ヴァーサ', 'ターヌム', '北方の獅子', 'グスタフ', 'ポルタヴァ', 'リンネ', 'ノーベル'],
  ie: ['アイルランド', 'ニューグレンジ', 'パトリック', 'ケルズ', 'ボイン', 'ジャガイモ大飢饉', 'イースター蜂起', 'ベルファスト'],
  fi: ['フィンランド', 'トゥルク', 'アグリコラ', 'カレワラ', 'フィンランディア', '冬戦争', 'ノキア'],
  be: ['ベルギー', 'ベルガエ', 'フランドル', '金拍車', 'ファン・エイク', 'ヘント', 'アントウェルペン', 'ルーベンス', 'レオポルド2世', 'イーペル', 'ブリュッセル'],
  dk: ['デンマーク', 'トルンホルム', 'イェリング', 'マルグレーテ', 'ティコ・ブラーエ', 'アンデルセン', 'ユダヤ人の救出', 'レゴ'],
  ar: ['アルゼンチン', 'ブエノスアイレス', 'ペロン', 'エビータ', 'タンゴ', 'フォークランド', 'マルビナス', 'パンパ', 'ガウチョ', 'マラドーナ', 'クエバ・デ・ラス・マノス', 'トゥクマン'],
  cl: ['チリ', 'モンテ・ベルデ', 'チンチョーロ', 'モアイ', 'イースター島', 'マプチェ', 'ラウタロ', 'オイギンス', 'アジェンデ', 'ピノチェト', '太平洋戦争', '鉱山作業員'],
  cu: ['キューバ', 'ハバナ', 'タイノ', 'アトゥエイ', 'マルティ', '米西戦争', 'メイン号', 'カストロ', 'ゲバラ'],
  co: ['コロンビア', 'ボゴタ', 'サン・アグスティン', 'ムイスカ', 'エル・ドラード', 'カルタヘナ', 'ボリバル', '大コロンビア', 'パナマ', '百年の孤独', 'FARC'],
  ht: ['ハイチ', 'イスパニョーラ', 'サン＝ドマング', 'トゥサン', 'デサリーヌ', 'シタデル', 'タイノ'],
  nz: ['ニュージーランド', 'マオリ', 'タスマン', 'ワイタンギ', '女性参政権', 'ラザフォード', 'ガリポリ', 'アンザック', 'ヒラリー', 'エベレスト', '非核法'],
  pk: ['パキスタン', 'モヘンジョ', 'ハラッパー', 'メヘルガル', 'タキシラ', 'ガンダーラ', 'カニシカ', 'ラホール', 'マララ'],
  bd: ['バングラデシュ', 'ベンガル', 'パーラ朝', 'マハスタンガル', 'ダッカ', 'グラミン', '言語運動'],
  af: ['アフガン', 'バーミヤン', 'ガズナ', 'ドゥッラーニー', 'バクトリア', 'ラピスラズリ', 'グレート・ゲーム', 'アマヌッラー'],
  kz: ['カザフ', 'ボタイ', 'サカ人', '黄金人間', 'オトラル', 'ヤサウィー', 'ジュンガル', 'アバイ', 'バイコヌール', '核実験場'],
  la: ['ラオス', 'ラーンサーン', 'ジャール', 'ヴィエンチャン', 'ホーチミン・ルート', '秘密戦争'],
  tw: ['台湾', 'ゼーランディア', '鄭成功', '烏山頭', '霧社', '中華民国', '総統', '半導体'],
  sy: ['シリア', 'ダマスカス', 'パルミラ', 'ゼノビア', 'ウマイヤ朝', 'ウガリット', 'エブラ', 'アレッポ', 'サラディン'],
  lb: ['レバノン', 'フェニキア', 'ビブロス', 'ティルス', 'バールベック', 'ベイルート', 'ジブラーン'],
  il: ['イスラエル', 'パレスチナ', 'エルサレム', 'エリコ', 'マサダ', '岩のドーム', 'ナクバ', 'オスロ合意', 'ユダ王国'],
  ye: ['イエメン', 'サバ王国', 'シバの女王', 'マアリブ', 'シバーム', 'モカ', 'アデン', 'アルワ'],
  ge: ['ジョージア', 'コルキス', '金羊毛', 'タマル', 'ドマニシ', 'ニノ', 'スターリン'],
  am: ['アルメニア', 'ウラルトゥ', 'エレブニ', 'ティグラネス', 'アニ', 'アレニ'],
  dz: ['アルジェリア', 'アルジェ', 'ヌミディア', 'タッシリ', 'ヒッポ', 'アウグスティヌス', 'カミュ', 'アブド・アルカーディル'],
  ly: ['リビア', 'キュレネ', 'トリポリ', 'カダフィ', '砂漠のライオン'],
  sd: ['スーダン', 'ケルマ', 'タハルカ', '黒いファラオ', 'メロエ', 'アマニレナス', 'マクリア', 'マフディー', 'ハルツーム'],
  tz: ['タンザニア', 'オルドヴァイ', 'キルワ', 'ザンジバル', 'リヴィングストン', 'キリマンジャロ', 'マジ・マジ'],
  cd: ['コンゴ', 'イシャンゴ', 'アフォンソ', 'ルムンバ', 'モブツ', 'ザイール'],
  sn: ['セネガ', 'ジョロフ', 'ゴレ島', 'アマドゥ・バンバ', 'ムリッド', 'ディアーニュ'],
  mg: ['マダガスカル', 'メリナ', 'ラナヴァルナ', 'ボルネオから来た', 'インドと分かれた'],
  ua: ['ウクライナ', 'トリピリャ', 'ククテニ', 'スキタイ', 'ヴォロディーミル', 'フメリニツキー', 'ホロドモール', 'チョルノービリ', 'ロシアによる全面侵攻'],
  ro: ['ルーマニア', 'ハマンギア', 'ダキア', 'ヴラド'],
  bg: ['ブルガリア', 'ヴァルナ', 'トラキア', 'キリル文字'],
  is: ['アイスランド', 'アルシング', 'サガ', 'エッダ', 'ラキ火山'],
  rs: ['セルビア', 'ドゥシャン', 'コソボ', 'サラエボ', 'ユーゴスラビア', 'ティトー', 'ヴィンチャ'],
  hr: ['クロアチア', 'ディオクレティアヌス', 'トミスラヴ', 'ラグーサ', 'ドゥブロヴニク', 'イェラチッチ', 'スプリト'],
  lt: ['リトアニア', 'ゲディミナス', 'ヴィリニュス', 'グルンヴァルト', 'ルブリン', '杉原', 'バルトの道'],
  ve: ['ベネズエラ', '小さなベネチア', 'カラボボ', 'エンジェルフォール', 'チャベス', 'マラカイボ'],
  bo: ['ボリビア', 'ティワナク', 'ポトシ', 'チェ・ゲバラの死', 'モラレス'],
  ec: ['エクアドル', 'バルディビア', 'アタワルパ', 'キト', 'ピチンチャ', 'ガラパゴス', 'パナマ帽', 'ドル化'],
  gt: ['グアテマラ', 'ティカル', 'エル・ミラドール', 'アルバラード', 'アンティグア', 'アルベンス', 'メンチュウ'],
  jm: ['ジャマイカ', 'ポートロイヤル', 'マルーン', 'モラントベイ', 'レゲエ', 'ボブ・マーリー'],
  pa: ['パナマ', 'バルボア', 'ポルトベロ', 'シティオ・コンテ', 'モーガン', '運河'],
  pg: ['パプアニューギニア', 'ニューギニア', 'クック湿地', 'ココダ', '800の言語', 'ファースト・コンタクト'],
  fj: ['フィジー', 'ラピタ', 'タスマン', 'カコバウ', 'ギルミティヤ', 'インドからの年季契約', '7人制ラグビー'],
  jo: ['ヨルダン', 'ペトラ', 'ナバテア', 'ジェラシュ', 'カラク', 'アラブ反乱', 'メシャ'],
  ma: ['モロッコ', 'マラケシュ', 'フェズ', 'カラウィーイーン', 'ムラービト', 'ムワッヒド', 'クトゥビーヤ', 'イブン・バットゥータ', 'マウレタニア', '三王の戦い'],
  tn: ['チュニジア', 'カルタゴ', 'ケルアン', 'チュニス', 'ジャスミン革命', 'イブン・ハルドゥーン'],
  ng: ['ナイジェリア', 'ノク', 'イフェ', 'ベニン', 'ソコト', 'ビアフラ', '崩れゆく絆'],
  ke: ['ケニア', 'トゥルカナ', 'スワヒリ', 'マリンディ', 'ウガンダ鉄道', 'マウマウ', 'マータイ'],
  gh: ['ガーナ', 'エルミナ', 'アシャンティ', '黄金の床几', 'カカオ', 'アナン'],
};

// Countries whose histories overlap closely; never offered as each other's distractor.
const AMBIG = {
  cn: ['mn'], mn: ['cn', 'ru'], ru: ['mn'], tr: ['gr', 'at'], gr: ['tr'], iq: ['ir', 'sa'], ir: ['iq'], es: ['mx', 'pe', 'pt'],
  mx: ['es'], pe: ['es'], pt: ['es', 'br'], br: ['pt'], nl: ['id'], id: ['nl'], vn: ['kh', 'th'], kh: ['th', 'vn'], th: ['kh'],
  za: ['zw', 'nl'], zw: ['za', 'gb'], at: ['de'], de: ['at'], sa: ['iq'], ca: ['fr', 'gb', 'us'], au: ['gb'], gb: ['au', 'ca'],
  fr: ['ca'], us: ['ca'], no: ['gb'],
};

// AMBIG_EXTRA
for (const pr of 'uz-ir uz-in uz-mn mm-th np-in lk-in my-id se-no dk-no se-dk se-fi hu-at cz-at cz-de be-nl be-fr ie-gb ch-at ch-de ch-fr hu-tr hu-mn fi-ru ar-cl cu-ht co-pe ar-gb nz-au nz-tr cu-us cu-es ht-fr cl-pe tn-it gh-ml ma-ml ma-es ma-tn ke-pt ke-cn jo-tr jo-sa jo-iq pk-in pk-bd bd-in af-pk af-ir af-uz kz-uz kz-mn kz-ru la-th la-vn la-kh tw-cn tw-jp sy-lb sy-il sy-jo sy-iq sy-tr lb-il lb-tn il-jo il-eg ye-sa ye-et ge-am ge-ru am-ru am-tr am-ir dz-tn dz-ma dz-fr sd-eg tz-ke cd-be ua-ru ua-pl ua-ro ro-hu bg-tr bg-gr is-no is-dk ly-it ly-tn sn-ml bg-rs rs-hr lt-pl lt-ru hr-hu hr-at hr-it rs-tr rs-at ve-co ec-co ec-pe ec-pa bo-pe bo-cl bo-cu gt-mx jm-gb pa-co pa-us pa-jm pg-au pg-jp fj-in fj-nz jm-cu jm-ht ve-es'.split(' ')) {
  const [a, b] = pr.split('-');
  (AMBIG[a] = AMBIG[a] || []).push(b);
  (AMBIG[b] = AMBIG[b] || []).push(a);
}

const nameOf = (c) => c.name.replace(/（.*）/, '');

function mentions(title, cid) {
  return KEYWORDS[cid].some((k) => title.includes(k));
}

function firstSentence(t) {
  const i = t.indexOf('。');
  return i > 0 ? t.slice(0, i + 1) : t;
}

// ---------- generators ----------
function yearGap(y) {
  if (y < -100000) return Math.round(-y * 0.25);
  if (y < -8000) return 3000;
  if (y < -2000) return 500;
  if (y < 0) return 120;
  if (y < 1000) return 90;
  if (y < 1700) return 45;
  if (y < 1900) return 25;
  return 12;
}

// Round distractors only as much as the real year is "round", so the answer never stands out.
function roundYear(y, gap, real) {
  const unit = [1000, 100, 50, 10, 1].find((u) => u <= gap && real % u === 0) || 1;
  const r = Math.round(y / unit) * unit;
  return r === 0 ? 1 : r;
}

export function genYear(e, rnd = Math.random) {
  const gap = yearGap(e.year);
  const maxYear = 2024;
  // Put the right answer at a random position and build plausible distractors around it.
  let below = Math.floor(rnd() * 4);
  let above = 3 - below;
  const room = Math.floor((maxYear - e.year) / gap);
  if (above > room) {
    below += above - room;
    above = room;
  }
  const chosen = [e.year];
  const add = (dir, k) => {
    for (let tries = 0; tries < 8; tries++) {
      const y = roundYear(e.year + dir * gap * (k + 0.6 * rnd() + 0.2 * tries), gap, e.year);
      if (y <= maxYear && chosen.every((c) => Math.abs(c - y) >= gap * 0.7)) return chosen.push(y);
    }
  };
  for (let k = 1; k <= below; k++) add(-1, k);
  for (let k = 1; k <= above; k++) add(1, k);
  for (let k = 1; chosen.length < 4 && k < 40; k++) add(k % 2 ? -1 : 1, 4 + k);
  chosen.sort((a, b) => a - b);
  return {
    id: 'y:' + e.id,
    type: 'year',
    prompt: `「${e.title}」はいつのこと？`,
    visual: `<div class="q-emoji">${e.emoji}</div><div class="q-hint">${COUNTRY_BY_ID[e.country].flag} ${esc(e.summary)}</div>`,
    choices: chosen.map((y) => ({ label: formatYear(y) + (e.approx ? 'ごろ' : '') })),
    answer: chosen.indexOf(e.year),
    explain: `${formatYear(e.year, e.approx)}：${firstSentence(e.detail)}`,
    eventId: e.id,
  };
}

export function genCountry(e, rnd = Math.random) {
  const exclude = new Set([e.country, ...(AMBIG[e.country] || [])]);
  const others = COUNTRIES.filter((c) => !exclude.has(c.id) && !mentions(e.title + e.summary, c.id));
  const opts = shuffle([COUNTRY_BY_ID[e.country], ...sample(others, 3, rnd)], rnd);
  return {
    id: 'c:' + e.id,
    type: 'country',
    prompt: `「${e.title}」はどこの国・地域の出来事？`,
    visual: `<div class="q-emoji">${e.emoji}</div><div class="q-hint">${formatYear(e.year, e.approx)}・${esc(e.summary)}</div>`,
    choices: opts.map((c) => ({ label: `${c.flag} ${nameOf(c)}` })),
    answer: opts.findIndex((c) => c.id === e.country),
    explain: `${COUNTRY_BY_ID[e.country].flag} ${COUNTRY_BY_ID[e.country].name}：${firstSentence(e.detail)}`,
    eventId: e.id,
  };
}

function eraSafe(e) {
  const era = ERA_BY_ID[e.era];
  const len = Math.min(era.end, 2025) - era.start;
  return e.year - era.start > len * 0.1 && Math.min(era.end, 2025) - e.year > len * 0.1;
}

export function genEra(e, rnd = Math.random) {
  const idx = ERAS.findIndex((x) => x.id === e.era);
  const near = ERAS.filter((x, i) => i !== idx && Math.abs(i - idx) <= 3);
  const opts = shuffle([ERAS[idx], ...sample(near, 3, rnd)], rnd).sort((a, b) => a.start - b.start);
  return {
    id: 'e:' + e.id,
    type: 'era',
    prompt: `「${e.title}」はどの時代の出来事？`,
    visual: `<div class="q-emoji">${e.emoji}</div><div class="q-hint">${COUNTRY_BY_ID[e.country].flag} ${esc(e.summary)}</div>`,
    choices: opts.map((x) => ({ label: `${x.emoji} ${x.name}` })),
    answer: opts.findIndex((x) => x.id === e.era),
    explain: `${formatYear(e.year, e.approx)}は「${ERA_BY_ID[e.era].name}」の時代です。${ERA_BY_ID[e.era].tagline}。`,
    eventId: e.id,
  };
}

function maskName(text, p) {
  const parts = new Set([p.name]);
  p.name.split(/[（）・()]/).forEach((s) => s.length >= 2 && parts.add(s));
  let t = text;
  for (const s of [...parts].sort((a, b) => b.length - a.length)) t = t.split(s).join('＿＿');
  return t;
}

export function genPerson(p, rnd = Math.random) {
  const others = PEOPLE.filter((x) => x.id !== p.id);
  const opts = shuffle([p, ...sample(others, 3, rnd)], rnd);
  return {
    id: 'p:' + p.id,
    type: 'person',
    prompt: 'この人物はだれ？',
    visual: `<div class="q-avatar">${personIcon(p, 110)}</div><div class="q-hint"><b>${esc(maskName(p.title, p))}</b><br>${esc(maskName(p.desc, p))}</div>`,
    choices: opts.map((x) => ({ label: x.name })),
    answer: opts.indexOf(p),
    explain: `${p.name}（${p.life || formatYear(p.born) + '〜' + formatYear(p.died)}）：${p.desc}`,
    personId: p.id,
  };
}

export function genMap(c, rnd = Math.random) {
  const others = COUNTRIES.filter((x) => x.id !== c.id);
  const opts = shuffle([c, ...sample(others, 3, rnd)], rnd);
  return {
    id: 'm:' + c.id,
    type: 'map',
    prompt: '地図で光っている国・地域はどこ？',
    visual: `<div class="q-map">${worldMapSVG({ highlight: new Map([[c.id, '#ffd54f']]), markers: [{ lat: c.lat, lon: c.lon, color: '#ff5252' }], width: 360, height: 190 })}</div>`,
    choices: opts.map((x) => ({ label: `${x.flag} ${nameOf(x)}` })),
    answer: opts.indexOf(c),
    explain: `${c.flag} ${c.name}（首都：${c.capital}）。${firstSentence(c.intro)}`,
    countryId: c.id,
  };
}

export function genHand(cid, i, rnd = Math.random) {
  const h = COUNTRY_BY_ID[cid].quiz[i];
  const order = shuffle([0, 1, 2, 3], rnd);
  return {
    id: `h:${cid}:${i}`,
    type: 'hand',
    prompt: h.q,
    visual: `<div class="q-badge">${COUNTRY_BY_ID[cid].flag} ${nameOf(COUNTRY_BY_ID[cid])}</div>`,
    choices: order.map((k) => ({ label: h.choices[k] })),
    answer: order.indexOf(h.answer),
    explain: h.explain,
  };
}

export function genOrder(pool, rnd = Math.random) {
  const evs = [];
  for (const e of shuffle(pool, rnd)) {
    if (evs.every((x) => Math.abs(x.year - e.year) >= 30)) evs.push(e);
    if (evs.length === 4) break;
  }
  const sorted = [...evs].sort((a, b) => a.year - b.year);
  return {
    id: 'o:' + evs.map((e) => e.id).join(','),
    type: 'order',
    prompt: '古い順にタップして並べよう',
    items: evs.map((e) => ({ id: e.id, label: `${e.emoji} ${e.title}`, flag: COUNTRY_BY_ID[e.country].flag })),
    correctOrder: sorted.map((e) => e.id),
    explain: sorted.map((e) => `${formatYear(e.year, e.approx)} ${e.title}`).join(' → '),
  };
}

// Photo of an event: which is it?
export function genPhoto(e, rnd = Math.random) {
  const img = image(e.img);
  const others = shuffle(
    EVENTS.filter((x) => x.id !== e.id && x.img !== e.img && x.country !== e.country && Math.abs(x.year - e.year) > 30),
    rnd,
  ).slice(0, 3);
  const opts = shuffle([e, ...others], rnd);
  return {
    id: 'f:' + e.id,
    type: 'photo',
    prompt: 'この写真と関係の深い出来事は？',
    visual: `<figure class="q-photo"><img src="${img.src}" alt=""><figcaption>📷 ${esc(creditText(img))}・Wikimedia Commons</figcaption></figure>`,
    choices: opts.map((x) => ({ label: `${COUNTRY_BY_ID[x.country].flag} ${x.title}` })),
    answer: opts.indexOf(e),
    explain: `${COUNTRY_BY_ID[e.country].flag} ${formatYear(e.year, e.approx)}「${e.title}」：${firstSentence(e.detail)}`,
    eventId: e.id,
  };
}

const photoEvents = () => EVENTS.filter((e) => image(e.img));

// Photo of a landmark: which one is it?
export function genLandmark(m, rnd = Math.random) {
  const img = image(m.img);
  const others = sample(LANDMARKS.filter((x) => x.id !== m.id && x.country !== m.country), 3, rnd);
  const opts = shuffle([m, ...others], rnd);
  return {
    id: 'l:' + m.id,
    type: 'photo',
    prompt: 'この写真の名所はどれ？',
    visual: `<figure class="q-photo"><img src="${img.src}" alt=""><figcaption>📷 ${esc(creditText(img))}・Wikimedia Commons</figcaption></figure>`,
    choices: opts.map((x) => ({ label: `${COUNTRY_BY_ID[x.country]?.flag || ''} ${x.name}` })),
    answer: opts.indexOf(m),
    explain: `${m.name}（${formatYear(m.year)}）：${firstSentence(m.desc)}`,
  };
}
const photoLandmarks = () => LANDMARKS.filter((m) => image(m.img));

// ---------- family trees ----------
const isF = (p) => !!p?.a?.f;
const FAM_TYPES = ['parent', 'spouse', 'adopt', 'teacher'];
const famLinks = (f) => f.links.map((l, i) => [l, i]).filter(([l]) => FAM_TYPES.includes(l[2]) && PERSON_BY_ID[l[0]] && PERSON_BY_ID[l[1]]);

// Ask about one link of a family tree: "Who is X's mother?", "Who was X's teacher?" …
export function genFamily(f, li, rnd = Math.random) {
  const [a, b, t] = f.links[li];
  const A = PERSON_BY_ID[a];
  const B = PERSON_BY_ID[b];
  const ofType = (type, pid, side) => f.links.filter((l) => l[2] === type && l[side] === pid).map((l) => l[1 - side]);
  let subject;
  let answer;
  let prompt;
  let exclude;
  const flip = (t === 'parent' || t === 'spouse') && rnd() < 0.4;
  if (t === 'parent' && !flip) {
    subject = B;
    answer = A;
    prompt = `${B.name}の${isF(A) ? '母' : '父'}はだれ？`;
    exclude = ofType('parent', b, 1);
  } else if (t === 'parent') {
    subject = A;
    answer = B;
    prompt = `${A.name}の${isF(B) ? '娘' : '息子'}はだれ？`;
    exclude = ofType('parent', a, 0);
  } else if (t === 'spouse') {
    [subject, answer] = flip ? [B, A] : [A, B];
    prompt = `${subject.name}の${isF(answer) ? '妻' : '夫'}になったのはだれ？`;
    exclude = [...ofType('spouse', subject.id, 0), ...ofType('spouse', subject.id, 1)];
  } else if (t === 'adopt') {
    subject = B;
    answer = A;
    prompt = `${B.name}を養子（あとつぎ）にしたのはだれ？`;
    exclude = [a];
  } else {
    subject = B;
    answer = A;
    prompt = `${B.name}の先生（師）はだれ？`;
    exclude = ofType('teacher', b, 1);
  }
  const bad = new Set([subject.id, answer.id, ...exclude]);
  const pool = f.members.map(([m]) => PERSON_BY_ID[m]).filter((x) => x && !bad.has(x.id));
  const same = (x) => isF(x) === isF(answer) && !bad.has(x.id);
  let others = sample(pool.filter(same), 3, rnd);
  const fill = (list) => {
    if (others.length < 3) others = [...others, ...sample(list.filter((x) => same(x) && !others.includes(x)), 3 - others.length, rnd)];
  };
  fill(PEOPLE.filter((x) => x.country === answer.country));
  fill(PEOPLE);
  const opts = shuffle([answer, ...others], rnd);
  return {
    id: `g:${f.id}:${li}`,
    type: 'family',
    prompt,
    visual: `<div class="q-avatar">${personIcon(subject, 100)}</div><div class="q-badge">${f.emoji} ${esc(f.name)}</div>`,
    choices: opts.map((x) => ({ label: x.name })),
    answer: opts.indexOf(answer),
    explain: `${answer.name}：${firstSentence(answer.desc)}`,
    personId: answer.id,
  };
}

// ---------- rebuild from id (for review) ----------
export function fromId(id, rnd = Math.random) {
  const [t, a, b] = id.split(':');
  try {
    if (t === 'y') return genYear(EVENT_BY_ID[a], rnd);
    if (t === 'c') return genCountry(EVENT_BY_ID[a], rnd);
    if (t === 'e') return genEra(EVENT_BY_ID[a], rnd);
    if (t === 'p') return genPerson(PERSON_BY_ID[a], rnd);
    if (t === 'm') return genMap(COUNTRY_BY_ID[a], rnd);
    if (t === 'h') return genHand(a, Number(b), rnd);
    if (t === 'g') return genFamily(FAMILY_BY_ID[a], Number(b), rnd);
    if (t === 'l') return LANDMARK_BY_ID[a] && image(LANDMARK_BY_ID[a].img) ? genLandmark(LANDMARK_BY_ID[a], rnd) : null;
    if (t === 'f') return image(EVENT_BY_ID[a].img) ? genPhoto(EVENT_BY_ID[a], rnd) : null;
  } catch (e) {
    return null;
  }
  return null;
}

// ---------- modes ----------
const allHand = () => COUNTRIES.flatMap((c) => c.quiz.map((_, i) => [c.id, i]));

function mixed(events, n, rnd, { hand = [], people = PEOPLE, map = true, order = true } = {}) {
  const qs = [];
  const evs = shuffle(events, rnd);
  let k = 0;
  const nextEvent = () => evs[k++ % evs.length];
  const handPick = shuffle(hand, rnd);
  const plan = [];
  for (let i = 0; i < n; i++) plan.push(['hand', 'year', 'country', 'photo', 'person', 'year', 'map', 'country', 'era', 'order', 'hand', 'photo'][i % 12]);
  for (const kind of shuffle(plan, rnd)) {
    if (kind === 'hand' && handPick.length) {
      const [cid, i] = handPick.pop();
      qs.push(genHand(cid, i, rnd));
    } else if (kind === 'person' && people.length) qs.push(genPerson(pick(people, rnd), rnd));
    else if (kind === 'map' && map) qs.push(genMap(pick(COUNTRIES, rnd), rnd));
    else if (kind === 'photo' && evs.some((x) => image(x.img))) {
      const pe = evs.filter((x) => image(x.img));
      qs.push(genPhoto(pick(pe, rnd), rnd));
    }
    else if (kind === 'order' && order && events.length >= 6) qs.push(genOrder(events, rnd));
    else if (kind === 'era') {
      const e = evs.find((x) => eraSafe(x)) || nextEvent();
      qs.push(eraSafe(e) ? genEra(e, rnd) : genYear(e, rnd));
    } else {
      const e = nextEvent();
      if (kind === 'country' && !mentions(e.title, e.country)) qs.push(genCountry(e, rnd));
      else qs.push(genYear(e, rnd));
    }
  }
  // de-duplicate by id
  const seen = new Set();
  return qs.filter((q) => (seen.has(q.id) ? false : seen.add(q.id)));
}

export const MODES = {
  quick: { name: 'クイックチャレンジ', emoji: '🎯', desc: 'いろいろな問題が10問', color: '#f2b33d' },
  country: { name: '国別クイズ', emoji: '🗺️', desc: '国をえらんで挑戦', color: '#4f7cff' },
  era: { name: '時代別クイズ', emoji: '⏳', desc: '時代をえらんで挑戦', color: '#26a69a' },
  order: { name: '年代ならべかえ', emoji: '🔢', desc: '出来事を古い順に', color: '#a66cff' },
  person: { name: '人物あてクイズ', emoji: '🧑‍🎓', desc: '似顔絵と説明から当てよう', color: '#ef6c3a' },
  map: { name: '地図クイズ', emoji: '🌍', desc: '光っている国はどこ？', color: '#2bb673' },
  photo: { name: '写真クイズ', emoji: '📷', desc: '本物の写真や絵から当てよう', color: '#4aa3df' },
  time: { name: 'タイムアタック', emoji: '⚡', desc: '60秒で何問とけるか', color: '#e8445a' },
  family: { name: '家系図クイズ', emoji: '🌳', desc: '親子・夫婦・師弟のつながり', color: '#d86fb5' },
  review: { name: 'にがて復習', emoji: '🔁', desc: 'まちがえた問題に再挑戦', color: '#8d6e63' },
};

export function buildQuiz(mode, arg, wrongIds = []) {
  const rnd = Math.random;
  switch (mode) {
    case 'country': {
      const c = COUNTRY_BY_ID[arg];
      const hand = c.quiz.map((_, i) => [c.id, i]);
      const ppl = PEOPLE.filter((p) => p.country === c.id);
      return mixed(c.events, 10, rnd, { hand, people: ppl.length >= 1 ? ppl : PEOPLE, map: false }).slice(0, 10);
    }
    case 'era': {
      const evs = eventsInEra(arg);
      const era = ERA_BY_ID[arg];
      const ppl = PEOPLE.filter((p) => p.born != null && p.born >= era.start - 50 && p.born < era.end);
      return mixed(evs, 10, rnd, { hand: [], people: ppl.length >= 4 ? ppl : PEOPLE, map: false }).slice(0, 10);
    }
    case 'order':
      return [...Array(5)].map(() => genOrder(EVENTS, rnd));
    case 'person':
      return sample(PEOPLE, 10, rnd).map((p) => genPerson(p, rnd));
    case 'map':
      return sample(COUNTRIES, 10, rnd).map((c) => genMap(c, rnd));
    case 'photo':
      return shuffle([...sample(photoEvents(), 6, rnd).map((e) => genPhoto(e, rnd)), ...sample(photoLandmarks(), 4, rnd).map((m) => genLandmark(m, rnd))], rnd);
    case 'family': {
      const fams = FAMILY_BY_ID[arg] ? [FAMILY_BY_ID[arg]] : FAMILIES;
      const links = shuffle(fams.flatMap((f) => famLinks(f).map(([, i]) => [f, i])), rnd).slice(0, 10);
      const qs = links.map(([f, i]) => genFamily(f, i, rnd));
      if (qs.length < 10) {
        const ppl = [...new Set(fams.flatMap((f) => f.members.map(([m]) => PERSON_BY_ID[m]).filter(Boolean)))];
        qs.push(...sample(ppl, 10 - qs.length, rnd).map((p) => genPerson(p, rnd)));
      }
      return shuffle(qs, rnd);
    }
    case 'review':
      return shuffle(wrongIds, rnd)
        .slice(0, 10)
        .map((id) => fromId(id, rnd))
        .filter(Boolean);
    case 'time':
      return mixed(EVENTS, 60, rnd, { hand: allHand(), order: false });
    case 'quick':
    default:
      return mixed(EVENTS, 10, rnd, { hand: allHand() });
  }
}
