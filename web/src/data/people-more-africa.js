// 追加人物（ヨルダン・モロッコ・チュニジア・ナイジェリア・ケニア・ガーナ）
export default [
  // ---- ヨルダン ----
  { id: 'aretas4', name: 'アレタス4世', country: 'jo', born: null, died: 40, life: '?〜40年ごろ', title: 'ナバテア王国の王', desc: '紀元前9年から約50年にわたって王国を治め、その最盛期を築いた。ペトラの宝物殿エル・ハズネは、彼の時代につくられたと考えられている。', img: 'Aretas IV Philopatris', a: { h: 'crown', b: 'm', hc: '#1b1b1b', sk: 2, rc: '#a04000' } },
  { id: 'lawrence', name: 'T・E・ロレンス（アラビアのロレンス）', country: 'gb', born: 1888, died: 1935, title: 'イギリスの考古学者・軍人', desc: 'アラブ反乱でファイサルらとともにオスマン帝国軍と戦った。その体験を『知恵の七柱』に記し、映画『アラビアのロレンス』のモデルとなった。', img: 'T. E. Lawrence', a: { h: 'turban', hc: '#c9a66b', sk: 0, rc: '#f2efe6' } },
  { id: 'abdullah1', name: 'アブドゥッラー1世', country: 'jo', born: 1882, died: 1951, title: 'ヨルダンの初代国王', desc: 'メッカの太守フサインの息子としてアラブ反乱に加わった。1921年にトランスヨルダンの首長となり、1946年の独立で国王となった。', img: 'Abdullah I of Jordan', a: { h: 'turban', b: 'm', hc: '#1b1b1b', sk: 1, rc: '#ecf0f1' } },
  { id: 'hussein1', name: 'フセイン1世', country: 'jo', born: 1935, died: 1999, title: 'ヨルダン国王', desc: '1952年に16歳で国王となり、約47年にわたってヨルダンを治めた。中東戦争などの危機を乗り越え、1994年にイスラエルと平和条約を結んだ。', img: 'Hussein of Jordan', a: { h: 'none', b: 's', hc: '#1b1b1b', sk: 1, rc: '#2c3e50' } },

  // ---- モロッコ ----
  { id: 'fatimafihri', name: 'ファーティマ・フィフリー', country: 'ma', born: 800, died: 880, life: '800年ごろ〜880年ごろ', title: 'カラウィーイーン・モスクの創設者', desc: 'ケルアンからフェズに移り住んだ裕福な商人の娘。859年に遺産でモスクを建て、それが現存する世界最古の大学の一つへと発展した。', img: 'Fatima al-Fihri', a: { h: 'none', f: 1, hc: '#1b1b1b', sk: 2, rc: '#2e86c1' } },
  { id: 'ibntashfin', name: 'ユースフ・イブン・ターシュフィーン', country: 'ma', born: 1009, died: 1106, life: '1009年ごろ〜1106年', title: 'ムラービト朝の君主', desc: 'サハラのベルベル人を率いてモロッコを統一し、マラケシュを都とした。イベリア半島に渡ってキリスト教国の軍を破り、大帝国を築いた。', img: 'Yusuf ibn Tashfin', a: { h: 'turban', b: 'l', hc: '#bdbdbd', sk: 2, rc: '#1f3a93' } },
  { id: 'ibnbattuta', name: 'イブン・バットゥータ', country: 'ma', born: 1304, died: 1369, life: '1304年〜1368年ごろ', title: '中世最大の旅行家', desc: 'タンジェ生まれのイスラーム法学者。約30年かけてメッカ・インド・中国・マリなどを旅し、その見聞を『大旅行記（リフラ）』に残した。', img: 'Ibn Battuta', a: { h: 'turban', b: 'm', hc: '#1b1b1b', sk: 1, rc: '#d4ac0d' } },
  { id: 'mohammed5', name: 'ムハンマド5世', country: 'ma', born: 1909, died: 1961, title: 'モロッコ独立の父', desc: 'スルタンとして独立運動を支え、フランスに追放されたが国民の支持で帰国した。1956年に独立を実現し、翌年から国王を名乗った。', img: 'Mohammed V of Morocco', a: { h: 'turban', b: 's', hc: '#1b1b1b', sk: 1, rc: '#ecf0f1' } },

  // ---- チュニジア ----
  { id: 'dido', name: 'ディードー（エリッサ）', country: 'tn', born: -840, died: -780, life: '紀元前9世紀ごろ（伝説上の人物）', title: 'カルタゴ建国の伝説の女王', desc: 'フェニキアの都市ティルスの王女とされる。兄に追われて北アフリカに渡り、牛の皮の計略で土地を手に入れてカルタゴを建てたと伝えられる。', img: 'Dido', a: { h: 'crown', f: 1, hc: '#3e2723', sk: 1, rc: '#6c3483' } },
  { id: 'uqba', name: 'ウクバ・イブン・ナーフィー', country: 'tn', born: 622, died: 683, title: 'ウマイヤ朝の将軍', desc: 'アラブ軍を率いて北アフリカを征服し、670年にケルアンを建設した。大西洋岸まで進軍したが、帰り道でベルベル人の軍に敗れて戦死した。', img: 'Uqba ibn Nafi', a: { h: 'turban', b: 'l', hc: '#1b1b1b', sk: 1, rc: '#7b241c' } },
  { id: 'ibnkhaldun', name: 'イブン・ハルドゥーン', country: 'tn', born: 1332, died: 1406, title: '歴史家・思想家', desc: 'チュニス生まれの学者で、『歴史序説』で王朝が興亡するしくみを論じた。社会学の祖とも呼ばれ、晩年にはティムールとも会見した。', img: 'Ibn Khaldun', a: { h: 'turban', b: 'l', hc: '#1b1b1b', sk: 1, rc: '#f2efe6' } },
  { id: 'bourguiba', name: 'ハビーブ・ブルギーバ', country: 'tn', born: 1903, died: 2000, title: 'チュニジア初代大統領', desc: 'フランスからの独立運動を率い、1957年に初代大統領となった。一夫多妻制の禁止や教育の普及など、近代化政策を進めた。', img: 'Habib Bourguiba', a: { h: 'none', hc: '#9e9e9e', sk: 1, rc: '#2c3e50' } },

  // ---- ナイジェリア ----
  { id: 'idia', name: 'イディア', country: 'ng', born: 1470, died: 1550, life: '15世紀後半〜16世紀前半', title: 'ベニン王国の太后', desc: 'オバ（王）エシギの母で、戦いで息子を助けて王国を守ったと伝えられる。彼女をかたどった象牙の仮面は、アフリカ美術の傑作として知られる。', img: 'Idia', a: { h: 'crown', f: 1, hc: '#1b1b1b', sk: 3, rc: '#c0392b' } },
  { id: 'danfodio', name: 'ウスマン・ダン・フォディオ', country: 'ng', born: 1754, died: 1817, title: 'ソコト・カリフ国の建国者', desc: 'フルベ人のイスラーム学者で、1804年に聖戦（ジハード）を起こしてハウサ諸国を倒した。西アフリカ最大の国家ソコト・カリフ国の基礎を築いた。', img: 'Usman dan Fodio', a: { h: 'turban', b: 'l', hc: '#e0e0e0', sk: 2, rc: '#f2efe6' } },
  { id: 'azikiwe', name: 'ナムディ・アジキウェ', country: 'ng', born: 1904, died: 1996, title: 'ナイジェリア初代大統領', desc: 'アメリカで学んだのち、新聞を通じて独立運動を盛り上げた。「ジク」の愛称で親しまれ、1963年に初代大統領となった。', img: 'Nnamdi Azikiwe', a: { h: 'cap', hc: '#1b1b1b', sk: 3, rc: '#1e8449' } },
  { id: 'achebe', name: 'チヌア・アチェベ', country: 'ng', born: 1930, died: 2013, title: '作家', desc: '1958年の小説『崩れゆく絆』で、植民地化によって揺らぐイボ人の社会を描いた。「アフリカ文学の父」と呼ばれ、作品は50以上の言語に翻訳されている。', img: 'Chinua Achebe', a: { h: 'none', b: 's', hc: '#9e9e9e', sk: 3, rc: '#7d6608' } },

  // ---- ケニア ----
  { id: 'leakey', name: 'リチャード・リーキー', country: 'ke', born: 1944, died: 2022, title: '古人類学者・自然保護活動家', desc: '考古学者の両親のもとケニアで生まれ、トゥルカナ湖周辺で多くの人類化石を発見した。のちにケニア野生生物公社の長官として、ゾウの密猟対策に力を尽くした。', img: 'Richard Leakey', a: { h: 'none', hc: '#bdbdbd', sk: 0, rc: '#a0522d' } },
  { id: 'kimathi', name: 'デダン・キマチ', country: 'ke', born: 1920, died: 1957, title: 'マウマウ闘争の指導者', desc: 'ケニア山の森を拠点に、イギリスの植民地支配に対する武装闘争を率いた。1956年に捕らえられて処刑されたが、独立の英雄としてナイロビに銅像が立っている。', img: 'Dedan Kimathi', a: { h: 'none', b: 'm', hc: '#1b1b1b', sk: 3, rc: '#6e5a3a' } },
  { id: 'kenyatta', name: 'ジョモ・ケニヤッタ', country: 'ke', born: 1897, died: 1978, life: '1897年ごろ〜1978年', title: 'ケニア初代大統領', desc: 'キクユ人の出身で、イギリス留学を経て独立運動の指導者となった。投獄を乗り越えて1964年に初代大統領となり、「ハランベー」を合言葉に国づくりを進めた。', img: 'Jomo Kenyatta', a: { h: 'none', b: 's', hc: '#9e9e9e', sk: 3, rc: '#5d4037' } },
  { id: 'maathai', name: 'ワンガリ・マータイ', country: 'ke', born: 1940, died: 2011, title: '環境保護活動家', desc: '1977年に「グリーンベルト運動」を始め、女性たちとともに数千万本の木を植えた。2004年、アフリカの女性として初めてノーベル平和賞を受賞した。', img: 'Wangari Maathai', a: { h: 'none', f: 1, hc: '#1b1b1b', sk: 3, rc: '#e67e22' } },

  // ---- ガーナ ----
  { id: 'oseitutu', name: 'オセイ・トゥトゥ', country: 'gh', born: 1660, died: 1717, life: '1660年ごろ〜1717年ごろ', title: 'アシャンティ王国の初代王', desc: 'アシャンティの首長たちをまとめ、黄金の床几を王国の統一の象徴とした。クマシを都とし、王国を西アフリカの強国に育てた。', img: 'Osei Kofi Tutu I', a: { h: 'crown', b: 's', hc: '#1b1b1b', sk: 3, rc: '#f1c40f' } },
  { id: 'yaaasantewaa', name: 'ヤア・アサンテワ', country: 'gh', born: 1840, died: 1921, life: '1840年ごろ〜1921年', title: 'エジスの太后', desc: '1900年、イギリスが黄金の床几を要求したことに怒り、アシャンティの人々を率いて立ち上がった。捕らえられてセーシェル諸島に流され、その地で亡くなった。', img: 'Yaa Asantewaa', a: { h: 'none', f: 1, hc: '#1b1b1b', sk: 3, rc: '#b9770e' } },
  { id: 'noguchi', name: '野口英世', country: 'jp', born: 1876, died: 1928, title: '細菌学者', desc: '福島県の農家に生まれ、幼いころの大やけどを乗り越えて医師となった。アメリカで梅毒や黄熱病の研究に取り組み、アフリカで黄熱病の研究中に亡くなった。', img: 'Hideyo Noguchi', a: { h: 'none', b: 'm', hc: '#1b1b1b', sk: 1, rc: '#2c3e50' } },
  { id: 'nkrumah', name: 'クワメ・ンクルマ', country: 'gh', born: 1909, died: 1972, title: 'ガーナ初代大統領', desc: 'アメリカとイギリスで学び、ゴールドコーストの独立運動を率いた。1957年にガーナを独立に導き、アフリカの団結を訴える「パン・アフリカ主義」の旗手となった。', img: 'Kwame Nkrumah', a: { h: 'none', hc: '#1b1b1b', sk: 3, rc: '#16a085' } },
  { id: 'annan', name: 'コフィー・アナン', country: 'gh', born: 1938, died: 2018, title: '第7代国連事務総長', desc: 'ガーナのクマシ生まれ。1997年からの10年間、国連事務総長として平和と開発に尽くし、2001年にノーベル平和賞を受賞した。', img: 'Kofi Annan', a: { h: 'none', b: 's', hc: '#e0e0e0', sk: 3, rc: '#2c3e50' } },
];
