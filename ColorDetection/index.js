cv['onRuntimeInitialized'] = () => {
    document.getElementById('status').innerHTML = 'OpenCV.js is ready.';
    let src = cv.imread("input-img");
    // 1) Black output image (with red lines)
    let dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);
    let lines = new cv.Mat();
    let color = new cv.Scalar(255, 0, 0);
    // 2) Converting to hsv
    // cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);  // COLOR_BGR2HSV
    // 3) Filtering for purple color:
    let low = new cv.Mat(src.rows, src.cols, src.type(), [150, 0, 150, 0]);
    let high = new cv.Mat(src.rows, src.cols, src.type(), [255, 150, 255, 255]);
    cv.inRange(src, low, high, src);
    // 4) Applying canny edge detector
    cv.Canny(src, src, 50, 200, 3);
    // You can try more different parameters
    cv.HoughLinesP(src, lines, 1, 1 * Math.PI/180, 0, 0, 0);
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