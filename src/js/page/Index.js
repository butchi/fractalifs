import ns from '../module/ns';

function plus(a, b) {
  return {
    0: a[0] + b[0],
    1: a[1] + b[1],
  }
}

function mult(a, b) {
  return {
    0: a[0] * b[0] - a[1] * b[1],
    1: a[0] * b[1] + a[1] * b[0],
  }
}

export default class Index {
  constructor(opts = {}) {
    this.initialize();
  }

  initialize() {
    let containerElm = document.querySelector('.container');

    let canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;

    containerElm.append(canvas);

    let ctx = canvas.getContext('2d');

    let tmp = [[0, 0]];

    for(let i = 0; i < 12; i++) {
      tmp = this.iterate(tmp);
    }

    let fractal = tmp;

    fractal.forEach((coord) => {
      ctx.fillRect(coord[0] * 128 + 128, coord[1] * 128 + 128, 1, 1);
    });
  }

  iterate(ptArr) {
    let ret = [];
    ptArr.forEach((coord) => {
      let tmp = this.ifs(coord);
      ret = ret.concat(tmp);
    });

    return ret;
  }

  ifs(pt) {
    return [
      mult(pt, [0.5, 0.5]),
      plus(mult(pt, [-0.5, 0.5]), [0.5, 0.5]),
    ];
  }
}