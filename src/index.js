function loadConfig() {
  if (localStorage.getItem("darkMode") == 1) {
    document.documentElement.dataset.theme = "dark";
  }
}

function toggleDarkMode() {
  if (localStorage.getItem("darkMode") == 1) {
    localStorage.setItem("darkMode", 0);
    delete document.documentElement.dataset.theme;
  } else {
    localStorage.setItem("darkMode", 1);
    document.documentElement.dataset.theme = "dark";
  }
}

function html10Decode(str) {
  function replacer(_matched, p1) {
    return String.fromCodePoint(p1);
  }
  return str.replace(/&#([0-9]+);/g, replacer);
}

function html10Encode(str) {
  return [...str].map((s) => {
    const codePoint = s.codePointAt(0);
    return `&#${codePoint};`;
  }).join("");
}

function html16Decode(str) {
  function replacer(_matched, p1) {
    return String.fromCodePoint(parseInt(p1, 16));
  }
  return str.replace(/&#[xX]([0-9a-fA-F]+);/g, replacer);
}

function html16Encode(str) {
  return [...str].map((s) => {
    const codePoint = s.codePointAt(0).toString(16);
    return `&#x${codePoint};`;
  }).join("");
}

function unicodePointEncode(str) {
  return [...str].map((s) => {
    const codePoint = s.codePointAt(0).toString(16);
    return `\\u\{${codePoint}\}`;
  }).join("");
}

function unicodePointDecode(str) {
  function replacer(_matched, p1) {
    return String.fromCodePoint(parseInt(p1, 16));
  }
  return str.replace(/\\u\{([0-9a-fA-F]+)\}/g, replacer);
}

function unicodeUnitEncode(str) {
  return str.split("").map((s) => {
    const codeUnit = s.codePointAt(0).toString(16);
    return `\\u${codeUnit}`;
  }).join("");
}

function unicodeUnitDecode(str) {
  function replacer(_matched, p1) {
    return String.fromCodePoint(parseInt(p1, 16));
  }
  return str.replace(/\\u([0-9a-fA-F]+)/g, replacer);
}

function htmlEscapeEncode(str) {
  return str.replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function htmlEscapeDecode(str) {
  return str.replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&#0?39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&");
}

function sortLines(str) {
  return str.split("\n").sort().join("\n");
}

function uniqLines(str) {
  return [...new Set(str.split("\n"))].join("\n");
}

function shuffle(array) {
  for (let i = array.length; 1 < i; i--) {
    const k = Math.floor(Math.random() * i);
    [array[k], array[i - 1]] = [array[i - 1], array[k]];
  }
  return array;
}

function shuffleLines(str) {
  return shuffle(str.split("\n")).join("\n");
}

function camelToPascal(str) {
  return str.replace(/[a-zA-Z]+/g, (s) => s[0].toUpperCase() + s.slice(1));
}

function pascalToCamel(str) {
  return str.replace(/[a-zA-Z]+/g, (s) => s[0].toLowerCase() + s.slice(1));
}

function camelToSnake(str) {
  return str.replace(/[A-Z]/g, (s) => `_${s.toLowerCase()}`);
}

function snakeToCamel(str) {
  return str.replace(/_./g, (s) => s.charAt(1).toUpperCase());
}

function toSnakeNumber(str) {
  return str.replace(/([a-z])([0-9]+)/g, "$1_$2");
}

function toNoSnakeNumber(str) {
  return str.replace(/_([0-9]+)/g, "$1");
}

function kanaToHira(str) {
  return str.replace(/[\u30a1-\u30f6]/g, (match) => {
    const chr = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(chr);
  });
}

function hiraToKana(str) {
  return str.replace(/[\u3041-\u3096]/g, (match) => {
    const chr = match.charCodeAt(0) + 0x60;
    return String.fromCharCode(chr);
  });
}

// https://babu-babu-baboo.hateblo.jp/entry/20091114/1258161477
// https://ja.wikipedia.org/wiki/ローマ字
function hiraToRoma(str) {
  const roman = {
    "ふぁ": "fa",
    "ふぃ": "fi",
    "ふぇ": "fe",
    "ふぉ": "fo",
    "きゃ": "kya",
    "きゅ": "kyu",
    "きょ": "kyo",
    "しゃ": "sha",
    "しゅ": "shu",
    "しょ": "sho",
    "ちゃ": "tya",
    "ちゅ": "tyu",
    "ちょ": "tyo",
    "にゃ": "nya",
    "にゅ": "nyu",
    "にょ": "nyo",
    "ひゃ": "hya",
    "ひゅ": "hyu",
    "ひょ": "hyo",
    "みゃ": "mya",
    "みゅ": "myu",
    "みょ": "myo",
    "りゃ": "rya",
    "りゅ": "ryu",
    "りょ": "ryo",
    "ふゃ": "fya",
    "ふゅ": "fyu",
    "ふょ": "fyo",
    "ぴゃ": "pya",
    "ぴゅ": "pyu",
    "ぴょ": "pyo",
    "びゃ": "bya",
    "びゅ": "byu",
    "びょ": "byo",
    "ぢゃ": "dya",
    "ぢゅ": "dyu",
    "ぢょ": "dyo",
    "じゃ": "ja",
    "じゅ": "ju",
    "じょ": "jo",
    "ぎゃ": "gya",
    "ぎゅ": "gyu",
    "ぎょ": "gyo",
    "ゔぁ": "va",
    "ゔぃ": "vi",
    "ゔ": "vu",
    "ゔぇ": "ve",
    "ゔぉ": "vo",
    "ぱ": "pa",
    "ぴ": "pi",
    "ぷ": "pu",
    "ぺ": "pe",
    "ぽ": "po",
    "ば": "ba",
    "び": "bi",
    "ぶ": "bu",
    "べ": "be",
    "ぼ": "bo",
    "だ": "da",
    "ぢ": "di",
    "づ": "du",
    "で": "de",
    "ど": "do",
    "ざ": "za",
    "じ": "ji",
    "ず": "zu",
    "ぜ": "ze",
    "ぞ": "zo",
    "が": "ga",
    "ぎ": "gi",
    "ぐ": "gu",
    "げ": "ge",
    "ご": "go",
    "わ": "wa",
    "うぃ": "wi",
    // "う": "wu",
    "うぇ": "we",
    "を": "wo",
    "ら": "ra",
    "り": "ri",
    "る": "ru",
    "れ": "re",
    "ろ": "ro",
    "や": "ya",
    "ゆ": "yu",
    "よ": "yo",
    "ま": "ma",
    "み": "mi",
    "む": "mu",
    "め": "me",
    "も": "mo",
    "は": "ha",
    "ひ": "hi",
    "ふ": "fu",
    "へ": "he",
    "ほ": "ho",
    "な": "na",
    "に": "ni",
    "ぬ": "nu",
    "ね": "ne",
    "の": "no",
    "た": "ta",
    "ち": "chi",
    "つ": "tsu",
    "て": "te",
    "と": "to",
    "さ": "sa",
    "し": "shi",
    "す": "su",
    "せ": "se",
    "そ": "so",
    "か": "ka",
    "き": "ki",
    "く": "ku",
    "け": "ke",
    "こ": "ko",
    "あ": "a",
    "い": "i",
    "う": "u",
    "え": "e",
    "お": "o",
    "ぁ": "la",
    "ぃ": "li",
    "ぅ": "lu",
    "ぇ": "le",
    "ぉ": "lo",
    "ん": "nn",
  };
  const regTu = /っ([bcdfghijklmnopqrstuvwyz])/gm;
  const regXtu = /っ/gm;

  let pnt = 0;
  const max = str.length;
  let s, r;
  let txt = "";

  while (pnt <= max) {
    r = roman[str.substring(pnt, pnt + 2)];
    if (r) {
      txt += r;
      pnt += 2;
    } else {
      s = str.substring(pnt, pnt + 1);
      r = roman[s];
      txt += r ? r : s;
      pnt += 1;
    }
  }
  txt = txt.replace(regTu, "$1$1");
  txt = txt.replace(regXtu, "xtu");
  return txt;
}

// https://babu-babu-baboo.hateblo.jp/entry/20091114/1258161477
// https://ja.wikipedia.org/wiki/ローマ字
function kanaToRoma(str) {
  const roman = {
    "ファ": "fa",
    "フィ": "fi",
    "フェ": "fe",
    "フォ": "fo",
    "キャ": "kya",
    "キュ": "kyu",
    "キョ": "kyo",
    "シャ": "sha",
    "シュ": "shu",
    "ショ": "sho",
    "チャ": "tya",
    "チュ": "tyu",
    "チョ": "tyo",
    "ニャ": "nya",
    "ニュ": "nyu",
    "ニョ": "nyo",
    "ヒャ": "hya",
    "ヒュ": "hyu",
    "ヒョ": "hyo",
    "ミャ": "mya",
    "ミュ": "myu",
    "ミョ": "myo",
    "リャ": "rya",
    "リュ": "ryu",
    "リョ": "ryo",
    "フャ": "fya",
    "フュ": "fyu",
    "フョ": "fyo",
    "ピャ": "pya",
    "ピュ": "pyu",
    "ピョ": "pyo",
    "ビャ": "bya",
    "ビュ": "byu",
    "ビョ": "byo",
    "ヂャ": "dya",
    "ヂュ": "dyu",
    "ヂョ": "dyo",
    "ジャ": "ja",
    "ジュ": "ju",
    "ジョ": "jo",
    "ギャ": "gya",
    "ギュ": "gyu",
    "ギョ": "gyo",
    "ヴァ": "va",
    "ヴィ": "vi",
    "ヴ": "vu",
    "ヴェ": "ve",
    "ヴォ": "vo",
    "パ": "pa",
    "ピ": "pi",
    "プ": "pu",
    "ペ": "pe",
    "ポ": "po",
    "バ": "ba",
    "ビ": "bi",
    "ブ": "bu",
    "ベ": "be",
    "ボ": "bo",
    "ダ": "da",
    "ヂ": "di",
    "ヅ": "du",
    "デ": "de",
    "ド": "do",
    "ザ": "za",
    "ジ": "ji",
    "ズ": "zu",
    "ゼ": "ze",
    "ゾ": "zo",
    "ガ": "ga",
    "ギ": "gi",
    "グ": "gu",
    "ゲ": "ge",
    "ゴ": "go",
    "ワ": "wa",
    "ウィ": "wi",
    // "ウ": "wu",
    "ウェ": "we",
    "ヲ": "wo",
    "ラ": "ra",
    "リ": "ri",
    "ル": "ru",
    "レ": "re",
    "ロ": "ro",
    "ヤ": "ya",
    "ユ": "yu",
    "ヨ": "yo",
    "マ": "ma",
    "ミ": "mi",
    "ム": "mu",
    "メ": "me",
    "モ": "mo",
    "ハ": "ha",
    "ヒ": "hi",
    "フ": "fu",
    "ヘ": "he",
    "ホ": "ho",
    "ナ": "na",
    "ニ": "ni",
    "ヌ": "nu",
    "ネ": "ne",
    "ノ": "no",
    "タ": "ta",
    "チ": "chi",
    "ツ": "tsu",
    "テ": "te",
    "ト": "to",
    "サ": "sa",
    "シ": "shi",
    "ス": "su",
    "セ": "se",
    "ソ": "so",
    "カ": "ka",
    "キ": "ki",
    "ク": "ku",
    "ケ": "ke",
    "コ": "ko",
    "ア": "a",
    "イ": "i",
    "ウ": "u",
    "エ": "e",
    "オ": "o",
    "ァ": "la",
    "ィ": "li",
    "ゥ": "lu",
    "ェ": "le",
    "ォ": "lo",
    "ン": "nn",
  };
  const regTu = /ッ([bcdfghijklmnopqrstuvwyz])/gm;
  const regXtu = /ッ/gm;

  let pnt = 0;
  const max = str.length;
  let s, r;
  let txt = "";

  while (pnt <= max) {
    r = roman[str.substring(pnt, pnt + 2)];
    if (r) {
      txt += r;
      pnt += 2;
    } else {
      s = str.substring(pnt, pnt + 1);
      r = roman[s];
      txt += r ? r : s;
      pnt += 1;
    }
  }
  txt = txt.replace(regTu, "$1$1");
  txt = txt.replace(regXtu, "xtu");
  return txt;
}

// https://qiita.com/recordare/items/35a27f6b88b9413fef91
function romaToHira(str) {
  const tree = {
    a: "あ",
    i: "い",
    u: "う",
    e: "え",
    o: "お",
    k: {
      a: "か",
      i: "き",
      u: "く",
      e: "け",
      o: "こ",
      y: { a: "きゃ", i: "きぃ", u: "きゅ", e: "きぇ", o: "きょ" },
    },
    s: {
      a: "さ",
      i: "し",
      u: "す",
      e: "せ",
      o: "そ",
      h: { a: "しゃ", i: "し", u: "しゅ", e: "しぇ", o: "しょ" },
      y: { a: "しゃ", i: "しぃ", u: "しゅ", e: "しぇ", o: "しょ" },
    },
    t: {
      a: "た",
      i: "ち",
      u: "つ",
      e: "て",
      o: "と",
      h: { a: "てゃ", i: "てぃ", u: "てゅ", e: "てぇ", o: "てょ" },
      y: { a: "ちゃ", i: "ちぃ", u: "ちゅ", e: "ちぇ", o: "ちょ" },
      s: { a: "つぁ", i: "つぃ", u: "つ", e: "つぇ", o: "つぉ" },
    },
    c: {
      a: "か",
      i: "し",
      u: "く",
      e: "せ",
      o: "こ",
      h: { a: "ちゃ", i: "ち", u: "ちゅ", e: "ちぇ", o: "ちょ" },
      y: { a: "ちゃ", i: "ちぃ", u: "ちゅ", e: "ちぇ", o: "ちょ" },
    },
    q: {
      a: "くぁ",
      i: "くぃ",
      u: "く",
      e: "くぇ",
      o: "くぉ",
    },
    n: {
      a: "な",
      i: "に",
      u: "ぬ",
      e: "ね",
      o: "の",
      n: "ん",
      y: { a: "にゃ", i: "にぃ", u: "にゅ", e: "にぇ", o: "にょ" },
    },
    h: {
      a: "は",
      i: "ひ",
      u: "ふ",
      e: "へ",
      o: "ほ",
      y: { a: "ひゃ", i: "ひぃ", u: "ひゅ", e: "ひぇ", o: "ひょ" },
    },
    f: {
      a: "ふぁ",
      i: "ふぃ",
      u: "ふ",
      e: "ふぇ",
      o: "ふぉ",
      y: { a: "ふゃ", u: "ふゅ", o: "ふょ" },
    },
    m: {
      a: "ま",
      i: "み",
      u: "む",
      e: "め",
      o: "も",
      y: { a: "みゃ", i: "みぃ", u: "みゅ", e: "みぇ", o: "みょ" },
    },
    y: { a: "や", i: "い", u: "ゆ", e: "いぇ", o: "よ" },
    r: {
      a: "ら",
      i: "り",
      u: "る",
      e: "れ",
      o: "ろ",
      y: { a: "りゃ", i: "りぃ", u: "りゅ", e: "りぇ", o: "りょ" },
    },
    w: { a: "わ", i: "うぃ", u: "う", e: "うぇ", o: "を" },
    g: {
      a: "が",
      i: "ぎ",
      u: "ぐ",
      e: "げ",
      o: "ご",
      y: { a: "ぎゃ", i: "ぎぃ", u: "ぎゅ", e: "ぎぇ", o: "ぎょ" },
    },
    z: {
      a: "ざ",
      i: "じ",
      u: "ず",
      e: "ぜ",
      o: "ぞ",
      y: { a: "じゃ", i: "じぃ", u: "じゅ", e: "じぇ", o: "じょ" },
    },
    j: {
      a: "じゃ",
      i: "じ",
      u: "じゅ",
      e: "じぇ",
      o: "じょ",
      y: { a: "じゃ", i: "じぃ", u: "じゅ", e: "じぇ", o: "じょ" },
    },
    d: {
      a: "だ",
      i: "ぢ",
      u: "づ",
      e: "で",
      o: "ど",
      h: { a: "でゃ", i: "でぃ", u: "でゅ", e: "でぇ", o: "でょ" },
      y: { a: "ぢゃ", i: "ぢぃ", u: "ぢゅ", e: "ぢぇ", o: "ぢょ" },
    },
    b: {
      a: "ば",
      i: "び",
      u: "ぶ",
      e: "べ",
      o: "ぼ",
      y: { a: "びゃ", i: "びぃ", u: "びゅ", e: "びぇ", o: "びょ" },
    },
    v: {
      a: "ゔぁ",
      i: "ゔぃ",
      u: "ゔ",
      e: "ゔぇ",
      o: "ゔぉ",
      y: { a: "ゔゃ", i: "ゔぃ", u: "ゔゅ", e: "ゔぇ", o: "ゔょ" },
    },
    p: {
      a: "ぱ",
      i: "ぴ",
      u: "ぷ",
      e: "ぺ",
      o: "ぽ",
      y: { a: "ぴゃ", i: "ぴぃ", u: "ぴゅ", e: "ぴぇ", o: "ぴょ" },
    },
    x: {
      a: "ぁ",
      i: "ぃ",
      u: "ぅ",
      e: "ぇ",
      o: "ぉ",
      y: {
        a: "ゃ",
        i: "ぃ",
        u: "ゅ",
        e: "ぇ",
        o: "ょ",
      },
      t: {
        u: "っ",
        s: {
          u: "っ",
        },
      },
    },
    l: {
      a: "ぁ",
      i: "ぃ",
      u: "ぅ",
      e: "ぇ",
      o: "ぉ",
      y: {
        a: "ゃ",
        i: "ぃ",
        u: "ゅ",
        e: "ぇ",
        o: "ょ",
      },
      t: {
        u: "っ",
        s: {
          u: "っ",
        },
      },
    },
  };

  str = str.toLowerCase();
  let result = "";
  let tmp = "";
  let index = 0;
  const len = str.length;
  let node = tree;
  const push = (char, toRoot) => {
    result += char;
    tmp = "";
    node = toRoot ? tree : node;
  };
  while (index < len) {
    const char = str.charAt(index);
    if (char.match(/[a-z]/)) { // 英数字以外は考慮しない
      if (char in node) {
        const next = node[char];
        if (typeof next === "string") {
          push(next);
        } else {
          tmp += str.charAt(index);
          node = next;
        }
        index++;
        continue;
      }
      const prev = str.charAt(index - 1);
      if (prev && (prev === "n" || prev === char)) { // 促音やnへの対応
        push(prev === "n" ? "ん" : "っ", false);
      }
      if (node !== tree && char in tree) { // 今のノードがルート以外だった場合、仕切り直してチェックする
        push(tmp);
        continue;
      }
    }
    push(tmp + char);
    index++;
  }
  tmp = tmp.replace(/n$/, "ん"); // 末尾のnは変換する
  push(tmp);
  return result;
}

// https://qiita.com/recordare/items/35a27f6b88b9413fef91
function romaToKana(str) {
  const tree = {
    a: "ア",
    i: "イ",
    u: "ウ",
    e: "エ",
    o: "オ",
    k: {
      a: "カ",
      i: "キ",
      u: "ク",
      e: "ケ",
      o: "コ",
      y: { a: "キャ", i: "キィ", u: "キュ", e: "キェ", o: "キョ" },
    },
    s: {
      a: "サ",
      i: "シ",
      u: "ス",
      e: "セ",
      o: "ソ",
      h: { a: "シャ", i: "シ", u: "シュ", e: "シェ", o: "ショ" },
      y: { a: "シャ", i: "シィ", u: "シュ", e: "シェ", o: "ショ" },
    },
    t: {
      a: "タ",
      i: "チ",
      u: "ツ",
      e: "テ",
      o: "ト",
      h: { a: "テャ", i: "ティ", u: "テュ", e: "テェ", o: "テョ" },
      y: { a: "チャ", i: "チィ", u: "チュ", e: "チェ", o: "チョ" },
      s: { a: "ツァ", i: "ツィ", u: "ツ", e: "ツェ", o: "ツォ" },
    },
    c: {
      a: "カ",
      i: "シ",
      u: "ク",
      e: "セ",
      o: "コ",
      h: { a: "チャ", i: "チ", u: "チュ", e: "チェ", o: "チョ" },
      y: { a: "チャ", i: "チィ", u: "チュ", e: "チェ", o: "チョ" },
    },
    q: {
      a: "クァ",
      i: "クィ",
      u: "ク",
      e: "クェ",
      o: "クォ",
    },
    n: {
      a: "ナ",
      i: "ニ",
      u: "ヌ",
      e: "ネ",
      o: "ノ",
      n: "ン",
      y: { a: "ニャ", i: "ニィ", u: "ニュ", e: "ニェ", o: "ニョ" },
    },
    h: {
      a: "ハ",
      i: "ヒ",
      u: "フ",
      e: "ヘ",
      o: "ホ",
      y: { a: "ヒャ", i: "ヒィ", u: "ヒュ", e: "ヒェ", o: "ヒョ" },
    },
    f: {
      a: "ファ",
      i: "フィ",
      u: "フ",
      e: "フェ",
      o: "フォ",
      y: { a: "フャ", u: "フュ", o: "フョ" },
    },
    m: {
      a: "マ",
      i: "ミ",
      u: "ム",
      e: "メ",
      o: "モ",
      y: { a: "ミャ", i: "ミィ", u: "ミュ", e: "ミェ", o: "ミョ" },
    },
    y: { a: "ヤ", i: "イ", u: "ユ", e: "イェ", o: "ヨ" },
    r: {
      a: "ラ",
      i: "リ",
      u: "ル",
      e: "レ",
      o: "ロ",
      y: { a: "リャ", i: "リィ", u: "リュ", e: "リェ", o: "リョ" },
    },
    w: { a: "ワ", i: "ウィ", u: "ウ", e: "ウェ", o: "ヲ" },
    g: {
      a: "ガ",
      i: "ギ",
      u: "グ",
      e: "ゲ",
      o: "ゴ",
      y: { a: "ギャ", i: "ギィ", u: "ギュ", e: "ギェ", o: "ギョ" },
    },
    z: {
      a: "ザ",
      i: "ジ",
      u: "ズ",
      e: "ゼ",
      o: "ゾ",
      y: { a: "ジャ", i: "ジィ", u: "ジュ", e: "ジェ", o: "ジョ" },
    },
    j: {
      a: "ジャ",
      i: "ジ",
      u: "ジュ",
      e: "ジェ",
      o: "ジョ",
      y: { a: "ジャ", i: "ジィ", u: "ジュ", e: "ジェ", o: "ジョ" },
    },
    d: {
      a: "ダ",
      i: "ヂ",
      u: "ヅ",
      e: "デ",
      o: "ド",
      h: { a: "デャ", i: "ディ", u: "デュ", e: "デェ", o: "デョ" },
      y: { a: "ヂャ", i: "ヂィ", u: "ヂュ", e: "ヂェ", o: "ヂョ" },
    },
    b: {
      a: "バ",
      i: "ビ",
      u: "ブ",
      e: "ベ",
      o: "ボ",
      y: { a: "ビャ", i: "ビィ", u: "ビュ", e: "ビェ", o: "ビョ" },
    },
    v: {
      a: "ヴァ",
      i: "ヴィ",
      u: "ヴ",
      e: "ヴェ",
      o: "ヴォ",
      y: { a: "ヴャ", i: "ヴィ", u: "ヴュ", e: "ヴェ", o: "ヴョ" },
    },
    p: {
      a: "パ",
      i: "ピ",
      u: "プ",
      e: "ペ",
      o: "ポ",
      y: { a: "ピャ", i: "ピィ", u: "ピュ", e: "ピェ", o: "ピョ" },
    },
    x: {
      a: "ァ",
      i: "ィ",
      u: "ゥ",
      e: "ェ",
      o: "ォ",
      y: {
        a: "ャ",
        i: "ィ",
        u: "ュ",
        e: "ェ",
        o: "ョ",
      },
      t: {
        u: "ッ",
        s: {
          u: "ッ",
        },
      },
    },
    l: {
      a: "ァ",
      i: "ィ",
      u: "ゥ",
      e: "ェ",
      o: "ォ",
      y: {
        a: "ャ",
        i: "ィ",
        u: "ュ",
        e: "ェ",
        o: "ョ",
      },
      t: {
        u: "ッ",
        s: {
          u: "ッ",
        },
      },
    },
  };

  str = str.toLowerCase();
  let result = "";
  let tmp = "";
  let index = 0;
  const len = str.length;
  let node = tree;
  const push = (char, toRoot) => {
    result += char;
    tmp = "";
    node = toRoot ? tree : node;
  };
  while (index < len) {
    const char = str.charAt(index);
    if (char.match(/[a-z]/)) { // 英数字以外は考慮しない
      if (char in node) {
        const next = node[char];
        if (typeof next === "string") {
          push(next);
        } else {
          tmp += str.charAt(index);
          node = next;
        }
        index++;
        continue;
      }
      const prev = str.charAt(index - 1);
      if (prev && (prev === "n" || prev === char)) { // 促音やnへの対応
        push(prev === "n" ? "ン" : "ッ", false);
      }
      if (node !== tree && char in tree) { // 今のノードがルート以外だった場合、仕切り直してチェックする
        push(tmp);
        continue;
      }
    }
    push(tmp + char);
    index++;
  }
  tmp = tmp.replace(/n$/, "ン"); // 末尾のnは変換する
  push(tmp);
  return result;
}

function zenRomaToHanRoma(str) {
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  });
}

function hanRomaToZenRoma(str) {
  return str.replace(/[A-Za-z0-9]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
  });
}

// https://www.paveway.info/entry/2021/09/11/javascript_halfwidth2fullwidthsymbol
function hanSmbolToZenSymbol(str) {
  return str.replace(/[!-\/:-@\[-\{-~]/g, (s) => {
    return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
  });
}

function zenSymbolToHanSymbol(str) {
  return str.replace(/[！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｀｛|}～]/g, (s) => {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  });
}

// https://www.yoheim.net/blog.php?q=20191101
function zenKanaToHanKana(str) {
  const kanaMap = {
    "ガ": "ｶﾞ",
    "ギ": "ｷﾞ",
    "グ": "ｸﾞ",
    "ゲ": "ｹﾞ",
    "ゴ": "ｺﾞ",
    "ザ": "ｻﾞ",
    "ジ": "ｼﾞ",
    "ズ": "ｽﾞ",
    "ゼ": "ｾﾞ",
    "ゾ": "ｿﾞ",
    "ダ": "ﾀﾞ",
    "ヂ": "ﾁﾞ",
    "ヅ": "ﾂﾞ",
    "デ": "ﾃﾞ",
    "ド": "ﾄﾞ",
    "バ": "ﾊﾞ",
    "ビ": "ﾋﾞ",
    "ブ": "ﾌﾞ",
    "ベ": "ﾍﾞ",
    "ボ": "ﾎﾞ",
    "パ": "ﾊﾟ",
    "ピ": "ﾋﾟ",
    "プ": "ﾌﾟ",
    "ペ": "ﾍﾟ",
    "ポ": "ﾎﾟ",
    "ヴ": "ｳﾞ",
    "ヷ": "ﾜﾞ",
    "ヺ": "ｦﾞ",
    "ア": "ｱ",
    "イ": "ｲ",
    "ウ": "ｳ",
    "エ": "ｴ",
    "オ": "ｵ",
    "カ": "ｶ",
    "キ": "ｷ",
    "ク": "ｸ",
    "ケ": "ｹ",
    "コ": "ｺ",
    "サ": "ｻ",
    "シ": "ｼ",
    "ス": "ｽ",
    "セ": "ｾ",
    "ソ": "ｿ",
    "タ": "ﾀ",
    "チ": "ﾁ",
    "ツ": "ﾂ",
    "テ": "ﾃ",
    "ト": "ﾄ",
    "ナ": "ﾅ",
    "ニ": "ﾆ",
    "ヌ": "ﾇ",
    "ネ": "ﾈ",
    "ノ": "ﾉ",
    "ハ": "ﾊ",
    "ヒ": "ﾋ",
    "フ": "ﾌ",
    "ヘ": "ﾍ",
    "ホ": "ﾎ",
    "マ": "ﾏ",
    "ミ": "ﾐ",
    "ム": "ﾑ",
    "メ": "ﾒ",
    "モ": "ﾓ",
    "ヤ": "ﾔ",
    "ユ": "ﾕ",
    "ヨ": "ﾖ",
    "ラ": "ﾗ",
    "リ": "ﾘ",
    "ル": "ﾙ",
    "レ": "ﾚ",
    "ロ": "ﾛ",
    "ワ": "ﾜ",
    "ヲ": "ｦ",
    "ン": "ﾝ",
    "ァ": "ｧ",
    "ィ": "ｨ",
    "ゥ": "ｩ",
    "ェ": "ｪ",
    "ォ": "ｫ",
    "ッ": "ｯ",
    "ャ": "ｬ",
    "ュ": "ｭ",
    "ョ": "ｮ",
    "。": "｡",
    "、": "､",
    "ー": "ｰ",
    "「": "｢",
    "」": "｣",
    "・": "･",
  };
  const reg = new RegExp("(" + Object.keys(kanaMap).join("|") + ")", "g");
  return str
    .replace(reg, (match) => kanaMap[match])
    .replace(/゛/g, "ﾞ")
    .replace(/゜/g, "ﾟ");
}

// https://www.yoheim.net/blog.php?q=20191101
function hanKanaToZenKana(str) {
  const kanaMap = {
    "ｶﾞ": "ガ",
    "ｷﾞ": "ギ",
    "ｸﾞ": "グ",
    "ｹﾞ": "ゲ",
    "ｺﾞ": "ゴ",
    "ｻﾞ": "ザ",
    "ｼﾞ": "ジ",
    "ｽﾞ": "ズ",
    "ｾﾞ": "ゼ",
    "ｿﾞ": "ゾ",
    "ﾀﾞ": "ダ",
    "ﾁﾞ": "ヂ",
    "ﾂﾞ": "ヅ",
    "ﾃﾞ": "デ",
    "ﾄﾞ": "ド",
    "ﾊﾞ": "バ",
    "ﾋﾞ": "ビ",
    "ﾌﾞ": "ブ",
    "ﾍﾞ": "ベ",
    "ﾎﾞ": "ボ",
    "ﾊﾟ": "パ",
    "ﾋﾟ": "ピ",
    "ﾌﾟ": "プ",
    "ﾍﾟ": "ペ",
    "ﾎﾟ": "ポ",
    "ｳﾞ": "ヴ",
    "ﾜﾞ": "ヷ",
    "ｦﾞ": "ヺ",
    "ｱ": "ア",
    "ｲ": "イ",
    "ｳ": "ウ",
    "ｴ": "エ",
    "ｵ": "オ",
    "ｶ": "カ",
    "ｷ": "キ",
    "ｸ": "ク",
    "ｹ": "ケ",
    "ｺ": "コ",
    "ｻ": "サ",
    "ｼ": "シ",
    "ｽ": "ス",
    "ｾ": "セ",
    "ｿ": "ソ",
    "ﾀ": "タ",
    "ﾁ": "チ",
    "ﾂ": "ツ",
    "ﾃ": "テ",
    "ﾄ": "ト",
    "ﾅ": "ナ",
    "ﾆ": "ニ",
    "ﾇ": "ヌ",
    "ﾈ": "ネ",
    "ﾉ": "ノ",
    "ﾊ": "ハ",
    "ﾋ": "ヒ",
    "ﾌ": "フ",
    "ﾍ": "ヘ",
    "ﾎ": "ホ",
    "ﾏ": "マ",
    "ﾐ": "ミ",
    "ﾑ": "ム",
    "ﾒ": "メ",
    "ﾓ": "モ",
    "ﾔ": "ヤ",
    "ﾕ": "ユ",
    "ﾖ": "ヨ",
    "ﾗ": "ラ",
    "ﾘ": "リ",
    "ﾙ": "ル",
    "ﾚ": "レ",
    "ﾛ": "ロ",
    "ﾜ": "ワ",
    "ｦ": "ヲ",
    "ﾝ": "ン",
    "ｧ": "ァ",
    "ｨ": "ィ",
    "ｩ": "ゥ",
    "ｪ": "ェ",
    "ｫ": "ォ",
    "ｯ": "ッ",
    "ｬ": "ャ",
    "ｭ": "ュ",
    "ｮ": "ョ",
    "｡": "。",
    "､": "、",
    "ｰ": "ー",
    "｢": "「",
    "｣": "」",
    "･": "・",
  };

  const reg = new RegExp("(" + Object.keys(kanaMap).join("|") + ")", "g");
  return str
    .replace(reg, (match) => kanaMap[match])
    .replace(/ﾞ/g, "゛")
    .replace(/ﾟ/g, "゜");
}

function stringReplace() {
  const from = document.getElementById("stringReplaceFrom").value;
  const to = document.getElementById("stringReplaceTo").value;
  toText.value = fromText.value.replaceAll(from, to);
  toText.onchange();
}

function regexpReplace() {
  const from = document.getElementById("regexpReplaceFrom").value;
  const to = document.getElementById("regexpReplaceTo").value;
  const regexp = new RegExp(from, "g");
  toText.value = fromText.value.replaceAll(regexp, to);
  toText.onchange();
}

function numbering() {
  let n = parseInt(document.getElementById("numberingStart").value);
  if (!n) n = 0;
  const from = document.getElementById("numberingFrom").value;
  const to = document.getElementById("numberingTo").value;
  const regexp = new RegExp(from, "g");
  const url =
    "https://cdn.jsdelivr.net/npm/sprintf-js@1.1.2/src/sprintf.min.js";
  import(url).then(() => {
    function replacer() {
      const result = sprintf(to, n);
      n += 1;
      return result;
    }
    toText.value = fromText.value.replaceAll(regexp, replacer);
    toText.onchange();
  });
}

function extractColumns() {
  const separator = document.getElementById("extractColumnsSeparator").value
    .replaceAll(/\\['"nt]/g, "\t");
  const separatorRegexp = new RegExp(separator, "g");
  const target = document.getElementById("extractColumnsTarget").value
    .split(/\s*,\s*/).map((s) => parseInt(s) - 1);
  const result = fromText.value.split("\n").map((line) => {
    const cols = line.split(separatorRegexp);
    const extracted = cols.filter((_col, i) => target.includes(i));
    return extracted.join(separator);
  }).join("\n");
  toText.value = result;
  toText.onchange();
}

function extractUrls() {
  // https://www.rfc-editor.org/rfc/rfc3986
  // https://www.asahi-net.or.jp/~ax2s-kmtn/ref/uric.html
  function getUrlRegexp(japanese) {
    if (japanese) {
      const regstr =
        "https?://[A-Za-z0-9\u3000-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3!#\\$&'\\(\\)\\*\\+,/:;=\\?@\\[\\]\\._~-]+";
      return new RegExp(regstr, "g");
    } else {
      const regstr =
        "https?://[A-Za-z0-9!#\\$&'\\(\\)\\*\\+,/:;=\\?@\\[\\]\\._~-]+";
      return new RegExp(regstr, "g");
    }
  }
  const japanese = document.getElementById("extractUrlsJapanese").checked;
  const urlRegexp = getUrlRegexp(japanese);
  const exts = document.getElementById("extractUrlsExtensions").value;
  if (exts == "") {
    const result = [...fromText.value.matchAll(urlRegexp)]
      .map((m) => m[0])
      .join("\n");
    toText.value = result;
  } else {
    const extsRegstr = exts.split(/\s*,\s*/)
      .map((ext) => "\." + ext).join("|") + "$";
    const extsRegexp = new RegExp(extsRegstr);
    const result = [...fromText.value.matchAll(urlRegexp)]
      .map((m) => m[0])
      .filter((url) => extsRegexp.test(url))
      .join("\n");
    toText.value = result;
  }
  toText.onchange();
}

function increaseText() {
  const textarea = document.getElementById("editor");
  const fontSize = parseInt(getComputedStyle(textarea).fontSize) + 1;
  textarea.style.fontSize = fontSize + "px";
}

function decreaseText() {
  const textarea = document.getElementById("editor");
  const fontSize = parseInt(getComputedStyle(textarea).fontSize) - 1;
  textarea.style.fontSize = fontSize + "px";
}

function runCode() {
  const code = document.getElementById("editor").value;
  return Function(code)();
}

function sleep(msec) {
  return new Promise((resolve) => setTimeout(resolve, msec));
}

function addClipboardButtons() {
  [...document.getElementsByClassName("clipboard")].forEach((clipboard) => {
    const container = clipboard.parentNode;
    container.addEventListener("mouseover", () => {
      clipboard.classList.remove("invisible");
    });
    container.addEventListener("mouseleave", () => {
      clipboard.classList.add("invisible");
    });
    const textarea = clipboard.nextElementSibling;
    const button = clipboard.firstElementChild;
    button.onclick = async () => {
      const [copy, copied] = button.children;
      await navigator.clipboard.writeText(textarea.value);
      copy.classList.add("d-none");
      copied.classList.remove("d-none");
      await sleep(2000);
      copy.classList.remove("d-none");
      copied.classList.add("d-none");
    };
  });
}

loadConfig();
addClipboardButtons();
document.getElementById("toggleDarkMode").onclick = toggleDarkMode;
const fromText = document.getElementById("fromText");
const toText = document.getElementById("toText");
const procReverse = document.getElementById("procReverse");
fromText.onchange = () => {
  const text = fromText.value;
  const textLength = [...text].length;
  const whitespaceCount = (text.match(/\s/g) || []).length;
  document.getElementById("fromLength").value = textLength;
  document.getElementById("fromCount").value = textLength - whitespaceCount;
  document.getElementById("fromLinage").value =
    (text.match(/\n/g) || []).length;
};
toText.onchange = () => {
  const text = toText.value;
  const textLength = [...text].length;
  const whitespaceCount = (text.match(/\s/g) || []).length;
  document.getElementById("toLength").value = textLength;
  document.getElementById("toCount").value = textLength - whitespaceCount;
  document.getElementById("toLinage").value = (text.match(/\n/g) || []).length;
};
procReverse.onchange = () => {
  const label = document.getElementById("procReverseLabel");
  const commandList = document.getElementById("commandList");
  const buttons = [...commandList.getElementsByTagName("button")];
  if (procReverse.checked) {
    label.textContent = label.textContent = "出力 ← 入力";
    buttons.forEach((button) => {
      button.textContent = button.textContent.replace("→", "←");
    });
  } else {
    label.textContent = label.textContent = "入力 → 出力";
    buttons.forEach((button) => {
      button.textContent = button.textContent.replace("←", "→");
    });
  }
};
document.getElementById("htmlEscape").onclick = () => {
  if (procReverse.checked) {
    toText.value = htmlEscapeDecode(fromText.value);
  } else {
    toText.value = htmlEscapeEncode(fromText.value);
  }
  toText.onchange();
};
document.getElementById("html10").onclick = () => {
  if (procReverse.checked) {
    toText.value = html10Decode(fromText.value);
  } else {
    toText.value = html10Encode(fromText.value);
  }
  toText.onchange();
};
document.getElementById("html16").onclick = () => {
  if (procReverse.checked) {
    toText.value = html16Decode(fromText.value);
  } else {
    toText.value = html16Encode(fromText.value);
  }
  toText.onchange();
};
document.getElementById("unicodePoint").onclick = () => {
  if (procReverse.checked) {
    toText.value = unicodePointDecode(fromText.value);
  } else {
    toText.value = unicodePointEncode(fromText.value);
  }
  toText.onchange();
};
document.getElementById("unicodeUnit").onclick = () => {
  if (procReverse.checked) {
    toText.value = unicodeUnitDecode(fromText.value);
  } else {
    toText.value = unicodeUnitEncode(fromText.value);
  }
  toText.onchange();
};
document.getElementById("uri").onclick = () => {
  if (procReverse.checked) {
    toText.value = decodeURI(fromText.value);
  } else {
    toText.value = encodeURI(fromText.value);
  }
  toText.onchange();
};
document.getElementById("uriComponent").onclick = () => {
  if (procReverse.checked) {
    toText.value = decodeURIComponent(fromText.value);
  } else {
    toText.value = encodeURIComponent(fromText.value);
  }
  toText.onchange();
};
document.getElementById("base64").onclick = () => {
  if (procReverse.checked) {
    toText.value = atob(fromText.value);
  } else {
    toText.value = btoa(fromText.value);
  }
  toText.onchange();
};
document.getElementById("sortLines").onclick = () => {
  toText.value = sortLines(fromText.value);
  toText.onchange();
};
document.getElementById("uniqLines").onclick = () => {
  toText.value = uniqLines(fromText.value);
  toText.onchange();
};
document.getElementById("shuffleLines").onclick = () => {
  toText.value = shuffleLines(fromText.value);
  toText.onchange();
};
document.getElementById("camelToPascal").onclick = () => {
  if (procReverse.checked) {
    toText.value = pascalToCamel(fromText.value);
  } else {
    toText.value = camelToPascal(fromText.value);
  }
  toText.onchange();
};
document.getElementById("camelToSnake").onclick = () => {
  if (procReverse.checked) {
    toText.value = snakeToCamel(fromText.value);
  } else {
    toText.value = camelToSnake(fromText.value);
  }
  toText.onchange();
};
document.getElementById("snakeNumber").onclick = () => {
  if (procReverse.checked) {
    toText.value = toNoSnakeNumber(fromText.value);
  } else {
    toText.value = toSnakeNumber(fromText.value);
  }
  toText.onchange();
};
document.getElementById("upperLower").onclick = () => {
  if (procReverse.checked) {
    toText.value = fromText.value.toUpperCase();
  } else {
    toText.value = fromText.value.toLowerCase();
  }
  toText.onchange();
};
document.getElementById("hiraKana").onclick = () => {
  if (procReverse.checked) {
    toText.value = kanaToHira(fromText.value);
  } else {
    toText.value = hiraToKana(fromText.value);
  }
  toText.onchange();
};
document.getElementById("hiraRoma").onclick = () => {
  if (procReverse.checked) {
    toText.value = romaToHira(fromText.value);
  } else {
    toText.value = hiraToRoma(fromText.value);
  }
  toText.onchange();
};
document.getElementById("kanaRoma").onclick = () => {
  if (procReverse.checked) {
    toText.value = romaToKana(fromText.value);
  } else {
    toText.value = kanaToRoma(fromText.value);
  }
  toText.onchange();
};
document.getElementById("zenHanRoma").onclick = () => {
  if (procReverse.checked) {
    toText.value = hanRomaToZenRoma(fromText.value);
  } else {
    toText.value = zenRomaToHanRoma(fromText.value);
  }
  toText.onchange();
};
document.getElementById("zenHanSymbol").onclick = () => {
  if (procReverse.checked) {
    toText.value = hanSmbolToZenSymbol(fromText.value);
  } else {
    toText.value = zenSymbolToHanSymbol(fromText.value);
  }
  toText.onchange();
};
document.getElementById("zenHanKana").onclick = () => {
  if (procReverse.checked) {
    toText.value = hanKanaToZenKana(fromText.value);
  } else {
    toText.value = zenKanaToHanKana(fromText.value);
  }
  toText.onchange();
};
document.getElementById("zenHanAll").onclick = () => {
  let str = fromText.value;
  str = zenRomaToHanRoma(str);
  str = zenSymbolToHanSymbol(str);
  str = hanKanaToZenKana(str);
  toText.value = str;
  toText.onchange();
};
document.getElementById("stringReplace").onclick = stringReplace;
document.getElementById("regexpReplace").onclick = regexpReplace;
document.getElementById("numbering").onclick = numbering;
document.getElementById("extractColumns").onclick = extractColumns;
document.getElementById("extractUrls").onclick = extractUrls;
document.getElementById("increaseText").onclick = increaseText;
document.getElementById("decreaseText").onclick = decreaseText;
document.getElementById("runCode").onclick = runCode;
