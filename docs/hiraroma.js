const tree={"-":"ー",a:"あ",i:"い",u:"う",e:"え",o:"お",k:{a:"か",i:"き",u:"く",e:"け",o:"こ",y:{a:"きゃ",i:"きぃ",u:"きゅ",e:"きぇ",o:"きょ"}},s:{a:"さ",i:"し",u:"す",e:"せ",o:"そ",h:{a:"しゃ",i:"し",u:"しゅ",e:"しぇ",o:"しょ"},y:{a:"しゃ",i:"しぃ",u:"しゅ",e:"しぇ",o:"しょ"}},t:{a:"た",i:"ち",u:"つ",e:"て",o:"と",h:{a:"てゃ",i:"てぃ",u:"てゅ",e:"てぇ",o:"てょ"},y:{a:"ちゃ",i:"ちぃ",u:"ちゅ",e:"ちぇ",o:"ちょ"},s:{a:"つぁ",i:"つぃ",u:"つ",e:"つぇ",o:"つぉ"}},c:{a:"か",i:"し",u:"く",e:"せ",o:"こ",h:{a:"ちゃ",i:"ち",u:"ちゅ",e:"ちぇ",o:"ちょ"},y:{a:"ちゃ",i:"ちぃ",u:"ちゅ",e:"ちぇ",o:"ちょ"}},q:{a:"くぁ",i:"くぃ",u:"く",e:"くぇ",o:"くぉ"},n:{a:"な",i:"に",u:"ぬ",e:"ね",o:"の",n:"ん",y:{a:"にゃ",i:"にぃ",u:"にゅ",e:"にぇ",o:"にょ"}},h:{a:"は",i:"ひ",u:"ふ",e:"へ",o:"ほ",y:{a:"ひゃ",i:"ひぃ",u:"ひゅ",e:"ひぇ",o:"ひょ"}},f:{a:"ふぁ",i:"ふぃ",u:"ふ",e:"ふぇ",o:"ふぉ",y:{a:"ふゃ",u:"ふゅ",o:"ふょ"}},m:{a:"ま",i:"み",u:"む",e:"め",o:"も",y:{a:"みゃ",i:"みぃ",u:"みゅ",e:"みぇ",o:"みょ"}},y:{a:"や",i:"い",u:"ゆ",e:"いぇ",o:"よ"},r:{a:"ら",i:"り",u:"る",e:"れ",o:"ろ",y:{a:"りゃ",i:"りぃ",u:"りゅ",e:"りぇ",o:"りょ"}},w:{a:"わ",i:"うぃ",u:"う",e:"うぇ",o:"を"},g:{a:"が",i:"ぎ",u:"ぐ",e:"げ",o:"ご",y:{a:"ぎゃ",i:"ぎぃ",u:"ぎゅ",e:"ぎぇ",o:"ぎょ"}},z:{a:"ざ",i:"じ",u:"ず",e:"ぜ",o:"ぞ",y:{a:"じゃ",i:"じぃ",u:"じゅ",e:"じぇ",o:"じょ"}},j:{a:"じゃ",i:"じ",u:"じゅ",e:"じぇ",o:"じょ",y:{a:"じゃ",i:"じぃ",u:"じゅ",e:"じぇ",o:"じょ"}},d:{a:"だ",i:"ぢ",u:"づ",e:"で",o:"ど",h:{a:"でゃ",i:"でぃ",u:"でゅ",e:"でぇ",o:"でょ"},y:{a:"ぢゃ",i:"ぢぃ",u:"ぢゅ",e:"ぢぇ",o:"ぢょ"}},b:{a:"ば",i:"び",u:"ぶ",e:"べ",o:"ぼ",y:{a:"びゃ",i:"びぃ",u:"びゅ",e:"びぇ",o:"びょ"}},v:{a:"ゔぁ",i:"ゔぃ",u:"ゔ",e:"ゔぇ",o:"ゔぉ",y:{a:"ゔゃ",i:"ゔぃ",u:"ゔゅ",e:"ゔぇ",o:"ゔょ"}},p:{a:"ぱ",i:"ぴ",u:"ぷ",e:"ぺ",o:"ぽ",y:{a:"ぴゃ",i:"ぴぃ",u:"ぴゅ",e:"ぴぇ",o:"ぴょ"}},x:{a:"ぁ",i:"ぃ",u:"ぅ",e:"ぇ",o:"ぉ",y:{a:"ゃ",i:"ぃ",u:"ゅ",e:"ぇ",o:"ょ"},t:{u:"っ",s:{u:"っ"}}},l:{a:"ぁ",i:"ぃ",u:"ぅ",e:"ぇ",o:"ぉ",y:{a:"ゃ",i:"ぃ",u:"ゅ",e:"ぇ",o:"ょ"},t:{u:"っ",s:{u:"っ"}}}};export function romaToHira(e){let i="",t="",n=0,s=tree;const a=e.length,o=(e,n=!0)=>{i+=e,t="",s=n?tree:s};for(;n<a;){const i=e.charAt(n);if(i.match(/[a-z-]/)){if(i in s){const a=s[i];typeof a=="string"?o(a):(t+=e.charAt(n),s=a),n++;continue}const a=e.charAt(n-1);if(a&&(a==="n"||a===i)&&o(a==="n"?"ん":"っ",!1),s!==tree&&i in tree){o(t);continue}}o(t+i),n++}return t=t.replace(/n$/,"ん"),o(t),i}const biTable={"きゃ":"kya","きゅ":"kyu","きょ":"kyo","ぎゃ":"gya","ぎゅ":"gyu","ぎょ":"gyo","しゃ":"sha","しゅ":"shu","しょ":"sho","じゃ":"ja","じゅ":"ju","じょ":"jo","ちゃ":"cha","ちゅ":"chu","ちょ":"cho","ぢゃ":"dya","ぢゅ":"dyu","ぢょ":"dyo","でゃ":"dha","でゅ":"dhu","でょ":"dho","にゃ":"nya","にゅ":"nyu","にょ":"nyo","ひゃ":"hya","ひゅ":"hyu","ひょ":"hyo","ぴゃ":"pya","ぴゅ":"pyu","ぴょ":"pyo","びゃ":"bya","びゅ":"byu","びょ":"byo","みゃ":"mya","みゅ":"myu","みょ":"myo","りゃ":"rya","りゅ":"ryu","りょ":"ryo","てぁ":"tha","てぃ":"thi","てぇ":"the","っか":"kka","っき":"kki","っく":"kku","っけ":"kke","っこ":"kko","っさ":"ssa","っし":"sshi","っす":"ssu","っせ":"sse","っそ":"sso","った":"tta","っち":"cchi","っつ":"ttu","って":"tte","っと":"tto","っな":"xtuna","っに":"xtuni","っぬ":"xtunu","っね":"xtune","っの":"xtuno","っは":"hha","っひ":"hhi","っふ":"ffu","っへ":"hhe","っほ":"hho","っま":"mma","っみ":"mmi","っむ":"mmu","っめ":"mme","っも":"mmo","っや":"yya","っゆ":"yyu","っよ":"yyo","っら":"rra","っり":"rri","っる":"rru","っれ":"rre","っろ":"rro","っわ":"wwa","っが":"gga","っぎ":"ggi","っぐ":"ggu","っげ":"gge","っご":"ggo","っざ":"zza","っじ":"jji","っず":"zzu","っぜ":"zze","っぞ":"zzo","っだ":"dda","っぢ":"ddi","っづ":"ddu","っで":"dde","っど":"ddo","っば":"bba","っび":"bbi","っぶ":"bbu","っべ":"bbe","っぼ":"bbo","っぱ":"ppa","っぴ":"ppi","っぷ":"ppu","っぺ":"ppe","っぽ":"ppo","ゔぁ":"va","ゔぃ":"vi","ゔぇ":"ve","ゔぉ":"vo"},uniTable={"あ":"a","い":"i","う":"u","え":"e","お":"o","か":"ka","き":"ki","く":"ku","け":"ke","こ":"ko","さ":"sa","し":"shi","す":"su","せ":"se","そ":"so","た":"ta","ち":"chi","つ":"tsu","て":"te","と":"to","な":"na","に":"ni","ぬ":"nu","ね":"ne","の":"no","は":"ha","ひ":"hi","ふ":"fu","へ":"he","ほ":"ho","ま":"ma","み":"mi","む":"mu","め":"me","も":"mo","や":"ya","ゆ":"yu","よ":"yo","ら":"ra","り":"ri","る":"ru","れ":"re","ろ":"ro","わ":"wa","を":"wo","ん":"nn","が":"ga","ぎ":"gi","ぐ":"gu","げ":"ge","ご":"go","ざ":"za","じ":"ji","ず":"zu","ぜ":"ze","ぞ":"zo","だ":"da","ぢ":"di","づ":"du","で":"de","ど":"do","ば":"ba","び":"bi","ぶ":"bu","べ":"be","ぼ":"bo","ぱ":"pa","ぴ":"pi","ぷ":"pu","ぺ":"pe","ぽ":"po","ぁ":"xa","ぃ":"xi","ぅ":"xu","ぇ":"xe","ぉ":"xo","ゃ":"xya","ゅ":"xyu","ょ":"xyo","っ":"xtsu","ゔ":"vu","ー":"-"},biCheck=Object.keys(biTable).reduce((e,t)=>(e[t[0]]=!0,e),{});export function hiraToRoma(e){let n="",t="";for(let s=0;s<e.length;s++){const o=e[s];t+=o,t.length===2?biTable[t]?(n+=biTable[t],t=""):(n+=uniTable[t[0]],n+=uniTable[t[1]]||t[1],t=""):biCheck[t[0]]||(n+=uniTable[o]||o,t="")}return n+=t?uniTable[t]:"",n=n.replace(/([aiueo])ー/gi,"$1"),n}