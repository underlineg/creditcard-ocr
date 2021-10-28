import {loadImageCanvas} from './loadImageCanvas';
import {callTesseract} from './callTesseract';
import {dragAndDrop} from './dragAndDrop';

let files = "";
let imgUrl = "";


$('.btn-file-upload').click(function(){
    $('#file-upload').click();
})

$(document).on('change', '#file-upload', function(e) {
    let sFileName  = this.value;
    let name = $('#file-upload').val().split(/\\|\//).pop();
    
    $('.input-text-label').val( name );

    files = e.target.files
    if (files.length > 0) {
        imgUrl = URL.createObjectURL(files[0]);
        callTesseract( loadImageCanvas(imgUrl) );
        // loadImageCanvas(imgUrl)
    }
});




dragAndDrop();


//tesseractInit