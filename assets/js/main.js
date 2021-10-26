let files = "";
let imgUrl = "";
let textOutput = "";

let canvasOutput = "";
let canvasInput = "";

$('.btn-file-upload').click(function(){
    $('#file-upload').click();
})

var htmlWait = `<div class="wait hidden">
<h5>Por favor aguarde, extraindo texto...</h5>
<i class="fas fa-circle-notch fa-spin"></i>
<p class="percent"></p>  
</div>`

let percent = $('.percent');

$(document).on('change', '#file-upload', function(e) {
    var sFileName  = this.value;
    var name = $('#file-upload').val().split(/\\|\//).pop();
    
    $('.input-text-label').val( name );

    files = e.target.files
    if (files.length > 0) {
        imgUrl = URL.createObjectURL(files[0]);
        callTesseract( loadImageToCanvas(imgUrl) );
    }
});




dragAndDrop();


//tesseractInit