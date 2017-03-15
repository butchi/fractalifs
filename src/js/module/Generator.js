import ns from './ns';

export default class Generator {
  constructor(opts = {}) {
    this.initialize(opts);
  }

  initialize(opts = {}) {
    this.arrow = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.$elm = $(this.arrow);

    this.line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    this.startPt = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    this.endPt = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    this.startPt.setAttribute('class', 'start-pt');
    this.endPt.setAttribute('class', 'end-pt');

    this.$container = $('.container');

    ns.$panel.append(this.arrow);

    this.point = opts.point || [[], []];

    this.$container.one('mousedown', (evt) => {
      this.touchDownHandler(evt);
    });
  }

  get p() {
    return this.point;
  }

  touchDownHandler(evt) {
    let ctx = ns.main.router.pageIndex.ctx;

    ctx.clearRect(0, 0, 256, 256);

    const x = evt.pageX;
    const y = evt.pageY;

    this.point[0][0] = (x - 128) / 128;
    this.point[0][1] = (y - 128) / 128;

    this.line.setAttribute('x1', x);
    this.line.setAttribute('y1', y);
    this.line.setAttribute('x2', x);
    this.line.setAttribute('y2', y);

    this.arrow.append(this.line);

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
  }

  touchMoveHandler(evt) {
    const x = evt.pageX;
    const y = evt.pageY;

    this.point[1][0] = (x - 128) / 128;
    this.point[1][1] = (y - 128) / 128;

    this.line.setAttribute('x2', x);
    this.line.setAttribute('y2', y);
  }

  touchUpHandler(evt) {
    const x = evt.pageX;
    const y = evt.pageY;

    this.$container.off('mousemove');

    this.point[1][0] = (x - 128) / 128;
    this.point[1][1] = (y - 128) / 128;

    this.line.setAttribute('x2', x);
    this.line.setAttribute('y2', y);

    this.endPt.setAttribute('cx', x);
    this.endPt.setAttribute('cy', y);

    this.arrow.append(this.endPt);

    this.$container.trigger('set-line');
  }
}
