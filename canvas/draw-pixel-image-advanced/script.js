import { cyberPunkImageBase64Url } from "../imageData.js";

const loadImage = () => {
  const image1 = new Image();
  //image1.src = "cyberpunk.jpg";
  // if the above fail use below code using base64 string converted using // https://onlinepngtools.com/convert-png-to-base64
  image1.src = cyberPunkImageBase64Url();
  return image1;
};

const image = loadImage();
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 799;
canvas.height = 981;

image.addEventListener("load", function () {
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  const numberOfParticles = 5000;
  let particlesArray = Array.from(Array(numberOfParticles)).map(
    (_) => new Particle(canvas, ctx)
  );

  const mappedImage = getBrightnessMap(canvas);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  animate(image, mappedImage, canvas, ctx, particlesArray);
});

const calculateRelativeBrightness = (r, g, b) => {
  return Math.sqrt(r * r * 0.299 + g * g * 0.587 + b * b * 0.114) / 100;
};

const getBrightnessMap = (canvas) => {
  const mappedImage = [];
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < canvas.height; y++) {
    let row = [];
    for (let x = 0; x < canvas.width; x++) {
      const red = pixels.data[y * 4 * pixels.width + x * 4];
      const green = pixels.data[y * 4 * pixels.width + x * 4 + 1];
      const blue = pixels.data[y * 4 * pixels.width + x * 4 + 2];
      const brightness = calculateRelativeBrightness(red, green, blue);
      row.push(brightness);
    }
    mappedImage.push(row);
  }
  return mappedImage;
};
class Particle {
  #canvas;
  #ctx;
  constructor(canvas, ctx) {
    this.#canvas = canvas;
    this.#ctx = ctx;
    this.x = Math.random() * this.#canvas.width;
    this.y = 0;
    this.speed = 0;
    this.velocity = Math.random() * 0.5;
    this.size = Math.random() * 1.5 + 1;
    this.position1 = Math.floor(this.y);
    this.position2 = Math.floor(this.x);
  }

  update(mappedImage) {
    this.position1 = Math.floor(this.y);
    this.position2 = Math.floor(this.x);

    this.speed = mappedImage[this.position1][this.position2];

    let movement = 2.5 - this.speed + this.velocity;
    this.y += movement;
    if (this.y >= this.#canvas.height) {
      this.y = 0;
      this.x = Math.random() * this.#canvas.width;
    }
  }

  draw() {
    this.#ctx.beginPath();
    this.#ctx.fillStyle = "white";
    this.#ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.#ctx.fill();
  }
}

const animate = (image, mappedImage, canvas, ctx, particlesArray) => {
  ctx.globalAlpha = 0.05; // some visibility, 0 not visible, 1 visible
  ctx.fillStyle = "rgb(0, 0, 0)"; // set black background
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 0.2;
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update(mappedImage);
    ctx.globalAlpha = particlesArray[i].speed * 0.5;
    particlesArray[i].draw();
  }
  requestAnimationFrame(() =>
    animate(image, mappedImage, canvas, ctx, particlesArray)
  );
};
