// 追加の人物（中東・アフリカ・南欧：イラン・イラク・トルコ・サウジアラビア・エジプト・エチオピア・マリ・南アフリカ・ジンバブエ・ギリシャ・イタリア）
export default [
  // ---- イラン ----
  { id: 'ir_mithridates1', name: 'ミトラダテス1世', country: 'ir', born: -195, died: -132, life: '紀元前195年ごろ〜紀元前132年', title: 'パルティアの王', desc: 'メディアやメソポタミアを征服し、パルティアを大国に発展させた。セレウコス朝の都セレウキアも手に入れた。', img: 'Mithridates I of Parthia', a: { h: 'crown', b: 'l', hc: '#1b1b1b', sk: 1, rc: '#6a1b9a' } },
  { id: 'ir_shapur1', name: 'シャープール1世', country: 'ir', born: 215, died: 270, life: '215年ごろ〜270年', title: 'ササン朝ペルシアの王', desc: 'ササン朝第2代の王。260年のエデッサの戦いでローマ皇帝ウァレリアヌスを捕虜にし、その勝利を岩山の浮き彫りに刻ませた。', img: 'Shapur I', a: { h: 'crown', b: 'l', hc: '#1b1b1b', sk: 1, rc: '#c62828' } },
  { id: 'ir_ferdowsi', name: 'フェルドウスィー', country: 'ir', born: 940, died: 1020, life: '940年ごろ〜1020年ごろ', title: 'ペルシアの国民的詩人', desc: 'イラン東部のトゥースに生まれ、約30年をかけて叙事詩『シャー・ナーメ（王書）』を完成させた。ペルシア語の復興に大きな役割を果たした。', quote: '私は詩によって、ペルシアをよみがえらせた', img: 'Ferdowsi', a: { h: 'turban', b: 'l', hc: '#e0e0e0', sk: 1, rc: '#00695c' } },
  { id: 'ir_mossadegh', name: 'モハンマド・モサッデグ', country: 'ir', born: 1882, died: 1967, title: 'イランの首相', desc: '1951年に首相となり、イギリス系企業が支配していた石油産業を国有化した。1953年のクーデターで失脚し、晩年を軟禁されて過ごした。', img: 'Mohammad Mosaddegh', a: { h: 'none', hc: '#9e9e9e', sk: 1, rc: '#424242' } },

  // ---- イラク ----
  { id: 'iq_sargon', name: 'サルゴン（アッカドの王）', country: 'iq', born: null, died: -2279, life: '紀元前24〜23世紀ごろ', title: 'アッカド王国の建国者', desc: 'シュメールの都市国家を征服してメソポタミアを統一し、世界最初の帝国を築いたとされる。赤ん坊のとき川に流されたという伝説がある。', img: 'Sargon of Akkad', a: { h: 'crown', b: 'l', hc: '#1b1b1b', sk: 1, rc: '#8d6e63' } },
  { id: 'iq_ashurbanipal', name: 'アッシュルバニパル', country: 'iq', born: -685, died: -631, life: '紀元前685年ごろ〜紀元前631年ごろ', title: 'アッシリア帝国の王', desc: '都ニネヴェに大図書館を建て、各地の粘土板文書を集めさせた。王みずから楔形文字を読み書きできたと誇った。', img: 'Ashurbanipal', a: { h: 'crown', b: 'l', hc: '#1b1b1b', sk: 1, rc: '#1565c0' } },
  { id: 'iq_saddam', name: 'サダム・フセイン', country: 'iq', born: 1937, died: 2006, title: 'イラクの大統領', desc: '1979年に大統領となり独裁体制を築いた。イラン・イラク戦争やクウェート侵攻を起こし、2003年のイラク戦争で政権を失って、のちに処刑された。', img: 'Saddam Hussein', a: { h: 'none', hc: '#1b1b1b', sk: 1, rc: '#556b2f' } },

  // ---- トルコ ----
  { id: 'tr_alparslan', name: 'アルプ・アルスラン', country: 'tr', born: 1029, died: 1072, title: 'セルジューク朝のスルタン', desc: '1071年のマンジケルトの戦いでビザンツ帝国軍を破り、皇帝ロマノス4世を捕虜にした。トルコ人のアナトリア進出の道を開いた。', img: 'Alp Arslan', a: { h: 'turban', b: 'l', hc: '#1b1b1b', sk: 1, rc: '#1565c0' } },
  { id: 'tr_midhat', name: 'ミドハト・パシャ', country: 'tr', born: 1822, died: 1884, title: 'オスマン帝国の大宰相', desc: '1876年、アジア初の近代憲法とされるオスマン帝国憲法（ミドハト憲法）を起草した。のちに失脚して追放され、アラビアで亡くなった。', img: 'Midhat Pasha', a: { h: 'cap', b: 'm', hc: '#9e9e9e', sk: 0, rc: '#212121' } },
  { id: 'de_schliemann', name: 'ハインリヒ・シュリーマン', country: 'de', born: 1822, died: 1890, title: 'ドイツの実業家・考古学者', desc: '少年時代に読んだトロイア戦争の物語を史実と信じ、商売で財産を築いたのちトロイア遺跡を発掘した。1865年には幕末の日本も訪れた。', img: 'Heinrich Schliemann', a: { h: 'none', b: 's', hc: '#757575', sk: 0, rc: '#3e2723' } },

  // ---- サウジアラビア ----
  { id: 'sa_sharifhussein', name: 'フサイン・イブン・アリー', country: 'sa', born: 1854, died: 1931, title: 'メッカの太守・ヒジャーズ王', desc: '1916年、イギリスの支援を受けてオスマン帝国に対するアラブの反乱を起こした。のちにイブン・サウードに敗れたが、子たちはイラクとヨルダンの王となった。', img: 'Hussein bin Ali, King of Hejaz', a: { h: 'turban', b: 'l', hc: '#e0e0e0', sk: 1, rc: '#2e7d32' } },
  { id: 'sa_fahd', name: 'ファハド国王', country: 'sa', born: 1921, died: 2005, title: 'サウジアラビア第5代国王', desc: 'イブン・サウードの息子。1982年に即位し、「二聖モスクの守護者」の称号を用いた。湾岸戦争では多国籍軍の駐留を受け入れた。', img: 'King Fahd of Saudi Arabia', a: { h: 'turban', b: 's', hc: '#1b1b1b', sk: 1, rc: '#fafafa' } },

  // ---- エジプト ----
  { id: 'eg_mentuhotep2', name: 'メンチュヘテプ2世', country: 'eg', born: null, died: -2010, life: '紀元前21世紀ごろ', title: '中王国を開いたファラオ', desc: 'テーベを拠点に、分裂していたエジプトを再統一して中王国時代を開いた。デイル・エル・バハリに葬祭殿を築いた。', img: 'Mentuhotep II', a: { h: 'pharaoh', b: 'n', hc: '#1b1b1b', sk: 3, rc: '#f5f5f5' } },
  { id: 'eg_hatshepsut', name: 'ハトシェプスト', country: 'eg', born: -1507, died: -1458, life: '紀元前1507年ごろ〜紀元前1458年', title: '新王国の女性ファラオ', desc: '甥トトメス3世の摂政から、みずからファラオとなった。プントへの交易遠征を行い、デイル・エル・バハリに壮麗な葬祭殿を建てた。', img: 'Hatshepsut', a: { h: 'pharaoh', f: 1, b: 'n', hc: '#1b1b1b', sk: 2, rc: '#f5f5f5' } },
  { id: 'eg_akhenaten', name: 'アクエンアテン（アメンホテプ4世）', country: 'eg', born: null, died: -1336, life: '?〜紀元前1336年ごろ', title: '宗教改革を行ったファラオ', desc: '太陽神アテンだけを崇拝する改革を行い、新都アケトアテン（アマルナ）を築いた。写実的なアマルナ美術を生んだ。', img: 'Akhenaten', a: { h: 'pharaoh', hc: '#1b1b1b', sk: 2, rc: '#fbc02d' } },
  { id: 'eg_nefertiti', name: 'ネフェルティティ', country: 'eg', born: -1370, died: -1330, life: '紀元前14世紀', title: 'アクエンアテンの王妃', desc: '名前は「美しい者が来た」という意味。夫とともにアテン信仰を進めた。ベルリンにある彩色の胸像は古代エジプト美術の傑作とされる。', img: 'Nefertiti', a: { h: 'pharaoh', f: 1, hc: '#1b1b1b', sk: 2, rc: '#0277bd' } },
  { id: 'eg_muhammadali', name: 'ムハンマド・アリー', country: 'eg', born: 1769, died: 1849, title: 'エジプト総督・近代化の父', desc: 'オスマン帝国の軍人から1805年にエジプト総督となった。軍隊や産業の近代化を進め、その子孫は1952年までエジプトの王家として続いた。', img: 'Muhammad Ali of Egypt', a: { h: 'turban', b: 'l', hc: '#e0e0e0', sk: 0, rc: '#b71c1c' } },

  // ---- エチオピア ----
  { id: 'et_yekunoamlak', name: 'イクノ・アムラク', country: 'et', born: null, died: 1285, life: '?〜1285年', title: 'ソロモン朝の創始者', desc: '1270年にザグウェ朝を倒して即位した。ソロモン王とシバの女王の子孫を名乗り、その王家は1974年まで続いた。', img: 'Yekuno Amlak', a: { h: 'crown', b: 'm', hc: '#1b1b1b', sk: 3, rc: '#c62828' } },
  { id: 'et_fasilides', name: 'ファシラダス帝', country: 'et', born: 1603, died: 1667, title: 'ゴンダールを築いたエチオピア皇帝', desc: '1632年に即位してエチオピア正教会の信仰を回復した。ゴンダールを都とし、石造りの城を建てた。', img: 'Fasilides', a: { h: 'crown', b: 'm', hc: '#1b1b1b', sk: 3, rc: '#1565c0' } },
  { id: 'et_mengistu', name: 'メンギスツ・ハイレ・マリアム', country: 'et', born: 1937, died: null, life: '1937年〜', title: 'エチオピアの軍事政権の指導者', desc: '1974年の革命後に実権を握り、社会主義体制を築いた。反対派への弾圧で多くの犠牲を出し、1991年にジンバブエへ亡命した。', img: 'Mengistu Haile Mariam', a: { h: 'kepi', hc: '#1b1b1b', sk: 3, rc: '#556b2f' } },

  // ---- マリ ----
  { id: 'ml_sundiata', name: 'スンジャタ・ケイタ', country: 'ml', born: 1217, died: 1255, life: '1217年ごろ〜1255年ごろ', title: 'マリ帝国の建国者', desc: '「マリの獅子」と呼ばれる英雄。キリナの戦いでソソ王国を破ってマリ帝国を建てた。その生涯は語り部グリオによって語り継がれている。', img: 'Sundiata Keita', a: { h: 'crown', b: 's', hc: '#1b1b1b', sk: 3, rc: '#ef6c00' } },
  { id: 'ml_askia', name: 'アスキア・ムハンマド', country: 'ml', born: 1443, died: 1538, life: '1443年ごろ〜1538年', title: 'ソンガイ帝国の王', desc: '1493年に王位につき、ソンガイ帝国の最盛期を築いた。メッカに巡礼し、イスラームにもとづく行政を整えた。', img: 'Askia Mohammad I', a: { h: 'turban', b: 'm', hc: '#1b1b1b', sk: 3, rc: '#1565c0' } },

  // ---- 南アフリカ ----
  { id: 'za_pretorius', name: 'アンドリース・プレトリウス', country: 'za', born: 1798, died: 1853, title: 'フォールトレッカーの指導者', desc: 'グレート・トレックに加わり、1838年のブラッド・リバーの戦いでズールー王国の軍を破った。首都プレトリアの名は彼にちなむ。', img: 'Andries Pretorius', a: { h: 'none', b: 'l', hc: '#5d4037', sk: 0, rc: '#3e2723' } },
  { id: 'za_biko', name: 'スティーヴ・ビコ', country: 'za', born: 1946, died: 1977, title: '黒人意識運動の指導者', desc: '黒人が誇りと自信を取り戻すことを訴える「黒人意識運動」を指導した。1977年、警察に拘束されたまま死亡し、世界に衝撃を与えた。', img: 'Steve Biko', a: { h: 'none', hc: '#1b1b1b', sk: 3, rc: '#37474f' } },
  { id: 'za_tutu', name: 'デズモンド・ツツ', country: 'za', born: 1931, died: 2021, title: '南アフリカ聖公会の大主教', desc: 'アパルトヘイトに非暴力で抵抗し、1984年にノーベル平和賞を受けた。南アフリカを「虹の国」と呼び、真実和解委員会の委員長も務めた。', quote: '私たちは虹の国の民だ', img: 'Desmond Tutu', a: { h: 'none', g: 1, hc: '#9e9e9e', sk: 3, rc: '#6a1b9a' } },

  // ---- ジンバブエ ----
  { id: 'zw_nehanda', name: 'ムブヤ・ネハンダ', country: 'zw', born: 1840, died: 1898, life: '1840年ごろ〜1898年', title: 'ショナ人の霊媒師・抵抗の指導者', desc: '1896年の第一次チムレンガで人々を励まし、イギリス南アフリカ会社への抵抗を指導した。捕らえられて処刑され、独立運動の象徴となった。', quote: '私の骨はよみがえる', img: 'Mbuya Nehanda', a: { h: 'none', f: 1, hc: '#1b1b1b', sk: 3, rc: '#5d4037' } },
  { id: 'zw_mugabe', name: 'ロバート・ムガベ', country: 'zw', born: 1924, died: 2019, title: 'ジンバブエの首相・大統領', desc: '独立闘争を指導し、1980年に初代首相となった。のちに大統領として37年にわたり権力を握ったが、経済の崩壊を招き、2017年に辞任した。', img: 'Robert Mugabe', a: { h: 'none', g: 1, hc: '#424242', sk: 3, rc: '#212121' } },

  // ---- ギリシャ ----
  { id: 'gr_homer', name: 'ホメロス', country: 'gr', born: null, died: null, life: '紀元前8世紀ごろ', title: '古代ギリシアの詩人', desc: '叙事詩『イリアス』『オデュッセイア』の作者とされる。盲目の吟遊詩人だったと伝えられるが、実在したかどうかには議論がある。', img: 'Homer', a: { h: 'none', b: 'l', hc: '#e0e0e0', sk: 0, rc: '#f5f5f5' } },
  { id: 'gr_thucydides', name: 'トゥキディデス', country: 'gr', born: -460, died: -400, life: '紀元前460年ごろ〜紀元前400年ごろ', title: '古代ギリシアの歴史家', desc: 'アテネの将軍としてペロポネソス戦争に加わり、のちに追放された。戦争を冷静・客観的に分析した『歴史』を著した。', img: 'Thucydides', a: { h: 'none', b: 'l', hc: '#757575', sk: 0, rc: '#eceff1' } },
  { id: 'gr_polybius', name: 'ポリュビオス', country: 'gr', born: -200, died: -118, life: '紀元前200年ごろ〜紀元前118年ごろ', title: 'ギリシア人の歴史家', desc: '人質としてローマに送られ、スキピオ家と親しくなった。カルタゴの滅亡を目撃し、ローマが地中海の覇者となる過程を『歴史』に記した。', img: 'Polybius', a: { h: 'none', b: 'm', hc: '#757575', sk: 0, rc: '#8d6e63' } },

  // ---- イタリア ----
  { id: 'it_gregory7', name: 'グレゴリウス7世', country: 'it', born: 1015, died: 1085, life: '1015年ごろ〜1085年', title: 'ローマ教皇', desc: '教会の改革を進め、聖職者の任命権（叙任権）をめぐってドイツ王ハインリヒ4世と争った。1077年のカノッサの屈辱で知られる。', img: 'Pope Gregory VII', a: { h: 'tiara', hc: '#9e9e9e', sk: 0, rc: '#fafafa' } },
  { id: 'it_dante', name: 'ダンテ・アリギエーリ', country: 'it', born: 1265, died: 1321, title: 'フィレンツェの詩人', desc: '故郷を追放されたのち、長編詩『神曲』を書いた。トスカーナ地方の言葉で書いたことから「イタリア語の父」と呼ばれる。', quote: 'この門をくぐる者は、一切の希望を捨てよ', img: 'Dante Alighieri', a: { h: 'laurel', hc: '#3e2723', sk: 0, rc: '#c62828' } },
  { id: 'it_brunelleschi', name: 'フィリッポ・ブルネレスキ', country: 'it', born: 1377, died: 1446, title: 'ルネサンスの建築家', desc: 'もとは金細工師。フィレンツェ大聖堂の巨大なドームを、足場を使わない独創的な工法で完成させた。線遠近法の原理も発見した。', img: 'Filippo Brunelleschi', a: { h: 'cap', hc: '#757575', sk: 0, rc: '#5d4037' } },
];
