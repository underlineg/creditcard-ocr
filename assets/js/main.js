let files = "";
let imgUrl = "";
let textOutput = "";

$('.btn-file-upload').click(function(){
    $('#file-upload').click();
})

var htmlWait = `<div class="wait hidden">
<h5>Por favor aguarde, extraindo texto...</h5>
<i class="fas fa-circle-notch fa-spin"></i>
<p class="percent"></p>  
</div>`


$(document).on('change', '#file-upload', function(e) {
    var sFileName  = this.value;
    var name = $('#file-upload').val().split(/\\|\//).pop();
    
    $('.input-text-label').val( name );

    files = e.target.files
    if (files.length > 0) {
        imgUrl = URL.createObjectURL(files[0]);
        loadImageToCanvas(imgUrl);
    }
});


// let numOnly = "";
        // Tesseract.recognize(
        //     'nubank-credit-card-pb2.png',
        //     'eng',
        //     { logger: m => console.log(m) }
        //     ).then(({ data: { text } }) => {
        //         console.log("Original text:",text);
        //         // numOnly = text.replace(/[^\d.-]/g, '');
        //         // console.log("Numbers only:",numOnly)
                
        //     }
        // )

let percent = $('.percent');


var loadImageToCanvas = function(url){
    $('.output-text').html(htmlWait)
    $('.wait').removeClass('hidden');
    $('.show').addClass('show');
    let canvas = document.getElementById('canvasInput');
    let ctx = canvas.getContext('2d');
    let img = new Image();
    img.crossOrigin = 'anonymous';

    let canvas2 = document.getElementById('canvasOutput') 

    let src = "";
    let textOutput2 = [];
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        drawHighContrast();
        src = ctx.getImageData(0, 0, canvas.width, canvas.height);
    };
    img.src = url;
    percent = $('.percent')

    Tesseract.recognize(
        canvas2,
        'eng',
        { logger: m => {
            // console.log(m)
            percent.html(Math.round(m.progress * 100) + "%")
        } }
     ).then(result => {
        textOutput = result.data.text.replace(/[(\@|&|'|\(|\)|<|>|#|-|-|_|=|%|"|$|*|\[|\]|`|´|^|\\|:|;|.|,|’|‘|!|#|a-z|A-Z)|{|}|~|»]/g,"").trim().split('\n');
        
        textOutput = textOutput.filter( (n) => { return n.replace(" ", "").trim() } )
        textOutput = textOutput.filter( (n) => { return n.trim()})
        
        console.log(textOutput)
        $('.output-text').html(textOutput)
        // $('.output-text').append(text)
    })
}

/* change colors to high contrast */
// primeira tentativa: ler apenas o alto contraste
var drawHighContrast = function(){
    let src = cv.imread('canvasInput');
    let dst = new cv.Mat();
    let low = new cv.Mat(src.rows, src.cols, src.type(), [0, 0, 0, 0]);
    let high = new cv.Mat(src.rows, src.cols, src.type(), [250, 120, 255, 255]);
    cv.inRange(src, low, high, dst);
    cv.imshow('canvasOutput', dst);
    src.delete(); dst.delete(); low.delete(); high.delete();
}
