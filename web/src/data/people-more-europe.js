// 追加の人物（ヨーロッパ：スイス・ハンガリー・チェコ・スウェーデン・アイルランド・フィンランド・ベルギー・デンマーク）
export default [
  // ---- スイス ----
  { id: 'tell', name: 'ウィリアム・テル（ヴィルヘルム・テル）', country: 'ch', born: null, died: null, life: '14世紀初め（伝説）', title: 'スイス建国伝説の英雄', desc: 'ハプスブルク家の代官に命じられ、息子の頭の上のりんごを弓で射抜いたと伝えられる伝説の英雄。シラーの戯曲やロッシーニの歌劇で世界に知られた。', img: 'William Tell', a: { h: 'cap', b: 'l', hc: '#6d4c41', sk: 0, rc: '#558b2f' } },
  { id: 'calvin', name: 'ジャン・カルヴァン', country: 'ch', born: 1509, died: 1564, title: 'ジュネーヴの宗教改革者', desc: 'フランス出身で、ジュネーヴで宗教改革を指導し「予定説」を説いた。勤勉と節約を重んじる教えはヨーロッパの商工業者に広まった。', img: 'John Calvin', a: { h: 'cap', b: 'l', hc: '#4e342e', sk: 0, rc: '#212121' } },
  { id: 'dunant', name: 'アンリ・デュナン', country: 'ch', born: 1828, died: 1910, title: '赤十字の創設者', desc: 'ソルフェリーノの戦いの悲惨さを見て、敵味方なく負傷者を救う赤十字を提唱した。1901年に第1回ノーベル平和賞を受賞した。', img: 'Henry Dunant', a: { h: 'none', b: 'l', hc: '#e0e0e0', sk: 0, rc: '#37474f' } },
  { id: 'einstein', name: 'アルベルト・アインシュタイン', country: 'ch', born: 1879, died: 1955, title: '相対性理論の物理学者', desc: 'ドイツ生まれでスイス国籍を取り、ベルンの特許局に勤めながら1905年に特殊相対性理論などを発表した。1921年にノーベル物理学賞を受賞した。', quote: '想像力は知識よりも大切だ', img: 'Albert Einstein', a: { h: 'none', b: 'm', hc: '#dcdcdc', sk: 0, rc: '#5d4037' } },

  // ---- ハンガリー ----
  { id: 'istvan', name: 'イシュトヴァーン1世', country: 'hu', born: 975, died: 1038, life: '975年ごろ〜1038年', title: 'ハンガリー王国の初代国王', desc: '1000年にローマ教皇から王冠を授かり、マジャル人の国をキリスト教の王国に変えた。死後に聖人とされ、建国の父として敬われている。', img: 'Stephen I of Hungary', a: { h: 'crown', b: 'l', hc: '#8d6e63', sk: 0, rc: '#1565c0' } },
  { id: 'kossuth', name: 'コシュート・ラヨシュ', country: 'hu', born: 1802, died: 1894, title: '1848年革命の指導者', desc: 'ハプスブルク家からの独立をめざす1848年革命を率い、独立を宣言した。革命が鎮圧されると亡命し、生涯祖国に戻らなかった。', img: 'Lajos Kossuth', a: { h: 'none', b: 'l', hc: '#4e342e', sk: 0, rc: '#212121' } },
  { id: 'deak', name: 'デアーク・フェレンツ', country: 'hu', born: 1803, died: 1876, title: '「祖国の賢人」と呼ばれた政治家', desc: '武力ではなく交渉でハンガリーの権利を取り戻そうとし、1867年のオーストリアとの「妥協（アウスグライヒ）」を実現した。', img: 'Ferenc Deák', a: { h: 'none', b: 's', hc: '#9e9e9e', sk: 0, rc: '#3e2723' } },
  { id: 'nagyimre', name: 'ナジ・イムレ', country: 'hu', born: 1896, died: 1958, title: '1956年ハンガリー動乱の首相', desc: '1956年の民衆蜂起のなかで首相となり、ワルシャワ条約機構からの脱退と中立を宣言した。ソ連軍に鎮圧され、1958年に処刑された。', img: 'Imre Nagy', a: { h: 'none', b: 'm', g: 1, hc: '#9e9e9e', sk: 0, rc: '#455a64' } },

  // ---- チェコ ----
  { id: 'charles4', name: 'カール4世（カレル1世）', country: 'cz', born: 1316, died: 1378, title: 'ボヘミア王・神聖ローマ皇帝', desc: 'プラハを神聖ローマ帝国の都として発展させ、プラハ大学やカレル橋をつくった。皇帝選挙のきまりを定めた「金印勅書」を出した。', img: 'Charles IV, Holy Roman Emperor', a: { h: 'crown', b: 'l', hc: '#6d4c41', sk: 0, rc: '#b71c1c' } },
  { id: 'hus', name: 'ヤン・フス', country: 'cz', born: 1370, died: 1415, life: '1370年ごろ〜1415年', title: 'ボヘミアの宗教改革者', desc: 'プラハ大学の学長として教会の腐敗を批判し、チェコ語で説教した。コンスタンツ公会議で異端とされて火刑となり、フス戦争が起こった。', img: 'Jan Hus', a: { h: 'cap', b: 'l', hc: '#4e342e', sk: 0, rc: '#212121' } },
  { id: 'dvorak', name: 'アントニン・ドヴォルザーク', country: 'cz', born: 1841, died: 1904, title: 'チェコ国民楽派の作曲家', desc: 'ボヘミアの民族音楽を生かした作品で知られる。アメリカ滞在中に交響曲第9番『新世界より』を作曲した。', img: 'Antonín Dvořák', a: { h: 'none', b: 'l', hc: '#424242', sk: 0, rc: '#263238' } },
  { id: 'masaryk', name: 'トマーシュ・マサリク', country: 'cz', born: 1850, died: 1937, title: 'チェコスロヴァキア初代大統領', desc: '哲学者で、第一次世界大戦中に亡命先から独立運動を率いた。1918年から17年間大統領を務め、民主主義を守った「建国の父」。', img: 'Tomáš Garrigue Masaryk', a: { h: 'none', b: 'm', g: 1, hc: '#e0e0e0', sk: 0, rc: '#37474f' } },
  { id: 'havel', name: 'ヴァーツラフ・ハヴェル', country: 'cz', born: 1936, died: 2011, title: '劇作家・大統領', desc: '共産党政権を批判する劇作家として何度も投獄された。1989年のビロード革命で大統領となり、チェコ共和国の初代大統領も務めた。', quote: '真実と愛は、うそと憎しみに打ち勝たねばならない', img: 'Václav Havel', a: { h: 'none', b: 'm', hc: '#8d6e63', sk: 0, rc: '#546e7a' } },

  // ---- スウェーデン ----
  { id: 'gustavvasa', name: 'グスタフ・ヴァーサ（グスタフ1世）', country: 'se', born: 1496, died: 1560, title: 'スウェーデン独立の父', desc: 'デンマークの支配に反乱を起こし、1523年に国王に選ばれてスウェーデンを独立させた。宗教改革を進め、王位を世襲制にした。', img: 'Gustav I of Sweden', a: { h: 'crown', b: 'l', hc: '#a1887f', sk: 0, rc: '#1a237e' } },
  { id: 'gustavus', name: 'グスタフ2世アドルフ', country: 'se', born: 1594, died: 1632, title: '「北方の獅子」と呼ばれた国王', desc: '三十年戦争にプロテスタント側で参戦し、新しい戦術で連戦連勝した。リュッツェンの戦いで戦死したが、スウェーデンを大国に押し上げた。', img: 'Gustavus Adolphus', a: { h: 'none', b: 's', hc: '#a1887f', sk: 0, rc: '#f9a825' } },
  { id: 'charles12', name: 'カール12世', country: 'se', born: 1682, died: 1718, title: '大北方戦争の国王', desc: '15歳で即位し、ナルヴァの戦いでロシア軍を破ったが、ポルタヴァの戦いでピョートル大帝に大敗した。ノルウェー遠征中に戦死した。', img: 'Charles XII of Sweden', a: { h: 'none', hc: '#8d6e63', sk: 0, rc: '#1565c0' } },
  { id: 'linnaeus', name: 'カール・フォン・リンネ', country: 'se', born: 1707, died: 1778, title: '「分類学の父」', desc: 'ウプサラ大学の博物学者で、生き物を2語のラテン語で表す二名法を広めた。弟子たちを世界中に送り、日本にもツュンベリーが訪れた。', img: 'Carl Linnaeus', a: { h: 'wig', hc: '#eeeeee', sk: 0, rc: '#5d4037' } },
  { id: 'nobel', name: 'アルフレッド・ノーベル', country: 'se', born: 1833, died: 1896, title: 'ダイナマイトの発明者', desc: 'ダイナマイトを発明して巨万の富を築いた化学者・実業家。遺言により、その財産をもとにノーベル賞がつくられた。', img: 'Alfred Nobel', a: { h: 'none', b: 'l', hc: '#5d4037', sk: 0, rc: '#212121' } },

  // ---- アイルランド ----
  { id: 'patrick', name: '聖パトリック', country: 'ie', born: null, died: null, life: '5世紀', title: 'アイルランドの守護聖人', desc: '若いころアイルランドで奴隷として働き、のちに宣教師として戻ってキリスト教を広めた。3月17日の「聖パトリックの日」に名を残す。', img: 'Saint Patrick', a: { h: 'none', b: 'l', hc: '#bdbdbd', sk: 0, rc: '#2e7d32' } },
  { id: 'pearse', name: 'パトリック・ピアース', country: 'ie', born: 1879, died: 1916, title: 'イースター蜂起の指導者', desc: '教育者・詩人で、アイルランド語の復興にも力を注いだ。1916年のイースター蜂起で共和国宣言を読み上げ、処刑された。', img: 'Patrick Pearse', a: { h: 'none', hc: '#5d4037', sk: 0, rc: '#33691e' } },
  { id: 'collins', name: 'マイケル・コリンズ', country: 'ie', born: 1890, died: 1922, title: '独立戦争の指導者', desc: '独立戦争でゲリラ戦を指揮し、1921年に英愛条約に調印してアイルランド自由国の成立を導いた。内戦中に31歳で暗殺された。', img: 'Michael Collins (Irish leader)', a: { h: 'none', hc: '#3e2723', sk: 0, rc: '#2e7d32' } },
  { id: 'hume', name: 'ジョン・ヒューム', country: 'ie', born: 1937, died: 2020, title: '北アイルランド和平の立役者', desc: '暴力を否定し、対話によって北アイルランド紛争の解決をめざした政治家。1998年の和平合意に尽力し、ノーベル平和賞を受賞した。', img: 'John Hume', a: { h: 'none', hc: '#9e9e9e', sk: 0, rc: '#37474f' } },

  // ---- フィンランド ----
  { id: 'agricola', name: 'ミカエル・アグリコラ', country: 'fi', born: 1510, died: 1557, life: '1510年ごろ〜1557年', title: 'フィンランド語の文章語の父', desc: 'ルターのもとで学んだ聖職者で、フィンランド語の入門書をつくり、新約聖書をフィンランド語に訳した。のちにトゥルクの司教となった。', img: 'Mikael Agricola', a: { h: 'cap', b: 'l', hc: '#6d4c41', sk: 0, rc: '#212121' } },
  { id: 'lonnrot', name: 'エリアス・リョンロート', country: 'fi', born: 1802, died: 1884, title: '『カレワラ』の編者', desc: '医師として働きながら各地を旅し、農民が歌い継いだ古い詩を集めた。それらをまとめた民族叙事詩『カレワラ』を1835年に出版した。', img: 'Elias Lönnrot', a: { h: 'none', hc: '#8d6e63', sk: 0, rc: '#37474f' } },
  { id: 'sibelius', name: 'ジャン・シベリウス', country: 'fi', born: 1865, died: 1957, title: 'フィンランドの国民的作曲家', desc: '『カレワラ』や北欧の自然に題材をとった作品を多く書いた。ロシア化政策の時代に作曲した『フィンランディア』は国民を勇気づけた。', img: 'Jean Sibelius', a: { h: 'bald', hc: '#bdbdbd', sk: 0, rc: '#263238' } },
  { id: 'mannerheim', name: 'カール・グスタフ・マンネルヘイム', country: 'fi', born: 1867, died: 1951, title: '冬戦争の総司令官・大統領', desc: 'ロシア帝国の軍人から独立後のフィンランド軍の指導者となった。冬戦争・継続戦争で国を守り、戦争末期に大統領を務めた。', img: 'Carl Gustaf Emil Mannerheim', a: { h: 'kepi', b: 'm', hc: '#9e9e9e', sk: 0, rc: '#546e7a' } },

  // ---- ベルギー ----
  { id: 'vaneyck', name: 'ヤン・ファン・エイク', country: 'be', born: 1390, died: 1441, life: '1390年ごろ〜1441年', title: 'フランドル絵画の巨匠', desc: '油絵の具を用いて、宝石の輝きや布の質感まで描き分ける細密な描写を実現した。「ヘントの祭壇画」「アルノルフィーニ夫妻像」で知られる。', img: 'Jan van Eyck', a: { h: 'turban', hc: '#6d4c41', sk: 0, rc: '#b71c1c' } },
  { id: 'rubens', name: 'ピーテル・パウル・ルーベンス', country: 'be', born: 1577, died: 1640, title: 'バロック絵画の巨匠', desc: 'アントウェルペンを拠点に、躍動感あふれる宗教画や肖像画を数多く描いた。外交官としてヨーロッパ各国の宮廷でも活躍した。', img: 'Peter Paul Rubens', a: { h: 'cap', b: 's', hc: '#8d6e63', sk: 0, rc: '#212121' } },
  { id: 'be_leopold2', name: 'レオポルド2世（ベルギー王）', country: 'be', born: 1835, died: 1909, title: 'ベルギー国王', desc: 'アフリカのコンゴを私有地「コンゴ自由国」とし、住民に過酷な強制労働を課した。国内ではブリュッセルの大規模な建設事業を進めた。', img: 'Leopold II of Belgium', a: { h: 'none', b: 'l', hc: '#9e9e9e', sk: 0, rc: '#1a237e' } },

  // ---- デンマーク ----
  { id: 'harald', name: 'ハーラル青歯王', country: 'dk', born: null, died: 986, life: '?〜986年ごろ', title: 'デンマークを統一した王', desc: 'デンマークを統一し、キリスト教を受け入れた王。イェリングの石碑に業績を刻み、そのあだ名は無線通信「Bluetooth」の名の由来となった。', img: 'Harald Bluetooth', a: { h: 'helmet', b: 'l', hc: '#a1887f', sk: 0, rc: '#1565c0' } },
  { id: 'margaret1', name: 'マルグレーテ1世', country: 'dk', born: 1353, died: 1412, title: 'カルマル同盟を築いた女王', desc: 'デンマーク・ノルウェー・スウェーデンの3国を一つにまとめ、1397年にカルマル同盟を成立させた。北欧史上屈指の政治家とされる。', img: 'Margaret I of Denmark', a: { h: 'crown', f: 1, hc: '#8d6e63', sk: 0, rc: '#6a1b9a' } },
  { id: 'tycho', name: 'ティコ・ブラーエ', country: 'dk', born: 1546, died: 1601, title: '肉眼観測の天文学者', desc: '望遠鏡のない時代に、ヴェン島の天文台で極めて正確な天体観測を行った。その記録は助手ケプラーの法則発見につながった。', img: 'Tycho Brahe', a: { h: 'none', b: 'm', hc: '#d84315', sk: 0, rc: '#3e2723' } },
  { id: 'andersen', name: 'ハンス・クリスチャン・アンデルセン', country: 'dk', born: 1805, died: 1875, title: '童話作家', desc: '「人魚姫」「みにくいアヒルの子」「マッチ売りの少女」など約150編の童話を書いた。作品は世界中で翻訳され読み継がれている。', quote: 'わたしの生涯は、美しいおとぎ話である', img: 'Hans Christian Andersen', a: { h: 'tophat', hc: '#6d4c41', sk: 0, rc: '#263238' } },
];
