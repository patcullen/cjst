# CJST - 中文Javascript的工具

A set of tools and functions for working with Chinese characters in the browser or NodeJS.

## Features

* Generating Pinyin or Zhuyin (Bopomofo) for strings of Chinese text - 翻譯中文到拼音或注音
* Converting between Traditional and Simplified Chinese - 兌換傳統到簡體漢字而且反之亦然
* Detecting Chinese characters in strings - 檢測中文字
* UI elements/facilities for reading Chinese text in the browser - 用拼音和注音便利使用者讀中文字
* Translating Chinese characters and common phrases to English - 翻譯成語和常見的字

## API

### Available in NodeJS or the browser

* __chineseToPinyin__ : Convert Chinese characters to Pinyin
* __chineseToZhuyin__: Convert Chinese text to Zhuyin characters (used in R.O.C.)
* __pinyinToZhuyin__: Convert Pinyin text to Zhuyin characters (used in R.O.C.)

* __simplifiedToTraditional__: Convert Simplified Chinese to Traditional Chinese
* __traditionalToSimplified__: Convert Traditional Chinese to Simplified Chinese

* __isChineseCharacter__: Determine if a character is likely a Chinese character
* __hasChineseCharacters__: Determine if a string or DOM element contains Chinese

* __md5ChineseText__: Returns a unique identifier that represents this chinese string (only for use with this library, hashing unicode text is hard)
* __setProperty__ : Facility to update certain properties/constants in this library

### Only available in the browser

* __translatePhrase__: Translate a character, word, idiom or common phrase to English

* __pinyinElements__: creates an element/s with all the bits inside that encase a char with pinyin under it
* __zhuyinElements__: creates an element/s with all the bits inside that encase a char with bopomofo under it

* __pinyinTitleOnHover__: Displays pinyin titles over characters when the mouse hovers over it.
* __zhuyinTitleOnHover__: Displays zhuyin titles over characters when the mouse hovers over it.

* __pinyinTileOnHover__: Displays pinyin tiles over characters when the mouse hovers over it.
* __zhuyinTileOnHover__: Displays zhuyin tiles over characters when the mouse hovers over it.


## Example Usage
For active examples in the browser, please have a look at [example/index.html](example/index.html)

All example snippets below will assume there is an instance of this library called cjst.

### chineseToPinyin
Convert Chinese characters to Pinyin
```javascript
cjst.chineseToPinyin('恭喜發財').join(' ')

> gōng xǐ fā cái
```

### chineseToZhuyin
Convert Chinese text to Zhuyin characters (used in R.O.C.)
```javascript
JSON.stringify(cjst.chineseToZhuyin('恭喜發財'))

> [["ㄍㄨㄥ"," "],["ㄒㄧ","ˇ"],["ㄈㄚ"," "],["ㄘㄞ","ˊ"]]
```

### pinyinToZhuyin
Convert Pinyin text to Zhuyin characters (used in R.O.C.)
```javascript
JSON.stringify(cjst.pinyinToZhuyin('hóng bāo ná lái'))

> [["ㄏㄨㄥ","ˊ"],["ㄅㄠ"," "],["ㄋㄚ","ˊ"],["ㄌㄞ","ˊ"]]
```

### simplifiedToTraditional
Convert Simplified Chinese to Traditional Chinese
```javascript
cjst.simplifiedToTraditional('恭喜发财')

> 恭喜發財
```

### traditionalToSimplified
Convert Traditional Chinese to Simplified Chinese
```javascript
cjst.traditionalToSimplified('恭喜發財')

> 恭喜发财
```

### hasChineseCharacters
Determine if a string or DOM element contains Chinese
```javascript
cjst.hasChineseCharacters('Happy New Year!')
cjst.hasChineseCharacters('恭喜發財')

> false
> true
```

### translatePhrase
Translate a character, word, idiom or common phrase to English
```javascript
cjst.translatePhrase('恭喜發財', {}, function(response) {
    console.log( response.translation.join('\n') );
});

> May you have a prosperous New Year! (New Year's greeting)
```

*Note that for the translation to work some extra environment setup is required.*

1. First download the Cedict JSON data from [here](https://github.com/patcullen/cedictJsonData) or generate it using the included [conversion tool](tree/master/translation/cedictToJson.js) and the data from [mdbg.net](http://www.mdbg.net/chindict/chindict.php?page=cedict).
2. If the JSON data is not stored in "translation/data/" then be sure to add the following line of code before the first call to translatePhrase().
```javascript
cjst.setProperty('translationLocation', '../the/location/of/your/translation/data');
```



## License

(The MIT License)
Permission is hereby granted, free of charge, to any person obtaining a copy of this software
and associated documentation files (the 'Software'), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or
substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

這是一份MIT的非官方中文翻譯。它並非MIT發布，也不是使用MIT授權的軟件的法定發布條款——只有MIT授權的英文原版具
有這樣的效力。然而，我們希望這份翻譯能夠幫助中文讀者更好的理解MIT授權。

現授予的權限，免費向任何人索取該軟件和相關的文檔文件（ “軟件” ），以處理軟件，沒有任何限制，包括但不限於使用權，複製，
修改，合併，出版，發行，授權，和/或銷售軟件的副本，並允許的人提供的軟件是這樣做，但須符合下列條件：
上述版權聲明和本許可聲明中應包括所有副本或實質性部分的軟件。
該軟件是“按原樣”提供，不做任何保證，明示或暗示，包括但不限於適銷性，針對特定用途的適用性和非侵權的。
在任何情況下，作者或版權持有人對任何索賠，損害賠償或其他責任，無論是在一項行動的合同，侵權或其他因出於或有關的軟件
或利用等交易必須軟件。
