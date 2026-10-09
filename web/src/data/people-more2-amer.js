// 追加人物（セルビア・クロアチア・リトアニア・ベネズエラ・ボリビア・エクアドル・グアテマラ・ジャマイカ・パナマ・パプアニューギニア・フィジー）
export default [
  // ---- セルビア ----
  { id: 'dusan', name: 'ステファン・ドゥシャン', country: 'rs', born: 1308, died: 1355, life: '1308年ごろ〜1355年', title: 'セルビア帝国の皇帝', desc: '1346年に「セルビア人とギリシア人の皇帝」として即位し、ギリシア北部まで広がる帝国を築いた。1349年には「ドゥシャン法典」を定めた。', img: 'Stefan Dušan', a: { h: 'crown', b: 'l', hc: '#4e342e', sk: 0, rc: '#8e24aa' } },
  { id: 'princip', name: 'ガヴリロ・プリンツィプ', country: 'rs', born: 1894, died: 1918, title: 'サラエボ事件の実行犯', desc: 'ボスニア出身のセルビア人青年で、1914年にサラエボでオーストリアの皇位継承者夫妻を暗殺した。未成年だったため死刑を免れたが、獄中で結核のため亡くなった。', img: 'Gavrilo Princip', a: { h: 'none', hc: '#212121', sk: 0, rc: '#424242' } },
  { id: 'tito', name: 'ヨシップ・ブロズ・ティトー', country: 'rs', born: 1892, died: 1980, title: 'ユーゴスラビアの指導者', desc: 'クロアチア生まれ。第二次世界大戦でパルチザンを率いて国を解放し、戦後のユーゴスラビアを35年にわたって率いた。ソ連と対立し、非同盟運動の中心となった。', img: 'Josip Broz Tito', a: { h: 'cap', hc: '#9e9e9e', sk: 0, rc: '#5d6d3e' } },
  // ---- クロアチア ----
  { id: 'diocletian', name: 'ディオクレティアヌス', country: 'it', born: 244, died: 311, life: '244年ごろ〜311年ごろ', title: 'ローマ皇帝', desc: 'ダルマチア地方の出身で、帝国を4人で分担して治める制度をつくった。305年に自ら退位し、故郷近くの宮殿（現在のスプリト）で余生を送った。', img: 'Diocletian', a: { h: 'laurel', b: 's', hc: '#bdbdbd', sk: 1, rc: '#7b1fa2' } },
  { id: 'tomislav', name: 'トミスラヴ', country: 'hr', born: null, died: 928, life: '?〜928年ごろ', title: 'クロアチア最初の王', desc: '925年ごろローマ教皇から「王」と呼ばれ、クロアチア最初の王とされる。ハンガリーやブルガリアと戦い、王国の領土を広げた。', img: 'Tomislav of Croatia', a: { h: 'crown', b: 'm', hc: '#5d4037', sk: 0, rc: '#c62828' } },
  { id: 'jelacic', name: 'ヨシプ・イェラチッチ', country: 'hr', born: 1801, died: 1859, title: 'クロアチアの総督（バン）', desc: '1848年にクロアチアの総督となり、農奴制を廃止した。ハプスブルク家の側に立ってハンガリーの革命軍と戦った。', img: 'Josip Jelačić', a: { h: 'kepi', b: 'm', hc: '#3e2723', sk: 0, rc: '#b71c1c' } },
  { id: 'tudjman', name: 'フラニョ・トゥジマン', country: 'hr', born: 1922, died: 1999, title: 'クロアチア初代大統領', desc: '元はパルチザンの将軍で、のちに歴史家となった。1990年に大統領となり、1991年の独立宣言と祖国戦争を指導した。', img: 'Franjo Tuđman', a: { h: 'none', hc: '#e0e0e0', sk: 0, rc: '#263238' } },
  // ---- リトアニア ----
  { id: 'vytautas', name: 'ヴィータウタス大公', country: 'lt', born: 1350, died: 1430, life: '1350年ごろ〜1430年', title: 'リトアニア大公', desc: '1410年、いとこのヨガイラとともにグルンヴァルトの戦いでドイツ騎士団を破った。大公国をバルト海から黒海にまで広げ、「大公」の名で敬われる。', img: 'Vytautas', a: { h: 'crown', b: 's', hc: '#6d4c41', sk: 0, rc: '#2e7d32' } },
  { id: 'landsbergis', name: 'ヴィータウタス・ランズベルギス', country: 'lt', born: 1932, died: null, title: 'リトアニア独立運動の指導者', desc: '音楽学者から独立運動「サユーディス」の指導者となった。1990年、最高会議議長としてソ連の共和国で初めて独立回復を宣言した。', img: 'Vytautas Landsbergis', a: { h: 'none', b: 's', hc: '#9e9e9e', sk: 0, rc: '#37474f' } },
  { id: 'sugihara', name: '杉原千畝', country: 'jp', born: 1900, died: 1986, title: '「命のビザ」の外交官', desc: '1940年、リトアニアのカウナス領事館で、ナチスの迫害から逃れたユダヤ人難民に日本通過ビザを発給し続けた。約6000人の命を救ったといわれる。', img: 'Chiune Sugihara', a: { h: 'none', hc: '#1b1b1b', sk: 1, rc: '#263238' } },
  // ---- ベネズエラ ----
  { id: 'miranda', name: 'フランシスコ・デ・ミランダ', country: 've', born: 1750, died: 1816, title: '南米独立の先駆者', desc: 'アメリカ独立戦争とフランス革命の両方に加わった軍人。1811年のベネズエラ独立を指導したが、スペインに捕らえられ獄中で亡くなった。', img: 'Francisco de Miranda', a: { h: 'bicorne', hc: '#e0e0e0', sk: 1, rc: '#1a237e' } },
  { id: 'jvgomez', name: 'フアン・ビセンテ・ゴメス', country: 've', born: 1857, died: 1935, title: 'ベネズエラの独裁者', desc: '1908年から1935年まで独裁者としてベネズエラを支配した。外国の石油会社を受け入れ、ベネズエラを世界有数の産油国に変えた。', img: 'Juan Vicente Gómez', a: { h: 'kepi', b: 'm', hc: '#9e9e9e', sk: 1, rc: '#4e342e' } },
  { id: 'chavez', name: 'ウゴ・チャベス', country: 've', born: 1954, died: 2013, title: 'ベネズエラの大統領', desc: '元軍人で、1999年から亡くなるまで大統領を務めた。「ボリバル革命」をかかげ、石油の収入で貧しい人々への政策を進めたが、アメリカとは対立した。', img: 'Hugo Chávez', a: { h: 'cap', hc: '#1b1b1b', sk: 2, rc: '#c62828' } },
  // ---- ボリビア ----
  { id: 'sucre', name: 'アントニオ・ホセ・デ・スクレ', country: 'bo', born: 1795, died: 1830, title: '独立の将軍・ボリビア大統領', desc: 'ベネズエラ生まれで、ボリバルの右腕としてピチンチャやアヤクチョの戦いに勝利した。ボリビアの大統領を務めたが、35歳で暗殺された。', img: 'Antonio José de Sucre', a: { h: 'bicorne', hc: '#3e2723', sk: 1, rc: '#1a237e' } },
  { id: 'evomorales', name: 'エボ・モラレス', country: 'bo', born: 1959, died: null, title: 'ボリビアの大統領', desc: 'アイマラ人で、コカ栽培農民の組合のリーダーから2006年に大統領となった。天然ガスを国有化し、国名を「ボリビア多民族国」と改めた。', img: 'Evo Morales', a: { h: 'none', hc: '#1b1b1b', sk: 2, rc: '#e65100' } },
  // ---- エクアドル ----
  { id: 'atahualpa', name: 'アタワルパ', country: 'ec', born: 1502, died: 1533, life: '1502年ごろ〜1533年', title: 'インカ帝国最後の皇帝', desc: 'キトを拠点に、兄ワスカルとの内戦に勝って皇帝となった。1532年にピサロに捕らえられ、莫大な身代金を払ったが処刑された。', img: 'Atahualpa', a: { h: 'inca', hc: '#1b1b1b', sk: 2, rc: '#f9a825' } },
  { id: 'darwin', name: 'チャールズ・ダーウィン', country: 'gb', born: 1809, died: 1882, title: '進化論を唱えた博物学者', desc: 'ビーグル号で世界を航海し、ガラパゴス諸島の生き物から進化の着想を得た。1859年に『種の起源』を発表し、生物学を大きく変えた。', img: 'Charles Darwin', a: { h: 'bald', b: 'l', hc: '#e0e0e0', sk: 0, rc: '#3e2723' } },
  // ---- グアテマラ ----
  { id: 'alvarado', name: 'ペドロ・デ・アルバラード', country: 'es', born: 1485, died: 1541, life: '1485年ごろ〜1541年', title: 'グアテマラの征服者', desc: 'コルテスの部下としてアステカ征服に加わり、1524年にグアテマラ高地のキチェ王国を征服した。残酷な征服で知られる。', img: 'Pedro de Alvarado', a: { h: 'morion', b: 'm', hc: '#d4a017', sk: 0, rc: '#78909c' } },
  { id: 'arbenz', name: 'ハコボ・アルベンス', country: 'gt', born: 1913, died: 1971, title: 'グアテマラの大統領', desc: '1951年に大統領となり、大地主や外国企業の使っていない土地を農民に分ける農地改革を進めた。1954年、アメリカが支援したクーデターで追放された。', img: 'Jacobo Árbenz', a: { h: 'none', hc: '#5d4037', sk: 0, rc: '#37474f' } },
  { id: 'menchu', name: 'リゴベルタ・メンチュウ', country: 'gt', born: 1959, died: null, title: 'ノーベル平和賞受賞者', desc: 'マヤ系キチェ人の女性で、内戦で家族を失った。先住民の権利と平和を訴え、1992年にノーベル平和賞を受賞した。', img: 'Rigoberta Menchú', a: { h: 'none', f: 1, hc: '#1b1b1b', sk: 2, rc: '#c2185b' } },
  // ---- ジャマイカ ----
  { id: 'nanny', name: 'ナニー（マルーンの女王）', country: 'jm', born: null, died: null, life: '1686年ごろ〜1755年ごろ', title: 'マルーンの指導者', desc: '山地にこもったマルーンを率い、イギリス軍とゲリラ戦を戦った女性指導者。ジャマイカの国民的英雄とされ、500ドル紙幣に描かれている。', img: 'Nanny of the Maroons', a: { h: 'none', f: 1, hc: '#1b1b1b', sk: 3, rc: '#6d4c41' } },
  { id: 'morgan', name: 'ヘンリー・モーガン', country: 'gb', born: 1635, died: 1688, life: '1635年ごろ〜1688年', title: 'カリブ海の海賊', desc: 'ジャマイカのポートロイヤルを拠点に、ポルトベロやパナマなどスペインの町を襲った。のちにナイトの称号を受け、ジャマイカの副総督となった。', img: 'Henry Morgan', a: { h: 'bicorne', b: 'm', hc: '#3e2723', sk: 0, rc: '#b71c1c' } },
  { id: 'bogle', name: 'ポール・ボーグル', country: 'jm', born: null, died: 1865, life: '1820年ごろ〜1865年', title: 'モラントベイの反乱の指導者', desc: 'バプテスト派の牧師で、貧しい農民の権利を求めて1865年に抗議の行進を率いた。反乱の指導者として処刑され、のちに国民的英雄とされた。', img: 'Paul Bogle', a: { h: 'none', hc: '#1b1b1b', sk: 3, rc: '#212121' } },
  { id: 'marley', name: 'ボブ・マーリー', country: 'jm', born: 1945, died: 1981, title: 'レゲエ歌手', desc: 'レゲエを世界に広めたジャマイカの歌手。ラスタファリの思想や平和、抑圧からの解放を歌い、36歳の若さで亡くなった。', img: 'Bob Marley', a: { h: 'none', hc: '#1b1b1b', sk: 3, rc: '#2e7d32' } },
  // ---- パナマ ----
  { id: 'balboa', name: 'バスコ・ヌーニェス・デ・バルボア', country: 'es', born: 1475, died: 1519, life: '1475年ごろ〜1519年', title: '太平洋を見た探検家', desc: '1513年、パナマ地峡を越えて、ヨーロッパ人として初めてアメリカ大陸から太平洋を見た。のちに対立した総督に反逆罪で処刑された。', img: 'Vasco Núñez de Balboa', a: { h: 'morion', b: 'm', hc: '#5d4037', sk: 0, rc: '#8d6e63' } },
  { id: 'amador', name: 'マヌエル・アマドール・ゲレーロ', country: 'pa', born: 1833, died: 1909, title: 'パナマ初代大統領', desc: '医師で、1903年のコロンビアからの独立運動を指導した。独立したパナマの初代大統領となった。', img: 'Manuel Amador Guerrero', a: { h: 'none', b: 'm', hc: '#e0e0e0', sk: 1, rc: '#263238' } },
  { id: 'torrijos', name: 'オマール・トリホス', country: 'pa', born: 1929, died: 1981, title: 'パナマの最高指導者', desc: '1968年のクーデター後に実権を握った軍人。1977年にアメリカのカーター大統領と条約を結び、運河の返還を実現させた。', quote: '私は歴史に入りたいのではない。運河地帯に入りたいのだ。', img: 'Omar Torrijos', a: { h: 'cap', hc: '#1b1b1b', sk: 1, rc: '#5d6d3e' } },
  // ---- パプアニューギニア ----
  { id: 'somare', name: 'マイケル・ソマレ', country: 'pg', born: 1936, died: 2021, title: 'パプアニューギニア初代首相', desc: '1975年の独立を導き、初代首相となった「建国の父」。その後も何度も首相を務めた。', img: 'Michael Somare', a: { h: 'none', b: 's', hc: '#e0e0e0', sk: 3, rc: '#c62828' } },
  { id: 'horii', name: '堀井富太郎', country: 'jp', born: 1890, died: 1942, title: '日本陸軍の将軍', desc: '南海支隊を率いて、1942年にニューギニア島のココダ・トラックを越えてポートモレスビーをめざした。撤退中に川を渡ろうとして亡くなった。', img: 'Tomitarō Horii', a: { h: 'kepi', b: 's', hc: '#1b1b1b', sk: 1, rc: '#6d6b3a' } },
  // ---- フィジー ----
  { id: 'tasman', name: 'アベル・タスマン', country: 'nl', born: 1603, died: 1659, title: 'オランダの探検家', desc: 'オランダ東インド会社の命で南の海を探検し、1642〜1643年にタスマニア、ニュージーランド、フィジーを訪れた最初のヨーロッパ人となった。', img: 'Abel Tasman', a: { h: 'none', b: 'm', hc: '#5d4037', sk: 0, rc: '#212121' } },
  { id: 'cakobau', name: 'セル・エペニサ・カコバウ', country: 'fj', born: 1815, died: 1883, life: '1815年ごろ〜1883年', title: 'フィジーの王', desc: 'バウ島の首長で、1871年にフィジー王国を建てた。1874年、首長たちとともにフィジーをイギリスに割譲した。', img: 'Seru Epenisa Cakobau', a: { h: 'none', b: 'l', hc: '#1b1b1b', sk: 3, rc: '#f5f5f5' } },
  { id: 'mara', name: 'カミセセ・マラ', country: 'fj', born: 1920, died: 2004, title: 'フィジー初代首相', desc: 'ラウ諸島の高位の首長の家に生まれ、1970年の独立とともに初代首相となった。1987年まで首相を務め、のちに大統領となった。', img: 'Kamisese Mara', a: { h: 'none', hc: '#1b1b1b', sk: 3, rc: '#1565c0' } },
];
