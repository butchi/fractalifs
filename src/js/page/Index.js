import ns from '../module/ns';

let p = [
  [
    [0,   0  ],
    [0.5, 0.5]
  ],
  [
    [0.5, 0.5],
    [1,   0  ]
  ]
];

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
    let containerElm = document.querySelector('.container');

    this.canvas = document.createElement('canvas');
    this.canvas.width = 256;
    this.canvas.height = 256;

    containerElm.append(this.canvas);

    this.ctx = this.canvas.getContext('2d');

    this.ctrlPlot();

    this.plot();
  }

  ctrlPlot() {
    p.forEach((line) => {
      this.ctx.beginPath();
      this.ctx.moveTo(line[0][0] * 128 + 128, line[0][1] * 128 + 128);
      this.ctx.lineTo(line[1][0] * 128 + 128, line[1][1] * 128 + 128);
      this.ctx.strokeStyle = 0xff0000;
      this.ctx.stroke();
    })
  }

  plot() {
    let tmp = [[0, 0]];

    for(let i = 0; i < 12; i++) {
      tmp = this.iterate(tmp);
    }

    let fractal = tmp;

    fractal.forEach((coord) => {
      this.ctx.fillRect(coord[0] * 128 + 128, coord[1] * 128 + 128, 1, 1);
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
    let ret = [];

    p.forEach((line) => {
      ret.push(plus(mult(sub(line[1], line[0]), pt), line[0]));
    });

    return ret;
  }
}