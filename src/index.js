import { Tab } from "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/+esm";
import {
  hiraToRoma,
  romaToHira,
} from "https://cdn.jsdelivr.net/npm/hiraroma/+esm";
import {
  kanji2number,
  number2kanji,
} from "https://cdn.jsdelivr.net/npm/@geolonia/japanese-numeral@0.1.16/+esm";
import { sprintf } from "https://cdn.jsdelivr.net/npm/sprintf-js@1.1.2/+esm";
import { WordsNinja } from "./wordsninja.js";

function loadConfig() {
  if (localStorage.getItem("darkMode") == 1) {
    document.documentElement.setAttribute("data-bs-theme", "dark");
  }
}

function toggleDarkMode() {
  if (localStorage.getItem("darkMode") == 1) {
    localStorage.setItem("darkMode", 0);
    document.documentElement.setAttribute("data-bs-theme", "light");
  } else {
    localStorage.setItem("darkMode", 1);
    document.documentElement.setAttribute("data-bs-theme", "dark");
  }
}

function countTextLength(str) {
  if (Intl.Segmenter) {
    const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" });
    const segments = segmenter.segment(str);
    return [...segments].length;
  } else {
    return [...str].length;
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
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function htmlEscapeDecode(str) {
  return str.replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&apos;/g, "'")
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

function flatToPascal() {
  const wordsNinja = new WordsNinja();
  wordsNinja.loadDictionary("/text-utils/words-en.txt").then(() => {
    const arr = wordsNinja.splitSentence(fromText.value);
    toText.value = arr.join("_");
    toText.onchange();
  });
}

function pascalToFlat(str) {
  return str.replace(/_/g, "");
}

function toSnakeNumber(str) {
  return str.replace(/([a-z])([0-9]+)/g, "$1_$2");
}

function toNoSnakeNumber(str) {
  return str.replace(/_([0-9]+)/g, "$1");
}

function kanaToHira(str) {
  return str.replace(/[ァ-ヶ]/g, (match) => {
    const chr = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(chr);
  });
}

function hiraToKana(str) {
  return str.replace(/[ぁ-ゖ]/g, (match) => {
    const chr = match.charCodeAt(0) + 0x60;
    return String.fromCharCode(chr);
  });
}

function kanaToRoma() {
  function replacer(str) {
    const hira = kanaToHira(str);
    return hiraToRoma(hira);
  }
  const from = fromText.value.replace(/[ァ-ヴー]+/g, replacer);
  toText.value = from;
  toText.onchange();
}

function romaToKana() {
  const hira = romaToHira(fromText.value);
  toText.value = hiraToKana(hira);
  toText.onchange();
}

function zenRomaToHanRoma(str) {
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  });
}

function hanRomaToZenRoma(str) {
  return str.replace(/[A-Za-z0-9]/g, (s) => {
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
  return str.replace(
    /[！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｀｛|}～]/g,
    (s) => {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    },
  );
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

function numToKan() {
  toText.value = number2kanji(fromText.value);
  toText.onchange();
}

function kanToNum() {
  toText.value = kanji2number(fromText.value);
  toText.onchange();
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
  const regexp = new RegExp(from, "mg");
  toText.value = fromText.value.replaceAll(regexp, to);
  toText.onchange();
}

function numbering() {
  let n = parseInt(document.getElementById("numberingStart").value);
  if (!n) n = 0;
  const from = document.getElementById("numberingFrom").value;
  const to = document.getElementById("numberingTo").value;
  const regexp = new RegExp(from, "mg");
  function replacer() {
    const result = sprintf(to, n);
    n += 1;
    return result;
  }
  toText.value = fromText.value.replaceAll(regexp, replacer);
  toText.onchange();
}

function extractColumns() {
  const separator = document.getElementById("extractColumnsSeparator").value;
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

new Tab(document.getElementById("commandList"));
document.getElementById("toggleDarkMode").onclick = toggleDarkMode;
const fromText = document.getElementById("fromText");
const toText = document.getElementById("toText");
const procReverse = document.getElementById("procReverse");
fromText.onchange = () => {
  const text = fromText.value;
  const textLength = countTextLength(text);
  const whitespaceCount = (text.match(/\s/g) || []).length;
  const linage = (text.match(/\n/g) || []).length + 1;
  document.getElementById("fromLength").value = textLength;
  document.getElementById("fromCount").value = textLength - whitespaceCount;
  document.getElementById("fromLinage").value = linage;
};
toText.onchange = () => {
  const text = toText.value;
  const textLength = countTextLength(text);
  const whitespaceCount = (text.match(/\s/g) || []).length;
  const linage = (text.match(/\n/g) || []).length + 1;
  document.getElementById("toLength").value = textLength;
  document.getElementById("toCount").value = textLength - whitespaceCount;
  document.getElementById("toLinage").value = linage;
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
document.getElementById("flatToPascal").onclick = () => {
  if (procReverse.checked) {
    pascalToFlat(fromText.value);
  } else {
    flatToPascal(fromText.value);
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
    toText.onchange();
  } else {
    toText.value = hiraToRoma(fromText.value);
    toText.onchange();
  }
  toText.onchange();
};
document.getElementById("kanaRoma").onclick = () => {
  if (procReverse.checked) {
    romaToKana();
  } else {
    kanaToRoma();
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
document.getElementById("kanToNum").onclick = () => {
  if (procReverse.checked) {
    numToKan(fromText.value);
  } else {
    kanToNum(fromText.value);
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
