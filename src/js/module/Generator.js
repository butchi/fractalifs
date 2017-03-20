import ns from './ns';
import Point from '../module/Point';
import Line from '../module/Line';

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
    const x = evt.pageX;
    const y = evt.pageY;

    this.line.start.x = (x - 128) / 128;
    this.line.start.y = (y - 128) / 128;

    this.lineElm.setAttribute('x1', x);
    this.lineElm.setAttribute('y1', y);
    this.lineElm.setAttribute('x2', x);
    this.lineElm.setAttribute('y2', y);

    this.arrow.append(this.lineElm);

    this.startPt.setAttribute('cx', x);
    this.startPt.setAttribute('cy', y);
    this.endPt.setAttribute('cx', x);
    this.endPt.setAttribute('cy', y);

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
        const x = evt.pageX;
        const y = evt.pageY;

        this.line.start.x = (x - 128) / 128;
        this.line.start.y = (y - 128) / 128;

        this.lineElm.setAttribute('x1', x);
        this.lineElm.setAttribute('y1', y);

        this.startPt.setAttribute('cx', x);
        this.startPt.setAttribute('cy', y);

        this.$container.trigger('replot-fractal', 8);
      });
    });

    $(this.endPt).on('mousedown', (evt) => {
      $(this.endPt).on('mouseup', (evt) => {
        this.$container.off('mousemove');

        this.$container.trigger('replot-fractal', 12);
      });

      this.$container.on('mousemove', (evt) => {
        const x = evt.pageX;
        const y = evt.pageY;

        this.line.end.x = (x - 128) / 128;
        this.line.end.y = (y - 128) / 128;

        this.lineElm.setAttribute('x2', x);
        this.lineElm.setAttribute('y2', y);

        this.endPt.setAttribute('cx', x);
        this.endPt.setAttribute('cy', y);

        this.$container.trigger('replot-fractal', 8);
      });
    });
  }

  touchMoveHandler(evt) {
    const x = evt.pageX;
    const y = evt.pageY;

    this.line.end.x = (x - 128) / 128;
    this.line.end.y = (y - 128) / 128;

    this.lineElm.setAttribute('x2', x);
    this.lineElm.setAttribute('y2', y);
  }

  touchUpHandler(evt) {
    const x = evt.pageX;
    const y = evt.pageY;

    this.$container.off('mousemove');

    this.line.end.x = (x - 128) / 128;
    this.line.end.y = (y - 128) / 128;

    this.lineElm.setAttribute('x2', x);
    this.lineElm.setAttribute('y2', y);

    this.endPt.setAttribute('cx', x);
    this.endPt.setAttribute('cy', y);

    this.arrow.append(this.endPt);

    this.$container.trigger('set-line');
  }
}
