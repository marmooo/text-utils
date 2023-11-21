const splitRegex=new RegExp("[^a-zA-Z0-9']+","g"),dictUrl="words-en.txt";let maxWordLen=0;const wordCost={};let maxCost=9e999;export class WordsNinja{loadDictionary(e=dictUrl){return fetch(e).then(e=>e.text()).then(e=>{const t=e.split(`
`),n=Math.log(t.length);t.forEach((e,t)=>{wordCost[e]=Math.log((t+1)*n),e.length>maxWordLen&&(maxWordLen=e.length),wordCost[e]<maxCost&&(maxCost=wordCost[e])})})}splitSentence(e,{camelCaseSplitter:t,capitalizeFirstLetter:n,joinWords:s}={}){const o=[];return t=t||!1,n=n||!1,s=s||!1,t&&(e=this.camelCaseSplitter(e)),e.split(splitRegex).forEach(e=>{this.splitWords(e).forEach(e=>{e=n?this.capitalizeFirstLetter(e):e,o.push(e)})}),s?o.join(" "):o}addWords(e){if(Array.isArray(e))for(const t of e)this.addWords(t);else{const t=e.toLocaleLowerCase();wordCost[t]=maxCost,t.length>maxWordLen&&(maxWordLen=t.length)}}splitWords(e){const s=[0];function o(t){const o=s.slice(Math.max(0,t-maxWordLen),t).reverse();let n=[Number.MAX_SAFE_INTEGER,0];return o.forEach((s,o)=>{let i;wordCost[e.substring(t-o-1,t).toLowerCase()]?i=s+wordCost[e.substring(t-o-1,t).toLowerCase()]:i=Number.MAX_SAFE_INTEGER,i<n[0]&&(n=[i,o+1])}),n}for(let t=1;t<e.length+1;t++)s.push(o(t)[0]);const n=[];let t=e.length;for(;t>0;){const s=o(t)[1];let i=!0;e.slice(t-s,t)!="'"&&n.length>0&&(n[-1]=="'s"||Number.isInteger(e[t-1])&&Number.isInteger(n[-1][0]))&&(n[-1]=e.slice(t-s,t)+n[-1],i=!1),i&&n.push(e.slice(t-s,t)),t-=s}return n.reverse()}camelCaseSplitter(e){const n=e||"",s=n.trim(),o=s.split(" "),t=[];return o.forEach(e=>{if(e!=""){const n=e.split(/(?=[A-Z])/).join(" ");t.push(n)}}),t.join(" ")}capitalizeFirstLetter(e){return e.charAt(0).toUpperCase()+e.slice(1)}}