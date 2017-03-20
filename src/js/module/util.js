import Point from './Point';

export function plus(a, b) {
  return new Point({
    0: a.x + b.x,
    1: a.y + b.y,
  });
}

export function sub(a, b) {
  return new Point({
    0: a.x - b.x,
    1: a.y - b.y,
  });
}

export function mult(a, b) {
  return new Point({
    0: a.x * b.x - a.y * b.y,
    1: a.x * b.y + a.y * b.x,
  });
}
