// 追加人物（アフリカ5：ソマリア・ザンビア・マラウイ・モーリタニア・ニジェール・チャド・ギニア・シエラレオネ・リベリア・エリトリア・ジブチ・ガボン・コンゴ共和国）
export default [
  // ---- ソマリア ----
  { id: 'so_hassan', name: 'ムハンマド・アブドゥッラー・ハサン', country: 'so', born: 1856, died: 1920, title: 'ダルヴィーシュ国家の指導者', desc: 'イスラームの宗教指導者で、1899年からイギリス・イタリア・エチオピアの支配に約20年間抵抗した。すぐれた詩人でもあり、ソマリアの民族的英雄とされる。', img: 'Mohammed Abdullah Hassan', a: { h: 'turban', b: 'l', hc: '#1b1b1b', sk: 2, rc: '#f2efe6' } },
  { id: 'so_adenadde', name: 'アデン・アッデ', country: 'so', born: 1908, died: 2007, title: 'ソマリア初代大統領', desc: '1960年の独立で初代大統領となった。1967年の選挙に敗れると平和的に政権を引き渡し、アフリカで選挙による政権交代を受け入れた最初の指導者の一人とされる。', img: 'Aden Adde', a: { h: 'none', hc: '#bdbdbd', sk: 2, rc: '#37474f' } },

  // ---- ザンビア ----
  { id: 'zm_kaunda', name: 'ケネス・カウンダ', country: 'zm', born: 1924, died: 2021, title: 'ザンビア初代大統領', desc: '教師から独立運動の指導者となり、1964年の独立から1991年まで大統領を務めた。南部アフリカの解放運動を支援し、白いハンカチがトレードマークだった。', quote: '一つのザンビア、一つの国民', img: 'Kenneth Kaunda', a: { h: 'none', hc: '#e0e0e0', sk: 3, rc: '#f5f5f5' } },
  { id: 'zm_chiluba', name: 'フレデリック・チルバ', country: 'zm', born: 1943, died: 2011, title: 'ザンビア第2代大統領', desc: '労働組合の指導者として複数政党制を求める運動を率いた。1991年の選挙でカウンダを破って大統領となり、2002年まで務めた。', img: 'Frederick Chiluba', a: { h: 'none', b: 's', hc: '#1b1b1b', sk: 3, rc: '#263238' } },

  // ---- マラウイ ----
  { id: 'mw_chilembwe', name: 'ジョン・チレンブエ', country: 'mw', born: 1871, died: 1915, life: '1871年ごろ〜1915年', title: '牧師・独立運動の先駆者', desc: 'アメリカで神学を学んで帰国し、学校や教会を開いた。1915年、イギリスの植民地支配と第一次世界大戦への動員に反対して蜂起し、殺害された。', img: 'John Chilembwe', a: { h: 'none', b: 's', hc: '#1b1b1b', sk: 3, rc: '#212121' } },
  { id: 'mw_banda', name: 'ヘイスティングズ・カムズ・バンダ', country: 'mw', born: 1898, died: 1997, life: '1898年ごろ〜1997年', title: 'マラウイ初代大統領', desc: 'アメリカやイギリスで医師として働いたのち帰国し、1964年の独立を指導した。1971年に終身大統領となったが、1994年の複数政党制の選挙で敗れた。', img: 'Hastings Banda', a: { h: 'none', hc: '#bdbdbd', sk: 3, rc: '#212121' } },

  // ---- モーリタニア ----
  { id: 'mr_ibnyasin', name: 'アブドゥッラー・イブン・ヤースィーン', country: 'mr', born: 1010, died: 1059, life: '生年不明〜1059年', title: 'ムラービト運動の創始者', desc: 'モロッコ南部出身のイスラーム法学者で、サハラ西部のサンハージャ人に厳格なイスラームの教えを広めた。彼の運動からムラービト朝が生まれた。', img: 'Abdallah ibn Yasin', a: { h: 'turban', b: 'l', hc: '#1b1b1b', sk: 1, rc: '#f2efe6' } },
  { id: 'mr_daddah', name: 'モクタール・ウルド・ダッダ', country: 'mr', born: 1924, died: 2003, title: 'モーリタニア初代大統領', desc: 'フランスで法律を学んだのち、1960年の独立を指導して初代大統領となった。新首都ヌアクショットの建設を進めたが、1978年の軍事クーデターで失脚した。', img: 'Moktar Ould Daddah', a: { h: 'none', hc: '#1b1b1b', sk: 1, rc: '#1565c0' } },

  // ---- ニジェール ----
  { id: 'ne_kaocen', name: 'カオセン・アグ・ゲダ', country: 'ne', born: 1880, died: 1919, title: 'トゥアレグ人の抵抗指導者', desc: 'サヌーシー教団に属したトゥアレグ人の指導者。1916〜1917年にアガデスのフランス軍を包囲する大反乱を起こしたが敗れ、1919年に処刑された。', img: 'Kaocen Ag Geda', a: { h: 'turban', hc: '#1b1b1b', sk: 2, rc: '#1a237e' } },
  { id: 'ne_diori', name: 'アマニ・ディオリ', country: 'ne', born: 1916, died: 1989, title: 'ニジェール初代大統領', desc: '教師出身の政治家で、1960年の独立とともに初代大統領となった。1974年、干ばつと飢饉のなかで起きた軍事クーデターで失脚した。', img: 'Hamani Diori', a: { h: 'none', hc: '#1b1b1b', sk: 3, rc: '#37474f' } },

  // ---- チャド ----
  { id: 'td_idrisalooma', name: 'イドリス・アローマ', country: 'td', born: 1540, died: 1596, life: '在位1564年ごろ〜1596年ごろ', title: 'ボルヌー帝国の王（マイ）', desc: 'オスマン帝国から火縄銃を取り入れ、トルコ人の銃兵を雇って軍を強くした。メッカ巡礼も行い、カネム・ボルヌー帝国の最盛期を築いた。', img: 'Idris Alooma', a: { h: 'turban', b: 'm', hc: '#1b1b1b', sk: 3, rc: '#ffffff' } },
  { id: 'td_eboue', name: 'フェリックス・エブエ', country: 'fr', born: 1884, died: 1944, title: 'チャド総督・フランス領赤道アフリカ総督', desc: '南米のフランス領ギアナ出身の黒人の植民地行政官。1940年にチャドをいち早く自由フランス側につけ、死後、黒人として初めてパリのパンテオンに葬られた。', img: 'Félix Éboué', a: { h: 'none', hc: '#1b1b1b', sk: 3, rc: '#f5f5f5' } },

  // ---- ギニア ----
  { id: 'gn_samori', name: 'サモリ・トゥーレ', country: 'gn', born: 1830, died: 1900, life: '1830年ごろ〜1900年', title: 'ワスル帝国の建国者', desc: '商人から身を起こし、西アフリカ内陸に大帝国を築いた。自前で銃を作って約17年間フランス軍と戦ったが、1898年に捕らえられガボンに流された。', img: 'Samori Ture', a: { h: 'turban', b: 'm', hc: '#1b1b1b', sk: 3, rc: '#f2efe6' } },
  { id: 'gn_sekoutoure', name: 'アハメド・セク・トゥーレ', country: 'gn', born: 1922, died: 1984, title: 'ギニア初代大統領', desc: '労働組合運動から政治家となり、1958年にフランスとの共同体を拒否して独立を実現した。1984年に亡くなるまで大統領を務めたが、反対派を厳しく弾圧した。', quote: '隷属のなかの豊かさより、自由のなかの貧しさを選ぶ。', img: 'Ahmed Sékou Touré', a: { h: 'cap', hc: '#1b1b1b', sk: 3, rc: '#ffffff' } },

  // ---- シエラレオネ ----
  { id: 'sl_sengbe', name: 'センベ・ピエ（ジョゼフ・シンケ）', country: 'sl', born: 1814, died: 1879, life: '1814年ごろ〜1879年ごろ', title: 'アミスタッド号反乱の指導者', desc: 'メンデ人の農民で、1839年に奴隷として売られ、スペイン船アミスタッド号で反乱を起こした。アメリカの最高裁判所で自由を認められ、故郷に帰った。', img: 'Joseph Cinqué', a: { h: 'none', hc: '#1b1b1b', sk: 3, rc: '#8d6e63' } },
  { id: 'sl_baibureh', name: 'バイ・ブレ', country: 'sl', born: 1840, died: 1908, life: '1840年ごろ〜1908年', title: 'テムネ人の首長・小屋税戦争の指導者', desc: 'イギリスが課した小屋税に反対して1898年に武装蜂起し、ゲリラ戦でイギリス軍を苦しめた。捕らえられて国外に追放されたが、のちに帰国した。', img: 'Bai Bureh', a: { h: 'cap', b: 'm', hc: '#1b1b1b', sk: 3, rc: '#5d4037' } },

  // ---- リベリア ----
  { id: 'lr_tubman', name: 'ウィリアム・タブマン', country: 'lr', born: 1895, died: 1971, title: 'リベリア第19代大統領', desc: '1944年から亡くなる1971年まで27年間大統領を務めた。外国企業の投資を呼びこむ「門戸開放政策」を進め、先住民にも選挙権を広げた。', img: 'William Tubman', a: { h: 'tophat', hc: '#bdbdbd', sk: 3, rc: '#212121' } },
  { id: 'lr_sirleaf', name: 'エレン・ジョンソン・サーリーフ', country: 'lr', born: 1938, died: null, life: '1938年〜', title: 'リベリア大統領', desc: 'ハーバード大学で学んだ経済学者で、2005年の選挙に勝ち、アフリカで初めて選挙で選ばれた女性の国家元首となった。2011年にノーベル平和賞を受賞した。', img: 'Ellen Johnson Sirleaf', a: { h: 'turban', f: 1, hc: '#9e9e9e', sk: 3, rc: '#6a1b9a' } },

  // ---- エリトリア ----
  { id: 'er_awate', name: 'ハミド・イドリス・アワテ', country: 'er', born: 1910, died: 1962, title: 'エリトリア独立闘争の先駆者', desc: '1961年9月1日、エチオピアの支配に対して最初の武装闘争を始めた。この日は今もエリトリアで「武装闘争開始の日」として記念されている。', img: 'Hamid Idris Awate', a: { h: 'none', b: 'm', hc: '#1b1b1b', sk: 2, rc: '#795548' } },
  { id: 'er_isaias', name: 'イサイアス・アフェウェルキ', country: 'er', born: 1946, died: null, life: '1946年〜', title: 'エリトリア初代大統領', desc: 'エリトリア人民解放戦線（EPLF）を率いて独立戦争を戦い、1993年の独立以来大統領を務めている。独立後、国政選挙は一度も行われていない。', img: 'Isaias Afwerki', a: { h: 'none', b: 's', hc: '#616161', sk: 2, rc: '#5d6d3c' } },

  // ---- ジブチ ----
  { id: 'dj_gouled', name: 'ハッサン・グレド・アプティドン', country: 'dj', born: 1916, died: 2006, title: 'ジブチ初代大統領', desc: '独立運動を率い、1977年の独立とともに初代大統領となった。1999年まで22年間大統領を務め、新しい国の基礎を築いた。', img: 'Hassan Gouled Aptidon', a: { h: 'none', hc: '#e0e0e0', sk: 2, rc: '#37474f' } },
  { id: 'dj_guelleh', name: 'イスマイル・オマル・ゲレ', country: 'dj', born: 1947, died: null, life: '1947年〜', title: 'ジブチ第2代大統領', desc: '1999年にグレドのあとを継いで大統領となった。港や鉄道の整備を進め、日本・アメリカ・フランス・中国など各国の軍事拠点を受け入れている。', img: 'Ismaïl Omar Guelleh', a: { h: 'none', hc: '#616161', sk: 2, rc: '#263238' } },

  // ---- ガボン ----
  { id: 'ga_schweitzer', name: 'アルベルト・シュヴァイツァー', country: 'fr', born: 1875, died: 1965, title: '医師・神学者・オルガン奏者', desc: 'アルザス出身で、30歳から医学を学び、1913年にガボンのランバレネで病院を開いた。「生命への畏敬」を説き、1952年度のノーベル平和賞を受賞した。', img: 'Albert Schweitzer', a: { h: 'none', b: 'm', hc: '#e0e0e0', sk: 0, rc: '#f5f5f5' } },
  { id: 'ga_bongo', name: 'オマール・ボンゴ', country: 'ga', born: 1935, died: 2009, title: 'ガボン第2代大統領', desc: '1967年に大統領となり、2009年に亡くなるまで41年余り在任した。石油収入を背景に長期政権を築き、息子のアリ・ボンゴがあとを継いだ。', img: 'Omar Bongo', a: { h: 'none', hc: '#1b1b1b', sk: 3, rc: '#212121' } },

  // ---- コンゴ共和国 ----
  { id: 'cg_brazza', name: 'ピエール・サヴォルニャン・ド・ブラザ', country: 'fr', born: 1852, died: 1905, title: '探検家・フランス領コンゴの総弁務官', desc: 'イタリア生まれのフランス海軍士官。武力に頼らない交渉でコンゴ川流域をフランス領とし、晩年には植民地での住民への虐待を告発した。', img: 'Pierre Savorgnan de Brazza', a: { h: 'none', b: 'l', hc: '#3e2723', sk: 0, rc: '#f5f5f5' } },
  { id: 'cg_youlou', name: 'フュルベール・ユールー', country: 'cg', born: 1917, died: 1972, title: 'コンゴ共和国初代大統領', desc: 'カトリックの神父から政治家となり、1960年の独立で初代大統領となった。1963年、労働組合などの大規模な抗議行動で辞任に追いこまれた。', img: 'Fulbert Youlou', a: { h: 'none', hc: '#1b1b1b', sk: 3, rc: '#f5f5f5' } },
];
