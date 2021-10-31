//needs refinate the high contrast
export let callTesseract = function(target){
    console.log("calling tesseract")
    Tesseract.recognize(
        target,
        'eng',
        { logger: m => {
            console.log(m)
            // $('.percent').html(Math.round(m.progress * 100) + "%")
        } }
     ).then(result => {
        let textOutput = "";
        console.log("result",result.data)
        textOutput = result.data.text.replace(/[(\@|&|'|\(|\)|<|>|#|-|-|_|=|%|"|$|*|\[|\]|`|´|^|\\|:|;|.|,|’|‘|!|#|a-z|A-Z|{|}|~|»|\/)]/g,"").trim().split('\n');
        textOutput = textOutput.filter( (n) => { return n.replace(" ", "").trim() } )
        textOutput = textOutput.filter( (n) => { return n.trim()})
        console.log("textOutput", textOutput)
        // $('.output-text').html( textOutput )
    })
}