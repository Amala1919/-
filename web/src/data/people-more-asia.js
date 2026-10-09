// 追加の人物（アジア：ウズベキスタン・フィリピン・ミャンマー・スリランカ・ネパール・マレーシア）
export default [
  // ---- ウズベキスタン ----
  { id: 'alkhwarizmi', name: 'フワーリズミー', country: 'uz', born: 780, died: 850, life: '780年ごろ〜850年ごろ', title: '数学者・天文学者', desc: 'ホラズム地方の出身で、アッバース朝のバグダードで活躍した。代数学の基礎を築き、「アルゴリズム」の語源となった。', img: 'Al-Khwarizmi', a: { h: 'turban', b: 'l', hc: '#1b1b1b', sk: 1, rc: '#1565c0' } },
  { id: 'ibnsina', name: 'イブン・シーナー（アヴィケンナ）', country: 'uz', born: 980, died: 1037, title: '医学者・哲学者', desc: 'ブハラ近郊に生まれ、若くして医学と哲学をきわめた。著書『医学典範』は、ヨーロッパでも17世紀ごろまで医学の教科書として使われた。', img: 'Avicenna', a: { h: 'turban', b: 'l', hc: '#2d2d2d', sk: 1, rc: '#6a1b9a' } },
  { id: 'ulughbeg', name: 'ウルグ・ベク', country: 'uz', born: 1394, died: 1449, title: 'ティムール朝の君主・天文学者', desc: 'ティムールの孫。サマルカンドに天文台を建て、精密な星表をつくった。学問を愛したが、息子の反乱によって命を落とした。', img: 'Ulugh Beg', a: { h: 'turban', b: 's', hc: '#1b1b1b', sk: 1, rc: '#00838f' } },

  // ---- フィリピン ----
  { id: 'lapulapu', name: 'ラプラプ', country: 'ph', born: 1491, died: null, life: '1491年ごろ〜?', title: 'マクタン島の首長', desc: '1521年、マクタン島の戦いでマゼランの軍を破った。ヨーロッパの侵略を退けたフィリピン最初の英雄とされる。', img: 'Lapu-Lapu Shrine', a: { h: 'none', b: 's', hc: '#1b1b1b', sk: 2, rc: '#b71c1c' } },
  { id: 'rizal', name: 'ホセ・リサール', country: 'ph', born: 1861, died: 1896, title: 'フィリピンの国民的英雄', desc: '医師・作家として活躍し、小説『ノリ・メ・タンヘレ』でスペイン支配の不正を訴えた。革命への関与を疑われて処刑された。', img: 'José Rizal', a: { h: 'none', b: 'm', hc: '#1b1b1b', sk: 1, rc: '#212121' } },
  { id: 'aguinaldo', name: 'エミリオ・アギナルド', country: 'ph', born: 1869, died: 1964, title: 'フィリピン第一共和国の大統領', desc: 'フィリピン革命を指導し、1898年に独立を宣言した。その後はアメリカと戦ったが、捕らえられた。', img: 'Emilio Aguinaldo', a: { h: 'none', hc: '#1b1b1b', sk: 1, rc: '#37474f' } },
  { id: 'coryaquino', name: 'コラソン・アキノ', country: 'ph', born: 1933, died: 2009, title: 'フィリピン第11代大統領', desc: '暗殺された野党指導者ベニグノ・アキノの妻。1986年のピープルパワー革命でマルコス政権を倒し、アジア初の女性大統領となった。', img: 'Corazon Aquino', a: { h: 'none', f: 1, hc: '#2d2d2d', sk: 1, rc: '#f9a825' } },

  // ---- ミャンマー ----
  { id: 'anawrahta', name: 'アノーヤター王', country: 'mm', born: 1014, died: 1077, title: 'バガン朝の建国者', desc: 'ビルマを初めて統一し、上座部仏教を国の宗教とした。都バガンに多くの仏塔を建て始めた。', img: 'Anawrahta', a: { h: 'crown', b: 'm', hc: '#1b1b1b', sk: 2, rc: '#c62828' } },
  { id: 'alaungpaya', name: 'アラウンパヤー王', country: 'mm', born: 1714, died: 1760, title: 'コンバウン朝の建国者', desc: '村の長から身を起こし、わずか数年でビルマを再統一した。港町を「ヤンゴン（戦いの終わり）」と名づけた。', img: 'Alaungpaya', a: { h: 'crown', b: 's', hc: '#1b1b1b', sk: 2, rc: '#ef6c00' } },
  { id: 'aungsan', name: 'アウンサン', country: 'mm', born: 1915, died: 1947, title: 'ビルマ建国の父', desc: '日本の支援で独立軍を率いたが、のちに抗日に転じた。イギリスから独立の約束を勝ち取ったが、独立直前に暗殺された。', img: 'Aung San', a: { h: 'kepi', hc: '#1b1b1b', sk: 1, rc: '#556b2f' } },
  { id: 'suukyi', name: 'アウンサンスーチー', country: 'mm', born: 1945, died: null, life: '1945年〜', title: 'ミャンマー民主化運動の指導者', desc: 'アウンサンの娘。軍政に非暴力で抵抗して長く自宅軟禁され、1991年にノーベル平和賞を受賞した。', img: 'Aung San Suu Kyi', a: { h: 'updo', f: 1, hc: '#1b1b1b', sk: 1, rc: '#ad1457' } },

  // ---- スリランカ ----
  { id: 'mahinda', name: 'マヒンダ', country: 'lk', born: -285, died: -205, life: '紀元前3世紀ごろ', title: 'スリランカに仏教を伝えた僧', desc: 'インドのアショーカ王の子とされる。スリランカに渡ってデーヴァーナンピヤ・ティッサ王を仏教に導いた。', img: 'Mahinda (Buddhist monk)', a: { h: 'bald', hc: '#1b1b1b', sk: 2, rc: '#e65100' } },
  { id: 'kashyapa', name: 'カーシャパ1世', country: 'lk', born: null, died: 495, life: '?〜495年', title: 'シーギリヤを築いた王', desc: '父王を殺して王位につき、岩山シーギリヤの頂上に宮殿を築いた。弟との戦いに敗れて命を落とした。', img: 'Kashyapa I of Anuradhapura', a: { h: 'crown', b: 'm', hc: '#1b1b1b', sk: 2, rc: '#6d4c41' } },
  { id: 'parakramabahu', name: 'パラークラマバーフ1世', country: 'lk', born: 1123, died: 1186, title: 'ポロンナルワ朝の大王', desc: '島を統一し、大貯水池を築いて農業を発展させた。仏教を保護し、都ポロンナルワを壮麗に整えた。', quote: '一滴の雨水も、人の役に立てずに海へ流してはならない', img: 'Parakramabahu I', a: { h: 'crown', b: 'm', hc: '#1b1b1b', sk: 2, rc: '#f9a825' } },
  { id: 'jayewardene', name: 'J・R・ジャヤワルダナ', country: 'lk', born: 1906, died: 1996, title: 'スリランカの政治家・大統領', desc: '1951年のサンフランシスコ講和会議でブッダの言葉を引き、日本への賠償請求を放棄すると演説した。のちに大統領となった。', quote: '憎しみは憎しみによってやまず、愛によってやむ', img: 'J. R. Jayewardene', a: { h: 'none', g: 1, hc: '#e0e0e0', sk: 2, rc: '#fafafa' } },
  { id: 'sirimavo', name: 'シリマヴォ・バンダラナイケ', country: 'lk', born: 1916, died: 2000, title: '世界初の女性首相', desc: '暗殺された夫のあとを継ぎ、1960年に世界で初めて女性の首相となった。3度にわたって首相を務めた。', img: 'Sirimavo Bandaranaike', a: { h: 'updo', f: 1, hc: '#2d2d2d', sk: 2, rc: '#fafafa' } },

  // ---- ネパール ----
  { id: 'araniko', name: 'アニコ（アラニコ）', country: 'np', born: 1245, died: 1306, title: 'ネパールの工芸家・建築家', desc: '若くしてチベットに招かれ、その才能をフビライ・ハンに認められて元に仕えた。北京の妙応寺白塔をつくった。', img: 'Araniko', a: { h: 'cap', hc: '#1b1b1b', sk: 1, rc: '#8d6e63' } },
  { id: 'prithvinarayan', name: 'プリトビ・ナラヤン・シャハ', country: 'np', born: 1723, died: 1775, title: 'ネパールを統一したゴルカの王', desc: '山国ゴルカの王として周辺の国々を征服し、1768年にカトマンズを奪ってネパール王国を築いた。', quote: 'この国は二つの岩にはさまれたヤムイモのようだ', img: 'Prithvi Narayan Shah', a: { h: 'crown', b: 'm', hc: '#1b1b1b', sk: 2, rc: '#c62828' } },
  { id: 'jungbahadur', name: 'ジャン・バハドゥル・ラナ', country: 'np', born: 1817, died: 1877, title: 'ラナ家独裁を開いた首相', desc: '1846年のコート事件で実権を握り、首相の地位をラナ家の世襲とした。1850年にはイギリスを訪問した。', img: 'Jung Bahadur Rana', a: { h: 'crown', b: 'm', hc: '#1b1b1b', sk: 1, rc: '#1a237e' } },
  { id: 'tenzing', name: 'テンジン・ノルゲイ', country: 'np', born: 1914, died: 1986, title: 'エベレスト初登頂のシェルパ', desc: '1953年、エドモンド・ヒラリーとともに世界最高峰エベレストに初めて登頂した。シェルパの名を世界に広めた。', img: 'Tenzing Norgay', a: { h: 'cap', hc: '#1b1b1b', sk: 2, rc: '#d84315' } },

  // ---- マレーシア ----
  { id: 'parameswara', name: 'パラメスワラ', country: 'my', born: 1344, died: 1414, life: '1344年ごろ〜1414年ごろ', title: 'マラッカ王国の建国者', desc: 'スマトラ島出身の王子。マラッカに港市国家を開き、明に朝貢して鄭和の艦隊を迎えた。', img: 'Parameswara (king)', a: { h: 'crown', b: 'm', hc: '#1b1b1b', sk: 2, rc: '#f9a825' } },
  { id: 'albuquerque', name: 'アフォンソ・デ・アルブケルケ', country: 'pt', born: 1453, died: 1515, title: 'ポルトガルのインド総督', desc: 'インドのゴア、マレー半島のマラッカ、ペルシア湾のホルムズを次々と占領し、ポルトガルのアジア海上帝国を築いた。', img: 'Afonso de Albuquerque', a: { h: 'cap', b: 'l', hc: '#9e9e9e', sk: 0, rc: '#212121' } },
  { id: 'tunku', name: 'トゥンク・アブドゥル・ラーマン', country: 'my', born: 1903, died: 1990, title: 'マレーシア建国の父・初代首相', desc: 'ケダ州のスルタンの王子。1957年にマラヤ連邦の独立を宣言し、1963年にマレーシアを発足させた。', quote: 'ムルデカ（独立）！', img: 'Tunku Abdul Rahman', a: { h: 'cap', hc: '#1b1b1b', sk: 1, rc: '#1b5e20' } },
  { id: 'mahathir', name: 'マハティール・モハマド', country: 'my', born: 1925, died: null, life: '1925年〜', title: 'マレーシアの首相', desc: '1981年から22年間首相を務め、日本に学ぶ「ルックイースト政策」で工業化を進めた。2018年、92歳で首相に返り咲いた。', img: 'Mahathir Mohamad', a: { h: 'none', g: 1, hc: '#e0e0e0', sk: 1, rc: '#263238' } },
];
