let loadImageToCanvas = function(url){
    $('.output-text').html(htmlWait)
    $('.wait').removeClass('hidden');
    $('.show').addClass('show');
    let canvasInput = document.getElementById('canvasInput');
    let ctx = canvasInput.getContext('2d');
    let img = new Image();
    img.crossOrigin = 'anonymous';

    canvasOutput = document.getElementById('canvasOutput') 

    let src = "";
    let textOutput2 = [];
    img.onload = function() {
        canvasInput.width = img.width;
        canvasInput.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        drawHighContrast();
        src = ctx.getImageData(0, 0, canvasInput.width, canvasInput.height);
    };
    img.src = url;
    return  canvasOutput;
}