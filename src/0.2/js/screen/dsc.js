import requestFrame from '../utils/AnimationFrame';


class DrawableLogo {
  constructor(logo) {
    this.image = logo.el;
  }

  draw(ctx, w, h) {
    let ew = 80, eh = 59;
    let x = w / 2 - ew / 2;
    let y = h / 2 - eh / 2;
    ctx.drawImage(this.image, 0, 0, ew, eh, x, y, ew, eh);
  }

  drawText(ctx, w, h) {
    let ew = 202, eh = 16;
    let x = w / 2 - ew / 2;
    let y = h / 2 - eh / 2 + 68;
    ctx.drawImage(this.image, 0, 68, ew, eh, x, y, ew, eh);
  }
}

class DrawableNoise {
  constructor() {
    this.startTime = new Date().getTime();
    this.lastTime = 0;
    this.count = 0;
    this.noiseTime = 4000;
    this.timeout = 6000;
    this.noise = false;
  }

  makeNoise(ctx, w, h) {
    let imageData=ctx.getImageData(0,0,w,h);

    for (var i=0;i<imageData.data.length;i+=4) {
        if (imageData.data[i+3] !== 0 && !!Math.floor(Math.random() * 2)) {
          imageData.data[i+3] = Math.floor(Math.random() * 100);
        }
    }
    ctx.putImageData(imageData,0,0);
  }

  draw(ctx, w, h) {
    let lease = this.lastTime - this.startTime;
    this.lastTime = new Date().getTime();

    if (lease >= this.timeout) {
      this.startTime = this.lastTime;
    }

    if (lease < this.noiseTime) {
      if (lease < (this.noiseTime - 100)) {
        this.noise = true;
      } else {
        this.noise = false;
      }
      this.makeNoise.apply(this, arguments);
    }
  }
}


class DrawableLine {
  constructor(start, speed, seed) {
    this.start = start;
    this.seed = seed;
    this.h = 0;
    this.speed = speed;
  }

  draw(ctx, w, h, isDraw) {
    if (isDraw) {
      ctx.beginPath();
      ctx.strokeStyle = "#aaa";
      ctx.lineWidth = 0.4;
      ctx.moveTo(0, this.h);
      ctx.lineTo(w, this.h + this.seed);
      ctx.stroke();
    }

    this.h += this.speed;

    if (this.h >= h) {
      this.h = this.start;
    }

    if (this.h <= 0) {
      this.h = h;
    }
  }
}


let instance = null;
class DscLogo {
  static getInstance(options) {
    if (instance === null) {
      instance = new DscLogo(options);
    }
    return instance;
  }

  constructor(options) {
    this.assets = options.assets;
    this.canvas = options.canvas;
    this.attachCanvas();
    this.setup();
    this.draw();
  }


  draw() {
    let width = this.canvas.width, height = this.canvas.height;
    let isDraw = false;
    this.ctx.save();

    this.ctx.clearRect(0, 0, width, height);

    this.drawableLogo.draw(this.ctx, width, height);

    if (this.drawableNoise.noise === true) {
      this.drawableLogo.drawText(this.ctx, width, height);
      isDraw = true;
    } else {
      isDraw = false;
    }

    this.drawableLine1.draw(this.ctx, width, height, isDraw);
    //this.drawableLine2.draw(this.ctx, width, height, isDraw);

    this.drawableNoise.draw(this.ctx, width, height);

    this.ctx.restore();
    setTimeout(() => requestFrame(this.draw.bind(this)), 50);
  }

  setup () {
    this.drawableLogo = new DrawableLogo(this.assets.logo);
    this.drawableNoise = new DrawableNoise();
    this.drawableLine1 = new DrawableLine(100, -3, 40);
  //  this.drawableLine2 = new DrawableLine(90, 20, -20);
  }

  onResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    return this.onResize.bind(this);
  }

  attachCanvas() {
    window.addEventListener('resize', this.onResize());
    this.ctx = this.canvas.getContext('2d');
  }
}

export default DscLogo;
