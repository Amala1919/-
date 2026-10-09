// 家系図に登場する人物（人物図鑑にも追加される）
// a = アバター（写真がない場合の似顔絵）: h 帽子/髪型, f 女性, b ひげ, hc 髪色, sk 肌, rc 服の色
const J = (h, extra = {}) => ({ h, hc: '#1b1b1b', sk: 1, ...extra });
const E = (h, extra = {}) => ({ h, hc: '#5d4037', sk: 0, ...extra });

export const FAMILY_PEOPLE = [
  // ---- 藤原氏 ----
  { id: 'kamatari', name: '中臣鎌足（藤原鎌足）', country: 'jp', born: 614, died: 669, title: '藤原氏の祖', desc: '中大兄皇子とともに蘇我入鹿を倒し、大化の改新を進めた。亡くなる直前、天智天皇から「藤原」の姓を授かった。', img: 'Fujiwara no Kamatari', a: J('kanmuri', { b: 'm', rc: '#6d4c41' }) },
  { id: 'fuhito', name: '藤原不比等', country: 'jp', born: 659, died: 720, title: '奈良時代初期の政治家', desc: '鎌足の子。大宝律令の制定に関わり、娘を天皇家に嫁がせて藤原氏繁栄の基礎を築いた。', img: 'Fujiwara no Fuhito', a: J('kanmuri', { b: 'm', rc: '#4a148c' }) },
  { id: 'komyo', name: '光明皇后', country: 'jp', born: 701, died: 760, title: '聖武天皇の皇后', desc: '不比等の娘。皇族以外から初めて皇后となった。貧しい人や病人を救う悲田院・施薬院を設けた。', img: 'Empress Kōmyō', a: J('hime', { f: 1, rc: '#c2185b' }) },
  { id: 'yorimichi', name: '藤原頼通', country: 'jp', born: 992, died: 1074, title: '摂政・関白', desc: '道長の子。約50年にわたり摂政・関白を務め、宇治に平等院鳳凰堂を建てた。', img: 'Fujiwara no Yorimichi', a: J('kanmuri', { rc: '#283593' }) },
  { id: 'shoshi', name: '藤原彰子', country: 'jp', born: 988, died: 1074, title: '一条天皇の中宮', desc: '道長の娘。紫式部らが仕え、後一条天皇・後朱雀天皇の母となった。', img: 'Fujiwara no Shōshi', a: J('hime', { f: 1, rc: '#ad1457' }) },
  { id: 'ichijo', name: '一条天皇', country: 'jp', born: 980, died: 1011, title: '第66代天皇', desc: '中宮の定子に清少納言が、彰子に紫式部が仕え、宮廷の女性文学が花開いた時代の天皇。', img: 'Emperor Ichijō', a: J('kanmuri', { rc: '#e65100' }) },
  { id: 'goichijo', name: '後一条天皇', country: 'jp', born: 1008, died: 1036, title: '第68代天皇', desc: '一条天皇と彰子の子。9歳で即位し、祖父の道長が摂政として権力をふるった。', img: 'Emperor Go-Ichijō', a: J('kanmuri', { rc: '#f9a825' }) },

  // ---- 源氏・北条氏 ----
  { id: 'yoshitomo', name: '源義朝', country: 'jp', born: 1123, died: 1160, title: '源氏の棟梁', desc: '頼朝・義経の父。平治の乱で平清盛に敗れ、逃れる途中で討たれた。', img: 'Minamoto no Yoshitomo', a: J('eboshi', { b: 'm', rc: '#37474f' }) },
  { id: 'yoshitsune', name: '源義経', country: 'jp', born: 1159, died: 1189, title: '源平合戦の英雄', desc: '一ノ谷・屋島・壇ノ浦で平氏を破った。のちに兄頼朝と対立し、奥州平泉で自害した。', img: 'Minamoto no Yoshitsune', a: J('eboshi', { rc: '#1565c0' }) },
  { id: 'tokimasa', name: '北条時政', country: 'jp', born: 1138, died: 1215, title: '鎌倉幕府の初代執権', desc: '伊豆の豪族で、流されていた頼朝を支えた。娘の政子は頼朝の妻。', img: 'Hōjō Tokimasa', a: J('eboshi', { b: 's', rc: '#5d4037' }) },
  { id: 'masako', name: '北条政子', country: 'jp', born: 1157, died: 1225, title: '頼朝の妻・「尼将軍」', desc: '頼朝の死後に幕府を支えた。承久の乱では御家人に頼朝の御恩を説いて団結させた。', quote: '頼朝公の御恩は山よりも高く、海よりも深い（要旨）', img: 'Hōjō Masako', a: J('veil', { f: 1, rc: '#4e342e' }) },
  { id: 'yoshitoki', name: '北条義時', country: 'jp', born: 1163, died: 1224, title: '鎌倉幕府の2代執権', desc: '政子の弟。1221年の承久の乱で後鳥羽上皇の軍を破り、幕府の力を西国にも広げた。', img: 'Hōjō Yoshitoki', a: J('eboshi', { rc: '#2e7d32' }) },
  { id: 'yoriie', name: '源頼家', country: 'jp', born: 1182, died: 1204, title: '鎌倉幕府の2代将軍', desc: '頼朝と政子の長男。将軍の独断は抑えられ、有力御家人13人の合議制がしかれた。のちに伊豆の修禅寺で殺された。', img: 'Minamoto no Yoriie', a: J('eboshi', { rc: '#6a1b9a' }) },
  { id: 'sanetomo', name: '源実朝', country: 'jp', born: 1192, died: 1219, title: '鎌倉幕府の3代将軍', desc: '和歌にすぐれ『金槐和歌集』を残した。鶴岡八幡宮で甥の公暁に暗殺され、源氏の将軍は3代で絶えた。', img: 'Minamoto no Sanetomo', a: J('eboshi', { rc: '#00838f' }) },
  { id: 'kugyo', name: '公暁', country: 'jp', born: 1200, died: 1219, title: '源頼家の子', desc: '父の仇と思いこみ、叔父の将軍実朝を暗殺した。自らもその日のうちに討たれた。', img: 'Kugyō', a: J('bald', { rc: '#424242' }) },
  { id: 'yasutoki', name: '北条泰時', country: 'jp', born: 1183, died: 1242, title: '鎌倉幕府の3代執権', desc: '1232年、武士の慣習をもとにした初めての武家の法律「御成敗式目」を定めた。', img: 'Hōjō Yasutoki', a: J('eboshi', { rc: '#455a64' }) },

  // ---- 平氏 ----
  { id: 'kiyomori', name: '平清盛', country: 'jp', born: 1118, died: 1181, title: '平氏政権を築いた武将', desc: '保元・平治の乱に勝ち、武士として初めて太政大臣となった。日宋貿易を進め、厳島神社を整えた。', img: 'Taira no Kiyomori', a: J('bald', { rc: '#b71c1c' }) },
  { id: 'shigemori', name: '平重盛', country: 'jp', born: 1138, died: 1179, title: '清盛の長男', desc: '温厚な人柄で知られ、父の強引な政治をいさめたと伝えられる。父より先に亡くなった。', img: 'Taira no Shigemori', a: J('eboshi', { rc: '#c62828' }) },
  { id: 'tokuko', name: '平徳子（建礼門院）', country: 'jp', born: 1155, died: 1214, title: '高倉天皇の中宮', desc: '清盛の娘で安徳天皇の母。壇ノ浦で入水したが救われ、京都大原で余生を送った。', img: 'Taira no Tokuko', a: J('hime', { f: 1, rc: '#e91e63' }) },
  { id: 'takakura', name: '高倉天皇', country: 'jp', born: 1161, died: 1181, title: '第80代天皇', desc: '後白河法皇の子。平清盛の娘・徳子を中宮とした。', img: 'Emperor Takakura', a: J('kanmuri', { rc: '#5e35b1' }) },
  { id: 'antoku', name: '安徳天皇', country: 'jp', born: 1178, died: 1185, title: '第81代天皇', desc: '清盛の孫。3歳で即位し、壇ノ浦の戦いで祖母の二位尼に抱かれて海に沈んだ。', img: 'Emperor Antoku', a: J('kanmuri', { rc: '#ef6c00' }) },
  { id: 'goshirakawa', name: '後白河法皇', country: 'jp', born: 1127, died: 1192, title: '院政を行った上皇', desc: '平清盛や源頼朝らと渡り合い、源頼朝から「日本一の大天狗」と評された。', img: 'Emperor Go-Shirakawa', a: J('bald', { rc: '#4a148c' }) },

  // ---- 織田・豊臣・徳川 ----
  { id: 'oichi', name: 'お市の方', country: 'jp', born: 1547, died: 1583, life: '1547年ごろ〜1583年', title: '織田信長の妹', desc: '浅井長政に嫁いで三人の娘を産んだ。のちに柴田勝家と再婚し、北ノ庄城で勝家とともに自害した。', img: 'Oichi', a: J('hime', { f: 1, rc: '#ad1457' }) },
  { id: 'nagamasa', name: '浅井長政', country: 'jp', born: 1545, died: 1573, title: '近江の戦国大名', desc: '信長と同盟して妹お市を妻に迎えたが、のちに対立し、小谷城で敗れて自害した。', img: 'Azai Nagamasa', a: J('chonmage', { rc: '#1b5e20' }) },
  { id: 'yodo', name: '茶々（淀殿）', country: 'jp', born: 1569, died: 1615, life: '1569年ごろ〜1615年', title: '豊臣秀吉の側室', desc: '浅井長政とお市の長女。秀頼を産み、大坂夏の陣で秀頼とともに亡くなった。', img: 'Yodo-dono', a: J('hime', { f: 1, rc: '#6a1b9a' }) },
  { id: 'go', name: '江（崇源院）', country: 'jp', born: 1573, died: 1626, title: '徳川秀忠の正室', desc: 'お市の三女。3代将軍家光と、のちの天皇の母となる和子の母。', img: 'Oeyo', a: J('hime', { f: 1, rc: '#00695c' }) },
  { id: 'hideyori', name: '豊臣秀頼', country: 'jp', born: 1593, died: 1615, title: '豊臣秀吉の子', desc: '大坂城で徳川家康と対立し、1615年の大坂夏の陣で母の淀殿とともに自害した。', img: 'Toyotomi Hideyori', a: J('kanmuri', { rc: '#f9a825' }) },
  { id: 'senhime', name: '千姫', country: 'jp', born: 1597, died: 1666, title: '秀忠と江の娘', desc: '7歳で従兄の豊臣秀頼に嫁いだ。大坂城落城の際に救い出された。', img: 'Senhime', a: J('hime', { f: 1, rc: '#ec407a' }) },
  { id: 'hidetada', name: '徳川秀忠', country: 'jp', born: 1579, died: 1632, title: '江戸幕府の2代将軍', desc: '家康の三男。武家諸法度・禁中並公家諸法度で大名や朝廷を統制し、幕府の基礎を固めた。', img: 'Tokugawa Hidetada', a: J('eboshi', { rc: '#2e7d32' }) },
  { id: 'iemitsu', name: '徳川家光', country: 'jp', born: 1604, died: 1651, title: '江戸幕府の3代将軍', desc: '参勤交代を制度化し、「鎖国」体制を完成させた。「生まれながらの将軍」と称したと伝えられる。', img: 'Tokugawa Iemitsu', a: J('eboshi', { rc: '#1565c0' }) },

  // ---- 徳川将軍家 ----
  { id: 'ietsuna', name: '徳川家綱', country: 'jp', born: 1641, died: 1680, title: '江戸幕府の4代将軍', desc: '武力に頼る政治から、学問や礼儀を重んじる文治政治へと転換した。', img: 'Tokugawa Ietsuna', a: J('eboshi', { rc: '#3949ab' }) },
  { id: 'tsunayoshi', name: '徳川綱吉', country: 'jp', born: 1646, died: 1709, title: '江戸幕府の5代将軍', desc: '生類憐みの令で知られる。学問を奨励し、元禄文化が栄えた。', img: 'Tokugawa Tsunayoshi', a: J('eboshi', { rc: '#6d4c41' }) },
  { id: 'ienobu', name: '徳川家宣', country: 'jp', born: 1662, died: 1712, title: '江戸幕府の6代将軍', desc: '家光の孫。新井白石を登用し、生類憐みの令を廃止した。', img: 'Tokugawa Ienobu', a: J('eboshi', { rc: '#00838f' }) },
  { id: 'ietsugu', name: '徳川家継', country: 'jp', born: 1709, died: 1716, title: '江戸幕府の7代将軍', desc: 'わずか数え5歳で将軍となり、数え8歳で亡くなった。これで秀忠の血筋の将軍は途絶えた。', img: 'Tokugawa Ietsugu', a: J('chonmage', { rc: '#ffb300' }) },
  { id: 'yoshimune', name: '徳川吉宗', country: 'jp', born: 1684, died: 1751, title: '江戸幕府の8代将軍', desc: '家康のひ孫で紀州藩主から将軍となった。享保の改革を行い、目安箱の設置や洋書輸入の緩和を行った。', img: 'Tokugawa Yoshimune', a: J('eboshi', { rc: '#558b2f' }) },
  { id: 'ieshige', name: '徳川家重', country: 'jp', born: 1712, died: 1761, title: '江戸幕府の9代将軍', desc: '吉宗の長男。言葉が不自由だったと伝えられ、側近の大岡忠光を重用した。', img: 'Tokugawa Ieshige', a: J('eboshi', { rc: '#5e35b1' }) },
  { id: 'ieharu', name: '徳川家治', country: 'jp', born: 1737, died: 1786, title: '江戸幕府の10代将軍', desc: '田沼意次を重用し、商業を重んじる政治が行われた時代の将軍。', img: 'Tokugawa Ieharu', a: J('eboshi', { rc: '#00796b' }) },
  { id: 'ienari', name: '徳川家斉', country: 'jp', born: 1773, died: 1841, title: '江戸幕府の11代将軍', desc: '一橋家から将軍となった。在職約50年は歴代最長。子どもが50人以上おり、化政文化が栄えた。', img: 'Tokugawa Ienari', a: J('eboshi', { rc: '#c62828' }) },
  { id: 'ieyoshi', name: '徳川家慶', country: 'jp', born: 1793, died: 1853, title: '江戸幕府の12代将軍', desc: '天保の改革の時代の将軍。1853年、ペリー来航の直後に亡くなった。', img: 'Tokugawa Ieyoshi', a: J('eboshi', { rc: '#455a64' }) },
  { id: 'iesada', name: '徳川家定', country: 'jp', born: 1824, died: 1858, title: '江戸幕府の13代将軍', desc: '在職中に日米和親条約・日米修好通商条約が結ばれた。', img: 'Tokugawa Iesada', a: J('eboshi', { rc: '#7b1fa2' }) },
  { id: 'atsuhime', name: '天璋院（篤姫）', country: 'jp', born: 1836, died: 1883, title: '徳川家定の正室', desc: '薩摩藩出身。夫の死後も大奥を取りしきり、江戸城無血開城では徳川家の存続に力を尽くした。', img: 'Tenshō-in', a: J('hime', { f: 1, rc: '#d81b60' }) },
  { id: 'iemochi', name: '徳川家茂', country: 'jp', born: 1846, died: 1866, title: '江戸幕府の14代将軍', desc: '紀州藩主から将軍となった。公武合体のため孝明天皇の妹・和宮と結婚。第二次長州征討の最中に大坂城で亡くなった。', img: 'Tokugawa Iemochi', a: J('eboshi', { rc: '#1e88e5' }) },
  { id: 'kazunomiya', name: '和宮（静寛院宮）', country: 'jp', born: 1846, died: 1877, title: '徳川家茂の正室', desc: '孝明天皇の妹。公武合体のため将軍家に嫁ぎ、のちに江戸城の無血開城にも尽力した。', img: 'Princess Kazu', a: J('hime', { f: 1, rc: '#8e24aa' }) },
  { id: 'nariaki', name: '徳川斉昭', country: 'jp', born: 1800, died: 1860, title: '水戸藩主', desc: '藩校弘道館を開き、尊王攘夷の思想に大きな影響を与えた。最後の将軍慶喜の父。', img: 'Tokugawa Nariaki', a: J('eboshi', { b: 'm', rc: '#37474f' }) },
  { id: 'yoshinobu', name: '徳川慶喜', country: 'jp', born: 1837, died: 1913, title: '江戸幕府の15代・最後の将軍', desc: '水戸藩出身。1867年に大政奉還を行い、約260年続いた江戸幕府を終わらせた。明治以降は写真や狩猟を楽しんで暮らした。', img: 'Tokugawa Yoshinobu', a: J('none', { rc: '#212121' }) },

  // ---- チンギス・ハン家 ----
  { id: 'borte', name: 'ボルテ', country: 'mn', born: 1161, died: 1230, life: '1161年ごろ〜1230年ごろ', title: 'チンギス・ハンの第一夫人', desc: '4人の息子を産み、草原の統一をめざす夫を支え続けた。', img: 'Börte', a: J('mongol', { f: 1, rc: '#8d6e63' }) },
  { id: 'jochi', name: 'ジョチ', country: 'mn', born: 1182, died: 1227, life: '1182年ごろ〜1227年', title: 'チンギス・ハンの長男', desc: '帝国の西方を領地として与えられ、その子孫がキプチャク・ハン国を築いた。', img: 'Jochi', a: J('mongol', { b: 'm', rc: '#6d4c41' }) },
  { id: 'chagatai', name: 'チャガタイ', country: 'mn', born: 1183, died: 1242, life: '1183年ごろ〜1242年', title: 'チンギス・ハンの次男', desc: '中央アジアを領地とし、チャガタイ・ハン国の祖となった。法律（ヤサ）に厳格なことで知られた。', img: 'Chagatai Khan', a: J('mongol', { b: 's', rc: '#4e342e' }) },
  { id: 'ogedei', name: 'オゴデイ', country: 'mn', born: 1186, died: 1241, title: 'モンゴル帝国の2代皇帝', desc: '首都カラコルムを建設し、駅伝制（ジャムチ）を整えた。その死の知らせで、ヨーロッパ遠征軍は引き返した。', img: 'Ögedei Khan', a: J('mongol', { b: 'm', rc: '#c62828' }) },
  { id: 'tolui', name: 'トルイ', country: 'mn', born: 1191, died: 1232, life: '1191年ごろ〜1232年', title: 'チンギス・ハンの末子', desc: '末子が家を継ぐモンゴルの伝統により、父の本拠地と軍の多くを受け継いだ。モンケ・フビライ・フレグの父。', img: 'Tolui', a: J('mongol', { rc: '#1565c0' }) },
  { id: 'batu', name: 'バトゥ', country: 'mn', born: 1207, died: 1255, title: 'キプチャク・ハン国の建国者', desc: 'ジョチの子。ヨーロッパ遠征を指揮してロシアを支配下に置き、ヴォルガ川流域にキプチャク・ハン国を開いた。', img: 'Batu Khan', a: J('mongol', { b: 'm', rc: '#283593' }) },
  { id: 'mongke', name: 'モンケ', country: 'mn', born: 1209, died: 1259, title: 'モンゴル帝国の4代皇帝', desc: 'トルイの長男。弟のフビライを中国へ、フレグを西アジアへ遠征させた。', img: 'Möngke Khan', a: J('mongol', { b: 'm', rc: '#00695c' }) },
  { id: 'hulagu', name: 'フレグ', country: 'mn', born: 1218, died: 1265, title: 'イル・ハン国の建国者', desc: 'トルイの子。1258年にバグダードを攻め落としてアッバース朝を滅ぼし、イランにイル・ハン国を開いた。', img: 'Hulagu Khan', a: J('mongol', { b: 's', rc: '#6a1b9a' }) },

  // ---- ハプスブルク家 ----
  { id: 'rudolf1', name: 'ルドルフ1世', country: 'at', born: 1218, died: 1291, title: 'ハプスブルク家初のドイツ王', desc: 'スイスの小領主から1273年にドイツ王（神聖ローマ皇帝位の候補）に選ばれ、オーストリアを手に入れて一族の基盤を築いた。', img: 'Rudolf I of Germany', a: E('crown', { b: 's', rc: '#b71c1c' }) },
  { id: 'maximilian1', name: 'マクシミリアン1世', country: 'at', born: 1459, died: 1519, title: '神聖ローマ皇帝', desc: '自身の結婚と、子や孫の結婚によって領土を大きく広げ、ハプスブルク家の大帝国の基礎をつくった。', img: 'Maximilian I, Holy Roman Emperor', a: E('cap', { rc: '#4e342e' }) },
  { id: 'maryburgundy', name: 'マリー・ド・ブルゴーニュ', country: 'fr', born: 1457, died: 1482, title: 'ブルゴーニュ公国の女公', desc: 'マクシミリアン1世と結婚し、豊かなネーデルラントがハプスブルク家の領地となった。落馬事故で25歳で亡くなった。', img: 'Mary of Burgundy', a: E('tiara', { f: 1, rc: '#1a237e' }) },
  { id: 'ferdinand2', name: 'フェルナンド2世', country: 'es', born: 1452, died: 1516, title: 'アラゴン王', desc: 'カスティーリャのイサベル女王と結婚してスペイン統一の道を開き、グラナダを攻略した。', img: 'Ferdinand II of Aragon', a: E('crown', { rc: '#880e4f' }) },
  { id: 'philip1', name: 'フィリップ美公（フェリペ1世）', country: 'at', born: 1478, died: 1506, title: 'カスティーリャ王', desc: 'マクシミリアン1世とマリーの子。スペイン王女フアナと結婚し、ハプスブルク家がスペインを継ぐきっかけとなった。', img: 'Philip I of Castile', a: E('cap', { rc: '#5d4037' }) },
  { id: 'juana', name: 'フアナ', country: 'es', born: 1479, died: 1555, title: 'カスティーリャ女王', desc: 'イサベル女王とフェルナンド2世の娘。カール5世の母。夫の死後、長く幽閉されて過ごした。', img: 'Joanna of Castile', a: E('veil', { f: 1, rc: '#212121' }) },
  { id: 'charles5', name: 'カール5世（カルロス1世）', country: 'es', born: 1500, died: 1558, title: '神聖ローマ皇帝・スペイン王', desc: 'ヨーロッパの広大な領土とアメリカ大陸を治め「太陽の沈まない帝国」の主となった。ルターの宗教改革やオスマン帝国と向き合った。', img: 'Charles V, Holy Roman Emperor', a: E('cap', { b: 's', rc: '#212121' }) },
  { id: 'ferdinand1', name: 'フェルディナント1世', country: 'at', born: 1503, died: 1564, title: '神聖ローマ皇帝', desc: 'カール5世の弟。ボヘミアとハンガリーの王位も得て、オーストリア系ハプスブルク家の祖となった。', img: 'Ferdinand I, Holy Roman Emperor', a: E('cap', { b: 's', rc: '#3e2723' }) },
  { id: 'francis1', name: 'フランツ1世', country: 'at', born: 1708, died: 1765, title: '神聖ローマ皇帝', desc: 'マリア・テレジアの夫。ロートリンゲン（ロレーヌ）公の出身で、財政や科学に関心が深かった。', img: 'Francis I, Holy Roman Emperor', a: E('wig', { hc: '#eeeeee', rc: '#5d4037' }) },
  { id: 'joseph2', name: 'ヨーゼフ2世', country: 'at', born: 1741, died: 1790, title: '神聖ローマ皇帝', desc: 'マリア・テレジアの長男。啓蒙専制君主として、農奴制の廃止や宗教寛容令などの改革を急いだ。', img: 'Joseph II, Holy Roman Emperor', a: E('wig', { hc: '#eeeeee', rc: '#1b5e20' }) },
  { id: 'leopold2', name: 'レオポルト2世', country: 'at', born: 1747, died: 1792, title: '神聖ローマ皇帝', desc: 'マリア・テレジアの子。妹マリー・アントワネットの身を案じ、フランス革命に対してピルニッツ宣言を出した。', img: 'Leopold II, Holy Roman Emperor', a: E('wig', { hc: '#eeeeee', rc: '#283593' }) },
  { id: 'francis2', name: 'フランツ2世', country: 'at', born: 1768, died: 1835, title: '最後の神聖ローマ皇帝', desc: 'ナポレオンとの戦いに敗れ、1806年に神聖ローマ帝国は消滅した。オーストリア皇帝としてウィーン会議を主催した。', img: 'Francis II, Holy Roman Emperor', a: E('none', { rc: '#eceff1' }) },
  { id: 'marielouise', name: 'マリー・ルイーズ', country: 'at', born: 1791, died: 1847, title: 'ナポレオンの2番目の皇后', desc: 'フランツ2世の娘で、マリー・アントワネットの大姪。政略結婚でナポレオンの妻となり、ナポレオン2世を産んだ。', img: 'Marie Louise, Duchess of Parma', a: E('tiara', { f: 1, rc: '#90caf9' }) },

  // ---- テューダー朝 ----
  { id: 'henry7', name: 'ヘンリー7世', country: 'gb', born: 1457, died: 1509, title: 'テューダー朝の初代国王', desc: '1485年にばら戦争を終わらせて即位し、王権を立て直した。', img: 'Henry VII of England', a: E('cap', { rc: '#b71c1c' }) },
  { id: 'henry8', name: 'ヘンリー8世', country: 'gb', born: 1491, died: 1547, title: 'イングランド国王', desc: '離婚問題からローマ教皇と対立し、自らを首長とするイギリス国教会をつくった。生涯に6度結婚した。', img: 'Henry VIII', a: E('cap', { b: 's', hc: '#bf360c', rc: '#c62828' }) },
  { id: 'catherine', name: 'キャサリン・オブ・アラゴン', country: 'es', born: 1485, died: 1536, title: 'ヘンリー8世の最初の王妃', desc: 'スペインのイサベル女王の娘。王との離婚問題が、イギリスの宗教改革のきっかけとなった。', img: 'Catherine of Aragon', a: E('veil', { f: 1, rc: '#4a148c' }) },
  { id: 'anneboleyn', name: 'アン・ブーリン', country: 'gb', born: 1501, died: 1536, life: '1501年ごろ〜1536年', title: 'ヘンリー8世の2番目の王妃', desc: 'エリザベス1世の母。男子を産めなかったこともあり、王の命令で処刑された。', img: 'Anne Boleyn', a: E('veil', { f: 1, rc: '#212121' }) },
  { id: 'janeseymour', name: 'ジェーン・シーモア', country: 'gb', born: 1508, died: 1537, life: '1508年ごろ〜1537年', title: 'ヘンリー8世の3番目の王妃', desc: '待望の男子エドワード6世を産んだが、産後まもなく亡くなった。', img: 'Jane Seymour', a: E('veil', { f: 1, rc: '#6d4c41' }) },
  { id: 'mary1', name: 'メアリー1世', country: 'gb', born: 1516, died: 1558, title: 'イングランド女王', desc: 'キャサリンの娘。カトリックを復活させて多くのプロテスタントを処刑し「ブラッディ・メアリー」と呼ばれた。スペインのフェリペ2世と結婚した。', img: 'Mary I of England', a: E('tiara', { f: 1, rc: '#311b92' }) },
  { id: 'edward6', name: 'エドワード6世', country: 'gb', born: 1537, died: 1553, title: 'イングランド国王', desc: '9歳で即位し、プロテスタントの改革を進めたが、15歳で病死した。', img: 'Edward VI', a: E('cap', { rc: '#bf360c' }) },

  // ---- ヴィクトリア女王の子孫 ----
  { id: 'albert', name: 'アルバート公', country: 'gb', born: 1819, died: 1861, title: 'ヴィクトリア女王の夫', desc: 'ドイツ出身。1851年のロンドン万国博覧会の開催に力を尽くした。', img: 'Albert, Prince Consort', a: E('none', { b: 'm', rc: '#212121' }) },
  { id: 'edward7', name: 'エドワード7世', country: 'gb', born: 1841, died: 1910, title: 'イギリス国王', desc: 'ヴィクトリア女王の長男。社交的で「ピースメーカー」と呼ばれ、英仏協商の成立に貢献した。', img: 'Edward VII', a: E('bald', { b: 's', hc: '#9e9e9e', rc: '#1a237e' }) },
  { id: 'vicky', name: 'ヴィクトリア（ドイツ皇后）', country: 'de', born: 1840, died: 1901, title: 'ヴィクトリア女王の長女', desc: 'プロイセン王太子フリードリヒに嫁ぎ、ドイツ皇后となった。ヴィルヘルム2世の母。', img: 'Victoria, Princess Royal', a: E('tiara', { f: 1, rc: '#4a148c' }) },
  { id: 'frederick3', name: 'フリードリヒ3世', country: 'de', born: 1831, died: 1888, title: 'ドイツ皇帝', desc: '自由主義的な考えをもっていたが、即位後わずか99日で病死した。', img: 'Frederick III, German Emperor', a: E('none', { b: 'l', rc: '#37474f' }) },
  { id: 'wilhelm2', name: 'ヴィルヘルム2世', country: 'de', born: 1859, died: 1941, title: 'ドイツ皇帝', desc: 'ヴィクトリア女王の孫。ビスマルクを辞めさせて積極的な対外政策をとり、第一次世界大戦に敗れて退位した。', img: 'Wilhelm II', a: E('none', { b: 'm', rc: '#455a64' }) },
  { id: 'alice', name: 'アリス', country: 'gb', born: 1843, died: 1878, title: 'ヴィクトリア女王の次女', desc: 'ドイツのヘッセン大公に嫁いだ。娘のアレクサンドラはロシア皇后となった。', img: 'Princess Alice of the United Kingdom', a: E('updo', { f: 1, rc: '#00695c' }) },
  { id: 'alexandra', name: 'アレクサンドラ皇后', country: 'ru', born: 1872, died: 1918, title: 'ロシア最後の皇后', desc: 'ヴィクトリア女王の孫。息子の病気のため祈祷僧ラスプーチンを重用した。ロシア革命後、家族とともに処刑された。', img: 'Alexandra Feodorovna (Alix of Hesse)', a: E('tiara', { f: 1, rc: '#eceff1' }) },
  { id: 'nicholas2', name: 'ニコライ2世', country: 'ru', born: 1868, died: 1918, title: 'ロシア最後の皇帝', desc: '皇太子時代に日本で大津事件に遭った。日露戦争・第一次世界大戦を戦い、ロシア革命で退位し、家族とともに処刑された。', img: 'Nicholas II', a: E('none', { b: 's', rc: '#2e7d32' }) },
  { id: 'george5', name: 'ジョージ5世', country: 'gb', born: 1865, died: 1936, title: 'イギリス国王', desc: 'エドワード7世の子。第一次世界大戦中、ドイツ系の家名を改めてウィンザー家とした。ヴィルヘルム2世、ニコライ2世とはいとこ同士。', img: 'George V', a: E('none', { b: 's', rc: '#1a237e' }) },

  // ---- ロマノフ家 ----
  { id: 'michael', name: 'ミハイル・ロマノフ', country: 'ru', born: 1596, died: 1645, title: 'ロマノフ朝の初代ツァーリ', desc: '1613年に全国会議で選ばれて即位し、約300年続くロマノフ朝を開いた。ピョートル大帝の祖父。', img: 'Michael of Russia', a: E('mongol', { rc: '#b71c1c' }) },
  { id: 'anna', name: 'アンナ・ペトロヴナ', country: 'ru', born: 1708, died: 1728, title: 'ピョートル大帝の娘', desc: 'ドイツのホルシュタイン公に嫁ぎ、のちのピョートル3世を産んだが、まもなく亡くなった。', img: 'Grand Duchess Anna Petrovna of Russia', a: E('updo', { f: 1, rc: '#1565c0' }) },
  { id: 'peter3', name: 'ピョートル3世', country: 'ru', born: 1728, died: 1762, title: 'ロシア皇帝', desc: 'ドイツ育ちでプロイセン王フリードリヒ2世を崇拝した。即位から半年で妻エカチェリーナのクーデターで廃位された。', img: 'Peter III of Russia', a: E('wig', { hc: '#eeeeee', rc: '#1b5e20' }) },
  { id: 'catherine2', name: 'エカチェリーナ2世', country: 'ru', born: 1729, died: 1796, title: 'ロシア女帝', desc: 'ドイツ出身。啓蒙専制君主として領土を広げた。漂流民・大黒屋光太夫と会見し、ラクスマンを日本へ派遣した。', img: 'Catherine the Great', a: E('tiara', { f: 1, hc: '#eeeeee', rc: '#4a148c' }) },
  { id: 'paul1', name: 'パーヴェル1世', country: 'ru', born: 1754, died: 1801, title: 'ロシア皇帝', desc: 'エカチェリーナ2世の子。母の政策を次々と覆したが、宮廷クーデターで暗殺された。', img: 'Paul I of Russia', a: E('wig', { hc: '#eeeeee', rc: '#283593' }) },
  { id: 'alexander1', name: 'アレクサンドル1世', country: 'ru', born: 1777, died: 1825, title: 'ロシア皇帝', desc: 'ナポレオンのロシア遠征を退け、ウィーン会議で大きな役割を果たし、神聖同盟を提唱した。', img: 'Alexander I of Russia', a: E('none', { rc: '#1a237e' }) },
  { id: 'nicholas1', name: 'ニコライ1世', country: 'ru', born: 1796, died: 1855, title: 'ロシア皇帝', desc: 'アレクサンドル1世の弟。デカブリストの乱を鎮圧し、南下政策を進めてクリミア戦争を起こした。', img: 'Nicholas I of Russia', a: E('none', { b: 'm', rc: '#263238' }) },
  { id: 'alexander2', name: 'アレクサンドル2世', country: 'ru', born: 1818, died: 1881, title: 'ロシア皇帝', desc: '1861年に農奴解放令を出した「解放皇帝」。1875年に日本と樺太・千島交換条約を結んだ。テロで暗殺された。', img: 'Alexander II of Russia', a: E('bald', { b: 'm', rc: '#37474f' }) },
  { id: 'alexander3', name: 'アレクサンドル3世', country: 'ru', born: 1845, died: 1894, title: 'ロシア皇帝', desc: '反動的な政治を行う一方、シベリア鉄道の建設を始めた。', img: 'Alexander III of Russia', a: E('bald', { b: 'l', rc: '#3e2723' }) },

  // ---- ムガル帝国 ----
  { id: 'timur', name: 'ティムール', country: 'uz', born: 1336, died: 1405, title: 'ティムール朝の建国者', desc: 'サマルカンドを都に、中央アジアからイランにまたがる大帝国を築いた。明への遠征の途中で病死した。', img: 'Timur', a: J('turban', { b: 'l', sk: 1, rc: '#1b5e20' }) },
  { id: 'babur', name: 'バーブル', country: 'in', born: 1483, died: 1530, title: 'ムガル帝国の初代皇帝', desc: '父方はティムール、母方はチンギス・ハンの子孫。1526年のパーニーパットの戦いに勝ち、北インドに帝国を築いた。回想録『バーブル・ナーマ』を残した。', img: 'Babur', a: J('turban', { b: 's', sk: 1, rc: '#33691e' }) },
  { id: 'humayun', name: 'フマーユーン', country: 'in', born: 1508, died: 1556, title: 'ムガル帝国の2代皇帝', desc: '一時イランに亡命したが、デリーを奪回した。デリーにある彼の廟は、タージ・マハルの手本になったといわれる。', img: 'Humayun', a: J('turban', { b: 's', sk: 2, rc: '#00695c' }) },
  { id: 'jahangir', name: 'ジャハーンギール', country: 'in', born: 1569, died: 1627, title: 'ムガル帝国の4代皇帝', desc: 'アクバルの子。細密画などの芸術を愛し、妃ヌール・ジャハーンが政治にも力をふるった。', img: 'Jahangir', a: J('turban', { b: 'm', sk: 2, rc: '#f9a825' }) },
  { id: 'mumtaz', name: 'ムムターズ・マハル', country: 'in', born: 1593, died: 1631, title: 'シャー・ジャハーンの妃', desc: '14人の子を産み、出産のときに亡くなった。タージ・マハルは彼女の墓廟。', img: 'Mumtaz Mahal', a: J('veil', { f: 1, sk: 2, rc: '#ad1457' }) },
  { id: 'aurangzeb', name: 'アウラングゼーブ', country: 'in', born: 1618, died: 1707, title: 'ムガル帝国の6代皇帝', desc: '父シャー・ジャハーンを幽閉して即位。帝国の最大版図を築いたが、厳格なイスラーム政策でヒンドゥー教徒の反発を招いた。', img: 'Aurangzeb', a: J('turban', { b: 'l', sk: 2, hc: '#bdbdbd', rc: '#eceff1' }) },

  // ---- 朝鮮王朝 ----
  { id: 'taejo', name: '李成桂（太祖）', country: 'kr', born: 1335, died: 1408, title: '朝鮮王朝の建国者', desc: '高麗の武将として倭寇や紅巾軍を破って名声を得た。1392年に朝鮮王朝を開いた。', img: 'Taejo of Joseon', a: J('futou', { b: 'l', rc: '#c62828' }) },
  { id: 'taejong', name: '太宗（李芳遠）', country: 'kr', born: 1367, died: 1422, title: '朝鮮王朝の3代国王', desc: '李成桂の五男。兄弟との争いを経て即位し、王権を強化した。世宗の父。', img: 'Taejong of Joseon', a: J('futou', { b: 's', rc: '#b71c1c' }) },
  { id: 'munjong', name: '文宗', country: 'kr', born: 1414, died: 1452, title: '朝鮮王朝の5代国王', desc: '世宗の長男。父を助けて政治を行ったが、即位後わずか2年で病死した。', img: 'Munjong of Joseon', a: J('futou', { b: 's', rc: '#d84315' }) },
  { id: 'danjong', name: '端宗', country: 'kr', born: 1441, died: 1457, title: '朝鮮王朝の6代国王', desc: '12歳で即位したが、叔父の世祖に王位を奪われ、流刑地で16歳で亡くなった。', img: 'Danjong of Joseon', a: J('futou', { rc: '#ef6c00' }) },
  { id: 'sejo', name: '世祖', country: 'kr', born: 1417, died: 1468, title: '朝鮮王朝の7代国王', desc: '世宗の次男。甥の端宗から王位を奪った。法典『経国大典』の編纂を始めた。', img: 'Sejo of Joseon', a: J('futou', { b: 's', rc: '#4e342e' }) },

  // ---- 清 ----
  { id: 'nurhaci', name: 'ヌルハチ', country: 'cn', born: 1559, died: 1626, title: '清（後金）の建国者', desc: '女真の諸部族を統一して1616年に後金を建てた。満州文字をつくらせ、軍事・行政組織の八旗を整えた。', img: 'Nurhaci', a: J('mongol', { b: 'm', rc: '#f9a825' }) },
  { id: 'hongtaiji', name: 'ホンタイジ', country: 'cn', born: 1592, died: 1643, title: '清の2代皇帝', desc: 'ヌルハチの子。国号を「清」と改め、朝鮮を服属させた。', img: 'Hong Taiji', a: J('mongol', { b: 'm', rc: '#fbc02d' }) },
  { id: 'shunzhi', name: '順治帝', country: 'cn', born: 1638, died: 1661, title: '清の3代皇帝', desc: '幼くして即位し、1644年に北京に入って中国全土の支配を始めた。', img: 'Shunzhi Emperor', a: J('mongol', { rc: '#ffb300' }) },
  { id: 'kangxi', name: '康熙帝', country: 'cn', born: 1654, died: 1722, title: '清の4代皇帝', desc: '在位61年。三藩の乱を鎮め、台湾を支配下に置き、ロシアとネルチンスク条約を結んだ名君。', img: 'Kangxi Emperor', a: J('mongol', { b: 'm', rc: '#ffa000' }) },
  { id: 'yongzheng', name: '雍正帝', country: 'cn', born: 1678, died: 1735, title: '清の5代皇帝', desc: '勤勉な皇帝で、軍機処を設けて皇帝の独裁体制を固めた。', img: 'Yongzheng Emperor', a: J('mongol', { b: 'm', rc: '#ff8f00' }) },
  { id: 'qianlong', name: '乾隆帝', country: 'cn', born: 1711, died: 1799, title: '清の6代皇帝', desc: '在位60年。清の最大版図を築き、『四庫全書』を編纂させた。イギリスのマカートニー使節の通商要求を退けた。', img: 'Qianlong Emperor', a: J('mongol', { b: 's', rc: '#ff6f00' }) },
  { id: 'daoguang', name: '道光帝', country: 'cn', born: 1782, died: 1850, title: '清の8代皇帝', desc: '乾隆帝の孫。アヘンの密輸を取り締まるため林則徐を派遣し、アヘン戦争に敗れた。', img: 'Daoguang Emperor', a: J('mongol', { b: 'm', rc: '#f57f17' }) },
  { id: 'xianfeng', name: '咸豊帝', country: 'cn', born: 1831, died: 1861, title: '清の9代皇帝', desc: '太平天国の乱とアロー戦争に苦しみ、英仏軍が北京に迫ると熱河へ逃れ、そこで亡くなった。', img: 'Xianfeng Emperor', a: J('mongol', { rc: '#ef6c00' }) },
  { id: 'cixi', name: '西太后', country: 'cn', born: 1835, died: 1908, title: '清末の実権を握った皇太后', desc: '咸豊帝の妃で同治帝の母。約半世紀にわたって清の政治を動かした。', img: 'Empress Dowager Cixi', a: J('tiara', { f: 1, rc: '#ffd54f' }) },
  { id: 'tongzhi', name: '同治帝', country: 'cn', born: 1856, died: 1875, title: '清の10代皇帝', desc: '5歳で即位し、母の西太后が実権を握った。19歳で亡くなった。', img: 'Tongzhi Emperor', a: J('mongol', { rc: '#fb8c00' }) },
  { id: 'yixuan', name: '醇親王奕譞', country: 'cn', born: 1840, died: 1891, title: '道光帝の子', desc: '光緒帝の父。妻は西太后の妹で、海軍の整備にも関わった。', img: 'Yixuan, Prince Chun', a: J('mongol', { b: 'm', rc: '#6d4c41' }) },
  { id: 'guangxu', name: '光緒帝', country: 'cn', born: 1871, died: 1908, title: '清の11代皇帝', desc: '1898年に戊戌の変法で近代化をめざしたが、西太后に幽閉され、西太后が亡くなる前日に亡くなった。', img: 'Guangxu Emperor', a: J('mongol', { rc: '#fdd835' }) },
  { id: 'zaifeng', name: '載灃（醇親王）', country: 'cn', born: 1883, died: 1951, title: '溥儀の父', desc: '光緒帝の弟。幼い溥儀の摂政として、清の最後の時代を見届けた。', img: 'Zaifeng, Prince Chun', a: J('mongol', { b: 'm', rc: '#5d4037' }) },
  { id: 'puyi', name: '溥儀', country: 'cn', born: 1906, died: 1967, title: '清の最後の皇帝（宣統帝）', desc: '2歳で即位し、辛亥革命により6歳で退位した。のちに日本がつくった満州国の皇帝となった。', img: 'Puyi', a: J('none', { g: 1, rc: '#212121' }) },

  // ---- カエサルとクレオパトラ ----
  { id: 'caesarion', name: 'カエサリオン', country: 'eg', born: -47, died: -30, title: 'カエサルとクレオパトラの子', desc: 'プトレマイオス15世として母と共同で統治したが、エジプトを征服したオクタウィアヌスに殺された。', img: 'Caesarion', a: J('pharaoh', { sk: 1, rc: '#f5f5f5' }) },
  { id: 'antony', name: 'マルクス・アントニウス', country: 'it', born: -83, died: -30, title: 'ローマの将軍', desc: 'カエサルの部下。のちにクレオパトラと結んだが、アクティウムの海戦でオクタウィアヌスに敗れ、自害した。', img: 'Mark Antony', a: E('laurel', { b: 's', rc: '#b71c1c' }) },
];
