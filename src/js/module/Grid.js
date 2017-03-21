import ns from './ns';
import Point from './Point';
import Line from './Line';
import {plus, sub, mult} from './util';

export default class Grid {
  constructor(opts = {}) {
    this.initialize(opts);
  }

  initialize(opts) {
    this.canvas = opts.canvas;
    this.ctx = this.canvas.getContext('2d');

    this.type = opts.type;

    this.interval = 1/2;

    this.minX = -1;
    this.minY = -1;
    this.maxX =  1;
    this.maxY =  1;

    this.lineArr = [];
    this.pointArr = [];

    if(this.type === 'square') {
      for(let y = this.minY; y < this.maxY; y += this.interval ) {
        this.lineArr.push(new Line({
          start: new Point({
            x: this.minX,
            y: y,
          }),
          end: new Point({
            x: this.maxX,
            y: y,
          }),
        }));
      }

      for(let x = this.minX; x < this.maxX; x += this.interval ) {
        this.lineArr.push(new Line({
          start: new Point({
            x: x,
            y: this.minY,
          }),
          end: new Point({
            x: x,
            y: this.maxY,
          }),
        }));
      }

      for(let y = this.minY; y < this.maxY; y += this.interval ) {
        for(let x = this.minX; x < this.maxX; x += this.interval ) {
          this.pointArr.push(new Point({x, y}));
        }
      }
    }
  }

  plot() {
    this.lineArr.forEach((line) => {
      this.ctx.beginPath();
      this.ctx.moveTo(line.start.x * 128 + 128, line.start.y * 128 + 128);
      this.ctx.lineTo(line.end.x * 128 + 128, line.end.y * 128 + 128);
      this.ctx.strokeStyle = '#ccc';
      this.ctx.stroke();
    });
  }

  nn(p) {
    let min = Infinity;
    let ret;

    this.pointArr.forEach((point) => {
      let tmp = sub(p, point).abs();

      if(tmp < min) {
        ret = point;
        min = tmp;
      }
    });

    return ret;
  }
}