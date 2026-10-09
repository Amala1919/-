// 追加人物（アルゼンチン・チリ・キューバ・コロンビア・ハイチ・ニュージーランド）
export default [
  // ---- アルゼンチン ----
  { id: 'sanmartin', name: 'ホセ・デ・サン・マルティン', country: 'ar', born: 1778, died: 1850, title: '南米独立の英雄', desc: 'アルゼンチン独立戦争を率い、アンデス山脈を越えてチリとペルーの解放に貢献した。晩年はフランスで静かに暮らした。', img: 'José de San Martín', a: { h: 'bicorne', hc: '#3e2723', sk: 1, rc: '#1a237e' } },
  { id: 'gardel', name: 'カルロス・ガルデル', country: 'ar', born: 1890, died: 1935, title: 'タンゴの歌手', desc: 'ブエノスアイレスで育ち、「タンゴの王様」と呼ばれた歌手。映画でも活躍したが、1935年にコロンビアで飛行機事故により亡くなった。', img: 'Carlos Gardel', a: { h: 'none', hc: '#1b1b1b', sk: 1, rc: '#212121' } },
  { id: 'peron', name: 'フアン・ペロン', country: 'ar', born: 1895, died: 1974, title: 'アルゼンチンの大統領', desc: '労働者の支持を受けて1946年に大統領となり、賃金の引き上げや社会保障を進めた。クーデターで追放されたが、1973年に復帰した。', img: 'Juan Perón', a: { h: 'none', hc: '#212121', sk: 1, rc: '#37474f' } },
  { id: 'evita', name: 'エバ・ペロン（エビータ）', country: 'ar', born: 1919, died: 1952, title: 'ペロン大統領の妻', desc: '貧しい家に生まれ、女優を経て大統領夫人となった。貧しい人々の救済と女性参政権の実現に力を尽くし、33歳で亡くなった。', img: 'Eva Perón', a: { h: 'updo', f: 1, hc: '#f0d58c', sk: 0, rc: '#ecf0f1' } },
  // ---- チリ ----
  { id: 'lautaro', name: 'ラウタロ', country: 'cl', born: null, died: 1557, life: '1534年ごろ〜1557年', title: 'マプチェの戦士', desc: 'スペイン人のもとで騎兵の戦い方を学び、1553年にバルディビアの軍を破った。マプチェの抵抗の英雄としてたたえられる。', img: 'Lautaro', a: { h: 'none', hc: '#1b1b1b', sk: 2, rc: '#8d6e63' } },
  { id: 'ohiggins', name: 'ベルナルド・オイギンス', country: 'cl', born: 1778, died: 1842, title: 'チリ建国の父', desc: 'サン・マルティンとともにスペイン軍を破り、1818年にチリの独立を宣言した。初代の最高指導者となったが、のちにペルーへ亡命した。', img: "Bernardo O'Higgins", a: { h: 'none', hc: '#8d6e63', sk: 0, rc: '#1a237e' } },
  { id: 'allende', name: 'サルバドール・アジェンデ', country: 'cl', born: 1908, died: 1973, title: 'チリの大統領', desc: '医師出身の政治家で、1970年に選挙で社会主義政権を樹立した。1973年の軍事クーデターの際、大統領官邸で亡くなった。', img: 'Salvador Allende', a: { h: 'none', b: 's', g: 1, hc: '#424242', sk: 1, rc: '#5d4037' } },
  { id: 'pinochet', name: 'アウグスト・ピノチェト', country: 'cl', born: 1915, died: 2006, title: 'チリの軍事独裁者', desc: '1973年のクーデターで権力を握り、1990年まで独裁を続けた。多くの市民が殺害・弾圧され、のちに人権侵害の罪を問われた。', img: 'Augusto Pinochet', a: { h: 'kepi', b: 's', hc: '#bdbdbd', sk: 0, rc: '#546e7a' } },
  // ---- キューバ ----
  { id: 'hatuey', name: 'アトゥエイ', country: 'cu', born: null, died: 1512, life: '?〜1512年', title: 'タイノの首長', desc: 'イスパニョーラ島からキューバに逃れ、スペインの征服に抵抗した首長。1512年に処刑され、「キューバ最初の英雄」と呼ばれる。', img: 'Hatuey', a: { h: 'none', hc: '#1b1b1b', sk: 2, rc: '#a1887f' } },
  { id: 'marti', name: 'ホセ・マルティ', country: 'cu', born: 1853, died: 1895, title: 'キューバ独立運動の指導者・詩人', desc: '亡命先のニューヨークでキューバ革命党を結成し、1895年に独立戦争を始めて戦死した。その詩は「グアンタナメラ」の歌詞になった。', img: 'José Martí', a: { h: 'none', b: 's', hc: '#3e2723', sk: 0, rc: '#212121' } },
  { id: 'castro', name: 'フィデル・カストロ', country: 'cu', born: 1926, died: 2016, title: 'キューバ革命の指導者', desc: '1959年にバティスタ政権を倒し、キューバを社会主義国にした。約半世紀にわたって国を率い、アメリカと対立し続けた。', img: 'Fidel Castro', a: { h: 'kepi', b: 'l', hc: '#212121', sk: 1, rc: '#556b2f' } },
  { id: 'che', name: 'チェ・ゲバラ', country: 'cu', born: 1928, died: 1967, title: '革命家', desc: 'アルゼンチン生まれの医師で、カストロとともにキューバ革命を成功させた。1959年には日本を訪れ広島を訪問し、1967年にボリビアで処刑された。', img: 'Che Guevara', a: { h: 'cap', b: 'm', hc: '#212121', sk: 1, rc: '#556b2f' } },
  // ---- コロンビア ----
  { id: 'bolivar', name: 'シモン・ボリバル', country: 'co', born: 1783, died: 1830, title: '南米の解放者', desc: 'ベネズエラのカラカス出身。ベネズエラ・コロンビア・エクアドル・ペルー・ボリビアの独立を導き、大コロンビアの大統領となった。', quote: '私は海を耕した', img: 'Simón Bolívar', a: { h: 'bicorne', hc: '#1b1b1b', sk: 1, rc: '#1a237e' } },
  { id: 'santander', name: 'フランシスコ・デ・パウラ・サンタンデール', country: 'co', born: 1792, died: 1840, title: '大コロンビアの副大統領', desc: 'ボリバルとともに独立戦争を戦い、法による国づくりを進めて「法の人」と呼ばれた。のちにヌエバ・グラナダ共和国の大統領となった。', img: 'Francisco de Paula Santander', a: { h: 'none', hc: '#3e2723', sk: 0, rc: '#1a237e' } },
  { id: 'garciamarquez', name: 'ガブリエル・ガルシア＝マルケス', country: 'co', born: 1927, died: 2014, title: '小説家', desc: '『百年の孤独』で魔術的リアリズムを世界に広めた。1982年にノーベル文学賞を受賞し、「ガボ」の愛称で親しまれた。', img: 'Gabriel García Márquez', a: { h: 'none', b: 's', hc: '#9e9e9e', sk: 1, rc: '#ecf0f1' } },
  { id: 'jmsantos', name: 'フアン・マヌエル・サントス', country: 'co', born: 1951, died: null, title: 'コロンビアの大統領', desc: '2010年から2018年まで大統領を務め、ゲリラ組織FARCとの和平合意を実現した。2016年にノーベル平和賞を受賞した。', img: 'Juan Manuel Santos', a: { h: 'none', hc: '#9e9e9e', sk: 0, rc: '#263238' } },
  // ---- ハイチ ----
  { id: 'boukman', name: 'ダッティ・ブークマン', country: 'ht', born: null, died: 1791, life: '?〜1791年', title: 'ハイチ革命の口火を切った指導者', desc: 'ブドゥー教の司祭で、1791年8月の森での儀式で奴隷たちに蜂起を呼びかけた。同じ年にフランス軍に殺された。', img: 'Dutty Boukman', a: { h: 'none', hc: '#1b1b1b', sk: 3, rc: '#8d6e63' } },
  { id: 'louverture', name: 'トゥサン・ルーヴェルチュール', country: 'ht', born: 1743, died: 1803, life: '1743年ごろ〜1803年', title: 'ハイチ革命の指導者', desc: '元奴隷から革命軍の指導者となり、サン＝ドマング全体を治めた。ナポレオンが送った軍に捕らえられ、フランスの牢獄で亡くなった。', quote: '私を倒しても、自由の木の幹を切ったにすぎない。根は深く、数多いのだから', img: 'Toussaint Louverture', a: { h: 'bicorne', hc: '#424242', sk: 3, rc: '#1a237e' } },
  { id: 'dessalines', name: 'ジャン＝ジャック・デサリーヌ', country: 'ht', born: 1758, died: 1806, title: 'ハイチ独立の指導者', desc: 'トゥサンの後を継いでフランス軍を破り、1804年にハイチの独立を宣言した。皇帝ジャック1世となったが、1806年に暗殺された。', img: 'Jean-Jacques Dessalines', a: { h: 'bicorne', hc: '#1b1b1b', sk: 3, rc: '#283593' } },
  { id: 'christophe', name: 'アンリ・クリストフ', country: 'ht', born: 1767, died: 1820, title: 'ハイチ北部の王', desc: '独立戦争の将軍で、1811年に王アンリ1世となった。巨大要塞シタデル・ラフェリエールとサン・スーシ宮を築かせた。', img: 'Henri Christophe', a: { h: 'crown', hc: '#1b1b1b', sk: 3, rc: '#b71c1c' } },
  // ---- ニュージーランド ----
  { id: 'honeheke', name: 'ホネ・ヘケ', country: 'nz', born: null, died: 1850, life: '1807年ごろ〜1850年', title: 'マオリの首長', desc: 'ワイタンギ条約に最初に署名した首長とされる。のちにイギリスの支配に反発し、旗竿を何度も切り倒して戦争を起こした。', img: 'Hōne Heke', a: { h: 'none', b: 'm', hc: '#1b1b1b', sk: 2, rc: '#6d4c41' } },
  { id: 'sheppard', name: 'ケイト・シェパード', country: 'nz', born: 1847, died: 1934, title: '女性参政権運動の指導者', desc: 'イギリス生まれで、ニュージーランドで女性参政権運動を率いた。1893年の世界初の女性参政権実現に貢献し、10ドル札に描かれている。', img: 'Kate Sheppard', a: { h: 'updo', f: 1, hc: '#6d4c41', sk: 0, rc: '#4a148c' } },
  { id: 'rutherford', name: 'アーネスト・ラザフォード', country: 'nz', born: 1871, died: 1937, title: '物理学者', desc: '放射線の研究で1908年にノーベル化学賞を受賞し、1911年に原子核を発見した。「原子物理学の父」と呼ばれる。', img: 'Ernest Rutherford', a: { h: 'none', b: 's', hc: '#bdbdbd', sk: 0, rc: '#37474f' } },
  { id: 'hillary', name: 'エドモンド・ヒラリー', country: 'nz', born: 1919, died: 2008, title: '登山家・探検家', desc: '1953年にテンジン・ノルゲイとともにエベレストに初登頂した。その後はネパールに学校や病院を建てる活動を続けた。', img: 'Edmund Hillary', a: { h: 'none', hc: '#6d4c41', sk: 0, rc: '#e65100' } },
];
