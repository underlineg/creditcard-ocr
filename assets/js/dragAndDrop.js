/* start drag and drop*/
import {callTesseract} from './callTesseract';
import {loadImageCanvas} from './loadImageCanvas';

export function dragAndDrop(){
    
    $(window).on('drag dragstart dragend dragover dragenter dragleave drop', function(e){
        e.preventDefault();
        e.stopPropagation();
    });
    $(".container").on('drag dragstart dragend dragover dragenter dragleave drop', "#file-upload", function(e) {
        e.preventDefault();
        e.stopPropagation();
    }).on("dragover, dragenter", function(e) {
        e.preventDefault();
        e.stopPropagation();

        $('.drag-zone').addClass('show')
    }).on("dragleave, dragend, drop", function(e) {
        e.preventDefault();
        e.stopPropagation();
        $('.drag-zone').removeClass('show')
    }).on("drop", function(e) { 
        e.preventDefault(); 
        e.stopPropagation(); 

        let dt = e.originalEvent.dataTransfer
        let files = dt.files;
        let files2 = [...files];
        files2.forEach( handleFileUpload )
    });

    
    
}

let handleFileUpload = function (file) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function() {
        let img = document.createElement('img')
        img.src = reader.result
        let percent = $('.percent');
        
        callTesseract( loadImageCanvas(img.src) )
    }
}

/* end drag and drop */