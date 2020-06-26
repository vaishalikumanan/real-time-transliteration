const transliterate = (text) => { 
    var lines = text.split('\n')
    var tamilText = lines.map((line) => {
        var englishStrings = line.split(' ')
        var tamilStrings = englishStrings.map(transliterateWord)
        return tamilStrings.join(' ')
    })
    return tamilText.join('\n')
}

const transliterateWord = (word) => {
    var tamilWord = ''
    var pos = 0
    var i = 2
    var prevConsonant = false;

    if (word[0] === 'n') {
        word = '-n' + word.substr(1)
    }

    while (i >= 0 && pos < word.length) {
        var substr = word.substr(pos, i)
        var letter = substr

        if (substr in table) {
            var isConsonant = table[substr].concat === ''
            letter = (prevConsonant && !isConsonant ) ? table[substr].concat : table[substr].unicode
            
            if (isConsonant && prevConsonant) {
                letter = table['.'].concat + letter
            }
            
            if (isConsonant && pos + i > word.length - 1) {
                letter += table['.'].concat
            } 

            tamilWord += letter
            pos += substr.length
            i = 2
            prevConsonant = isConsonant
        }
        else {
            i--
        }

        if (i === 0){
            tamilWord += letter
            pos += substr.length
            i = 2
            prevConsonant = false
        }
    }

    return tamilWord
}