let canvas = document.getElementById('animBox');
let ctx = canvas.getContext('2d');

let canvasWidth = canvas.offsetWidth + 200; // canvas width
let canvasHeight = canvas.offsetHeight; // canvas height

ctx.translate(0, 400); // translate to rectangle center x = x + 0.5 * width ; y = y + 0.5 * height
ctx.rotate(-45 * Math.PI / 180);

function Box(boxSize, x, y, direction, stepCount, colorRandom) {
  this.boxSize = boxSize,
    this.x = x,
    this.y = y,
    this.direction = direction,
    this.stepCount = stepCount,
    this.colorRandom = colorRandom;
    this.draw = function () {
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255,95,95, .5)';
      ctx.globalAlpha = this.colorRandom;
      ctx.fillRect(this.x, this.y, this.boxSize, this.boxSize);
    },
    this.move = function () {
      switch (this.direction) {
        case 0:
          // up
          this.y = this.y - 1;
          break;
        case 1:
          // right
          this.x = this.x + 1;
          break;
        case 2:
          // down
          this.y = this.y + 1;
          break;
        case 3:
          // left
          this.x = this.x - 1;
          break;
      }
      if (this.x < 0) {
        this.direction = Math.floor(4 * Math.random());
        this.x = this.x + 1;
      }
      if (this.x + this.boxSize >= canvasWidth) {
        this.direction = Math.floor(4 * Math.random());
        this.x = this.x - 1;
      }
      if (this.y < 0) {
        this.direction = Math.floor(4 * Math.random());
        this.y = this.y + 1;
      }
      if (this.y + this.boxSize >= canvasHeight) {
        this.direction = Math.floor(4 * Math.random());
        this.y = this.y - 1;
      }
      if (this.stepCount == 0) {
        this.stepCount = Math.floor(50 * Math.random());
        this.direction = Math.floor(4 * Math.random());
      } else {
        this.stepCount--;
      }
      this.draw();
    }
}
let boxArr = [];
for (let i = 0; i < 50; i++) {
  let boxSize = Math.ceil(Math.random() * 100); // max box size in px
  let x = Math.floor(Math.random() * (canvasWidth - boxSize)); // random point x
  let y = Math.floor(Math.random() * (canvasHeight - boxSize)); // random point y
  let stepCount = 0;
  let direction;
  let colorRandom = Math.ceil(Math.random() * 10) / 10;
  if (colorRandom == 1) {
    colorRandom = colorRandom - 0.1;
  }
  if (stepCount == 0) {
    stepCount = Math.floor(100 * Math.random());
    direction = Math.floor(4 * Math.random());
  } else {
    stepCount--;
  }
  boxArr.push(new Box(boxSize, x, y, direction, stepCount, colorRandom));
}
function moveBox() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  for (let i = 0; i < boxArr.length; i++) {
    boxArr[i].move();
  }
  setTimeout(moveBox, 40);
}
moveBox();