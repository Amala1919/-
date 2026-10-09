// 追加の人物（アジア3：中国・インド・ベトナム・タイ・カンボジア・インドネシアの深掘り）
export default [
  // ---- 中国 ----
  { id: 'cn_wuwang', name: '武王（周）', country: 'cn', born: null, died: -1043, life: '?〜前1043年ごろ', title: '周王朝の創始者', desc: '父・文王の志を継ぎ、軍師の太公望（呂尚）らの助けを得て、牧野の戦いで殷を滅ぼした。弟の周公旦とともに周の支配の基礎を築いた。', img: 'King Wu of Zhou', a: { h: 'mianguan', b: 'l', hc: '#1b1b1b', sk: 1, rc: '#6d4c41' } },
  { id: 'cn_xiaowendi', name: '孝文帝（北魏）', country: 'cn', born: 467, died: 499, title: '北魏の皇帝', desc: '鮮卑族の出身。都を平城から洛陽にうつし、鮮卑の服装や言葉を改めて漢民族の文化を取り入れる政策を進めた。洛陽の近くでは竜門石窟の造営が始まった。', img: 'Emperor Xiaowen of Northern Wei', a: { h: 'mianguan', b: 's', hc: '#1b1b1b', sk: 1, rc: '#283593' } },
  { id: 'cn_yangdi', name: '煬帝（隋）', country: 'cn', born: 569, died: 618, title: '隋の第2代皇帝', desc: '大運河を完成させ、3度にわたって高句麗に遠征した。重い負担から反乱が相次ぎ、最後は家臣に殺された。聖徳太子の国書を受け取った皇帝として日本でも知られる。', img: 'Emperor Yang of Sui', a: { h: 'mianguan', b: 'm', hc: '#1b1b1b', sk: 1, rc: '#b71c1c' } },
  { id: 'cn_xuanzong', name: '玄宗（唐）', country: 'cn', born: 685, died: 762, title: '唐の皇帝', desc: '前半は「開元の治」と呼ばれる安定した政治を行い、唐の最盛期を築いた。晩年は楊貴妃を寵愛して政治が乱れ、安史の乱を招いた。日本の阿倍仲麻呂も玄宗に仕えた。', img: 'Emperor Xuanzong of Tang', a: { h: 'mianguan', b: 'm', hc: '#1b1b1b', sk: 1, rc: '#f9a825' } },
  { id: 'cn_yangguifei', name: '楊貴妃', country: 'cn', born: 719, died: 756, title: '唐の玄宗の妃', desc: '中国史上屈指の美女といわれる。玄宗の寵愛を受け、一族も高い地位についた。安史の乱で都を逃れる途中、兵士たちの要求により命を絶たれた。', img: 'Yang Guifei', a: { h: 'updo', f: 1, hc: '#1b1b1b', sk: 0, rc: '#d81b60' } },
  { id: 'cn_zhuxi', name: '朱熹（朱子）', country: 'cn', born: 1130, died: 1200, title: '南宋の儒学者', desc: '宋の儒学を集大成して朱子学を打ち立てた。『論語』などの四書に注釈をつけ、その解釈は元・明・清の科挙の基準となった。日本の江戸幕府でも重んじられた。', img: 'Zhu Xi', a: { h: 'futou', b: 'l', hc: '#9e9e9e', sk: 1, rc: '#455a64' } },
  { id: 'cn_hongxiuquan', name: '洪秀全', country: 'cn', born: 1814, died: 1864, title: '太平天国の指導者', desc: '科挙に何度も落第したのち、キリスト教の小冊子に影響を受け、自らをキリストの弟と称した。太平天国を建てて南京を都としたが、清軍に包囲される中で亡くなった。', img: 'Hong Xiuquan', a: { h: 'crown', b: 'm', hc: '#1b1b1b', sk: 1, rc: '#f9a825' } },
  { id: 'cn_lihongzhang', name: '李鴻章', country: 'cn', born: 1823, died: 1901, title: '清の政治家', desc: '太平天国の鎮圧で頭角をあらわし、洋務運動を進めて近代的な海軍（北洋艦隊）を育てた。日清戦争後には下関条約に調印し、外交の最前線に立ち続けた。', img: 'Li Hongzhang', a: { h: 'cap', b: 'm', hc: '#e0e0e0', sk: 1, rc: '#1565c0' } },
  { id: 'cn_luxun', name: '魯迅', country: 'cn', born: 1881, died: 1936, title: '中国の作家', desc: '日本に留学して仙台医学専門学校で学んだが、人々の精神を変えるには文学が必要だと考えて作家となった。『狂人日記』『阿Q正伝』などで中国近代文学の礎を築いた。', quote: 'もともと地上には道はない。歩く人が多くなれば、それが道になるのだ', img: 'Lu Xun', a: { h: 'none', b: 's', hc: '#1b1b1b', sk: 1, rc: '#424242' } },
  { id: 'cn_zhouenlai', name: '周恩来', country: 'cn', born: 1898, died: 1976, title: '中華人民共和国の初代首相', desc: '日本やフランスに留学し、共産党の指導者となった。1949年から亡くなるまで首相を務め、1972年には田中角栄首相と日中共同声明に調印した。文化大革命の混乱の中でも国の運営を支えた。', img: 'Zhou Enlai', a: { h: 'none', hc: '#1b1b1b', sk: 1, rc: '#37474f' } },
  { id: 'cn_dengxiaoping', name: '鄧小平', country: 'cn', born: 1904, died: 1997, title: '中国の最高指導者', desc: '文化大革命などで2度失脚したがそのたびに復活し、1978年から改革開放政策を進めて中国の経済発展の道を開いた。1978年に来日し、新幹線にも乗車した。', quote: '白い猫でも黒い猫でも、ネズミを捕るのがよい猫だ', img: 'Deng Xiaoping', a: { h: 'none', hc: '#1b1b1b', sk: 1, rc: '#455a64' } },

  // ---- インド ----
  { id: 'in_rajaraja', name: 'ラージャラージャ1世', country: 'in', born: 947, died: 1014, life: '947年ごろ〜1014年', title: 'チョーラ朝の王', desc: '南インドとスリランカ北部を征服し、チョーラ朝を南インド最強の王朝にした。都タンジャーヴールにブリハディーシュヴァラ寺院を建てた。', img: 'Rajaraja I', a: { h: 'crown', b: 'm', hc: '#1b1b1b', sk: 2, rc: '#f9a825' } },
  { id: 'in_aibak', name: 'アイバク', country: 'in', born: null, died: 1210, life: '?〜1210年', title: '奴隷王朝の創始者', desc: 'トルコ系の奴隷出身で、ゴール朝の将軍としてデリーを征服した。1206年に独立して奴隷王朝を開き、クトゥブ・ミナールの建設を始めた。ポロの試合中の落馬がもとで亡くなった。', img: 'Qutb ud-Din Aibak', a: { h: 'turban', b: 'l', hc: '#1b1b1b', sk: 1, rc: '#2e7d32' } },
  { id: 'in_clive', name: 'ロバート・クライヴ', country: 'gb', born: 1725, died: 1774, title: 'イギリス東インド会社の軍人', desc: '東インド会社の書記から軍人に転じ、プラッシーの戦いで勝利してベンガル支配の基礎を築いた。ベンガル知事を務めたが、のちに本国で不正な蓄財を追及された。', img: 'Robert Clive', a: { h: 'wig', hc: '#e0e0e0', sk: 0, rc: '#c62828' } },
  { id: 'in_tilak', name: 'バール・ガンガーダル・ティラク', country: 'in', born: 1856, died: 1920, title: 'インド独立運動の指導者', desc: 'インド国民会議の急進派を率い、ベンガル分割令に反対してスワデーシ・スワラージ運動を進めた。インドの民衆に自治の大切さを訴え続けた。', quote: 'スワラージ（自治）は私の生まれながらの権利であり、私はそれを手に入れる', img: 'Bal Gangadhar Tilak', a: { h: 'turban', b: 's', hc: '#1b1b1b', sk: 2, rc: '#f5f5f5' } },
  { id: 'in_manmohan', name: 'マンモハン・シン', country: 'in', born: 1932, died: 2024, title: 'インドの経済学者・首相', desc: '1991年に財務大臣として経済自由化を進め、インドの高度成長の道を開いた。2004年から10年間首相を務めた。シク教徒として初めての首相である。', img: 'Manmohan Singh', a: { h: 'turban', b: 'l', g: 1, hc: '#e0e0e0', sk: 2, rc: '#90caf9' } },

  // ---- ベトナム ----
  { id: 'vn_leloi', name: 'レ・ロイ（黎利）', country: 'vn', born: 1385, died: 1433, title: '黎朝の創始者', desc: 'タインホアの豪族で、1418年に明の支配に対して兵を挙げた。10年の戦いの末に明軍を撤退させ、1428年に黎朝を開いた。ベトナムの民族的英雄。', img: 'Lê Lợi', a: { h: 'crown', b: 'm', hc: '#1b1b1b', sk: 1, rc: '#f9a825' } },
  { id: 'vn_nguyenhue', name: 'グエン・フエ（光中帝）', country: 'vn', born: 1753, died: 1792, title: 'タイソン朝の皇帝', desc: 'タイソンの反乱を率いた三兄弟の一人。1789年、ハノイ近郊で清の大軍を奇襲で破った。改革に取り組んだが、30代の若さで急死した。', img: 'Quang Trung', a: { h: 'crown', b: 's', hc: '#1b1b1b', sk: 1, rc: '#c62828' } },

  // ---- タイ ----
  { id: 'th_naresuan', name: 'ナレースワン大王', country: 'th', born: 1555, died: 1605, title: 'アユタヤ王朝の王', desc: '少年時代をビルマで人質として過ごした。1584年にビルマからの独立を宣言し、1593年には象に乗った一騎打ちに勝利したと伝えられる。タイの国民的英雄。', img: 'Naresuan', a: { h: 'crown', hc: '#1b1b1b', sk: 1, rc: '#f9a825' } },
  { id: 'th_phibun', name: 'ピブーンソンクラーム', country: 'th', born: 1897, died: 1964, title: 'タイの首相・軍人', desc: '1932年の立憲革命に参加し、1938年に首相となった。国名をタイに改め、第二次世界大戦では日本と同盟を結んだ。戦後も再び首相を務めたが、1957年のクーデターで失脚し、日本で亡くなった。', img: 'Plaek Phibunsongkhram', a: { h: 'kepi', hc: '#1b1b1b', sk: 1, rc: '#556b2f' } },

  // ---- カンボジア ----
  { id: 'kh_zhoudaguan', name: '周達観', country: 'cn', born: 1270, died: 1350, life: '1270年ごろ〜1350年ごろ', title: '元の外交使節・著述家', desc: '元が送った使節団に加わって1296年にアンコールを訪れ、約1年間滞在した。帰国後に著した『真臘風土記』は、アンコール時代の暮らしを伝える貴重な記録である。', img: 'Zhou Daguan', a: { h: 'futou', b: 'm', hc: '#1b1b1b', sk: 1, rc: '#5d4037' } },
  { id: 'kh_sihanouk', name: 'ノロドム・シハヌーク', country: 'kh', born: 1922, died: 2012, title: 'カンボジア国王', desc: '1941年に18歳で国王に即位し、1953年にフランスからの完全独立を勝ち取った。退位後は政治の指導者として中立政策をとった。内戦と亡命を経て、1993年に再び国王となった。', img: 'Norodom Sihanouk', a: { h: 'none', hc: '#1b1b1b', sk: 1, rc: '#f5f5f5' } },

  // ---- インドネシア ----
  { id: 'id_kartini', name: 'カルティニ', country: 'id', born: 1879, died: 1904, title: 'インドネシアの女性解放運動の先駆者', desc: 'ジャワの貴族の家に生まれた。オランダ人の友人に宛てた手紙で女性の教育や植民地支配の問題を訴え、女子のための学校を開いた。25歳の若さで亡くなった。', img: 'Kartini', a: { h: 'updo', f: 1, hc: '#1b1b1b', sk: 2, rc: '#6a1b9a' } },
  { id: 'id_suharto', name: 'スハルト', country: 'id', born: 1921, died: 2008, title: 'インドネシア第2代大統領', desc: '陸軍の軍人として九・三〇事件を鎮圧して実権を握り、1968年から30年間大統領を務めた。開発独裁と呼ばれる体制で経済成長を進めたが、1998年に退陣した。', img: 'Suharto', a: { h: 'cap', hc: '#1b1b1b', sk: 2, rc: '#556b2f' } },
];
