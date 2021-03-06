/* change colors to high contrast */
// second try: find the edges of image, then change colors to black and white
export function drawHighContrast(){
    // let src = cv.imread('canvasInput');
    // let dst = new cv.Mat();
    // cv.cvtColor(src, src, cv.COLOR_RGBA2RGB, 0);
    // cv.bilateralFilter(src, dst, 15, 120, 50, cv.BORDER_DEFAULT);
    // cv.imshow('canvasOutput', dst);


    // src = cv.imread('canvasOutput');
    // dst = new cv.Mat();
    // cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
    // // You can try more different parameters
    // cv.Canny(src, dst, 90, 255, 3, true);
    // cv.imshow('canvasOutput', dst);

    let src = cv.imread('canvasInput');
    let dst = new cv.Mat();
    cv.cvtColor(src, src, cv.COLOR_RGBA2RGB, 0);
    cv.bilateralFilter(src, dst, 10, 30, 10, cv.BORDER_DEFAULT);
    cv.imshow('canvasOutput', dst);

    src = cv.imread('canvasOutput');
    dst = new cv.Mat();/**/
    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
    cv.adaptiveThreshold(src, dst, 280, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 3, 7);
    cv.imshow('canvasOutput', dst);

    

    //bilateralFilter is a little bit slow
    //This is a test for another smooth
    /**/
    // src = cv.imread('canvasOutput');
    // dst = new cv.Mat();
    // cv.medianBlur(src, dst, 9);
    // cv.imshow('canvasOutput', dst);
    
    //it was a piece of crap.

    



    /*src = cv.imread('canvasOutput')
    dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);
    //Find edges
    let lowThreshold = 300;
    let thresholdRatio = 1;
    let lowThresholdRatio =  lowThreshold*thresholdRatio;
    let lines = new cv.Mat();
    let color = new cv.Scalar(255, 0, 0);
    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
    cv.Canny(src, src, lowThreshold, lowThresholdRatio, 3);
    cv.HoughLinesP(src, lines, 5, Math.PI / 180, 1, 0, 0);
    for (let i = 0; i < lines.rows; ++i) {
        let startPoint = new cv.Point(lines.data32S[i * 4], lines.data32S[i * 4 + 1]);
        let endPoint = new cv.Point(lines.data32S[i * 4 + 2], lines.data32S[i * 4 + 3]);
        cv.line(dst, startPoint, endPoint, color);
    }
    cv.imshow('canvasOutput', dst);*/
    //end find edges

    /*src = cv.imread('canvasOutput');
        dst = new cv.Mat();
        let low = new cv.Mat(src.rows, src.cols, src.type(), [0, 0, 0, 0]);
        let high = new cv.Mat(src.rows, src.cols, src.type(), [180, 180, 180, 255]);
        cv.inRange(src, low, high, dst);

    cv.imshow('canvasOutput', dst);
    src.delete(); dst.delete(); lines.delete();*/
}
