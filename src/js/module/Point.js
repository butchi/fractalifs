export default class Point {
  constructor(opts = {}) {
    this.type = 'point';

    this.x = opts.x || opts[0] || 0;
    this.y = opts.y || opts[1] || 0;
  }

  get x() {
    return this[0];
  }

  set x(val) {
    this[0] = val;
  }

  get y() {
    return this[1];
  }

  set y(val) {
    this[1] = val;
  }

  abs() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  arg() {
    return Math.atan2(this.y, this.x);
  }
}
