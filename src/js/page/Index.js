import ns from '../module/ns';
import Generator from '../module/Generator';

function plus(a, b) {
  return {
    0: a[0] + b[0],
    1: a[1] + b[1],
  };
}

function sub(a, b) {
  return {
    0: a[0] - b[0],
    1: a[1] - b[1],
  };
}

function mult(a, b) {
  return {
    0: a[0] * b[0] - a[1] * b[1],
    1: a[0] * b[1] + a[1] * b[0],
  };
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
      this.plot(6);

      ns.gArr.push(ns.currentGenerator);
    });

    this.$container.on('replot-fractal', (_evt, iteration) => {
      this.plot(iteration);
    });
  }

  // TODO: requestAnimationFrameで負荷軽減
  plot(iteration = 0) {
    this.ctx.clearRect(0, 0, 256, 256);

    let tmp = [[0, 0]];

    for(let i = 0; i < iteration; i++) {
      tmp = this.iterate(tmp);
    }

    let fractal = tmp;

    fractal.forEach((coord) => {
      this.ctx.fillRect(coord[0] * 128 + 128, coord[1] * 128 + 128, 1, 1);
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
      ret.push(plus(mult(sub(g.p[1], g.p[0]), pt), g.p[0]));
    });

    return ret;
  }
}