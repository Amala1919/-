// 追加人物（ヨーロッパ4：エストニア・ラトビア・スロバキア・スロベニア・ボスニア・ヘルツェゴビナ・アルバニア・ベラルーシ・キプロス・マルタ）
export default [
  // ---- エストニア ----
  { id: 'ee_kreutzwald', name: 'フリードリヒ・ラインホルト・クロイツヴァルト', country: 'ee', born: 1803, died: 1882, title: '医師・民族叙事詩の編者', desc: '農奴の家に生まれ、医師として働きながらエストニアの民話や歌を集めた。それらをもとに民族叙事詩『カレヴィポエグ』をまとめ、「エストニア文学の父」と呼ばれる。', img: 'Friedrich Reinhold Kreutzwald', a: { h: 'none', b: 'l', hc: '#9e9e9e', sk: 0, rc: '#37474f' } },
  { id: 'ee_pats', name: 'コンスタンティン・パッツ', country: 'ee', born: 1874, died: 1956, title: 'エストニア独立の指導者', desc: '1918年の独立時に臨時政府を率い、のちに国家元首・大統領を務めた。1940年のソ連占領で連行され、ロシアの精神病院で亡くなった。', img: 'Konstantin Päts', a: { h: 'none', b: 's', hc: '#bdbdbd', sk: 0, rc: '#263238' } },
  { id: 'ee_meri', name: 'レンナルト・メリ', country: 'ee', born: 1929, died: 2006, title: 'エストニア大統領・作家', desc: '少年時代にシベリアへ追放された経験をもつ作家・映画監督。独立回復後の1992年から2001年まで大統領を務め、EU・NATO加盟への道を開いた。', img: 'Lennart Meri', a: { h: 'none', hc: '#e0e0e0', sk: 0, rc: '#1a237e' } },

  // ---- ラトビア ----
  { id: 'lv_albert', name: 'リガのアルベルト', country: 'lv', born: 1165, died: 1229, life: '1165年ごろ〜1229年', title: 'リガの司教', desc: 'ドイツ出身の聖職者で、1201年にリガの町を築き、帯剣騎士団をつくった。バルト海沿岸の人々への十字軍を進め、リヴォニアの基礎を築いた。', img: 'Albert of Riga', a: { h: 'cap', hc: '#6d4c41', sk: 0, rc: '#ecf0f1' } },
  { id: 'lv_jacob', name: 'ヤーコプ・ケトラー（ヤーコプ公）', country: 'lv', born: 1610, died: 1682, title: 'クールラント公', desc: '造船や製鉄などの産業を育て、小さなクールラント公国を豊かにした。西アフリカのガンビア川の島やカリブ海のトバゴ島に植民地を築いた。', img: 'Jacob Kettler', a: { h: 'wig', b: 's', hc: '#5d4037', sk: 0, rc: '#8e2430' } },
  { id: 'lv_ulmanis', name: 'カールリス・ウルマニス', country: 'lv', born: 1877, died: 1942, title: 'ラトビアの首相・大統領', desc: '1918年の独立とともに首相となり、独立戦争を指導した。1934年に権力を握って大統領も兼ねたが、1940年のソ連占領で連行され、獄中で亡くなった。', img: 'Kārlis Ulmanis', a: { h: 'none', hc: '#8d6e63', sk: 0, rc: '#424242' } },

  // ---- スロバキア ----
  { id: 'sk_svatopluk', name: 'スヴァトプルク1世', country: 'sk', born: 840, died: 894, life: '840年ごろ〜894年', title: '大モラヴィア国の君主', desc: '870年ごろに権力を握り、大モラヴィア国をボヘミアやパンノニアにまで広げて最盛期を築いた。スロバキアでは民族の英雄として像が建てられている。', img: 'Svatopluk I', a: { h: 'crown', b: 'l', hc: '#5d4037', sk: 0, rc: '#7b1fa2' } },
  { id: 'sk_stur', name: 'リュドヴィート・シュトゥール', country: 'sk', born: 1815, died: 1856, title: 'スロバキア民族運動の指導者', desc: '言語学者・詩人・政治家として、1843年にスロバキア語の書き言葉を定めた。1848年の革命ではスロバキア人の権利を求めて立ち上がった。', img: 'Ľudovít Štúr', a: { h: 'none', hc: '#3e2723', sk: 0, rc: '#212121' } },
  { id: 'sk_dubcek', name: 'アレクサンデル・ドゥプチェク', country: 'sk', born: 1921, died: 1992, title: 'チェコスロバキア共産党第一書記', desc: '1968年に「人間の顔をした社会主義」を掲げて「プラハの春」の改革を進めたが、ソ連などの軍事介入で失脚した。1989年の民主化後に連邦議会議長として復帰した。', img: 'Alexander Dubček', a: { h: 'none', hc: '#4e342e', sk: 0, rc: '#37474f' } },

  // ---- スロベニア ----
  { id: 'si_trubar', name: 'プリモジュ・トルバル', country: 'si', born: 1508, died: 1586, title: '宗教改革者・スロベニア語の父', desc: 'ルターの教えに共鳴したプロテスタントの司祭。1550年に最初のスロベニア語の本を出版し、スロベニア語の書き言葉の基礎を築いた。', img: 'Primož Trubar', a: { h: 'cap', b: 'l', hc: '#5d4037', sk: 0, rc: '#212121' } },
  { id: 'si_kucan', name: 'ミラン・クーチャン', country: 'si', born: 1941, died: null, title: 'スロベニアの初代大統領', desc: 'スロベニア共産主義者同盟の指導者として民主化を進めた。1991年の独立を導き、独立後の最初の大統領として2002年まで務めた。', img: 'Milan Kučan', a: { h: 'none', hc: '#9e9e9e', sk: 0, rc: '#263238' } },

  // ---- ボスニア・ヘルツェゴビナ ----
  { id: 'ba_tvrtko', name: 'トヴルトコ1世', country: 'ba', born: 1338, died: 1391, life: '1338年ごろ〜1391年', title: '初代ボスニア王', desc: '1377年にボスニア王として戴冠し、領土をアドリア海沿岸まで広げた。中世ボスニア王国の最盛期を築いた君主とされる。', img: 'Tvrtko I of Bosnia', a: { h: 'crown', b: 'm', hc: '#4e342e', sk: 0, rc: '#1565c0' } },
  { id: 'ba_andric', name: 'イヴォ・アンドリッチ', country: 'ba', born: 1892, died: 1975, title: '作家・ノーベル文学賞受賞者', desc: 'ボスニアに生まれ、オスマン時代から続くこの地の歴史を小説に描いた。代表作『ドリナの橋』などにより、1961年にノーベル文学賞を受賞した。', img: 'Ivo Andrić', a: { h: 'none', hc: '#bdbdbd', sk: 0, rc: '#424242' } },
  { id: 'ba_izetbegovic', name: 'アリヤ・イゼトベゴヴィッチ', country: 'ba', born: 1925, died: 2003, title: 'ボスニア・ヘルツェゴビナ大統領評議会議長', desc: '1990年に大統領評議会の議長となり、1992年の独立と紛争の時代に国を率いた。1995年のデイトン合意に署名した。', img: 'Alija Izetbegović', a: { h: 'none', hc: '#e0e0e0', sk: 0, rc: '#37474f' } },

  // ---- アルバニア ----
  { id: 'al_teuta', name: 'テウタ', country: 'al', born: null, died: null, life: '紀元前3世紀後半', title: 'イリュリアの女王', desc: '夫アグロン王の死後、紀元前231年ごろからイリュリア王国を治めた。アドリア海の海賊行為をめぐってローマと戦い、敗れて領土の一部を失った。', img: 'Teuta', a: { h: 'tiara', f: 1, hc: '#3e2723', sk: 0, rc: '#8e2430' } },
  { id: 'al_skanderbeg', name: 'スカンデルベグ（ゲルギ・カストリオティ）', country: 'al', born: 1405, died: 1468, title: 'アルバニアの民族的英雄', desc: '若くしてオスマン帝国の宮廷で育ち軍人となったが、1443年に故郷へ戻って反旗をひるがえした。25年間にわたってオスマン帝国の大軍を退け続けた。', img: 'Skanderbeg', a: { h: 'helmet', b: 'l', hc: '#9e9e9e', sk: 0, rc: '#b71c1c' } },
  { id: 'al_hoxha', name: 'エンヴェル・ホッジャ', country: 'al', born: 1908, died: 1985, title: 'アルバニア労働党第一書記', desc: '1944年から亡くなるまで約40年間アルバニアを支配した。ソ連や中国とも決別して国を孤立させ、宗教を禁止し、国中にトーチカを造らせた。', img: 'Enver Hoxha', a: { h: 'none', hc: '#616161', sk: 0, rc: '#455a64' } },

  // ---- ベラルーシ ----
  { id: 'by_euphrosyne', name: 'ポロツクのエウフロシニヤ', country: 'by', born: 1104, died: 1167, life: '1104年ごろ〜1167年', title: '修道女・ベラルーシの守護聖人', desc: 'ポロツク公家に生まれ、修道女となって修道院や学校を開き、本を写して学問を広めた。巡礼先のエルサレムで亡くなり、のちに聖人とされた。', img: 'Euphrosyne of Polotsk', a: { h: 'hime', f: 1, hc: '#5d4037', sk: 0, rc: '#4a148c' } },
  { id: 'by_skaryna', name: 'フランツィスク・スカリナ', country: 'by', born: 1490, died: 1551, life: '1490年ごろ〜1551年ごろ', title: '印刷者・人文学者', desc: 'ポロツクに生まれ、パドヴァ大学で医学博士となった。1517年にプラハで聖書をルーシ語に訳して印刷し、東スラヴの印刷文化の先駆けとなった。', img: 'Francysk Skaryna', a: { h: 'cap', hc: '#4e342e', sk: 0, rc: '#880e4f' } },
  { id: 'by_shushkevich', name: 'スタニスラウ・シュシケヴィチ', country: 'by', born: 1934, died: 2022, title: '独立ベラルーシ最初の国家元首', desc: '物理学者から政治家となり、1991年に最高会議議長に就いた。同年12月、ロシア・ウクライナの首脳とともにソ連の消滅を決めたベロヴェーシ合意に署名した。', img: 'Stanislav Shushkevich', a: { h: 'none', hc: '#bdbdbd', sk: 0, rc: '#37474f' } },

  // ---- キプロス ----
  { id: 'cy_richard1', name: 'リチャード1世（獅子心王）', country: 'gb', born: 1157, died: 1199, title: 'イングランド王・十字軍の英雄', desc: '第3回十字軍でサラディンと戦い、その途中の1191年にキプロスを征服した。勇猛さから「獅子心王」と呼ばれたが、在位中イングランドにいたのは半年ほどだった。', img: 'Richard I of England', a: { h: 'crown', b: 'm', hc: '#d4a017', sk: 0, rc: '#c62828' } },
  { id: 'cy_caterina', name: 'カテリーナ・コルナーロ', country: 'it', born: 1454, died: 1510, title: 'キプロス最後の女王', desc: 'ヴェネツィアの貴族の娘で、キプロス王に嫁いだ。夫と幼い息子の死後に女王となったが、1489年に島をヴェネツィアにゆずった。', img: 'Caterina Cornaro', a: { h: 'tiara', f: 1, hc: '#d4a017', sk: 0, rc: '#6a1b9a' } },
  { id: 'cy_makarios', name: 'マカリオス3世', country: 'cy', born: 1913, died: 1977, title: 'キプロス初代大統領・大主教', desc: 'キプロス正教会の大主教として、イギリスからの独立運動を率いた。1960年の独立で初代大統領となり、亡くなるまで務めた。', img: 'Makarios III', a: { h: 'cap', b: 'l', hc: '#9e9e9e', sk: 1, rc: '#212121' } },

  // ---- マルタ ----
  { id: 'mt_paul', name: '使徒パウロ', country: 'tr', born: 5, died: 64, life: '5年ごろ〜64年ごろ', title: 'キリスト教の伝道者', desc: '小アジアのタルソス出身のユダヤ人で、回心したのち地中海各地にキリスト教を伝えた。ローマへ護送される途中、マルタで難破したと伝えられる。', img: 'Paul the Apostle', a: { h: 'bald', b: 'l', hc: '#5d4037', sk: 1, rc: '#795548' } },
  { id: 'mt_valette', name: 'ジャン・ド・ヴァレット', country: 'fr', born: 1495, died: 1568, title: '聖ヨハネ騎士団総長', desc: '南フランス出身の騎士で、1557年に騎士団の総長となった。1565年のマルタ大包囲戦でオスマン帝国の大軍を退け、首都バレッタにその名を残す。', img: 'Jean Parisot de Valette', a: { h: 'morion', b: 'l', hc: '#e0e0e0', sk: 0, rc: '#c62828' } },
  { id: 'mt_borgolivier', name: 'ジョージ・ボルグ・オリヴィエ', country: 'mt', born: 1911, died: 1980, title: 'マルタの首相', desc: '国民党を率いて首相となり、イギリスとの交渉を重ねて1964年にマルタを独立に導いた。観光業の振興など経済の多角化にも取り組んだ。', img: 'George Borg Olivier', a: { h: 'none', hc: '#3e2723', sk: 0, rc: '#263238' } },
];
