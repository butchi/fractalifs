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

export function px(p) {
  return new Point({
    x:   p.x * 128 + 128,
    y: - p.y * 128 + 128,
  });
}

export function unit(p) {
  return new Point({
    x:   (p.x - 128) / 128,
    y: - (p.y - 128) / 128,
  });
}
