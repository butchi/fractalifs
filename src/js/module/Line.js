import {plus, sub, mult} from './util';

export default class Line {
  constructor(opts = {}) {
    this.type = 'line';

    this.start = opts.start || opts[0];
    this.end = opts.end || opts[1];
  }

  get start() {
    return this[0];
  }

  set start(val) {
    this[0] = val;
  }

  get end() {
    return this[1];
  }

  set end(val) {
    this[1] = val;
  }

  width() {
    return sub(this.end, this.start).x;
  }

  height() {
    return sub(this.end, this.start).y;
  }

  abs() {
    return sub(this.end, this.start).abs();
  }

  arg() {
    return sub(this.end, this.start).arg();
  }
}
