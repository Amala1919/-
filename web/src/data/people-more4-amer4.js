// 追加の人物（アメリカ4・アジア：ウルグアイ・パラグアイ・ドミニカ共和国・コスタリカ・ニカラグア・ホンジュラス・東ティモール）
export default [
  // ---- ウルグアイ ----
  { id: 'uy_artigas', name: 'ホセ・ヘルバシオ・アルティガス', country: 'uy', born: 1764, died: 1850, title: 'ウルグアイ独立の父', desc: 'モンテビデオに生まれ、ガウチョたちを率いて1811年にスペイン軍を破った。各州が対等に結びつく連邦制を唱えたが、ポルトガル・ブラジル軍に敗れ、1820年からパラグアイで亡命生活を送って亡くなった。', img: 'José Gervasio Artigas', a: { h: 'bicorne', hc: '#bdbdbd', sk: 0, rc: '#1a237e' } },
  { id: 'uy_lavalleja', name: 'フアン・アントニオ・ラバジェハ', country: 'uy', born: 1784, died: 1853, title: '「33人の東方人」の指導者', desc: 'アルティガスのもとで戦った軍人。1825年、ブラジル支配下のこの地に33人の仲間と上陸して独立戦争を始め、1828年のウルグアイ独立へと道を開いた。', img: 'Juan Antonio Lavalleja', a: { h: 'bicorne', b: 's', hc: '#4e342e', sk: 0, rc: '#0d47a1' } },
  { id: 'uy_mujica', name: 'ホセ・ムヒカ', country: 'uy', born: 1935, died: 2025, title: 'ウルグアイの大統領', desc: '若いころは都市ゲリラ「トゥパマロス」に加わり、軍事政権のもとで10年以上投獄された。2010〜2015年に大統領を務め、給料の大半を寄付する質素な暮らしから「世界一貧しい大統領」と呼ばれた。', quote: '貧しい人とは、少ししか持たない人ではなく、限りなく多くを必要とする人のことだ', img: 'José Mujica', a: { h: 'none', b: 's', hc: '#e0e0e0', sk: 0, rc: '#5d4037' } },

  // ---- パラグアイ ----
  { id: 'py_francia', name: 'ホセ・ガスパル・ロドリゲス・デ・フランシア', country: 'py', born: 1766, died: 1840, title: 'パラグアイの終身独裁官', desc: '神学と法律を学んだ学者肌の政治家で、独立後の1814年に最高独裁官、1816年に終身独裁官となった。外国との交流を断つ鎖国政策をとり、自給自足の国づくりを進めた。', img: 'José Gaspar Rodríguez de Francia', a: { h: 'none', hc: '#9e9e9e', sk: 0, rc: '#212121' } },
  { id: 'py_solanolopez', name: 'フランシスコ・ソラーノ・ロペス', country: 'py', born: 1827, died: 1870, title: 'パラグアイの大統領', desc: '父の後を継いで1862年に大統領となった。1864年に三国同盟戦争を起こしてブラジル・アルゼンチン・ウルグアイと戦い、1870年にセロ・コラで戦死した。', quote: '祖国とともに死ぬ', img: 'Francisco Solano López', a: { h: 'kepi', b: 'm', hc: '#3e2723', sk: 0, rc: '#1b5e20' } },
  { id: 'py_estigarribia', name: 'ホセ・フェリクス・エスティガリビア', country: 'py', born: 1888, died: 1940, title: 'チャコ戦争の司令官', desc: 'チャコ戦争でパラグアイ軍を率いてボリビア軍を破り、国民的英雄となった。1939年に大統領となったが、翌年飛行機事故で亡くなった。', img: 'José Félix Estigarribia', a: { h: 'kepi', hc: '#212121', sk: 1, rc: '#556b2f' } },

  // ---- ドミニカ共和国 ----
  { id: 'do_anacaona', name: 'アナカオナ', country: 'do', born: 1474, died: 1503, life: '1474年ごろ〜1503年', title: 'タイノ人の女性首長', desc: 'イスパニョーラ島西部の首長国ハラグアを治めた女性首長で、詩や歌の名手としても知られた。スペイン人と友好を保とうとしたが、1503年に総督オバンドに捕らえられ処刑された。', img: 'Anacaona', a: { h: 'none', f: 1, hc: '#1b1b1b', sk: 2, rc: '#ff8f00' } },
  { id: 'do_duarte', name: 'フアン・パブロ・ドゥアルテ', country: 'do', born: 1813, died: 1876, title: 'ドミニカ共和国建国の父', desc: 'サントドミンゴの商人の家に生まれ、1838年に秘密結社ラ・トリニタリアをつくってハイチからの独立をめざした。1844年に独立が実現したが、政争に敗れて国外に追われ、ベネズエラで亡くなった。', img: 'Juan Pablo Duarte', a: { h: 'none', b: 's', hc: '#3e2723', sk: 0, rc: '#1a237e' } },
  { id: 'do_trujillo', name: 'ラファエル・トルヒーヨ', country: 'do', born: 1891, died: 1961, title: 'ドミニカ共和国の独裁者', desc: '1930年から1961年に暗殺されるまで、31年間にわたって国を支配した。首都を自分の名に改め、反対派を弾圧し、1937年にはハイチ系住民の虐殺を引き起こした。', img: 'Rafael Trujillo', a: { h: 'kepi', b: 's', hc: '#212121', sk: 1, rc: '#eeeeee' } },

  // ---- コスタリカ ----
  { id: 'cr_mora', name: 'フアン・ラファエル・モラ', country: 'cr', born: 1814, died: 1860, title: 'コスタリカの大統領', desc: 'コーヒー農園主出身の大統領。1856年、中米支配をねらうウィリアム・ウォーカーに対して軍を率いて戦い、勝利した。のちにクーデターで失脚し、1860年に処刑された。', img: 'Juan Rafael Mora Porras', a: { h: 'none', b: 'm', hc: '#3e2723', sk: 0, rc: '#212121' } },
  { id: 'cr_santamaria', name: 'フアン・サンタマリア', country: 'cr', born: 1831, died: 1856, title: 'コスタリカの国民的英雄', desc: 'アラフエラ出身の貧しい青年で、軍の鼓手として従軍した。1856年のリバスの戦いで、ウォーカー軍がたてこもる建物に火を放ち、命と引きかえに勝利を導いたと伝えられる。', img: 'Juan Santamaría', a: { h: 'none', hc: '#1b1b1b', sk: 2, rc: '#eeeeee' } },
  { id: 'cr_figueres', name: 'ホセ・フィゲーレス', country: 'cr', born: 1906, died: 1990, title: 'コスタリカの大統領', desc: '1948年の内戦に勝利して臨時政府を率い、同年に軍隊の廃止を宣言した。女性参政権や銀行の国有化なども進め、のちに2度大統領を務めた。「ドン・ペペ」の愛称で親しまれた。', img: 'José Figueres Ferrer', a: { h: 'none', hc: '#5d4037', sk: 0, rc: '#37474f' } },

  // ---- ニカラグア ----
  { id: 'ni_walker', name: 'ウィリアム・ウォーカー', country: 'us', born: 1824, died: 1860, title: 'アメリカ人の傭兵隊長', desc: 'テネシー州出身。武装集団を率いて中米に乗りこみ、1856年にニカラグアの大統領を名乗って奴隷制の復活を宣言した。中米諸国に追い出されたのち、1860年にホンジュラスで処刑された。', img: 'William Walker (filibuster)', a: { h: 'none', hc: '#a1887f', sk: 0, rc: '#212121' } },
  { id: 'ni_sandino', name: 'アウグスト・セサル・サンディーノ', country: 'ni', born: 1895, died: 1934, title: '反米ゲリラの指導者', desc: '1927年からニカラグアに駐留するアメリカ海兵隊とゲリラ戦を戦い、1933年に撤退させた。翌年、ソモサの国家警備隊に殺害されたが、のちの革命勢力サンディニスタの名の由来となった。', img: 'Augusto César Sandino', a: { h: 'cap', hc: '#212121', sk: 1, rc: '#5d4037' } },
  { id: 'ni_somoza', name: 'アナスタシオ・ソモサ・ガルシア', country: 'ni', born: 1896, died: 1956, title: 'ニカラグアの独裁者', desc: 'アメリカが育てた国家警備隊の司令官から1937年に大統領となり、独裁体制を築いた。1956年に暗殺されたが、2人の息子が1979年まで支配を続けた。', img: 'Anastasio Somoza García', a: { h: 'kepi', hc: '#212121', sk: 1, rc: '#c5b358' } },

  // ---- ホンジュラス ----
  { id: 'hn_yaxkukmo', name: 'キニチ・ヤシュ・クック・モ', country: 'hn', born: null, died: 437, life: '?〜437年ごろ', title: 'コパン王朝の初代王', desc: '426年にコパンで王朝を開き、その王朝は16代、約400年にわたって続いた。後の王たちは彼を偉大な祖先として祭り、祭壇Qにもその姿が刻まれている。', img: 'Kʼinich Yax Kʼukʼ Moʼ', a: { h: 'inca', hc: '#1b1b1b', sk: 2, rc: '#00897b' } },
  { id: 'hn_lempira', name: 'レンピラ', country: 'hn', born: null, died: 1537, life: '?〜1537年', title: 'レンカ人の首長', desc: '1537年、多くの部族をまとめてスペインの征服者に抵抗し、山の要塞で長く戦った。和平の席でだまし討ちにあったと伝えられ、ホンジュラスの通貨にその名が残る。', img: 'Lempira (Lenca ruler)', a: { h: 'none', b: 's', hc: '#1b1b1b', sk: 2, rc: '#c62828' } },
  { id: 'hn_morazan', name: 'フランシスコ・モラサン', country: 'hn', born: 1792, died: 1842, title: '中央アメリカ連邦の大統領', desc: 'テグシガルパに生まれ、1830年から中央アメリカ連邦の大統領として自由主義的な改革を進めた。連邦の解体後も統一をめざしたが、1842年にコスタリカで処刑された。', img: 'Francisco Morazán', a: { h: 'bicorne', hc: '#3e2723', sk: 0, rc: '#1a237e' } },

  // ---- 東ティモール ----
  { id: 'tl_xanana', name: 'シャナナ・グスマン', country: 'tl', born: 1946, died: null, life: '1946年〜', title: '独立運動の指導者・初代大統領', desc: 'インドネシアの占領に対するゲリラ闘争を率い、1992年に逮捕されたのちも獄中から抵抗を続けた。2002年の独立で初代大統領となり、のちに首相も務めた。', img: 'Xanana Gusmão', a: { h: 'none', b: 's', hc: '#9e9e9e', sk: 2, rc: '#2e7d32' } },
  { id: 'tl_ramoshorta', name: 'ジョゼ・ラモス＝ホルタ', country: 'tl', born: 1949, died: null, life: '1949年〜', title: '独立運動の外交官・大統領', desc: 'インドネシア侵攻の直前に国外に出て、20年以上にわたり国連などで東ティモールの独立を訴えた。1996年にノーベル平和賞を受け、独立後は首相や大統領を務めた。', img: 'José Ramos-Horta', a: { h: 'none', b: 's', hc: '#bdbdbd', sk: 1, rc: '#37474f' } },
];
