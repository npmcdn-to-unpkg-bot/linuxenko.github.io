let instance = null;
class BG {
  static getInstance(options) {
    if (instance === null) {
      instance = new BG(options);
    }
    return instance;
  }

  constructor(options) {
    this.canvas = options.canvas;
    this.attachCanvas();
  }

  attachCanvas() {
    this.canvas.width = window.innerWidth;
    this.ctx = this.canvas.getContext('2d');
    window.addEventListener('resize', this.onResize());

  }
/*
  drawBeziers() {
    let wS = this.canvas.width - 10;
    let cL = wS - (Math.random() * 50) - 50;
    this.ctx.setTransform (1, 0, 0, 1, 0, 0);

    this.ctx.beginPath();
    this.ctx.moveTo(wS,0);
    this.ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    this.ctx.lineWidth = '6';
    this.ctx.bezierCurveTo(wS , 100, (Math.random() * 40) + 250, 0, 0 , (Math.random() * 50) + 50 );
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(wS + 10,0);
    this.ctx.strokeStyle = 'rgba(208,31,60,0.3)';
    this.ctx.lineWidth = '6';
    this.ctx.bezierCurveTo(cL, 0, cL, 9000, this.canvas.height , 9000);
    this.ctx.stroke();
  }
*/
  drawDot(x,y) {
    if (!!Math.floor(Math.random() * 3)) {
      return;
    }

    let xa = x;
    if (xa > this.canvas.width / 2) {
      xa = this.canvas.width - xa;
    }

    xa = this.canvas.width / 2  - xa;

    let seed = xa / 800;

    if (seed < 0.3) {
      return;
    }

    this.ctx.beginPath();
    this.ctx.fillStyle = 'rgba(0,0,0,0.3)';
    this.ctx.arc(x,y, seed ,0,2*Math.PI);
    this.ctx.fill();
  }

  drawDots() {
    let step = 10;
    for (let y = 0; y < this.canvas.height; y += step) {
      for (let x = 0; x < this.canvas.width; x += step) {
        this.drawDot(x,y);
      }
    }
  }


  draw() {
      this.ctx.save();
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawDots();
      this.ctx.restore();
  }


  onResize() {
    this.canvas.width = 0;
    this.canvas.height = 0;
    let elements = document.querySelectorAll('section.screen');
    for (let i = 0; i < elements.length; i++) {
      this.canvas.height += elements[i].offsetHeight;
    }

    this.canvas.width = elements[0].offsetWidth;

    this.draw();
    return this.onResize.bind(this);
  }
}


export default BG;
