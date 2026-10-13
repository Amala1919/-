// 追加人物（アンゴラ・モザンビーク・ウガンダ・ルワンダ・カメルーン・ベナン・ボツワナ・ナミビア・コートジボワール）
export default [
  // ---- アンゴラ ----
  { id: 'ao_nzinga', name: 'ンジンガ女王', country: 'ao', born: 1583, died: 1663, life: '1583年ごろ〜1663年', title: 'ンドンゴ王国・マタンバ王国の女王', desc: '巧みな外交と戦いで、約40年にわたりポルトガルの侵略に抵抗した。現在もアンゴラの独立と抵抗の象徴とされている。', img: 'Nzinga of Ndongo and Matamba', a: { h: 'crown', f: 1, hc: '#1b1b1b', sk: 3, rc: '#b03a2e' } },
  { id: 'ao_neto', name: 'アゴスティニョ・ネト', country: 'ao', born: 1922, died: 1979, title: 'アンゴラの初代大統領', desc: '医師で詩人でもあり、MPLA（アンゴラ解放人民運動）を率いて独立運動を指導した。1975年の独立で初代大統領となった。', img: 'Agostinho Neto', a: { h: 'none', hc: '#1b1b1b', sk: 3, rc: '#37474f' } },
  { id: 'ao_savimbi', name: 'ジョナス・サヴィンビ', country: 'ao', born: 1934, died: 2002, title: 'UNITAの指導者', desc: '1966年にUNITA（アンゴラ全面独立民族同盟）を結成した。独立後はMPLA政府と内戦を続け、2002年に戦死した。', img: 'Jonas Savimbi', a: { h: 'cap', b: 'm', hc: '#1b1b1b', sk: 3, rc: '#4e5b31' } },

  // ---- モザンビーク ----
  { id: 'mz_mondlane', name: 'エドゥアルド・モンドラーネ', country: 'mz', born: 1920, died: 1969, title: 'FRELIMOの初代議長', desc: 'アメリカで博士号を取り、国連でも働いたのち、1962年にFRELIMOを結成した。独立を見ることなく、1969年に小包爆弾で暗殺された。', img: 'Eduardo Mondlane', a: { h: 'none', hc: '#1b1b1b', sk: 3, rc: '#455a64' } },
  { id: 'mz_machel', name: 'サモラ・マシェル', country: 'mz', born: 1933, died: 1986, title: 'モザンビークの初代大統領', desc: '看護師から独立闘争の指導者となり、1975年の独立で初代大統領に就いた。1986年、南アフリカ領内での飛行機事故で亡くなった。', quote: 'ア・ルタ・コンティヌア（闘いは続く）', img: 'Samora Machel', a: { h: 'kepi', b: 's', hc: '#1b1b1b', sk: 3, rc: '#556b2f' } },
  { id: 'mz_gracamachel', name: 'グラサ・マシェル', country: 'mz', born: 1945, died: null, title: '教育大臣・人権活動家', desc: '独立後のモザンビークで教育大臣を務め、学校教育を大きく広げた。夫サモラの死後、1998年にネルソン・マンデラと結婚した。', img: 'Graça Machel', a: { h: 'none', f: 1, hc: '#1b1b1b', sk: 3, rc: '#8e44ad' } },

  // ---- ウガンダ ----
  { id: 'ug_mutesa1', name: 'ムテサ1世', country: 'ug', born: 1837, died: 1884, life: '1837年ごろ〜1884年', title: 'ブガンダ王国の王（カバカ）', desc: '1856年ごろに即位し、ブガンダ王国を東アフリカ有数の強国にした。探検家スピークやスタンリーを宮廷に迎え、宣教師も受け入れた。', img: 'Muteesa I of Buganda', a: { h: 'turban', b: 's', hc: '#1b1b1b', sk: 3, rc: '#f2efe6' } },
  { id: 'ug_kagwa', name: 'アポロ・カグワ', country: 'ug', born: 1864, died: 1927, title: 'ブガンダ王国の首相（カティキロ）', desc: '幼い王の摂政としてブガンダを動かし、1900年にイギリスとブガンダ協定を結んだ。ブガンダの歴史や習慣を記した本も著した。', img: 'Apolo Kagwa', a: { h: 'none', b: 'm', hc: '#1b1b1b', sk: 3, rc: '#f2efe6' } },
  { id: 'ug_amin', name: 'イディ・アミン', country: 'ug', born: 1925, died: 2003, life: '1925年ごろ〜2003年', title: 'ウガンダの独裁者', desc: '1971年のクーデタで大統領となり、アジア系住民の追放や反対派の大量殺害を行った。1979年に追放され、サウジアラビアで亡くなった。', img: 'Idi Amin', a: { h: 'kepi', hc: '#1b1b1b', sk: 3, rc: '#556b2f' } },

  // ---- ルワンダ ----
  { id: 'rw_rwabugiri', name: 'キゲリ4世ルワブギリ', country: 'rw', born: 1840, died: 1895, life: '1840年ごろ〜1895年', title: 'ルワンダ王国の王（ムワミ）', desc: '19世紀後半に遠征をくり返し、ルワンダ王国の領土を最大にした。地方の有力者を抑えて中央集権を進めた。', img: 'Kigeli IV Rwabugiri', a: { h: 'crown', hc: '#1b1b1b', sk: 3, rc: '#f2efe6' } },
  { id: 'rw_rudahigwa', name: 'ムタラ3世ルダヒグワ', country: 'rw', born: 1911, died: 1959, title: 'ルワンダ王国の王（ムワミ）', desc: '1931年、父ムシンガがベルギーに退位させられたあとに即位した。キリスト教に改宗し、牛をめぐる伝統的な主従制度を廃止した。', img: 'Mutara III Rudahigwa', a: { h: 'none', hc: '#1b1b1b', sk: 3, rc: '#f2efe6' } },
  { id: 'rw_kagame', name: 'ポール・カガメ', country: 'rw', born: 1957, died: null, title: 'ルワンダの大統領', desc: 'ルワンダ愛国戦線を率いて1994年の虐殺を終わらせ、2000年から大統領を務める。経済発展を実現した一方、強権的な政治への批判もある。', img: 'Paul Kagame', a: { h: 'none', hc: '#1b1b1b', sk: 3, rc: '#2c3e50' } },

  // ---- カメルーン ----
  { id: 'cm_njoya', name: 'イブラヒム・ンジョヤ', country: 'cm', born: 1860, died: 1933, life: '1860年ごろ〜1933年', title: 'バムン王国の王', desc: '独自のバムン文字をつくり、王国の歴史や知識を記録させた。学校や印刷所を設けたが、1931年にフランスによって退位させられた。', img: 'Ibrahim Njoya', a: { h: 'turban', b: 's', hc: '#1b1b1b', sk: 3, rc: '#1f618d' } },
  { id: 'cm_mangabell', name: 'ルドルフ・ドゥアラ・マンガ・ベル', country: 'cm', born: 1873, died: 1914, title: 'ドゥアラの王', desc: 'ドイツで教育を受け、ドイツ当局による土地の取り上げに抗議した。反逆罪に問われて1914年に処刑され、国民的英雄とされている。', img: 'Rudolf Duala Manga Bell', a: { h: 'none', b: 's', hc: '#1b1b1b', sk: 3, rc: '#212121' } },
  { id: 'cm_ahidjo', name: 'アマドゥ・アヒジョ', country: 'cm', born: 1924, died: 1989, title: 'カメルーンの初代大統領', desc: '1960年の独立で初代大統領となり、1961年に英語圏の南部カメルーンとの統一を実現した。1982年に辞任し、亡命先のセネガルで亡くなった。', img: 'Ahmadou Ahidjo', a: { h: 'cap', hc: '#1b1b1b', sk: 3, rc: '#f2efe6' } },

  // ---- ベナン ----
  { id: 'bj_agaja', name: 'アガジャ王', country: 'bj', born: null, died: 1740, life: '?〜1740年', title: 'ダホメ王国の王', desc: '1718年ごろに即位し、アラダや港町ウィダーを征服して王国を海岸まで広げた。ヨーロッパ商人との奴隷貿易を支配した。', img: 'Agaja', a: { h: 'crown', hc: '#1b1b1b', sk: 3, rc: '#b9770e' } },
  { id: 'bj_ghezo', name: 'ゲゾ王', country: 'bj', born: null, died: 1858, life: '?〜1858年', title: 'ダホメ王国の王', desc: '1818年に即位し、強国オヨへの貢ぎ物をやめて独立を固めた。女性部隊アゴジエを拡充し、王国の最盛期を築いた。', img: 'Ghezo', a: { h: 'crown', hc: '#1b1b1b', sk: 3, rc: '#7d3c98' } },
  { id: 'bj_behanzin', name: 'ベハンジン王', country: 'bj', born: 1845, died: 1906, title: 'ダホメ王国最後の独立した王', desc: '1890年代にフランス軍と戦い、都アボメーに火を放って抵抗を続けた。1894年に降伏し、マルティニーク島に流された。', img: 'Béhanzin', a: { h: 'crown', hc: '#1b1b1b', sk: 3, rc: '#922b21' } },

  // ---- ボツワナ ----
  { id: 'bw_sechele', name: 'セチェレ1世', country: 'bw', born: 1812, died: 1892, life: '1812年ごろ〜1892年', title: 'クウェナ人の首長', desc: 'リヴィングストンから洗礼を受けた首長として知られる。1852年にはボーア人の攻撃を退けて土地を守った。', img: 'Sechele I', a: { h: 'none', b: 's', hc: '#1b1b1b', sk: 3, rc: '#6e2c00' } },
  { id: 'bw_khama3', name: 'カーマ3世', country: 'bw', born: 1837, died: 1923, life: '1837年ごろ〜1923年', title: 'ングワト人の首長', desc: 'キリスト教徒として酒の販売を禁じるなど改革を行った。1895年にイギリスへ渡り、国が会社の支配下に入るのを防いだ。', img: 'Khama III', a: { h: 'none', b: 'm', hc: '#9e9e9e', sk: 3, rc: '#212121' } },
  { id: 'bw_seretse', name: 'セレツェ・カーマ', country: 'bw', born: 1921, died: 1980, title: 'ボツワナの初代大統領', desc: 'カーマ3世の孫。白人女性との結婚でイギリスに追放されたが、帰国して独立を導き、ダイヤモンドの富を生かした国づくりを進めた。', img: 'Seretse Khama', a: { h: 'none', hc: '#1b1b1b', sk: 3, rc: '#1a5276' } },

  // ---- ナミビア ----
  { id: 'na_maharero', name: 'サミュエル・マハレロ', country: 'na', born: 1856, died: 1923, title: 'ヘレロ人の最高首長', desc: '1904年、ドイツの植民地支配に対するヘレロ人の蜂起を指導した。敗れたのち砂漠を越えて隣国ベチュアナランドへ逃れ、そこで亡くなった。', img: 'Samuel Maharero', a: { h: 'kepi', b: 'm', hc: '#1b1b1b', sk: 3, rc: '#3e4a2e' } },
  { id: 'na_witbooi', name: 'ヘンドリック・ウィットボーイ', country: 'na', born: 1830, died: 1905, life: '1830年ごろ〜1905年', title: 'ナマ人の首長', desc: 'ドイツの保護領化に長く抵抗し、1904年に再び蜂起した。1905年に戦死し、現在はナミビアの紙幣にも描かれている。', img: 'Hendrik Witbooi (Nama chief)', a: { h: 'cap', b: 's', hc: '#bdbdbd', sk: 2, rc: '#f2efe6' } },
  { id: 'na_nujoma', name: 'サム・ヌジョマ', country: 'na', born: 1929, died: 2025, title: 'ナミビアの初代大統領', desc: 'SWAPOを率いて南アフリカの支配に対する独立闘争を指導した。1990年の独立で初代大統領となり、「建国の父」と呼ばれる。', img: 'Sam Nujoma', a: { h: 'none', b: 'l', hc: '#e0e0e0', sk: 3, rc: '#1f3a93' } },

  // ---- コートジボワール ----
  { id: 'ci_pokou', name: 'アブラ・ポク', country: 'ci', born: null, died: null, life: '18世紀', title: 'バウレ人の伝説の女王', desc: 'アシャンティ王国の王族で、争いを逃れて人々を西へ導いたと伝えられる。わが子を川にささげた伝説は、バウレ人の名の由来とされる。', img: 'Abla Pokou', a: { h: 'crown', f: 1, hc: '#1b1b1b', sk: 3, rc: '#d4ac0d' } },
  { id: 'ci_houphouet', name: 'フェリックス・ウフェ＝ボワニ', country: 'ci', born: 1905, died: 1993, title: 'コートジボワールの初代大統領', desc: '植民地時代にフランス国民議会の議員となり、強制労働の廃止を実現した。1960年から亡くなるまで大統領を務め、カカオで経済を発展させた。', img: 'Félix Houphouët-Boigny', a: { h: 'none', hc: '#9e9e9e', sk: 3, rc: '#212121' } },
  { id: 'ci_drogba', name: 'ディディエ・ドログバ', country: 'ci', born: 1978, died: null, title: 'サッカー選手', desc: 'イングランドのチェルシーなどで活躍したストライカー。内戦中の2005年、テレビを通じて国民に武器を置くよう訴えた。', img: 'Didier Drogba', a: { h: 'none', hc: '#1b1b1b', sk: 3, rc: '#f39c12' } },
];
