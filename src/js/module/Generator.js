import ns from './ns';

export default class Generator {
  constructor(opts = {}) {
    this.initialize(opts);
  }

  initialize(opts = {}) {
    this.$elm = $({});

    this.point = opts.point || [[], []];

    this.containerElm = document.querySelector('.container');

    $(this.containerElm).one('mousedown', (evt) => {
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

    $(this.containerElm).one('mouseup', (evt) => {
      this.touchUpHandler(evt);
    });
  }

  touchUpHandler(evt) {
    const x = evt.pageX;
    const y = evt.pageY;

    this.point[1][0] = (x - 128) / 128;
    this.point[1][1] = (y - 128) / 128;

    $(this.containerElm).trigger('set-line');
  }
}
