let canvas;
let ctx;
const numParticles = 1000;
const activeDistance = 300;
const defaultParticleSize = 3;

const mouse = {
  x: null,
  y: null,
  radius: 250,
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
    this.density = Math.random() * 40 + 5;
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update() {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = mouse.radius;
    if (distance < maxDistance) {
      const newDirections = getNewDirectionForParticleWithinVacinity(
        dx,
        dy,
        distance
      );
      this.x -= newDirections.directionX * this.density;
      this.y -= newDirections.directionY * this.density;
    } else {
      if (this.x !== this.baseX) {
        const dx = this.x - this.baseX;
        this.x -= dx / 5;
      }
      if (this.y !== this.baseY) {
        const dy = this.y - this.baseY;
        this.y -= dy / 5;
      }
    }
  }
}

const getNewDirectionForParticleWithinVacinity = (dx, dy, distance) => {
  const maxDistance = mouse.radius;
  let force = (maxDistance - distance) / maxDistance;
  const forceDirectionX = dx / distance;
  const forceDirectionY = dy / distance;
  return {
    directionX: forceDirectionX * force,
    directionY: forceDirectionY * force,
  };
};

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
