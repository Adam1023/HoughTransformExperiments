cv['onRuntimeInitialized'] = () => {
    document.getElementById('status').innerHTML = 'OpenCV.js is ready.';
    let src = cv.imread("input-img");
    // 1) Black output image (with red lines)
    let dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);
    let lines = new cv.Mat();
    let color = new cv.Scalar(255, 0, 0);
    // 2) Converting to hsl
    // cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);  // COLOR_BGR2HSV
    // 3) Filtering for purple color:
    let low = new cv.Mat(src.rows, src.cols, src.type(), [150, 0, 150, 0]);  // HSL: [250, 30, 30]
    let high = new cv.Mat(src.rows, src.cols, src.type(), [255, 150, 255, 255]);  // HSL: [340, 100, 80]
    cv.inRange(src, low, high, src);
    // 4) Applying canny edge detector
    // cv.Canny(src, src, 50, 200, 3);

    cv.imshow('canvasOutput', src);
    src.delete(); dst.delete(); lines.delete();
};