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

    this.arrowHeadElm = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.arrowHeadElm.setAttribute('class', 'arrow-head');
    this.arrowHeadElm.setAttribute('d', 'M2 0 L-16 8 L-10 0 L-16 -8 L2 0  Z');

    this.startPt = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    this.endPt = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    this.startPt.setAttribute('class', 'start-pt');
    this.endPt.setAttribute('class', 'end-pt');

    this.$container = $('.container');

    ns.ctrlField.append(this.arrow);

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
  }

  replace() {
    let startPx = px(this.line.start);
    let endPx = px(this.line.end);

    this.setStartLine(startPx);
    this.setEndLine(endPx);

    this.setStartPtAttr(startPx);
    this.setEndPtAttr(endPx);
    this.setArrowHead();
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
    }

    this.setStartPt(pointUnit);

    this.$container.on('mousemove', (evt) => {
      this.touchMoveHandler(evt);
    });

    this.$container.one('mouseup', (evt) => {
      this.touchUpHandler(evt);
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

    this.setArrowHead();

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

    this.setEndPt(pointUnit);

    this.$container.trigger('set-line');
  }

  startMoveHandler(evt) {
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

    this.line.start = pointUnit;

    this.setStartLine(pointPx);

    this.setStartPtAttr(pointPx);

    this.setArrowHead();

    this.$container.trigger('replot-fractal', 8);
  }

  endMoveHandler(evt) {
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

    this.setEndPtAttr(pointPx);

    this.setArrowHead();

    this.$container.trigger('replot-fractal', 8);
  }

  setStartPt(pointUnit) {
    let pointPx = px(pointUnit);

    this.line.start = pointUnit;

    this.setStartLine(pointPx);
    this.setEndLine(pointPx);

    this.arrow.append(this.lineElm);

    this.setStartPtAttr(pointPx);
    this.setEndPtAttr(pointPx);
    this.setArrowHead();

    this.arrowHeadElm.setAttribute('visibility', 'hidden');
    this.arrow.append(this.arrowHeadElm);
    this.arrow.append(this.startPt);
  }

  setEndPt(pointUnit) {
    let pointPx = px(pointUnit);

    this.line.end.x = pointUnit.x;
    this.line.end.y = pointUnit.y;

    this.setEndLine(pointPx);
    this.setEndPtAttr(pointPx);

    this.setArrowHead();

    this.arrowHeadElm.setAttribute('visibility', 'visible');

    this.arrow.append(this.endPt);

  }

  setStartPtAttr(p) {
    this.startPt.setAttribute('cx', p.x);
    this.startPt.setAttribute('cy', p.y);
  }

  setEndPtAttr(p) {
    this.endPt.setAttribute('cx', p.x);
    this.endPt.setAttribute('cy', p.y);
  }

  setArrowHead() {
    let p = px(this.line.end);

    let angle = - this.line.arg() * 180 / Math.PI;

    this.arrowHeadElm.setAttribute('transform', `rotate(${angle}, ${p.x}, ${p.y}) translate(${p.x} ${p.y})`);
  }

  setStartLine(p) {
    this.lineElm.setAttribute('x1', p.x);
    this.lineElm.setAttribute('y1', p.y);
  }

  setEndLine(p) {
    this.lineElm.setAttribute('x2', p.x);
    this.lineElm.setAttribute('y2', p.y);
  }

  offEdit() {
    $(this.startPt).off('mousedown');
    $(this.endPt).off('mousedown');
  }

  eventifyEdit() {
    this.offEdit();

    $(this.startPt).on('mousedown', (evt) => {
      $(this.startPt).on('mouseup', (evt) => {
        this.$container.off('mousemove');

        this.$container.trigger('replot-fractal', 12);
      });

      this.$container.on('mousemove', (evt) => {
        this.startMoveHandler(evt);
      });
    });

    $(this.endPt).on('mousedown', (evt) => {
      this.$container.on('mouseup', (evt) => {
        this.$container.off('mousemove');

        this.$container.trigger('replot-fractal', 12);
      });

      this.$container.on('mousemove', (evt) => {
        this.endMoveHandler(evt);
      });
    });
  }
}
