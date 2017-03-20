import ns from '../module/ns';
import Point from '../module/Point';
import Line from '../module/Line';
import Generator from '../module/Generator';

const MAX_POINTS = 10000;

function plus(a, b) {
  return new Point({
    0: a.x + b.x,
    1: a.y + b.y,
  });
}

function sub(a, b) {
  return new Point({
    0: a.x - b.x,
    1: a.y - b.y,
  });
}

function mult(a, b) {
  return new Point({
    0: a.x * b.x - a.y * b.y,
    1: a.x * b.y + a.y * b.x,
  });
}

export default class Index {
  constructor(opts = {}) {
    this.initialize();
  }

  initialize() {
    this.$container = $('.container');

    this.canvas = document.createElement('canvas');
    this.canvas.width = 256;
    this.canvas.height = 256;
    $(this.canvas).addClass('elm-canvas');

    this.$container.append(this.canvas);

    ns.$ctrlCanvas = $('.ctrl-canvas');

    this.$container.append(ns.$ctrlCanvas);

    this.ctx = this.canvas.getContext('2d');

    ns.gArr = [];

    $('.btn-add-generator').on('click', (_evt) => {
      ns.currentGenerator = new Generator();

      ns.gArr.push(ns.currentGenerator);
    });

    this.$container.on('set-line', () => {
      this.plot(12);
    });

    this.$container.on('replot-fractal', (_evt, iteration) => {
      this.plot(iteration);
    });
  }

  plot(iteration = 0) {
    let maxIteration = Math.floor(Math.log(MAX_POINTS) / Math.log(ns.gArr.length));
    iteration = Math.min(iteration, maxIteration);
    this.ctx.clearRect(0, 0, 256, 256);

    // let tmp = [new Line({
    //   0: new Point({
    //     0: 0,
    //     1: 0,
    //   }),
    //   1: new Point({
    //     0: 1,
    //     1: 0,
    //   }),
    // })];

    let tmp = [new Point({
      x: 0,
      y: 0,
    })];

    for(let i = 0; i < iteration; i++) {
      tmp = this.iterate(tmp);
    }

    let fractal = tmp;

    fractal.forEach((pt) => {
      this.ctx.fillRect(pt.x * 128 + 128, pt.y * 128 + 128, 1, 1);
    });
  }

  iterate(coordArr) {
    let ret = [];
    coordArr.forEach((coord) => {
      let tmp = this.ifs(coord);
      ret = ret.concat(tmp);
    });

    return ret;
  }

  ifs(pt) {
    let ret = [];

    ns.gArr.forEach((g) => {
      ret.push(plus(mult(sub(g.line.end, g.line.start), pt), g.line.start));
    });

    return ret;
  }
}