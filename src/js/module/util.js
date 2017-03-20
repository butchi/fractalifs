import Point from './Point';

export function plus(a, b) {
  return new Point({
    x: a.x + b.x,
    y: a.y + b.y,
  });
}

export function sub(a, b) {
  return new Point({
    x: a.x - b.x,
    y: a.y - b.y,
  });
}

export function mult(a, b) {
  return new Point({
    x: a.x * b.x - a.y * b.y,
    y: a.x * b.y + a.y * b.x,
  });
}
