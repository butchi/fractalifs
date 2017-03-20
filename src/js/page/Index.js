import ns from '../module/ns';
import Point from '../module/Point';
import Line from '../module/Line';
import Generator from '../module/Generator';
import {plus, sub, mult} from '../module/util';

const MAX_POINTS = 10000;

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

    let lineArr = [new Line({
      start: new Point({
        x: 0,
        y: 0,
      }),
      end: new Point({
        x: 1,
        y: 0,
      }),
    })];

    for(let i = 0; i < iteration; i++) {
      lineArr = this.iterate(lineArr);
    }

    let fractal = lineArr;

    fractal.forEach((line) => {
      this.ctx.fillRect(line.start.x * 128 + 128, line.start.y * 128 + 128, 1, 1);

      // this.ctx.beginPath();
      // this.ctx.moveTo(line.start.x * 128 + 128, line.start.y * 128 + 128);
      // this.ctx.lineTo(line.end.x   * 128 + 128, line.end.y   * 128 + 128);
      // this.ctx.stroke();
    });
  }

  iterate(lineArr) {
    let ret = [];
    lineArr.forEach((line) => {
      let tmp = this.ifs(line);
      ret = ret.concat(tmp);
    });

    return ret;
  }

  ifs(line) {
    let ret = [];

    ns.gArr.forEach((g) => {
      let l = new Line({
        start: plus(mult(sub(g.line.end, g.line.start), line.start), g.line.start),
        end  : plus(mult(sub(g.line.end, g.line.start), line.end  ), g.line.start),
      });

      ret.push(l);
    });

    return ret;
  }
}