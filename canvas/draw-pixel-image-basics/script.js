import { animatedNatureImageBase64Url } from "../data/imageData.js";

window.onload = function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 450;
  loadImage(canvas, ctx);
};

const loadImage = (canvas, ctx) => {
  const image1 = new Image();
  //image1.src = "animated_nature1.jpg";
  // if the above fail use below code using base64 string converted using // https://onlinepngtools.com/convert-png-to-base64
  image1.src = animatedNatureImageBase64Url();

  image1.addEventListener("load", function () {
    ctx.drawImage(image1, 0, 0); // to scale down use: ctx.drawImage(image1, 0, 0, canvas.width/2, canvas.height/2);

    processScannerImagePixelData(canvas, ctx);
  });
};

const getScannedImage = (canvas, ctx) => {
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
};

const getScannedImageData = (scannedImage) => {
  // returns an Uint8ClampedArray where each pixels takes 4 consecutive element
  // starting from red pixel value -> green pixel value -> blue pixel value -> alpha pixel value
  // each value is between [0, 256)
  // for alpha 0 is invisible and 255 is fully-visible
  return scannedImage.data;
};

const getTotalRGB = (data, idx) => data[idx] + data[idx + 1] + data[idx + 2];

const updatePixel = (data, idx, val) =>
  (data[idx] = data[idx + 1] = data[idx + 2] = val);

const processPixels = (scannedImageData) => {
  for (let i = 0; i < scannedImageData.length; i += 4) {
    const total = getTotalRGB(scannedImageData, i);
    const avgValue = total / 3;
    updatePixel(scannedImageData, i, avgValue);
  }
};

const updateScannedImageData = (ctx, scannedImage, data) => {
  scannedImage.data.map((_, idx) => data[idx]);
  ctx.putImageData(scannedImage, 0, 0);
};

const processScannerImagePixelData = (canvas, ctx) => {
  const scannedImage = getScannedImage(canvas, ctx);
  const scannedImageData = getScannedImageData(scannedImage);
  processPixels(scannedImageData);
  updateScannedImageData(ctx, scannedImage, scannedImageData);
};
