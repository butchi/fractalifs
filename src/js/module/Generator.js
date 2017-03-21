import ns from './ns';
import Point from '../module/Point';
import Line from '../module/Line';
import {px, unit} from './util';

export default class Generator {
  constructor(opts = {}) {
    this.initialize(opts);
  }

  initialize(opts = {}) {
    this.arrow = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.$elm = $(this.arrow);

    this.lineElm = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    this.startPt = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    this.endPt = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    this.startPt.setAttribute('class', 'start-pt');
    this.endPt.setAttribute('class', 'end-pt');

    this.$container = $('.container');

    ns.$ctrlCanvas.append(this.arrow);

    this.line = opts.line || new Line({
      start: new Point({
        x: 0,
        y: 0,
      }),
      end: new Point({
        x: 1,
        y: 0,
      }),
    });

    this.$container.one('mousedown', (evt) => {
      this.touchDownHandler(evt);
    });
  }

  touchDownHandler(evt) {
    let x = evt.pageX;
    let y = evt.pageY;

    let pointPx = new Point({x, y});
    let pointUnit = unit(pointPx);

    if(ns.snapFlag) {
      pointUnit = ns.grid.nn(new Point({
        x: pointUnit.x,
        y: pointUnit.y,
      }));
      pointPx = px(pointUnit);
    }

    this.line.start = unit(pointPx);

    this.setStartLine(pointPx);
    this.setEndLine(pointPx);

    this.arrow.append(this.lineElm);

    this.setStartPt(pointPx);
    this.setEndPt(pointPx);

    this.arrow.append(this.startPt);

    this.$container.on('mousemove', (evt) => {
      this.touchMoveHandler(evt);
    });

    this.$container.one('mouseup', (evt) => {
      this.touchUpHandler(evt);
    });

    $(this.startPt).on('mousedown', (evt) => {
      $(this.startPt).on('mouseup', (evt) => {
        this.$container.off('mousemove');

        this.$container.trigger('replot-fractal', 12);
      });

      this.$container.on('mousemove', (evt) => {
        let x = evt.pageX;
        let y = evt.pageY;

        let pointPx = new Point({x, y});
        let pointUnit = unit(pointPx);

        if(ns.snapFlag) {
          pointUnit = ns.grid.nn(new Point({
            x: pointUnit.x,
            y: pointUnit.y,
          }));
          pointPx = px(pointUnit);
        }

        this.line.start = unit(pointPx);

        this.setStartLine(pointPx);

        this.setStartPt(pointPx);

        this.$container.trigger('replot-fractal', 8);
      });
    });

    $(this.endPt).on('mousedown', (evt) => {
      this.$container.on('mouseup', (evt) => {
        this.$container.off('mousemove');

        this.$container.trigger('replot-fractal', 12);
      });

      this.$container.on('mousemove', (evt) => {
        let x = evt.pageX;
        let y = evt.pageY;

        let pointPx = new Point({x, y});
        let pointUnit = unit(pointPx);

        if(ns.snapFlag) {
          pointUnit = ns.grid.nn(new Point({
            x: pointUnit.x,
            y: pointUnit.y,
          }));
          pointPx = px(pointUnit);
        }

        this.line.end = pointUnit;

        this.setEndLine(pointPx);

        this.setEndPt(pointPx);

        this.$container.trigger('replot-fractal', 8);
      });
    });
  }

  touchMoveHandler(evt) {
    let x = evt.pageX;
    let y = evt.pageY;

    let pointPx = new Point({x, y});
    let pointUnit = unit(pointPx);

    if(ns.snapFlag) {
      pointUnit = ns.grid.nn(new Point({
        x: pointUnit.x,
        y: pointUnit.y,
      }));
      pointPx = px(pointUnit);
    }

    this.line.end = pointUnit;
    this.setEndLine(pointPx);
  }

  touchUpHandler(evt) {
    let x = evt.pageX;
    let y = evt.pageY;

    let pointPx = new Point({x, y});
    let pointUnit = unit(pointPx);

    if(ns.snapFlag) {
      pointUnit = ns.grid.nn(new Point({
        x: pointUnit.x,
        y: pointUnit.y,
      }));
      pointPx = px(pointUnit);
    }

    this.$container.off('mousemove');

    this.line.end.x = pointUnit.x;
    this.line.end.y = pointUnit.y;

    this.setEndLine(pointPx);
    this.setEndPt(pointPx);

    this.arrow.append(this.endPt);

    this.$container.trigger('set-line');
  }

  setStartPt(p) {
    this.startPt.setAttribute('cx', p.x);
    this.startPt.setAttribute('cy', p.y);
  }

  setEndPt(p) {
    this.endPt.setAttribute('cx', p.x);
    this.endPt.setAttribute('cy', p.y);
  }

  setStartLine(p) {
    this.lineElm.setAttribute('x1', p.x);
    this.lineElm.setAttribute('y1', p.y);
  }

  setEndLine(p) {
    this.lineElm.setAttribute('x2', p.x);
    this.lineElm.setAttribute('y2', p.y);
  }
}
