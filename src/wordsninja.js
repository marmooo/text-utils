const splitRegex = new RegExp("[^a-zA-Z0-9']+", "g");
const dictUrl = "words-en.txt";
let maxWordLen = 0;
const wordCost = {};
let maxCost = 9e999;

/**
 * WordsNinja, Split your string text without space to english words
 * @class
 */
export class WordsNinja {
  loadDictionary(url = dictUrl) {
    return fetch(url)
      .then((response) => response.text())
      .then((text) => {
        const words = text.split("\n");
        const logCost = Math.log(words.length);
        words.forEach((word, index) => {
          wordCost[word] = Math.log((index + 1) * logCost);
          if (word.length > maxWordLen) {
            maxWordLen = word.length;
          }
          if (wordCost[word] < maxCost) {
            maxCost = wordCost[word];
          }
        });
      });
  }

  /**
   * @param {string} string - The string for split
   * @param {object} options - The Options
   * @param {boolean} options.camelCaseSplitter - Split by Camel Case, Default false (optional)
   * @param {boolean} options.capitalizeFirstLetter - Capitalize First Letter, Default false (optional)
   * @param {boolean} options.joinWords - Return join words as sentence, Default false (optional)
   * @returns {Array|string} result - Split String
   */
  splitSentence(
    string,
    { camelCaseSplitter, capitalizeFirstLetter, joinWords } = {},
  ) {
    const list = [];
    camelCaseSplitter = camelCaseSplitter || false;
    capitalizeFirstLetter = capitalizeFirstLetter || false;
    joinWords = joinWords || false;
    if (camelCaseSplitter) {
      string = this.camelCaseSplitter(string);
    }

    string.split(splitRegex).forEach((sub) => {
      this.splitWords(sub).forEach((word) => {
        word = capitalizeFirstLetter ? this.capitalizeFirstLetter(word) : word;
        list.push(word);
      });
    });
    if (joinWords) {
      return list.join(" ");
    } else {
      return list;
    }
  }

  /**
   * Add words to dictionary
   * @param {Array|string} words Word(s) to add dictionary
   * @return {void}
   */
  addWords(words) {
    if (Array.isArray(words)) {
      for (const value of words) {
        this.addWords(value);
      }
    } else {
      const word = words.toLocaleLowerCase();
      wordCost[word] = maxCost;
      if (word.length > maxWordLen) {
        maxWordLen = word.length;
      }
    }
  }

  /**
   * Split Words
   * @private
   * @param {string} s Input String
   * @return {Array} Splited Words
   */
  splitWords(s) {
    const cost = [0];

    function best_match(i) {
      const candidates = cost.slice(Math.max(0, i - maxWordLen), i).reverse();
      let minPair = [Number.MAX_SAFE_INTEGER, 0];
      candidates.forEach((c, k) => {
        let ccost;
        if (wordCost[s.substring(i - k - 1, i).toLowerCase()]) {
          ccost = c + wordCost[s.substring(i - k - 1, i).toLowerCase()];
        } else {
          ccost = Number.MAX_SAFE_INTEGER;
        }
        if (ccost < minPair[0]) {
          minPair = [ccost, k + 1];
        }
      });
      return minPair;
    }

    for (let i = 1; i < s.length + 1; i++) {
      cost.push(best_match(i)[0]);
    }

    const out = [];
    let i = s.length;
    while (i > 0) {
      // const c = best_match(i)[0];
      const k = best_match(i)[1];
      //if (c == cost[i])
      //    console.log("Alert: " + c);

      let newToken = true;
      if (s.slice(i - k, i) != "'") {
        if (out.length > 0) {
          if (
            out[-1] == "'s" ||
            (Number.isInteger(s[i - 1]) && Number.isInteger(out[-1][0]))
          ) {
            out[-1] = s.slice(i - k, i) + out[-1];
            newToken = false;
          }
        }
      }

      if (newToken) {
        out.push(s.slice(i - k, i));
      }

      i -= k;
    }

    return out.reverse();
  }

  /**
   * Camel Case Splitter
   * Based on 'split-camelcase-to-words' package, https://www.npmjs.com/package/split-camelcase-to-words
   * @private
   * @param {string} inputString
   * @return {string} String
   */
  camelCaseSplitter(inputString) {
    const notNullString = inputString || "";
    const trimmedString = notNullString.trim();
    const arrayOfStrings = trimmedString.split(" ");

    const splitStringsArray = [];
    arrayOfStrings.forEach((tempString) => {
      if (tempString != "") {
        const splitWords = tempString.split(/(?=[A-Z])/).join(" ");
        splitStringsArray.push(splitWords);
      }
    });

    return splitStringsArray.join(" ");
  }

  /**
   * Capitalize First Letter
   * @private
   * @param {string} string - String to Capitalize First Letter
   * @return {string} result
   */
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
