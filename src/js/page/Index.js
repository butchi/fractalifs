import ns from '../module/ns';
import Point from '../module/Point';
import Line from '../module/Line';
import Grid from '../module/Grid';
import Generator from '../module/Generator';
import {plus, sub, mult, px, unit} from '../module/util';

const MAX_POINTS = 10000;

export default class Index {
  constructor(opts = {}) {
    this.initialize();
  }

  initialize() {
    this.$container = $('.container');

    this.canvas = document.querySelector('.elm-canvas');

    this.circleImg = new Image();
    this.circleImg.src = 'img/circle.png';

    this.lineImg = new Image();
    this.lineImg.src = 'img/line.png';

    ns.ctrlField = document.querySelector('.ctrl-field');

    $(window).on('resize', () => {
      this.setSize();

      this.plot(8);

      ns.gArr.forEach((elm) => {
        elm.replace();
      });
    });

    this.setSize();

    ns.cornerPx = [
      new Point({
        x: 0,
        y: 0,
      }),
      new Point({
        x: ns.width,
        y: ns.height,
      }),
    ];

    ns.cornerUnit = [
      unit(ns.cornerPx[0]),
      unit(ns.cornerPx[1])
    ];

    this.$container.append(ns.ctrlField);

    this.ctx = this.canvas.getContext('2d');

    ns.grid = new Grid({
      type: 'square',
      interval: 1/4,
      canvas: this.canvas,
    });

    ns.grid.plot();

    let $snap = $('[data-js-class~="snap"]');

    $snap.on('change', () => {
      ns.snapFlag = $snap.prop('checked');
    }).trigger('change');

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

  setSize() {
    ns.width = $(window).width();
    ns.height = $(window).height();

    this.canvas.width = ns.width;
    this.canvas.height = ns.height;

    $(ns.ctrlField).attr('width', ns.width);
    $(ns.ctrlField).attr('height', ns.height);
    $(ns.ctrlField).attr('viewBox', `0 0 256 256`);
  }

  plot(iteration = 0) {
    let maxIteration = Math.floor(Math.log(MAX_POINTS) / Math.log(ns.gArr.length));
    iteration = Math.min(iteration, maxIteration);
    this.ctx.clearRect(0, 0, ns.width, ns.height);

    ns.grid.plot();

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
      let p = px({
        x: line.start.x,
        y: line.start.y,
      });

      this.ctx.fillRect(p.x, p.y, 1, 1);
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