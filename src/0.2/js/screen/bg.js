
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

  draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      let wS = this.canvas.width - 30;
      let cL = wS - (Math.random() * 100);

      this.ctx.beginPath();
			this.ctx.moveTo(wS,0);
			this.ctx.strokeStyle = 'rgba(0,0,0,0.2)';
			this.ctx.lineWidth = '6';
			this.ctx.bezierCurveTo(wS, 400, (Math.random() * 100), 0, -400 , (Math.random() * 400));
			this.ctx.stroke();

			this.ctx.beginPath();
			this.ctx.moveTo(cL,0);
			this.ctx.strokeStyle = 'rgba(208,31,60,0.3)';
			this.ctx.lineWidth = '6';
			this.ctx.bezierCurveTo(cL, this.canvas.height, 0, 9000, 0 , 9000);
			this.ctx.stroke();
  }


  onResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = (document.querySelectorAll('section.screen').length * window.innerHeight) + 20;

    this.draw();
    return this.onResize.bind(this);
  }
}


export default BG;
