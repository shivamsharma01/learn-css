let canvas;
let ctx;
const numParticles = 1000;
const activeDistance = 300;
const defaultParticleSize = 3;
const adjustX = 6;
const adjustY = 0;

const mouse = {
  x: null,
  y: null,
  radius: 100,
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
  ctx.font = "20px Verdana";
  ctx.fillText("Shivam", 0, 30);
  const textCoordinates = ctx.getImageData(0, 0, 200, 200);
  animate(canvas, ctx, init(textCoordinates));
};

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = defaultParticleSize;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 30 + 5;
  }

  draw() {
    ctx.fillStyle = "white";
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
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        const dy = this.y - this.baseY;
        this.y -= dy / 10;
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

const init = (textCoordinates) => {
  const particleArray = [];
  for (let y = 0; y < textCoordinates.height; y++) {
    for (let x = 0; x < textCoordinates.width; x++) {
      if (
        textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3] > 128
      ) {
        particleArray.push(
          new Particle((x + adjustX) * 20, (y + adjustY) * 20)
        );
      }
    }
  }
  return particleArray;
};

const animate = (canvas, ctx, particleArray) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].draw();
    particleArray[i].update();
  }
  connect(ctx, particleArray);
  requestAnimationFrame(() => {
    animate(canvas, ctx, particleArray);
  });
};

const connect = (ctx, particleArray) => {
  const opacity = 1;
  for (let a = 0; a < particleArray.length; a++) {
    for (let b = a; b < particleArray.length; b++) {
      const dx = particleArray[a].x - particleArray[b].x;
      const dy = particleArray[a].y - particleArray[b].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 50})`;

      if (distance < 40) {
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(particleArray[a].x, particleArray[a].y);
        ctx.lineTo(particleArray[b].x, particleArray[b].y);
        ctx.closePath();
        ctx.stroke();
      }
    }
  }
};
