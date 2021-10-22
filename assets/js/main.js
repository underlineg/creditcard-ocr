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
    /*
        Tesseract reads the image
        Works wonderderful on images with white and plain background 
    */
    // Tesseract.recognize(
    //     canvas2,
    //     'eng',
    //     { logger: m => {
    //         // console.log(m)
    //         percent.html(Math.round(m.progress * 100) + "%")
    //     } }
    //  ).then(result => {
    //     // textOutput = result.data.text;
    //     textOutput = result.data.text.replace(/[(\@|&|'|\(|\)|<|>|#|-|-|_|=|%|"|$|*|\[|\]|`|´|^|\\|:|;|.|,|’|‘|!|#|a-z|A-Z)|{|}|~|»|a-z|A-Z|\/]/g,"").trim().split('\n');
        
    //     textOutput = textOutput.filter( (n) => { return n.replace(" ", "").trim() } )
    //     textOutput = textOutput.filter( (n) => { return n.trim()})
        
    //     console.log(textOutput)
    //     $('.output-text').html(textOutput)
    //     // $('.output-text').append(text)
    // })
}

/* change colors to high contrast */
// second try: find the edges of image, then change colors to black and white
var drawHighContrast = function(){
    let src = cv.imread('canvasInput');
    
    //Blur image in order remove some noise
    let dst = new cv.Mat();
    let ksize = new cv.Size(5, 5);
    let anchor = new cv.Point(-1, -1);
    cv.cvtColor(src, src, cv.COLOR_RGBA2RGB, 0);
    cv.blur(src, dst, ksize, anchor, cv.BORDER_DEFAULT);
    cv.imshow('canvasOutput', dst);
    //endblur
    
    //Find edges
    src = cv.imread('canvasOutput')
    dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);
    let lowThreshold = 180;
    let thresholdRatio = 2;
    let lowThresholdRatio =  lowThreshold*thresholdRatio;
    let lines = new cv.Mat();
    let color = new cv.Scalar(255, 0, 0);
    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 1);
    cv.Canny(src, src, lowThreshold, lowThresholdRatio, 3);
    cv.HoughLinesP(src, lines, 5, Math.PI / 180, 1, 0, 0);
    for (let i = 0; i < lines.rows; ++i) {
        let startPoint = new cv.Point(lines.data32S[i * 4], lines.data32S[i * 4 + 1]);
        let endPoint = new cv.Point(lines.data32S[i * 4 + 2], lines.data32S[i * 4 + 3]);
        cv.line(dst, startPoint, endPoint, color);
    }
    cv.imshow('canvasOutput', dst);
    //end find edges

    src = cv.imread('canvasOutput');
        dst = new cv.Mat();
        let low = new cv.Mat(src.rows, src.cols, src.type(), [0, 0, 0, 0]);
        let high = new cv.Mat(src.rows, src.cols, src.type(), [180, 180, 180, 255]);
        cv.inRange(src, low, high, dst);

    cv.imshow('canvasOutput', dst);
    src.delete(); dst.delete(); lines.delete();
}