window.onload = function () {
    var pad = document.getElementById('pad')
    var output = document.getElementById('output')

    var transliterateTextArea = function () {
        var input = pad.value
        var text = transliterate(input)
        output.innerHTML = text
    }

    pad.addEventListener('input', transliterateTextArea)

    transliterateTextArea()
}
