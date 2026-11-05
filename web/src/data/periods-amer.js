// Era-appropriate names and flags for countries of the Americas and Oceania.
// Each period: { from (inclusive), to (exclusive), name, flag?, flagFile? }
const S = -10000000000
const E = 9999
const BURGUNDY = 'File:Flag of Cross of Burgundy.svg'
const NEW_SPAIN = 'File:Flag of New Spain.svg'
const SPAIN = 'File:Flag of Spain (1785–1873, 1875–1931).svg'
const UK = 'File:Flag of the United Kingdom.svg'
const GB = 'File:Flag of Great Britain (1707–1800).svg'
const NL = 'File:Flag of the Netherlands.svg'
const GRAN_COLOMBIA = 'File:Flag of Gran Colombia.svg'
const CENTRAL_AMERICA = 'File:Flag of the Federal Republic of Central America.svg'

// Central American isthmus: Captaincy General of Guatemala → Mexican Empire → Federal Republic
const centralAm = (pre, conquest, fedEnd, name, flagFrom, flag) => [
  ...pre,
  { from: conquest, to: 1821, name: 'グアテマラ総督領', flagFile: NEW_SPAIN },
  { from: 1821, to: 1823, name: 'メキシコ帝国' },
  { from: 1823, to: fedEnd, name: '中央アメリカ連邦', flagFile: CENTRAL_AMERICA },
  { from: fedEnd, to: flagFrom, name },
  { from: flagFrom, to: E, name, flag },
]

export default {
  us: [
    { from: S, to: 800, name: '先住民の大地' },
    { from: 800, to: 1607, name: 'ミシシッピ文化' },
    { from: 1607, to: 1707, name: 'イギリス領北アメリカ植民地' },
    { from: 1707, to: 1776, name: 'イギリス領北アメリカ植民地', flagFile: GB },
    { from: 1776, to: 1777, name: 'アメリカ合衆国' },
    { from: 1777, to: E, name: 'アメリカ合衆国', flag: '🇺🇸' },
  ],
  ca: [
    { from: S, to: 1534, name: '先住民の大地' },
    { from: 1534, to: 1763, name: 'ヌーベルフランス' },
    { from: 1763, to: 1867, name: 'イギリス領北アメリカ', flagFile: UK },
    { from: 1867, to: 1965, name: 'カナダ（自治領）', flagFile: 'File:Canadian Red Ensign (1957–1965).svg' },
    { from: 1965, to: E, name: 'カナダ', flag: '🇨🇦' },
  ],
  mx: [
    { from: S, to: -1200, name: 'メソアメリカの人々' },
    { from: -1200, to: -400, name: 'オルメカ文明' },
    { from: -400, to: 900, name: 'テオティワカン・マヤ' },
    { from: 900, to: 1428, name: 'トルテカと諸都市' },
    { from: 1428, to: 1521, name: 'アステカ王国' },
    { from: 1521, to: 1821, name: 'ヌエバ・エスパーニャ', flagFile: NEW_SPAIN },
    { from: 1821, to: E, name: 'メキシコ', flag: '🇲🇽' },
  ],
  gt: centralAm(
    [{ from: S, to: -2000, name: '先住民の大地' }, { from: -2000, to: 1524, name: 'マヤ文明' }],
    1524, 1839, 'グアテマラ', 1871, '🇬🇹'),
  bz: [
    { from: S, to: -2000, name: '先住民の大地' },
    { from: -2000, to: 1638, name: 'マヤ文明' },
    { from: 1638, to: 1981, name: 'イギリス領ホンジュラス', flagFile: UK },
    { from: 1981, to: E, name: 'ベリーズ', flag: '🇧🇿' },
  ],
  sv: centralAm(
    [{ from: S, to: -1500, name: '先住民の大地' }, { from: -1500, to: 1525, name: 'マヤ・ピピルの人々' }],
    1525, 1841, 'エルサルバドル', 1912, '🇸🇻'),
  hn: centralAm(
    [{ from: S, to: -1500, name: '先住民の大地' }, { from: -1500, to: 1524, name: 'マヤ文明' }],
    1524, 1838, 'ホンジュラス', 1866, '🇭🇳'),
  ni: centralAm(
    [{ from: S, to: 1524, name: '先住民の大地' }],
    1524, 1838, 'ニカラグア', 1908, '🇳🇮'),
  cr: centralAm(
    [{ from: S, to: 1524, name: '先住民の大地' }],
    1524, 1838, 'コスタリカ', 1848, '🇨🇷'),
  pa: [
    { from: S, to: 1519, name: '先住民の大地' },
    { from: 1519, to: 1821, name: 'スペイン領パナマ', flagFile: BURGUNDY },
    { from: 1821, to: 1831, name: '大コロンビア', flagFile: GRAN_COLOMBIA },
    { from: 1831, to: 1903, name: 'コロンビア領パナマ' },
    { from: 1903, to: E, name: 'パナマ', flag: '🇵🇦' },
  ],
  bs: [
    { from: S, to: 1648, name: 'ルカヤンの人々' },
    { from: 1648, to: 1973, name: 'イギリス領バハマ', flagFile: UK },
    { from: 1973, to: E, name: 'バハマ', flag: '🇧🇸' },
  ],
  cu: [
    { from: S, to: 1511, name: 'タイノの人々' },
    { from: 1511, to: 1785, name: 'スペイン領キューバ', flagFile: BURGUNDY },
    { from: 1785, to: 1898, name: 'スペイン領キューバ', flagFile: SPAIN },
    { from: 1898, to: 1902, name: 'アメリカ軍政下キューバ' },
    { from: 1902, to: E, name: 'キューバ', flag: '🇨🇺' },
  ],
  jm: [
    { from: S, to: 1509, name: 'タイノの人々' },
    { from: 1509, to: 1655, name: 'スペイン領ジャマイカ', flagFile: BURGUNDY },
    { from: 1655, to: 1962, name: 'イギリス領ジャマイカ', flagFile: UK },
    { from: 1962, to: E, name: 'ジャマイカ', flag: '🇯🇲' },
  ],
  ht: [
    { from: S, to: 1492, name: 'タイノの人々' },
    { from: 1492, to: 1697, name: 'スペイン領イスパニョーラ', flagFile: BURGUNDY },
    { from: 1697, to: 1804, name: 'フランス領サン＝ドマング' },
    { from: 1804, to: 1820, name: 'ハイチ' },
    { from: 1820, to: 1964, name: 'ハイチ', flag: '🇭🇹' },
    { from: 1964, to: 1986, name: 'ハイチ（デュヴァリエ政権）' },
    { from: 1986, to: E, name: 'ハイチ', flag: '🇭🇹' },
  ],
  do: [
    { from: S, to: 1492, name: 'タイノの人々' },
    { from: 1492, to: 1795, name: 'スペイン領サント・ドミンゴ', flagFile: BURGUNDY },
    { from: 1795, to: 1809, name: 'フランス領サント・ドミンゴ' },
    { from: 1809, to: 1822, name: 'スペイン領サント・ドミンゴ', flagFile: SPAIN },
    { from: 1822, to: 1844, name: 'ハイチ統治下' },
    { from: 1844, to: 1861, name: 'ドミニカ共和国', flag: '🇩🇴' },
    { from: 1861, to: 1865, name: 'スペイン領サント・ドミンゴ', flagFile: SPAIN },
    { from: 1865, to: E, name: 'ドミニカ共和国', flag: '🇩🇴' },
  ],
  tt: [
    { from: S, to: 1498, name: 'アラワクとカリブの人々' },
    { from: 1498, to: 1797, name: 'スペイン領トリニダード', flagFile: BURGUNDY },
    { from: 1797, to: 1962, name: 'イギリス領西インド', flagFile: UK },
    { from: 1962, to: E, name: 'トリニダード・トバゴ', flag: '🇹🇹' },
  ],
  co: [
    { from: S, to: 600, name: '先住民の大地' },
    { from: 600, to: 1538, name: 'ムイスカなど先住民' },
    { from: 1538, to: 1819, name: 'ヌエバ・グラナダ', flagFile: BURGUNDY },
    { from: 1819, to: 1831, name: '大コロンビア', flagFile: GRAN_COLOMBIA },
    { from: 1831, to: 1861, name: 'ヌエバ・グラナダ共和国' },
    { from: 1861, to: E, name: 'コロンビア', flag: '🇨🇴' },
  ],
  ve: [
    { from: S, to: 1522, name: '先住民の大地' },
    { from: 1522, to: 1819, name: 'スペイン領ベネズエラ', flagFile: BURGUNDY },
    { from: 1819, to: 1830, name: '大コロンビア', flagFile: GRAN_COLOMBIA },
    { from: 1830, to: 1930, name: 'ベネズエラ' },
    { from: 1930, to: E, name: 'ベネズエラ', flag: '🇻🇪' },
  ],
  gy: [
    { from: S, to: 1616, name: '先住民の大地' },
    { from: 1616, to: 1814, name: 'オランダ領ギアナ', flagFile: NL },
    { from: 1814, to: 1966, name: 'イギリス領ギアナ', flagFile: UK },
    { from: 1966, to: E, name: 'ガイアナ', flag: '🇬🇾' },
  ],
  sr: [
    { from: S, to: 1667, name: '先住民の大地' },
    { from: 1667, to: 1975, name: 'オランダ領ギアナ', flagFile: NL },
    { from: 1975, to: E, name: 'スリナム', flag: '🇸🇷' },
  ],
  ec: [
    { from: S, to: 1463, name: '先住民の大地' },
    { from: 1463, to: 1534, name: 'インカ帝国' },
    { from: 1534, to: 1739, name: 'ペルー副王領', flagFile: BURGUNDY },
    { from: 1739, to: 1822, name: 'ヌエバ・グラナダ副王領', flagFile: BURGUNDY },
    { from: 1822, to: 1830, name: '大コロンビア', flagFile: GRAN_COLOMBIA },
    { from: 1830, to: 1860, name: 'エクアドル' },
    { from: 1860, to: E, name: 'エクアドル', flag: '🇪🇨' },
  ],
  br: [
    { from: S, to: 1500, name: '先住民の大地' },
    { from: 1500, to: 1822, name: 'ポルトガル領ブラジル' },
    { from: 1822, to: 1889, name: 'ブラジル帝国', flagFile: 'File:Flag of Empire of Brazil (1870-1889).svg' },
    { from: 1889, to: E, name: 'ブラジル', flag: '🇧🇷' },
  ],
  pe: [
    { from: S, to: -900, name: 'アンデスの人々' },
    { from: -900, to: -200, name: 'チャビン文化' },
    { from: -200, to: 1438, name: 'アンデス諸文明' },
    { from: 1438, to: 1533, name: 'インカ帝国' },
    { from: 1533, to: 1821, name: 'ペルー副王領', flagFile: BURGUNDY },
    { from: 1821, to: 1825, name: 'ペルー' },
    { from: 1825, to: E, name: 'ペルー', flag: '🇵🇪' },
  ],
  bo: [
    { from: S, to: 500, name: 'アンデスの人々' },
    { from: 500, to: 1100, name: 'ティワナク文化' },
    { from: 1100, to: 1450, name: 'アイマラ諸王国' },
    { from: 1450, to: 1538, name: 'インカ帝国' },
    { from: 1538, to: 1776, name: 'ペルー副王領', flagFile: BURGUNDY },
    { from: 1776, to: 1825, name: 'ラ・プラタ副王領', flagFile: BURGUNDY },
    { from: 1825, to: 1851, name: 'ボリビア' },
    { from: 1851, to: E, name: 'ボリビア', flag: '🇧🇴' },
  ],
  py: [
    { from: S, to: 1537, name: 'グアラニーの人々' },
    { from: 1537, to: 1776, name: 'ペルー副王領', flagFile: BURGUNDY },
    { from: 1776, to: 1811, name: 'ラ・プラタ副王領', flagFile: BURGUNDY },
    { from: 1811, to: 1842, name: 'パラグアイ' },
    { from: 1842, to: E, name: 'パラグアイ', flag: '🇵🇾' },
  ],
  uy: [
    { from: S, to: 1726, name: 'チャルーアの人々' },
    { from: 1726, to: 1776, name: 'スペイン領バンダ・オリエンタル', flagFile: BURGUNDY },
    { from: 1776, to: 1811, name: 'ラ・プラタ副王領', flagFile: BURGUNDY },
    { from: 1811, to: 1817, name: 'リオ・デ・ラ・プラタ連合州' },
    { from: 1817, to: 1828, name: 'シスプラチナ州' },
    { from: 1828, to: 1830, name: 'ウルグアイ' },
    { from: 1830, to: E, name: 'ウルグアイ', flag: '🇺🇾' },
  ],
  ar: [
    { from: S, to: 1536, name: '先住民の大地' },
    { from: 1536, to: 1776, name: 'ペルー副王領', flagFile: BURGUNDY },
    { from: 1776, to: 1810, name: 'ラ・プラタ副王領', flagFile: BURGUNDY },
    { from: 1810, to: 1816, name: 'リオ・デ・ラ・プラタ連合州' },
    { from: 1816, to: 1861, name: 'リオ・デ・ラ・プラタ連合州', flag: '🇦🇷' },
    { from: 1861, to: E, name: 'アルゼンチン', flag: '🇦🇷' },
  ],
  cl: [
    { from: S, to: 1541, name: 'マプチェなど先住民' },
    { from: 1541, to: 1818, name: 'スペイン領チリ', flagFile: BURGUNDY },
    { from: 1818, to: E, name: 'チリ', flag: '🇨🇱' },
  ],
  au: [
    { from: S, to: 1788, name: 'アボリジニの大地' },
    { from: 1788, to: 1901, name: 'イギリス領植民地', flagFile: UK },
    { from: 1901, to: E, name: 'オーストラリア', flag: '🇦🇺' },
  ],
  nz: [
    { from: S, to: 1250, name: '無人の島々' },
    { from: 1250, to: 1840, name: 'マオリの大地' },
    { from: 1840, to: 1902, name: 'イギリス領ニュージーランド', flagFile: UK },
    { from: 1902, to: E, name: 'ニュージーランド', flag: '🇳🇿' },
  ],
  pg: [
    { from: S, to: 1884, name: 'パプアの人々' },
    { from: 1884, to: 1914, name: 'ドイツ・イギリス領ニューギニア' },
    { from: 1914, to: 1975, name: 'オーストラリア統治領' },
    { from: 1975, to: E, name: 'パプアニューギニア', flag: '🇵🇬' },
  ],
  sb: [
    { from: S, to: 1893, name: 'メラネシアの人々' },
    { from: 1893, to: 1978, name: 'イギリス領ソロモン諸島', flagFile: UK },
    { from: 1978, to: E, name: 'ソロモン諸島', flag: '🇸🇧' },
  ],
  vu: [
    { from: S, to: -1000, name: '無人の島々' },
    { from: -1000, to: 1906, name: 'メラネシアの人々' },
    { from: 1906, to: 1980, name: 'ニューヘブリディーズ' },
    { from: 1980, to: E, name: 'バヌアツ', flag: '🇻🇺' },
  ],
  fj: [
    { from: S, to: -1000, name: '無人の島々' },
    { from: -1000, to: 1871, name: 'フィジーの人々' },
    { from: 1871, to: 1874, name: 'フィジー王国' },
    { from: 1874, to: 1970, name: 'イギリス領フィジー', flagFile: UK },
    { from: 1970, to: E, name: 'フィジー', flag: '🇫🇯' },
  ],
  ws: [
    { from: S, to: -800, name: '無人の島々' },
    { from: -800, to: 1900, name: 'ポリネシアの人々' },
    { from: 1900, to: 1914, name: 'ドイツ領サモア', flagFile: 'File:Flag of the German Empire.svg' },
    { from: 1914, to: 1962, name: 'ニュージーランド領サモア' },
    { from: 1962, to: E, name: 'サモア', flag: '🇼🇸' },
  ],
  to: [
    { from: S, to: -800, name: '無人の島々' },
    { from: -800, to: 950, name: 'ポリネシアの人々' },
    { from: 950, to: 1845, name: 'トゥイ・トンガ王朝' },
    { from: 1845, to: 1875, name: 'トンガ王国' },
    { from: 1875, to: E, name: 'トンガ王国', flag: '🇹🇴' },
  ],
}
