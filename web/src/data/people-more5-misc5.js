// 追加人物（misc5：北マケドニア・モンテネグロ・モルドバ・ルクセンブルク・トルクメニスタン・カタール・シンガポール・エルサルバドル・ベリーズ・バハマ・トリニダード・トバゴ・ガイアナ・スリナム・サモア・トンガ・バヌアツ・ソロモン諸島）
export default [
  // ---- 北マケドニア ----
  { id: 'mk_clement', name: 'オフリドの聖クリメント', country: 'mk', born: 840, died: 916, life: '840年ごろ〜916年', title: '聖職者・スラヴ語の教育者', desc: 'キュリロスとメトディオスの弟子で、オフリドを拠点に約3500人の弟子を育てたと伝えられる。スラヴ語の文字と書物を広め、キリル文字の普及に大きな役割を果たした。', img: 'Clement of Ohrid', a: { h: 'none', b: 'l', hc: '#9e9e9e', sk: 0, rc: '#5d4037' } },
  { id: 'mk_teresa', name: 'マザー・テレサ', country: 'mk', born: 1910, died: 1997, title: '修道女・「神の愛の宣教者会」創設者', desc: 'スコピエでアルバニア系の家庭に生まれ、インドのコルカタで貧しい人や病人の世話に生涯をささげた。1979年にノーベル平和賞を受け、2016年に聖人とされた。', img: 'Mother Teresa', a: { h: 'none', f: 1, hc: '#f5f5f5', sk: 0, rc: '#f5f5f5' } },

  // ---- モンテネグロ ----
  { id: 'me_njegos', name: 'ペタル2世ペトロヴィチ＝ニェゴシュ', country: 'me', born: 1813, died: 1851, title: 'モンテネグロの主教公・詩人', desc: '主教として国を治めながら元老院や税制を整え、近代国家への道を開いた。1847年の叙事詩『山の花環』は南スラヴ文学の代表作とされる。', img: 'Petar II Petrović-Njegoš', a: { h: 'cap', b: 'l', hc: '#1b1b1b', sk: 0, rc: '#212121' } },
  { id: 'me_nikola', name: 'ニコラ1世', country: 'me', born: 1841, died: 1921, title: 'モンテネグロ公・国王', desc: '1860年に即位し、1878年のベルリン会議で独立を認めさせ、1910年に王となった。娘たちを各国の王家に嫁がせ「ヨーロッパの義父」と呼ばれたが、1918年に王位を失った。', img: 'Nicholas I of Montenegro', a: { h: 'cap', b: 'm', hc: '#9e9e9e', sk: 0, rc: '#b71c1c' } },

  // ---- モルドバ ----
  { id: 'md_stephen', name: 'シュテファン大公', country: 'md', born: 1433, died: 1504, life: '1433年ごろ〜1504年', title: 'モルドヴァ公', desc: '1457年から約47年間モルドヴァ公国を治め、1475年のヴァスルイの戦いでオスマン帝国軍を破った。多くの教会や修道院を建て、モルドバとルーマニアで国民的英雄とされる。', img: 'Stephen the Great', a: { h: 'crown', hc: '#5d4037', sk: 0, rc: '#7b1fa2' } },
  { id: 'md_snegur', name: 'ミルチャ・スネグル', country: 'md', born: 1940, died: 2023, title: 'モルドバの初代大統領', desc: '農学者出身の政治家で、ソ連末期にモルダヴィア共和国の指導者となった。1991年の独立で初代大統領となり、1997年まで務めた。', img: 'Mircea Snegur', a: { h: 'none', hc: '#bdbdbd', sk: 0, rc: '#263238' } },

  // ---- ルクセンブルク ----
  { id: 'lu_siegfried', name: 'ジークフリート（ルクセンブルク伯）', country: 'lu', born: 922, died: 998, life: '922年ごろ〜998年', title: 'ルクセンブルクの建国者', desc: 'アルデンヌ家の貴族で、963年に土地交換によって岩山の小さな城を手に入れた。この城がルクセンブルクの名と国の始まりとされる。', img: 'Siegfried, Count of Luxembourg', a: { h: 'helmet', b: 'm', hc: '#6d4c41', sk: 0, rc: '#1e88e5' } },
  { id: 'lu_charlotte', name: 'シャルロット大公', country: 'lu', born: 1896, died: 1985, title: 'ルクセンブルク大公', desc: '1919年から1964年まで在位した女性の大公。第二次世界大戦中はロンドンなどに亡命し、ラジオ放送で国民を励まし続けて抵抗の象徴となった。', img: 'Charlotte, Grand Duchess of Luxembourg', a: { h: 'tiara', f: 1, hc: '#5d4037', sk: 0, rc: '#90caf9' } },

  // ---- トルクメニスタン ----
  { id: 'tm_sarianidi', name: 'ヴィクトル・サリアニディ', country: 'ru', born: 1929, died: 2013, title: '考古学者', desc: 'タシケント生まれのギリシャ系のソ連の考古学者。ゴヌル・デペなど青銅器時代のオクサス文明の都市を発掘し、アフガニスタンのティリャ・テペの黄金の財宝も発見した。', img: 'Viktor Sarianidi', a: { h: 'none', hc: '#bdbdbd', sk: 0, rc: '#8d6e63' } },
  { id: 'tm_sanjar', name: 'アフマド・サンジャル', country: 'tm', born: 1086, died: 1157, title: 'セルジューク朝のスルタン', desc: 'メルフを都として東方の領土を治め、セルジューク朝最後の大スルタンとなった。晩年は遊牧民に捕らえられ、死後メルフに巨大な霊廟が建てられた。', img: 'Ahmad Sanjar', a: { h: 'turban', b: 'l', hc: '#1b1b1b', sk: 1, rc: '#1565c0' } },

  // ---- カタール ----
  { id: 'qa_jassim', name: 'ジャーシム・ビン・ムハンマド・アール・サーニー', country: 'qa', born: 1825, died: 1913, life: '1825年ごろ〜1913年', title: 'カタール建国の父', desc: '1878年にカタールの指導者を継ぎ、1893年のワジバの戦いでオスマン帝国軍を退けた。カタールの独立と統一の基礎を築いた人物とされる。', img: 'Jassim bin Mohammed Al Thani', a: { h: 'turban', b: 'l', hc: '#1b1b1b', sk: 2, rc: '#f5f5f5' } },
  { id: 'qa_hamad', name: 'ハマド・ビン・ハリーファ・アール・サーニー', country: 'qa', born: 1952, died: null, life: '1952年〜', title: 'カタールの首長', desc: '1995年から2013年まで首長を務め、天然ガスの液化・輸出事業を進めてカタールを世界有数の豊かな国にした。衛星テレビ局アルジャジーラの開局やワールドカップ招致も実現した。', img: 'Hamad bin Khalifa Al Thani', a: { h: 'turban', b: 'm', hc: '#1b1b1b', sk: 2, rc: '#ffffff' } },

  // ---- シンガポール ----
  { id: 'sg_raffles', name: 'スタンフォード・ラッフルズ', country: 'gb', born: 1781, died: 1826, title: 'イギリス東インド会社の植民地行政官', desc: '1819年にシンガポールに上陸して交易所を開き、自由港として発展させた。ジャワ島の統治も行い、ボロブドゥール遺跡の調査にも関わった。', img: 'Stamford Raffles', a: { h: 'none', hc: '#6d4c41', sk: 0, rc: '#263238' } },
  { id: 'sg_lky', name: 'リー・クアンユー', country: 'sg', born: 1923, died: 2015, title: 'シンガポールの初代首相', desc: '1959年から1990年まで首相を務め、1965年の独立後、小さな島国を世界有数の豊かな国へと導いた。強い指導力で知られ、「建国の父」と呼ばれる。', img: 'Lee Kuan Yew', a: { h: 'none', hc: '#424242', sk: 1, rc: '#f5f5f5' } },

  // ---- エルサルバドル ----
  { id: 'sv_delgado', name: 'ホセ・マティアス・デルガド', country: 'sv', born: 1767, died: 1832, title: '神父・独立運動の指導者', desc: '1811年、サンサルバドルでスペインの支配に反対する「最初の叫び」を上げた。中米独立の功労者として「祖国の父」とたたえられている。', img: 'José Matías Delgado', a: { h: 'none', hc: '#bdbdbd', sk: 1, rc: '#212121' } },
  { id: 'sv_romero', name: 'オスカル・ロメロ', country: 'sv', born: 1917, died: 1980, title: 'サンサルバドル大司教', desc: '軍や政府による人権侵害を説教で批判し、貧しい人々の声を代弁した。1980年にミサの最中に暗殺され、2018年に聖人とされた。', img: 'Óscar Romero', a: { h: 'none', hc: '#424242', sk: 1, rc: '#212121' } },

  // ---- ベリーズ ----
  { id: 'bz_kan2', name: 'カン2世', country: 'bz', born: 588, died: 658, title: 'マヤの都市カラコルの王', desc: '618年から658年まで在位し、カラコルの最盛期を築いた。近隣の都市ナランホとの戦いに勝ち、巨大ピラミッド「カアナ」の整備も進めたとされる。', img: "K'an II", a: { h: 'crown', hc: '#1b1b1b', sk: 2, rc: '#2e7d32' } },
  { id: 'bz_price', name: 'ジョージ・プライス', country: 'bz', born: 1919, died: 2011, title: 'ベリーズの初代首相', desc: '1950年に人民連合党を結成し、独立運動を率いた。1981年の独立で初代首相となり、「ベリーズ建国の父」と呼ばれる。', img: 'George Cadle Price', a: { h: 'none', hc: '#bdbdbd', sk: 1, rc: '#ffffff' } },

  // ---- バハマ ----
  { id: 'bs_blackbeard', name: '黒ひげ（エドワード・ティーチ）', country: 'gb', born: null, died: 1718, life: '1680年ごろ〜1718年', title: '海賊', desc: 'ナッソーを拠点にカリブ海とアメリカ沿岸で商船を襲った、最も有名な海賊の一人。1718年、ノースカロライナ沖でイギリス海軍との戦いで討ち取られた。', img: 'Blackbeard', a: { h: 'bicorne', b: 'l', hc: '#1b1b1b', sk: 0, rc: '#3e2723' } },
  { id: 'bs_pindling', name: 'リンデン・ピンドリング', country: 'bs', born: 1930, died: 2000, title: 'バハマの初代首相', desc: '1967年の選挙でアフリカ系住民中心の政権を実現し、「多数派の支配」をもたらした。1973年の独立を導き、1992年まで首相を務めた。', img: 'Lynden Pindling', a: { h: 'none', hc: '#1b1b1b', sk: 3, rc: '#1a237e' } },

  // ---- トリニダード・トバゴ ----
  { id: 'tt_kitchener', name: 'ロード・キチナー', country: 'tt', born: 1922, died: 2000, title: 'カリプソ歌手', desc: '本名アルドウィン・ロバーツ。1948年にイギリスへ渡り「ロンドンは僕の居場所」を歌って人気を集め、帰国後はカーニバルのスティールバンドのための名曲を数多く生んだ。', img: 'Lord Kitchener (calypsonian)', a: { h: 'cap', hc: '#1b1b1b', sk: 3, rc: '#c62828' } },
  { id: 'tt_williams', name: 'エリック・ウィリアムズ', country: 'tt', born: 1911, died: 1981, title: 'トリニダード・トバゴの初代首相・歴史学者', desc: '『資本主義と奴隷制』を著した歴史学者で、1956年に人民国家運動を結成した。1962年の独立から亡くなるまで首相を務め、「建国の父」と呼ばれる。', img: 'Eric Williams', a: { h: 'none', hc: '#424242', sk: 3, rc: '#455a64' } },

  // ---- ガイアナ ----
  { id: 'gy_cuffy', name: 'カフィー', country: 'gy', born: null, died: 1763, life: '?〜1763年', title: 'ベルバイス奴隷反乱の指導者', desc: '西アフリカから連れてこられたアカン系の人物とされ、1763年にオランダ領ベルバイスで大規模な反乱を率いた。ガイアナの国民的英雄とされている。', img: 'Cuffy (person)', a: { h: 'none', hc: '#1b1b1b', sk: 3, rc: '#8d6e63' } },
  { id: 'gy_burnham', name: 'フォーブス・バーナム', country: 'gy', born: 1923, died: 1985, title: 'ガイアナの初代首相・大統領', desc: '1966年の独立で初代首相となり、1970年に「協同共和国」を宣言して産業の国有化を進めた。1980年から亡くなるまで大統領を務めた。', img: 'Forbes Burnham', a: { h: 'none', hc: '#1b1b1b', sk: 3, rc: '#37474f' } },

  // ---- スリナム ----
  { id: 'sr_dekom', name: 'アントン・デ・コム', country: 'sr', born: 1898, died: 1945, title: '作家・反植民地運動家', desc: '1934年に『われらスリナムの奴隷たち』を著して植民地支配を告発した。第二次世界大戦中はオランダでナチスへの抵抗運動に加わり、強制収容所で亡くなった。', img: 'Anton de Kom', a: { h: 'none', hc: '#1b1b1b', sk: 3, rc: '#424242' } },
  { id: 'sr_ferrier', name: 'ヨハン・フェリール', country: 'sr', born: 1910, died: 2010, title: 'スリナムの初代大統領', desc: '教育者出身の政治家で、自治政府の首相を経て、1975年の独立で初代大統領となった。1980年のクーデター後に退任し、99歳まで生きた。', img: 'Johan Ferrier', a: { h: 'none', hc: '#e0e0e0', sk: 2, rc: '#263238' } },

  // ---- サモア ----
  { id: 'ws_tamasese', name: 'トゥプア・タマセセ・レアロフィ3世', country: 'ws', born: 1901, died: 1929, title: 'マウ運動の指導者', desc: 'サモアの最高首長の一人で、ニュージーランド統治に対する非暴力の自治運動を率いた。1929年の「黒い土曜日」に警察の発砲で命を落とした。', quote: '私の血はサモアのために流された。復讐など考えるな。この血は平和を守るために流されたのだから。', img: 'Tupua Tamasese Lealofi III', a: { h: 'none', hc: '#1b1b1b', sk: 2, rc: '#f5f5f5' } },
  { id: 'ws_mataafa', name: 'フィアメ・マタアファ', country: 'ws', born: 1921, died: 1975, title: 'サモアの初代首相', desc: '最高首長の一人で、1959年に初代首相となり、1962年の西サモア独立を導いた。娘のフィアメ・ナオミ・マタアファは2021年に初の女性首相となった。', img: 'Fiamē Mataʻafa Faumuina Mulinuʻu II', a: { h: 'none', hc: '#1b1b1b', sk: 2, rc: '#ffffff' } },

  // ---- トンガ ----
  { id: 'to_tupou1', name: 'ジョージ・トゥポウ1世', country: 'to', born: 1797, died: 1893, life: '1797年ごろ〜1893年', title: 'トンガ王国の初代国王', desc: '内戦で分裂していたトンガを統一し、1845年に国王となった。1875年に憲法を定めて立憲君主国とし、列強の植民地となるのを防いだ。', img: 'George Tupou I', a: { h: 'crown', b: 'm', hc: '#e0e0e0', sk: 2, rc: '#1a237e' } },
  { id: 'to_salote', name: 'サローテ・トゥポウ3世', country: 'to', born: 1900, died: 1965, title: 'トンガの女王', desc: '1918年から1965年まで在位し、教育や医療の充実に努めた。1953年のエリザベス2世の戴冠式で、雨の中を笑顔で馬車に乗る姿がイギリスで大人気となった。', img: 'Sālote Tupou III', a: { h: 'crown', f: 1, hc: '#1b1b1b', sk: 2, rc: '#c62828' } },

  // ---- バヌアツ ----
  { id: 'vu_queiros', name: 'ペドロ・フェルナンデス・デ・キロス', country: 'pt', born: 1565, died: 1615, title: 'スペインに仕えた航海者', desc: 'ポルトガル生まれで、スペイン王のために太平洋を探検した。1606年、エスピリトゥサント島を伝説の「南方大陸」と信じて上陸し、名前をつけた。', img: 'Pedro Fernandes de Queirós', a: { h: 'morion', b: 'm', hc: '#3e2723', sk: 0, rc: '#5d4037' } },
  { id: 'vu_lini', name: 'ウォルター・リニ', country: 'vu', born: 1942, died: 1999, title: 'バヌアツの初代首相', desc: '英国国教会の司祭で、独立運動を率いた。1980年の独立で初代首相となり、1991年まで務めて「建国の父」と呼ばれる。', img: 'Walter Lini', a: { h: 'none', hc: '#1b1b1b', sk: 3, rc: '#6a1b9a' } },

  // ---- ソロモン諸島 ----
  { id: 'sb_mendana', name: 'アルバロ・デ・メンダーニャ', country: 'es', born: 1542, died: 1595, title: 'スペインの航海者', desc: '1568年にソロモン諸島に到達し、ソロモン王の財宝伝説にちなんで島々を名づけた。1595年の2回目の航海中、サンタクルーズ諸島で病死した。', img: 'Álvaro de Mendaña de Neira', a: { h: 'morion', b: 'm', hc: '#3e2723', sk: 0, rc: '#8d1c1c' } },
  { id: 'sb_kenilorea', name: 'ピーター・ケニロレア', country: 'sb', born: 1943, died: 2016, title: 'ソロモン諸島の初代首相', desc: 'マライタ島出身の教師から政治家となり、1978年の独立で初代首相に就任した。のちに国会議長も務め、「建国の父」とされる。', img: 'Peter Kenilorea', a: { h: 'none', hc: '#1b1b1b', sk: 3, rc: '#1565c0' } },
];
