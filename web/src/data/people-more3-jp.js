// 追加の人物（日本・韓国・朝鮮・モンゴル：時代の空白を埋める人物）
export default [
  // ---- 日本 ----
  { id: 'jp_tenmu', name: '天武天皇（大海人皇子）', country: 'jp', born: null, died: 686, life: '?〜686年', title: '壬申の乱に勝利した天皇', desc: '天智天皇の弟。672年の壬申の乱で甥の大友皇子に勝って即位し、天皇の権威を高めて律令国家づくりを進めた。歴史書の編さんも命じた。', img: 'Emperor Tenmu', a: { h: 'kanmuri', b: 'm', hc: '#1b1b1b', sk: 1, rc: '#6a1b9a' } },
  { id: 'jp_shirakawa', name: '白河上皇（白河天皇）', country: 'jp', born: 1053, died: 1129, title: '院政を始めた上皇', desc: '1086年に位をゆずったあとも、上皇として40年以上政治の実権を握った。思いどおりにならないものとして「賀茂川の水、双六の賽、山法師」をあげたと伝えられる。', quote: '賀茂川の水、双六の賽、山法師、是ぞわが心にかなはぬもの', img: 'Emperor Shirakawa', a: { h: 'kanmuri', b: 'm', hc: '#1b1b1b', sk: 1, rc: '#4a148c' } },
  { id: 'jp_gotoba', name: '後鳥羽上皇', country: 'jp', born: 1180, died: 1239, title: '承久の乱を起こした上皇', desc: '和歌にすぐれ、『新古今和歌集』の編さんを命じた。朝廷の力を取り戻そうと1221年に挙兵したが敗れ、隠岐に流されてその地で亡くなった。', img: 'Emperor Go-Toba', a: { h: 'kanmuri', b: 's', hc: '#1b1b1b', sk: 1, rc: '#1a237e' } },
  { id: 'jp_godaigo', name: '後醍醐天皇', country: 'jp', born: 1288, died: 1339, title: '建武の新政を行った天皇', desc: '鎌倉幕府を倒して天皇中心の建武の新政を始めたが、武士の不満から足利尊氏と対立した。吉野にのがれて南朝を開いた。', img: 'Emperor Go-Daigo', a: { h: 'kanmuri', b: 'l', hc: '#1b1b1b', sk: 1, rc: '#b71c1c' } },
  { id: 'jp_oshio', name: '大塩平八郎', country: 'jp', born: 1793, died: 1837, title: '陽明学者・元大阪町奉行所与力', desc: '大阪町奉行所の与力として不正を正し、退職後は私塾・洗心洞で陽明学を教えた。天保のききんで蔵書を売って人々を救い、1837年に挙兵した。', img: 'Ōshio Heihachirō', a: { h: 'chonmage', hc: '#2d2d2d', sk: 1, rc: '#37474f' } },
  { id: 'jp_mutsu', name: '陸奥宗光', country: 'jp', born: 1844, died: 1897, title: '明治時代の外務大臣', desc: '紀州藩出身で、若いころは坂本龍馬の海援隊に加わった。外務大臣として1894年に領事裁判権の撤廃を実現し、日清戦争の講和にもあたった。「カミソリ大臣」と呼ばれた。', img: 'Mutsu Munemitsu', a: { h: 'none', hc: '#1b1b1b', sk: 1, rc: '#212121' } },
  { id: 'jp_hara', name: '原敬', country: 'jp', born: 1856, died: 1921, title: '「平民宰相」と呼ばれた首相', desc: '岩手県盛岡の出身。爵位を持たない衆議院議員として1918年に初の本格的な政党内閣を組織し、「平民宰相」と親しまれた。1921年に東京駅で暗殺された。', img: 'Hara Takashi', a: { h: 'none', b: 's', hc: '#9e9e9e', sk: 1, rc: '#212121' } },
  { id: 'jp_satoeisaku', name: '佐藤栄作', country: 'jp', born: 1901, died: 1975, title: '沖縄返還を実現した首相', desc: '1964年から約7年8か月首相を務め、日韓基本条約の締結や沖縄返還を実現した。非核三原則を掲げ、1974年にノーベル平和賞を受賞した。', img: 'Eisaku Satō', a: { h: 'none', hc: '#2d2d2d', sk: 1, rc: '#263238' } },

  // ---- 韓国・朝鮮 ----
  { id: 'kr_gwanggaeto', name: '広開土王（好太王）', country: 'kr', born: 374, died: 412, title: '高句麗の最盛期を築いた王', desc: '391年に即位し、北の満州から朝鮮半島中部まで領土を大きく広げた。その功績は子の長寿王が建てた広開土王碑に刻まれている。', img: 'Gwanggaeto the Great', a: { h: 'crown', b: 'm', hc: '#1b1b1b', sk: 1, rc: '#b71c1c' } },
  { id: 'kr_gojong', name: '高宗（朝鮮）', country: 'kr', born: 1852, died: 1919, title: '朝鮮王朝の国王・大韓帝国の初代皇帝', desc: '12歳で即位し、はじめは父の興宣大院君が政治を行った。1897年に国号を大韓帝国と改めて皇帝となったが、1907年に日本の圧力で退位させられた。', img: 'Gojong of Korea', a: { h: 'crown', b: 's', hc: '#1b1b1b', sk: 1, rc: '#c62828' } },
  { id: 'kr_jeonbongjun', name: '全琫準', country: 'kr', born: 1855, died: 1895, title: '甲午農民戦争の指導者', desc: '東学の地方指導者として、1894年に全羅道の農民を率いて立ち上がった。小柄だったことから「緑豆将軍」と呼ばれ、捕らえられて処刑された。', img: 'Jeon Bong-jun', a: { h: 'none', b: 's', hc: '#1b1b1b', sk: 1, rc: '#eeeeee' } },
  { id: 'kr_parkchunghee', name: '朴正煕', country: 'kr', born: 1917, died: 1979, title: '大韓民国の大統領', desc: '1961年の軍事クーデターで実権を握り、1963年から大統領として経済開発を強力に進めた。独裁的な政治は批判も受け、1979年に側近に暗殺された。', img: 'Park Chung Hee', a: { h: 'none', hc: '#1b1b1b', sk: 1, rc: '#263238' } },

  // ---- モンゴル ----
  { id: 'mn_bumin', name: 'ブミン可汗（土門）', country: 'mn', born: null, died: 552, life: '?〜552年', title: '突厥の建国者', desc: '柔然に従っていたトルコ系の突厥を率いて独立し、552年に柔然を破って可汗（君主）を名のった。突厥大帝国の基礎を築いた。', img: 'Bumin Qaghan', a: { h: 'mongol', b: 'm', hc: '#1b1b1b', sk: 1, rc: '#5d4037' } },
  { id: 'mn_toghontemur', name: 'トゴン・テムル（順帝）', country: 'mn', born: 1320, died: 1370, title: '元の最後の皇帝', desc: '元の第11代皇帝。紅巾の乱などで国が乱れるなか、1368年に明軍に大都を追われ、モンゴル高原にのがれた。', img: 'Toghon Temür', a: { h: 'mongol', b: 's', hc: '#1b1b1b', sk: 1, rc: '#f9a825' } },
  { id: 'mn_altankhan', name: 'アルタン・ハン', country: 'mn', born: 1507, died: 1582, title: 'トゥメト部の君主', desc: '南モンゴルを中心に勢力を広げ、明と争ったのち和議を結んだ。チベット仏教の高僧に「ダライ・ラマ」の称号を贈り、モンゴルに仏教を広めた。', img: 'Altan Khan', a: { h: 'mongol', b: 'l', hc: '#1b1b1b', sk: 1, rc: '#1565c0' } },
  { id: 'mn_galdan', name: 'ガルダン', country: 'mn', born: 1644, died: 1697, title: 'ジュンガルの君主', desc: '西モンゴルのジュンガル部の君主。チベットで仏教を学んだのち帰国して勢力を広げ、北モンゴルのハルハに侵攻したが、康熙帝に敗れた。', img: 'Galdan Boshugtu Khan', a: { h: 'mongol', b: 'm', hc: '#1b1b1b', sk: 1, rc: '#6a1b9a' } },
];
