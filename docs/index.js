function loadConfig(){localStorage.getItem("darkMode")==1&&(document.documentElement.dataset.theme="dark")}function toggleDarkMode(){localStorage.getItem("darkMode")==1?(localStorage.setItem("darkMode",0),delete document.documentElement.dataset.theme):(localStorage.setItem("darkMode",1),document.documentElement.dataset.theme="dark")}function countTextLength(a){if(Intl.Segmenter){const b=new Intl.Segmenter("ja",{granularity:"grapheme"}),c=b.segment(a);return[...c].length}return[...a].length}function html10Decode(a){function b(b,a){return String.fromCodePoint(a)}return a.replace(/&#([0-9]+);/g,b)}function html10Encode(a){return[...a].map(a=>{const b=a.codePointAt(0);return`&#${b};`}).join("")}function html16Decode(a){function b(b,a){return String.fromCodePoint(parseInt(a,16))}return a.replace(/&#[xX]([0-9a-fA-F]+);/g,b)}function html16Encode(a){return[...a].map(a=>{const b=a.codePointAt(0).toString(16);return`&#x${b};`}).join("")}function unicodePointEncode(a){return[...a].map(a=>{const b=a.codePointAt(0).toString(16);return`\\u\{${b}\}`}).join("")}function unicodePointDecode(a){function b(b,a){return String.fromCodePoint(parseInt(a,16))}return a.replace(/\\u\{([0-9a-fA-F]+)\}/g,b)}function unicodeUnitEncode(a){return a.split("").map(a=>{const b=a.codePointAt(0).toString(16);return`\\u${b}`}).join("")}function unicodeUnitDecode(a){function b(b,a){return String.fromCodePoint(parseInt(a,16))}return a.replace(/\\u([0-9a-fA-F]+)/g,b)}function htmlEscapeEncode(a){return a.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&apos;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function htmlEscapeDecode(a){return a.replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&apos;/g,"'").replace(/&quot;/g,'"').replace(/&amp;/g,"&")}function sortLines(a){return a.split("\n").sort().join("\n")}function uniqLines(a){return[...new Set(a.split("\n"))].join("\n")}function shuffle(a){for(let b=a.length;1<b;b--){const c=Math.floor(Math.random()*b);[a[c],a[b-1]]=[a[b-1],a[c]]}return a}function shuffleLines(a){return shuffle(a.split("\n")).join("\n")}function camelToPascal(a){return a.replace(/[a-zA-Z]+/g,a=>a[0].toUpperCase()+a.slice(1))}function pascalToCamel(a){return a.replace(/[a-zA-Z]+/g,a=>a[0].toLowerCase()+a.slice(1))}function camelToSnake(a){return a.replace(/[A-Z]/g,a=>`_${a.toLowerCase()}`)}function snakeToCamel(a){return a.replace(/_./g,a=>a.charAt(1).toUpperCase())}function flatToPascal(){import("/text-utils/wordsninja.min.js").then(b=>{const a=new b.WordsNinja;a.loadDictionary("/text-utils/words-en.txt").then(()=>{const b=a.splitSentence(fromText.value);toText.value=b.join("_"),toText.onchange()})})}function pascalToFlat(a){return a.replace(/_/g,"")}function toSnakeNumber(a){return a.replace(/([a-z])([0-9]+)/g,"$1_$2")}function toNoSnakeNumber(a){return a.replace(/_([0-9]+)/g,"$1")}function kanaToHira(a){return a.replace(/[\u30a1-\u30f6]/g,a=>{const b=a.charCodeAt(0)-96;return String.fromCharCode(b)})}function hiraToKana(a){return a.replace(/[\u3041-\u3096]/g,a=>{const b=a.charCodeAt(0)+96;return String.fromCharCode(b)})}function hiraToRoma(d){const f={"ふぁ":"fa","ふぃ":"fi","ふぇ":"fe","ふぉ":"fo","きゃ":"kya","きゅ":"kyu","きょ":"kyo","しゃ":"sha","しゅ":"shu","しょ":"sho","ちゃ":"tya","ちゅ":"tyu","ちょ":"tyo","にゃ":"nya","にゅ":"nyu","にょ":"nyo","ひゃ":"hya","ひゅ":"hyu","ひょ":"hyo","みゃ":"mya","みゅ":"myu","みょ":"myo","りゃ":"rya","りゅ":"ryu","りょ":"ryo","ふゃ":"fya","ふゅ":"fyu","ふょ":"fyo","ぴゃ":"pya","ぴゅ":"pyu","ぴょ":"pyo","びゃ":"bya","びゅ":"byu","びょ":"byo","ぢゃ":"dya","ぢゅ":"dyu","ぢょ":"dyo","じゃ":"ja","じゅ":"ju","じょ":"jo","ぎゃ":"gya","ぎゅ":"gyu","ぎょ":"gyo","ゔぁ":"va","ゔぃ":"vi","ゔ":"vu","ゔぇ":"ve","ゔぉ":"vo","ぱ":"pa","ぴ":"pi","ぷ":"pu","ぺ":"pe","ぽ":"po","ば":"ba","び":"bi","ぶ":"bu","べ":"be","ぼ":"bo","だ":"da","ぢ":"di","づ":"du","で":"de","ど":"do","ざ":"za","じ":"ji","ず":"zu","ぜ":"ze","ぞ":"zo","が":"ga","ぎ":"gi","ぐ":"gu","げ":"ge","ご":"go","わ":"wa","うぃ":"wi","うぇ":"we","を":"wo","ら":"ra","り":"ri","る":"ru","れ":"re","ろ":"ro","や":"ya","ゆ":"yu","よ":"yo","ま":"ma","み":"mi","む":"mu","め":"me","も":"mo","は":"ha","ひ":"hi","ふ":"fu","へ":"he","ほ":"ho","な":"na","に":"ni","ぬ":"nu","ね":"ne","の":"no","た":"ta","ち":"chi","つ":"tsu","て":"te","と":"to","さ":"sa","し":"shi","す":"su","せ":"se","そ":"so","か":"ka","き":"ki","く":"ku","け":"ke","こ":"ko","あ":"a","い":"i","う":"u","え":"e","お":"o","ぁ":"la","ぃ":"li","ぅ":"lu","ぇ":"le","ぉ":"lo","ん":"nn"},i=/っ([bcdfghijklmnopqrstuvwyz])/gm,g=/っ/gm;let b=0;const h=d.length;let e,c,a="";while(b<=h)c=f[d.substring(b,b+2)],c?(a+=c,b+=2):(e=d.substring(b,b+1),c=f[e],a+=c||e,b+=1);return a=a.replace(i,"$1$1"),a=a.replace(g,"xtu"),a}function kanaToRoma(d){const f={"ファ":"fa","フィ":"fi","フェ":"fe","フォ":"fo","キャ":"kya","キュ":"kyu","キョ":"kyo","シャ":"sha","シュ":"shu","ショ":"sho","チャ":"tya","チュ":"tyu","チョ":"tyo","ニャ":"nya","ニュ":"nyu","ニョ":"nyo","ヒャ":"hya","ヒュ":"hyu","ヒョ":"hyo","ミャ":"mya","ミュ":"myu","ミョ":"myo","リャ":"rya","リュ":"ryu","リョ":"ryo","フャ":"fya","フュ":"fyu","フョ":"fyo","ピャ":"pya","ピュ":"pyu","ピョ":"pyo","ビャ":"bya","ビュ":"byu","ビョ":"byo","ヂャ":"dya","ヂュ":"dyu","ヂョ":"dyo","ジャ":"ja","ジュ":"ju","ジョ":"jo","ギャ":"gya","ギュ":"gyu","ギョ":"gyo","ヴァ":"va","ヴィ":"vi","ヴ":"vu","ヴェ":"ve","ヴォ":"vo","パ":"pa","ピ":"pi","プ":"pu","ペ":"pe","ポ":"po","バ":"ba","ビ":"bi","ブ":"bu","ベ":"be","ボ":"bo","ダ":"da","ヂ":"di","ヅ":"du","デ":"de","ド":"do","ザ":"za","ジ":"ji","ズ":"zu","ゼ":"ze","ゾ":"zo","ガ":"ga","ギ":"gi","グ":"gu","ゲ":"ge","ゴ":"go","ワ":"wa","ウィ":"wi","ウェ":"we","ヲ":"wo","ラ":"ra","リ":"ri","ル":"ru","レ":"re","ロ":"ro","ヤ":"ya","ユ":"yu","ヨ":"yo","マ":"ma","ミ":"mi","ム":"mu","メ":"me","モ":"mo","ハ":"ha","ヒ":"hi","フ":"fu","ヘ":"he","ホ":"ho","ナ":"na","ニ":"ni","ヌ":"nu","ネ":"ne","ノ":"no","タ":"ta","チ":"chi","ツ":"tsu","テ":"te","ト":"to","サ":"sa","シ":"shi","ス":"su","セ":"se","ソ":"so","カ":"ka","キ":"ki","ク":"ku","ケ":"ke","コ":"ko","ア":"a","イ":"i","ウ":"u","エ":"e","オ":"o","ァ":"la","ィ":"li","ゥ":"lu","ェ":"le","ォ":"lo","ン":"nn"},i=/ッ([bcdfghijklmnopqrstuvwyz])/gm,g=/ッ/gm;let b=0;const h=d.length;let e,c,a="";while(b<=h)c=f[d.substring(b,b+2)],c?(a+=c,b+=2):(e=d.substring(b,b+1),c=f[e],a+=c||e,b+=1);return a=a.replace(i,"$1$1"),a=a.replace(g,"xtu"),a}function romaToHira(b){const f={a:"あ",i:"い",u:"う",e:"え",o:"お",k:{a:"か",i:"き",u:"く",e:"け",o:"こ",y:{a:"きゃ",i:"きぃ",u:"きゅ",e:"きぇ",o:"きょ"}},s:{a:"さ",i:"し",u:"す",e:"せ",o:"そ",h:{a:"しゃ",i:"し",u:"しゅ",e:"しぇ",o:"しょ"},y:{a:"しゃ",i:"しぃ",u:"しゅ",e:"しぇ",o:"しょ"}},t:{a:"た",i:"ち",u:"つ",e:"て",o:"と",h:{a:"てゃ",i:"てぃ",u:"てゅ",e:"てぇ",o:"てょ"},y:{a:"ちゃ",i:"ちぃ",u:"ちゅ",e:"ちぇ",o:"ちょ"},s:{a:"つぁ",i:"つぃ",u:"つ",e:"つぇ",o:"つぉ"}},c:{a:"か",i:"し",u:"く",e:"せ",o:"こ",h:{a:"ちゃ",i:"ち",u:"ちゅ",e:"ちぇ",o:"ちょ"},y:{a:"ちゃ",i:"ちぃ",u:"ちゅ",e:"ちぇ",o:"ちょ"}},q:{a:"くぁ",i:"くぃ",u:"く",e:"くぇ",o:"くぉ"},n:{a:"な",i:"に",u:"ぬ",e:"ね",o:"の",n:"ん",y:{a:"にゃ",i:"にぃ",u:"にゅ",e:"にぇ",o:"にょ"}},h:{a:"は",i:"ひ",u:"ふ",e:"へ",o:"ほ",y:{a:"ひゃ",i:"ひぃ",u:"ひゅ",e:"ひぇ",o:"ひょ"}},f:{a:"ふぁ",i:"ふぃ",u:"ふ",e:"ふぇ",o:"ふぉ",y:{a:"ふゃ",u:"ふゅ",o:"ふょ"}},m:{a:"ま",i:"み",u:"む",e:"め",o:"も",y:{a:"みゃ",i:"みぃ",u:"みゅ",e:"みぇ",o:"みょ"}},y:{a:"や",i:"い",u:"ゆ",e:"いぇ",o:"よ"},r:{a:"ら",i:"り",u:"る",e:"れ",o:"ろ",y:{a:"りゃ",i:"りぃ",u:"りゅ",e:"りぇ",o:"りょ"}},w:{a:"わ",i:"うぃ",u:"う",e:"うぇ",o:"を"},g:{a:"が",i:"ぎ",u:"ぐ",e:"げ",o:"ご",y:{a:"ぎゃ",i:"ぎぃ",u:"ぎゅ",e:"ぎぇ",o:"ぎょ"}},z:{a:"ざ",i:"じ",u:"ず",e:"ぜ",o:"ぞ",y:{a:"じゃ",i:"じぃ",u:"じゅ",e:"じぇ",o:"じょ"}},j:{a:"じゃ",i:"じ",u:"じゅ",e:"じぇ",o:"じょ",y:{a:"じゃ",i:"じぃ",u:"じゅ",e:"じぇ",o:"じょ"}},d:{a:"だ",i:"ぢ",u:"づ",e:"で",o:"ど",h:{a:"でゃ",i:"でぃ",u:"でゅ",e:"でぇ",o:"でょ"},y:{a:"ぢゃ",i:"ぢぃ",u:"ぢゅ",e:"ぢぇ",o:"ぢょ"}},b:{a:"ば",i:"び",u:"ぶ",e:"べ",o:"ぼ",y:{a:"びゃ",i:"びぃ",u:"びゅ",e:"びぇ",o:"びょ"}},v:{a:"ゔぁ",i:"ゔぃ",u:"ゔ",e:"ゔぇ",o:"ゔぉ",y:{a:"ゔゃ",i:"ゔぃ",u:"ゔゅ",e:"ゔぇ",o:"ゔょ"}},p:{a:"ぱ",i:"ぴ",u:"ぷ",e:"ぺ",o:"ぽ",y:{a:"ぴゃ",i:"ぴぃ",u:"ぴゅ",e:"ぴぇ",o:"ぴょ"}},x:{a:"ぁ",i:"ぃ",u:"ぅ",e:"ぇ",o:"ぉ",y:{a:"ゃ",i:"ぃ",u:"ゅ",e:"ぇ",o:"ょ"},t:{u:"っ",s:{u:"っ"}}},l:{a:"ぁ",i:"ぃ",u:"ぅ",e:"ぇ",o:"ぉ",y:{a:"ゃ",i:"ぃ",u:"ゅ",e:"ぇ",o:"ょ"},t:{u:"っ",s:{u:"っ"}}}};b=b.toLowerCase();let g="",a="",c=0;const h=b.length;let d=f;const e=(b,c)=>{g+=b,a="",d=c?f:d};while(c<h){const g=b.charAt(c);if(g.match(/[a-z]/)){if(g in d){const f=d[g];typeof f=="string"?e(f):(a+=b.charAt(c),d=f),c++;continue}const h=b.charAt(c-1);if(h&&(h==="n"||h===g)&&e(h==="n"?"ん":"っ",!1),d!==f&&g in f){e(a);continue}}e(a+g),c++}return a=a.replace(/n$/,"ん"),e(a),g}function romaToKana(b){const f={a:"ア",i:"イ",u:"ウ",e:"エ",o:"オ",k:{a:"カ",i:"キ",u:"ク",e:"ケ",o:"コ",y:{a:"キャ",i:"キィ",u:"キュ",e:"キェ",o:"キョ"}},s:{a:"サ",i:"シ",u:"ス",e:"セ",o:"ソ",h:{a:"シャ",i:"シ",u:"シュ",e:"シェ",o:"ショ"},y:{a:"シャ",i:"シィ",u:"シュ",e:"シェ",o:"ショ"}},t:{a:"タ",i:"チ",u:"ツ",e:"テ",o:"ト",h:{a:"テャ",i:"ティ",u:"テュ",e:"テェ",o:"テョ"},y:{a:"チャ",i:"チィ",u:"チュ",e:"チェ",o:"チョ"},s:{a:"ツァ",i:"ツィ",u:"ツ",e:"ツェ",o:"ツォ"}},c:{a:"カ",i:"シ",u:"ク",e:"セ",o:"コ",h:{a:"チャ",i:"チ",u:"チュ",e:"チェ",o:"チョ"},y:{a:"チャ",i:"チィ",u:"チュ",e:"チェ",o:"チョ"}},q:{a:"クァ",i:"クィ",u:"ク",e:"クェ",o:"クォ"},n:{a:"ナ",i:"ニ",u:"ヌ",e:"ネ",o:"ノ",n:"ン",y:{a:"ニャ",i:"ニィ",u:"ニュ",e:"ニェ",o:"ニョ"}},h:{a:"ハ",i:"ヒ",u:"フ",e:"ヘ",o:"ホ",y:{a:"ヒャ",i:"ヒィ",u:"ヒュ",e:"ヒェ",o:"ヒョ"}},f:{a:"ファ",i:"フィ",u:"フ",e:"フェ",o:"フォ",y:{a:"フャ",u:"フュ",o:"フョ"}},m:{a:"マ",i:"ミ",u:"ム",e:"メ",o:"モ",y:{a:"ミャ",i:"ミィ",u:"ミュ",e:"ミェ",o:"ミョ"}},y:{a:"ヤ",i:"イ",u:"ユ",e:"イェ",o:"ヨ"},r:{a:"ラ",i:"リ",u:"ル",e:"レ",o:"ロ",y:{a:"リャ",i:"リィ",u:"リュ",e:"リェ",o:"リョ"}},w:{a:"ワ",i:"ウィ",u:"ウ",e:"ウェ",o:"ヲ"},g:{a:"ガ",i:"ギ",u:"グ",e:"ゲ",o:"ゴ",y:{a:"ギャ",i:"ギィ",u:"ギュ",e:"ギェ",o:"ギョ"}},z:{a:"ザ",i:"ジ",u:"ズ",e:"ゼ",o:"ゾ",y:{a:"ジャ",i:"ジィ",u:"ジュ",e:"ジェ",o:"ジョ"}},j:{a:"ジャ",i:"ジ",u:"ジュ",e:"ジェ",o:"ジョ",y:{a:"ジャ",i:"ジィ",u:"ジュ",e:"ジェ",o:"ジョ"}},d:{a:"ダ",i:"ヂ",u:"ヅ",e:"デ",o:"ド",h:{a:"デャ",i:"ディ",u:"デュ",e:"デェ",o:"デョ"},y:{a:"ヂャ",i:"ヂィ",u:"ヂュ",e:"ヂェ",o:"ヂョ"}},b:{a:"バ",i:"ビ",u:"ブ",e:"ベ",o:"ボ",y:{a:"ビャ",i:"ビィ",u:"ビュ",e:"ビェ",o:"ビョ"}},v:{a:"ヴァ",i:"ヴィ",u:"ヴ",e:"ヴェ",o:"ヴォ",y:{a:"ヴャ",i:"ヴィ",u:"ヴュ",e:"ヴェ",o:"ヴョ"}},p:{a:"パ",i:"ピ",u:"プ",e:"ペ",o:"ポ",y:{a:"ピャ",i:"ピィ",u:"ピュ",e:"ピェ",o:"ピョ"}},x:{a:"ァ",i:"ィ",u:"ゥ",e:"ェ",o:"ォ",y:{a:"ャ",i:"ィ",u:"ュ",e:"ェ",o:"ョ"},t:{u:"ッ",s:{u:"ッ"}}},l:{a:"ァ",i:"ィ",u:"ゥ",e:"ェ",o:"ォ",y:{a:"ャ",i:"ィ",u:"ュ",e:"ェ",o:"ョ"},t:{u:"ッ",s:{u:"ッ"}}}};b=b.toLowerCase();let g="",a="",c=0;const h=b.length;let d=f;const e=(b,c)=>{g+=b,a="",d=c?f:d};while(c<h){const g=b.charAt(c);if(g.match(/[a-z]/)){if(g in d){const f=d[g];typeof f=="string"?e(f):(a+=b.charAt(c),d=f),c++;continue}const h=b.charAt(c-1);if(h&&(h==="n"||h===g)&&e(h==="n"?"ン":"ッ",!1),d!==f&&g in f){e(a);continue}}e(a+g),c++}return a=a.replace(/n$/,"ン"),e(a),g}function zenRomaToHanRoma(a){return a.replace(/[Ａ-Ｚａ-ｚ０-９]/g,function(a){return String.fromCharCode(a.charCodeAt(0)-65248)})}function hanRomaToZenRoma(a){return a.replace(/[A-Za-z0-9]/g,function(a){return String.fromCharCode(a.charCodeAt(0)+65248)})}function hanSmbolToZenSymbol(a){return a.replace(/[!-\/:-@\[-\{-~]/g,a=>String.fromCharCode(a.charCodeAt(0)+65248))}function zenSymbolToHanSymbol(a){return a.replace(/[！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｀｛|}～]/g,a=>String.fromCharCode(a.charCodeAt(0)-65248))}function zenKanaToHanKana(b){const a={"ガ":"ｶﾞ","ギ":"ｷﾞ","グ":"ｸﾞ","ゲ":"ｹﾞ","ゴ":"ｺﾞ","ザ":"ｻﾞ","ジ":"ｼﾞ","ズ":"ｽﾞ","ゼ":"ｾﾞ","ゾ":"ｿﾞ","ダ":"ﾀﾞ","ヂ":"ﾁﾞ","ヅ":"ﾂﾞ","デ":"ﾃﾞ","ド":"ﾄﾞ","バ":"ﾊﾞ","ビ":"ﾋﾞ","ブ":"ﾌﾞ","ベ":"ﾍﾞ","ボ":"ﾎﾞ","パ":"ﾊﾟ","ピ":"ﾋﾟ","プ":"ﾌﾟ","ペ":"ﾍﾟ","ポ":"ﾎﾟ","ヴ":"ｳﾞ","ヷ":"ﾜﾞ","ヺ":"ｦﾞ","ア":"ｱ","イ":"ｲ","ウ":"ｳ","エ":"ｴ","オ":"ｵ","カ":"ｶ","キ":"ｷ","ク":"ｸ","ケ":"ｹ","コ":"ｺ","サ":"ｻ","シ":"ｼ","ス":"ｽ","セ":"ｾ","ソ":"ｿ","タ":"ﾀ","チ":"ﾁ","ツ":"ﾂ","テ":"ﾃ","ト":"ﾄ","ナ":"ﾅ","ニ":"ﾆ","ヌ":"ﾇ","ネ":"ﾈ","ノ":"ﾉ","ハ":"ﾊ","ヒ":"ﾋ","フ":"ﾌ","ヘ":"ﾍ","ホ":"ﾎ","マ":"ﾏ","ミ":"ﾐ","ム":"ﾑ","メ":"ﾒ","モ":"ﾓ","ヤ":"ﾔ","ユ":"ﾕ","ヨ":"ﾖ","ラ":"ﾗ","リ":"ﾘ","ル":"ﾙ","レ":"ﾚ","ロ":"ﾛ","ワ":"ﾜ","ヲ":"ｦ","ン":"ﾝ","ァ":"ｧ","ィ":"ｨ","ゥ":"ｩ","ェ":"ｪ","ォ":"ｫ","ッ":"ｯ","ャ":"ｬ","ュ":"ｭ","ョ":"ｮ","。":"｡","、":"､","ー":"ｰ","「":"｢","」":"｣","・":"･"},c=new RegExp("("+Object.keys(a).join("|")+")","g");return b.replace(c,b=>a[b]).replace(/゛/g,"ﾞ").replace(/゜/g,"ﾟ")}function hanKanaToZenKana(b){const a={"ｶﾞ":"ガ","ｷﾞ":"ギ","ｸﾞ":"グ","ｹﾞ":"ゲ","ｺﾞ":"ゴ","ｻﾞ":"ザ","ｼﾞ":"ジ","ｽﾞ":"ズ","ｾﾞ":"ゼ","ｿﾞ":"ゾ","ﾀﾞ":"ダ","ﾁﾞ":"ヂ","ﾂﾞ":"ヅ","ﾃﾞ":"デ","ﾄﾞ":"ド","ﾊﾞ":"バ","ﾋﾞ":"ビ","ﾌﾞ":"ブ","ﾍﾞ":"ベ","ﾎﾞ":"ボ","ﾊﾟ":"パ","ﾋﾟ":"ピ","ﾌﾟ":"プ","ﾍﾟ":"ペ","ﾎﾟ":"ポ","ｳﾞ":"ヴ","ﾜﾞ":"ヷ","ｦﾞ":"ヺ","ｱ":"ア","ｲ":"イ","ｳ":"ウ","ｴ":"エ","ｵ":"オ","ｶ":"カ","ｷ":"キ","ｸ":"ク","ｹ":"ケ","ｺ":"コ","ｻ":"サ","ｼ":"シ","ｽ":"ス","ｾ":"セ","ｿ":"ソ","ﾀ":"タ","ﾁ":"チ","ﾂ":"ツ","ﾃ":"テ","ﾄ":"ト","ﾅ":"ナ","ﾆ":"ニ","ﾇ":"ヌ","ﾈ":"ネ","ﾉ":"ノ","ﾊ":"ハ","ﾋ":"ヒ","ﾌ":"フ","ﾍ":"ヘ","ﾎ":"ホ","ﾏ":"マ","ﾐ":"ミ","ﾑ":"ム","ﾒ":"メ","ﾓ":"モ","ﾔ":"ヤ","ﾕ":"ユ","ﾖ":"ヨ","ﾗ":"ラ","ﾘ":"リ","ﾙ":"ル","ﾚ":"レ","ﾛ":"ロ","ﾜ":"ワ","ｦ":"ヲ","ﾝ":"ン","ｧ":"ァ","ｨ":"ィ","ｩ":"ゥ","ｪ":"ェ","ｫ":"ォ","ｯ":"ッ","ｬ":"ャ","ｭ":"ュ","ｮ":"ョ","｡":"。","､":"、","ｰ":"ー","｢":"「","｣":"」","･":"・"},c=new RegExp("("+Object.keys(a).join("|")+")","g");return b.replace(c,b=>a[b]).replace(/ﾞ/g,"゛").replace(/ﾟ/g,"゜")}function numToKan(){const a="/text-utils/japanese-numeral.min.js";import(a).then(a=>{toText.value=a.number2kanji(fromText.value),toText.onchange()})}function kanToNum(){const a="/text-utils/japanese-numeral.min.js";import(a).then(a=>{toText.value=a.kanji2number(fromText.value),toText.onchange()})}function stringReplace(){const a=document.getElementById("stringReplaceFrom").value,b=document.getElementById("stringReplaceTo").value;toText.value=fromText.value.replaceAll(a,b),toText.onchange()}function regexpReplace(){const a=document.getElementById("regexpReplaceFrom").value,b=document.getElementById("regexpReplaceTo").value,c=new RegExp(a,"mg");toText.value=fromText.value.replaceAll(c,b),toText.onchange()}function numbering(){let a=parseInt(document.getElementById("numberingStart").value);a||(a=0);const b=document.getElementById("numberingFrom").value,c=document.getElementById("numberingTo").value,d=new RegExp(b,"mg"),e="https://cdn.jsdelivr.net/npm/sprintf-js@1.1.2/src/sprintf.min.js";import(e).then(()=>{function b(){const b=sprintf(c,a);return a+=1,b}toText.value=fromText.value.replaceAll(d,b),toText.onchange()})}function extractColumns(){const a=document.getElementById("extractColumnsSeparator").value,b=new RegExp(a,"g"),c=document.getElementById("extractColumnsTarget").value.split(/\s*,\s*/).map(a=>parseInt(a)-1),d=fromText.value.split("\n").map(d=>{const e=d.split(b),f=e.filter((b,a)=>c.includes(a));return f.join(a)}).join("\n");toText.value=d,toText.onchange()}function extractUrls(){function c(a){if(a){const a="https?://[A-Za-z0-9\u3000-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3!#\\$&'\\(\\)\\*\\+,/:;=\\?@\\[\\]\\._~-]+";return new RegExp(a,"g")}const b="https?://[A-Za-z0-9!#\\$&'\\(\\)\\*\\+,/:;=\\?@\\[\\]\\._~-]+";return new RegExp(b,"g")}const d=document.getElementById("extractUrlsJapanese").checked,a=c(d),b=document.getElementById("extractUrlsExtensions").value;if(b==""){const b=[...fromText.value.matchAll(a)].map(a=>a[0]).join("\n");toText.value=b}else{const c=b.split(/\s*,\s*/).map(a=>"."+a).join("|")+"$",d=new RegExp(c),e=[...fromText.value.matchAll(a)].map(a=>a[0]).filter(a=>d.test(a)).join("\n");toText.value=e}toText.onchange()}function increaseText(){const a=document.getElementById("editor"),b=parseInt(getComputedStyle(a).fontSize)+1;a.style.fontSize=b+"px"}function decreaseText(){const a=document.getElementById("editor"),b=parseInt(getComputedStyle(a).fontSize)-1;a.style.fontSize=b+"px"}function runCode(){const a=document.getElementById("editor").value;return Function(a)()}function sleep(a){return new Promise(b=>setTimeout(b,a))}function addClipboardButtons(){[...document.getElementsByClassName("clipboard")].forEach(a=>{const b=a.parentNode;b.addEventListener("mouseover",()=>{a.classList.remove("invisible")}),b.addEventListener("mouseleave",()=>{a.classList.add("invisible")});const d=a.nextElementSibling,c=a.firstElementChild;c.onclick=async()=>{const[a,b]=c.children;await navigator.clipboard.writeText(d.value),a.classList.add("d-none"),b.classList.remove("d-none"),await sleep(2e3),a.classList.remove("d-none"),b.classList.add("d-none")}})}loadConfig(),addClipboardButtons(),document.getElementById("toggleDarkMode").onclick=toggleDarkMode;const fromText=document.getElementById("fromText"),toText=document.getElementById("toText"),procReverse=document.getElementById("procReverse");fromText.onchange=()=>{const a=fromText.value,b=countTextLength(a),c=(a.match(/\s/g)||[]).length;document.getElementById("fromLength").value=b,document.getElementById("fromCount").value=b-c,document.getElementById("fromLinage").value=(a.match(/\n/g)||[]).length},toText.onchange=()=>{const a=toText.value,b=countTextLength(a),c=(a.match(/\s/g)||[]).length;document.getElementById("toLength").value=b,document.getElementById("toCount").value=b-c,document.getElementById("toLinage").value=(a.match(/\n/g)||[]).length},procReverse.onchange=()=>{const a=document.getElementById("procReverseLabel"),c=document.getElementById("commandList"),b=[...c.getElementsByTagName("button")];procReverse.checked?(a.textContent=a.textContent="出力 ← 入力",b.forEach(a=>{a.textContent=a.textContent.replace("→","←")})):(a.textContent=a.textContent="入力 → 出力",b.forEach(a=>{a.textContent=a.textContent.replace("←","→")}))},document.getElementById("htmlEscape").onclick=()=>{procReverse.checked?toText.value=htmlEscapeDecode(fromText.value):toText.value=htmlEscapeEncode(fromText.value),toText.onchange()},document.getElementById("html10").onclick=()=>{procReverse.checked?toText.value=html10Decode(fromText.value):toText.value=html10Encode(fromText.value),toText.onchange()},document.getElementById("html16").onclick=()=>{procReverse.checked?toText.value=html16Decode(fromText.value):toText.value=html16Encode(fromText.value),toText.onchange()},document.getElementById("unicodePoint").onclick=()=>{procReverse.checked?toText.value=unicodePointDecode(fromText.value):toText.value=unicodePointEncode(fromText.value),toText.onchange()},document.getElementById("unicodeUnit").onclick=()=>{procReverse.checked?toText.value=unicodeUnitDecode(fromText.value):toText.value=unicodeUnitEncode(fromText.value),toText.onchange()},document.getElementById("uri").onclick=()=>{procReverse.checked?toText.value=decodeURI(fromText.value):toText.value=encodeURI(fromText.value),toText.onchange()},document.getElementById("uriComponent").onclick=()=>{procReverse.checked?toText.value=decodeURIComponent(fromText.value):toText.value=encodeURIComponent(fromText.value),toText.onchange()},document.getElementById("base64").onclick=()=>{procReverse.checked?toText.value=atob(fromText.value):toText.value=btoa(fromText.value),toText.onchange()},document.getElementById("sortLines").onclick=()=>{toText.value=sortLines(fromText.value),toText.onchange()},document.getElementById("uniqLines").onclick=()=>{toText.value=uniqLines(fromText.value),toText.onchange()},document.getElementById("shuffleLines").onclick=()=>{toText.value=shuffleLines(fromText.value),toText.onchange()},document.getElementById("camelToPascal").onclick=()=>{procReverse.checked?toText.value=pascalToCamel(fromText.value):toText.value=camelToPascal(fromText.value),toText.onchange()},document.getElementById("camelToSnake").onclick=()=>{procReverse.checked?toText.value=snakeToCamel(fromText.value):toText.value=camelToSnake(fromText.value),toText.onchange()},document.getElementById("flatToPascal").onclick=()=>{procReverse.checked?pascalToFlat(fromText.value):flatToPascal(fromText.value),toText.onchange()},document.getElementById("snakeNumber").onclick=()=>{procReverse.checked?toText.value=toNoSnakeNumber(fromText.value):toText.value=toSnakeNumber(fromText.value),toText.onchange()},document.getElementById("upperLower").onclick=()=>{procReverse.checked?toText.value=fromText.value.toUpperCase():toText.value=fromText.value.toLowerCase(),toText.onchange()},document.getElementById("hiraKana").onclick=()=>{procReverse.checked?toText.value=kanaToHira(fromText.value):toText.value=hiraToKana(fromText.value),toText.onchange()},document.getElementById("hiraRoma").onclick=()=>{procReverse.checked?toText.value=romaToHira(fromText.value):toText.value=hiraToRoma(fromText.value),toText.onchange()},document.getElementById("kanaRoma").onclick=()=>{procReverse.checked?toText.value=romaToKana(fromText.value):toText.value=kanaToRoma(fromText.value),toText.onchange()},document.getElementById("zenHanRoma").onclick=()=>{procReverse.checked?toText.value=hanRomaToZenRoma(fromText.value):toText.value=zenRomaToHanRoma(fromText.value),toText.onchange()},document.getElementById("zenHanSymbol").onclick=()=>{procReverse.checked?toText.value=hanSmbolToZenSymbol(fromText.value):toText.value=zenSymbolToHanSymbol(fromText.value),toText.onchange()},document.getElementById("zenHanKana").onclick=()=>{procReverse.checked?toText.value=hanKanaToZenKana(fromText.value):toText.value=zenKanaToHanKana(fromText.value),toText.onchange()},document.getElementById("kanToNum").onclick=()=>{procReverse.checked?numToKan(fromText.value):kanToNum(fromText.value),toText.onchange()},document.getElementById("zenHanAll").onclick=()=>{let a=fromText.value;a=zenRomaToHanRoma(a),a=zenSymbolToHanSymbol(a),a=hanKanaToZenKana(a),toText.value=a,toText.onchange()},document.getElementById("stringReplace").onclick=stringReplace,document.getElementById("regexpReplace").onclick=regexpReplace,document.getElementById("numbering").onclick=numbering,document.getElementById("extractColumns").onclick=extractColumns,document.getElementById("extractUrls").onclick=extractUrls,document.getElementById("increaseText").onclick=increaseText,document.getElementById("decreaseText").onclick=decreaseText,document.getElementById("runCode").onclick=runCode