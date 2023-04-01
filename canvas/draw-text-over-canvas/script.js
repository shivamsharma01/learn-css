let canvas;
let ctx;
const numParticles = 1000;
const activeDistance = 300;
const defaultParticleSize = 3;

const mouse = {
  x: null,
  y: null,
  radius: 150,
};

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.onload = function () {
  canvas = document.getElementById("canvas1");
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.fillStyle = "white";
  ctx.font = "90px Verdana";
  ctx.fillText("A", 0, 30);
  ctx.strokeStyle = "white";

  animate(canvas, ctx, init(numParticles));
};

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = defaultParticleSize;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 30 + 1;
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < activeDistance) {
      this.size = 30;
    } else {
      this.size = 3;
    }
  }
}

const init = (numParticles) => {
  return Array.from(Array(numParticles)).map((_) => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    return new Particle(x, y);
  });
};

const animate = (canvas, ctx, particleArray) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].draw();
    particleArray[i].update();
  }
  requestAnimationFrame(() => {
    animate(canvas, ctx, particleArray);
  });
};
