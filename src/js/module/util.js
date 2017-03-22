import ns from './ns';
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
    x:   p.x * 200 + ns.width / 2,
    y: - p.y * 200 +  ns.height / 2,
  });
}

export function unit(p) {
  return new Point({
    x:   (p.x - ns.width / 2) / 200,
    y: - (p.y - ns.height / 2) / 200,
  });
}
