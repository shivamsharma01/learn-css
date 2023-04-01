import { theMandalorianImageBase64Url } from "../data/imageData.js";

const loadImage = () => {
  const image1 = new Image();
  //image1.src = "cyberpunk.jpg";
  // if the above fail use below code using base64 string converted using // https://onlinepngtools.com/convert-png-to-base64
  image1.src = theMandalorianImageBase64Url();
  return image1;
};

const image = loadImage();
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 523;
canvas.height = 800;
let mappedImage;
image.addEventListener("load", function () {
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0.2, "pink");
  gradient.addColorStop(0.3, "red");
  gradient.addColorStop(0.4, "orange");
  gradient.addColorStop(0.5, "yellow");
  gradient.addColorStop(0.6, "green");
  gradient.addColorStop(0.7, "turquoise");
  gradient.addColorStop(0.8, "violet");

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  const numberOfParticles = 5000;
  let particlesArray = Array.from(Array(numberOfParticles)).map(
    (_) => new Particle()
  );

  mappedImage = getBrightnessMap(canvas);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  animate(particlesArray);
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
      const cell = [brightness, `rgb(${red},${green}, ${blue})`]; // only number will be saved, this syntax basically is for the developer to know what we are saving
      row.push(cell);
    }
    mappedImage.push(row);
  }
  return mappedImage;
};

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.speed = 0;
    this.velocity = Math.random() * 0.5;
    this.size = Math.random() * 1.5 + 1;
    this.position1 = Math.floor(this.y);
    this.position2 = Math.floor(this.x);
    this.flipX = false;
    this.flipY = false;
    this.angle = 0;
  }

  update() {
    this.position1 = Math.floor(this.y);
    this.position2 = Math.floor(this.x);

    this.speed = mappedImage[this.position1][this.position2][0];

    let movement = 2.5 - this.speed + this.velocity;

    if (this.flipY) this.y -= movement;
    else this.y += movement;

    if (this.flipX) this.x -= movement;
    else this.x += movement;

    if (this.y >= canvas.height) {
      this.y = canvas.height - 1;
      this.flipY = true;
    } else if (this.y < 0) {
      this.y = 0;
      this.flipY = false;
    }

    if (this.x >= canvas.width) {
      this.x = canvas.width - 1;
      this.flipX = true;
    } else if (this.x < 0) {
      this.x = 0;
      this.flipX = false;
    }
  }

  updateWithRandomMotion() {
    this.position1 = Math.floor(this.y);
    this.position2 = Math.floor(this.x);
    if (
      mappedImage[this.position1] != undefined &&
      mappedImage[this.position1][this.position2] != undefined
    ) {
      this.speed = mappedImage[this.position1][this.position2][0];
    }
    const movement = 2.5 - this.speed + this.velocity;
    this.angle += this.speed / 20;
    this.size = this.speed * 2.5;

    this.y -= movement;
    this.x += movement + Math.cos(this.angle) * 2;

    if (this.y <= 0) {
      this.y = canvas.height;
      this.x = Math.random() * canvas.width;
    }
    if (this.x >= canvas.width) {
      this.x = 0;
      this.y = Math.random() * canvas.height;
    }
  }

  draw() {
    ctx.beginPath();
    if (
      mappedImage[this.position1] != undefined &&
      mappedImage[this.position1][this.position2] != undefined
    ) {
      ctx.fillStyle = mappedImage[this.position1][this.position2][1];
    }
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const animate = (particlesArray) => {
  ctx.globalAlpha = 0.05; // some visibility, 0 not visible, 1 visible
  ctx.fillStyle = "rgb(0, 0, 0)"; // set black background
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 0.2;
  for (let i = 0; i < particlesArray.length; i++) {
    //particlesArray[i].update(mappedImage);
    particlesArray[i].updateWithRandomMotion();
    ctx.globalAlpha = particlesArray[i].speed * 0.5;
    particlesArray[i].draw();
  }
  requestAnimationFrame(() => animate(particlesArray));
};
