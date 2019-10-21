cv['onRuntimeInitialized'] = () => {
    document.getElementById('status').innerHTML = 'OpenCV.js is ready.';
    let src = cv.imread("input-img");
    // 1) Black output image (with red lines)
    let dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);
    let lines = new cv.Mat();
    let color = new cv.Scalar(255, 0, 0);
    
    // 2) TODO: Converting to hsv
    cv.cvtColor(src, src, cv.COLOR_BGR2HSV, 0);  // COLOR_BGR2HSV  COLOR_RGBA2GRAY

    // 3) Filtering for purple color:
    let low = new cv.Mat(src.rows, src.cols, src.type(), [45, 52, 72, 0]);  // HSL: [250, 30, 30]
    let high = new cv.Mat(src.rows, src.cols, src.type(), [102, 255, 255, 255]);  // HSL: [340, 100, 80]
    cv.inRange(src, low, high, src);
    
    // 4) Applying canny edge detector
    cv.Canny(src, src, 50, 200, 3);
    // You can try more different parameters
    cv.HoughLinesP(src, lines, 1, 1 * Math.PI/180, 0, 5, 5);
    // draw lines
    for (let i = 0; i < lines.rows; ++i) {
        let startPoint = new cv.Point(lines.data32S[i * 4], lines.data32S[i * 4 + 1]);
        let endPoint = new cv.Point(lines.data32S[i * 4 + 2], lines.data32S[i * 4 + 3]);
        cv.line(dst, startPoint, endPoint, color);
    }

    cv.imshow('canvasOutput', dst);

    alert(lines.rows + " lines detected");
    src.delete(); dst.delete(); lines.delete();
};