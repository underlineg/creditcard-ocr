import {drawHighContrast} from './drawHighContrast';
import {showPercent} from './showPercent';

export function loadImageCanvas(url){
    showPercent();
    
    let canvasInput = document.getElementById('canvasInput');
    let ctx = canvasInput.getContext('2d');
    let img = new Image();
    img.crossOrigin = 'anonymous';

    let canvasOutput = document.getElementById('canvasOutput') 

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
    // return "loadImageCanvas was called"
}