import ns from './ns';
import Point from './Point';
import Line from './Line';
import {plus, sub, mult, px, unit} from './util';

export default class Grid {
  constructor(opts = {}) {
    this.initialize(opts);
  }

  initialize(opts) {
    this.canvas = opts.canvas;
    this.ctx = this.canvas.getContext('2d');

    this.type = opts.type;

    this.interval = opts.interval || 1;

    this.setSize();
  }

  setSize() {
    this.minX = Math.floor(ns.cornerUnit[0].x);
    this.minY = - Math.ceil(ns.cornerUnit[0].y);
    this.maxX = Math.ceil(ns.cornerUnit[1].x);
    this.maxY = - Math.floor(ns.cornerUnit[1].y);

    this.lineArr = [];
    this.pointArr = [];

    this.axisArr = [];

    if(this.type === 'square') {
      for(let y = this.minY; y <= this.maxY; y += this.interval ) {
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

      for(let x = this.minX; x <= this.maxX; x += this.interval ) {
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

      this.axisArr.push(new Line({
        start: new Point({
          x: 0,
          y: this.minY,
        }),
        end: new Point({
          x: 0,
          y: this.maxY,
        }),
      }));

      this.axisArr.push(new Line({
        start: new Point({
          x: this.minX,
          y: 0,
        }),
        end: new Point({
          x: this.maxX,
          y: 0,
        }),
      }));
    }
  }

  plot() {
    this.lineArr.forEach((line) => {
      let start = px(line.start);
      let end = px(line.end);

      this.ctx.beginPath();
      this.ctx.moveTo(start.x, start.y);
      this.ctx.lineTo(end.x, end.y);
      this.ctx.strokeStyle = '#ccc';
      this.ctx.stroke();
    });

    this.axisArr.forEach((axis) => {
      let start = px(axis.start);
      let end = px(axis.end);

      this.ctx.beginPath();
      this.ctx.moveTo(start.x, start.y);
      this.ctx.lineTo(end.x, end.y);
      this.ctx.strokeStyle = '#000';
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
