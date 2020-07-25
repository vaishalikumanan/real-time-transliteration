const Character = {
    VOWEL: 1,
    CONSONANT: 2,
    OTHER: 3
};
Object.freeze(Character);

const transliterate = (text) => { 
    var lines = text.split('\n');
    var tamilText = lines.map((line) => {
        var englishStrings = line.split(' ');
        var tamilStrings = englishStrings.map(transliterateWord);
        return tamilStrings.join(' ');
    });
    return tamilText.join('\n');
}

const transliterateWord = (word) => {
    var tamilWord = '';
    var pos = 0;
    var i = 2;
    var prev = Character.OTHER;
    var inTable = false;

    if (word[0] === 'n') {
        word = '-n' + word.substr(1);
    }

    while (i >= 0 && pos < word.length) {
        var substr = word.substr(pos, i);
        var letter = substr;
        var curr = Character.OTHER;
        inTable = substr in table;

        if (inTable) {
            curr = table[substr].hasOwnProperty('concat') ? Character.VOWEL : Character.CONSONANT;
            letter = (prev === Character.CONSONANT && curr !== Character.CONSONANT ) ? table[substr].concat : table[substr].unicode;

            if (curr === Character.CONSONANT && prev === Character.CONSONANT) {
                letter = table['-'].concat + letter;
            }
            
            if (curr === Character.CONSONANT && pos + i > word.length - 1) {
                letter += table['-'].concat;
            } 
 
            i = 0;
        }
        else {
            i--;
        }

        if (i === 0){
            if (prev === Character.CONSONANT && curr === Character.OTHER) {
                letter = table['-'].concat + letter;
            }
            
            tamilWord += letter;
            pos += substr.length;
            i = 2;
            prev = curr;
        }
    }

    return tamilWord;
}