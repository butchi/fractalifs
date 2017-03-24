import ns from '../module/ns';
import Point from '../module/Point';
import Line from '../module/Line';
import Grid from '../module/Grid';
import Generator from '../module/Generator';
import {plus, sub, mult, px, unit} from '../module/util';

const MAX_POINTS = 10000;
const iterationHq = 12;
const iterationLq = 8;
// const iterationHq = 6;
// const iterationLq = 6;

export default class Index {
  constructor(opts = {}) {
    this.initialize();
  }

  initialize() {
    this.$container = $('.container');

    this.canvas = document.querySelector('.elm-canvas');

    this.circleImg = new Image();
    this.circleImg.src = 'img/circle.png';

    this.lineImg = new Image();
    this.lineImg.src = 'img/line.svg';

    this.squareImg = new Image();
    this.squareImg.src = 'img/square.png';

    ns.ctrlField = document.querySelector('.ctrl-field');

    $(window).on('resize', () => {
      this.setSize();

      this.plot(iterationLq);

      ns.gArr.forEach((elm) => {
        elm.replace();
      });
    });

    this.setSize();

    ns.cornerPx = [
      new Point({
        x: 0,
        y: 0,
      }),
      new Point({
        x: ns.width,
        y: ns.height,
      }),
    ];

    ns.cornerUnit = [
      unit(ns.cornerPx[0]),
      unit(ns.cornerPx[1])
    ];

    this.$container.append(ns.ctrlField);

    this.ctx = this.canvas.getContext('2d');

    ns.grid = new Grid({
      type: 'square',
      interval: 1/4,
      canvas: this.canvas,
    });

    ns.grid.plot();

    let $snap = $('[data-js-class~="snap"]');

    $snap.on('change', () => {
      ns.snapFlag = $snap.prop('checked');
    }).trigger('change');

    ns.gArr = [];

    $('.btn-add-generator').on('click', (_evt) => {
      ns.currentGenerator = new Generator();

      ns.gArr.push(ns.currentGenerator);
    });

    this.$container.on('set-line', () => {
      this.plot(iterationHq);
    });

    this.$container.on('replot-fractal', (_evt, iteration) => {
      this.plot(iteration);
    });

    let $preset = $('[data-js-class~="preset"]');
    let $presetList = $('[data-js-class~="preset__list"]');
    let $presetInput = $('[data-js-class~="preset__input"]');

    $('[data-js-class~="preset__list"]').on('click', 'li', (evt) => {
        var key = $(evt.target).attr('data-value');
        var name = $(evt.target).text();

        $(evt.target).parents('.mdl-select').addClass('is-dirty').children('input').val(name);

        $presetInput.trigger('change', {
          key: key,
          name: name,
        });
    });

    $presetInput.on('change', (evt, opts = {}) => {
      function getGenerator(arr) {
        let ret = [];
        arr.forEach((item) => {
          ret.push(new Generator({
            line: new Line({
              start: new Point({
                x: item[0],
                y: item[1],
              }),
              end: new Point({
                x: item[2],
                y: item[3],
              }),
            }),
          }));
        });

        return ret;
      }

      let name = opts.name || $(evt.target).val();

      let key = (_.findKey(presetLi, (item) => (item.name === name)));

      if(key === '') {
        return;
      }

      ns.ctrlField.innerHTML = '';

      ns.gArr = getGenerator(presetLi[key].generator);

      ns.gArr.forEach((g) => {
        let startPx = px(g.line.start);
        let endPx = px(g.line.end);

        g.touchDownHandler({
          pageX: startPx.x,
          pageY: startPx.y,
        });

        this.$container.off('mousedown');
        this.$container.off('mousemove');
        this.$container.off('mouseup');

        g.touchUpHandler({
          pageX: endPx.x,
          pageY: endPx.y,
        });
      });
    });

    let presetLi = {
      ccurve: {
        name: 'C曲線',
        generator: [
          [0,   0,   1/2, 1/2],
          [1/2, 1/2, 1,   0]
        ],
      },
      dragon: {
        name: 'ドラゴン曲線',
        generator: [
          [0, 0, 1/2, 1/2],
          [1, 0, 1/2, 1/2]
        ],
      },
      koch: {
        name: 'コッホ曲線',
        generator: [
          [0, 0, 1/3, 0],
          [1/3, 0, 1/2, Math.sqrt(3)/6],
          [1/2, Math.sqrt(3)/6, 2/3, 0],
          [2/3, 0, 1, 0]
        ],
      },
      sierpinskiCarpet: {
        name: 'シェルピンスキーのカーペット',
        generator: [
          [0,   0, 1/3, 0],
          [1/3, 0, 2/3, 0],
          [2/3, 0, 1,   0],

          [0,   1/3, 1/3, 1/3],
          [2/3, 1/3, 1,   1/3],

          [0,   2/3, 1/3, 2/3],
          [1/3, 2/3, 2/3, 2/3],
          [2/3, 2/3, 1,   2/3],
        ],
      },
      sierpinskiGasket: {
        name: 'シェルピンスキーのギャスケット',
        generator: [
          [0,   0, 1/2, 0],
          [1/2, 0, 1,   0],
          [1/4, Math.sqrt(3) / 4, 3/4, Math.sqrt(3) / 4, ]
        ],
      },
      cantorDust: {
        name: 'カントールの塵集合',
        generator: [
          [0,   0, 1/3, 0],
          [2/3, 0, 1,   0],

          [0,   2/3, 1/3, 2/3],
          [2/3, 2/3, 1,   2/3],
        ],
      },
    };

    Object.keys(presetLi).forEach((key) => {
      let preset = presetLi[key];

      $presetList.append(`<li class="mdl-menu__item" data-value="${key}">${preset.name}</li>`);
    });
  }

  setSize() {
    ns.width = $(window).width();
    ns.height = $(window).height();

    this.canvas.width = ns.width;
    this.canvas.height = ns.height;

    $(ns.ctrlField).attr('width', ns.width);
    $(ns.ctrlField).attr('height', ns.height);
    $(ns.ctrlField).attr('viewBox', `0 0 256 256`);
  }

  plot(iteration = 0) {
    let maxIteration = Math.floor(Math.log(MAX_POINTS) / Math.log(ns.gArr.length));
    iteration = Math.min(iteration, maxIteration);
    this.ctx.clearRect(0, 0, ns.width, ns.height);

    ns.grid.plot();

    let lineArr = [new Line({
      start: new Point({
        x: 0,
        y: 0,
      }),
      end: new Point({
        x: 1,
        y: 0,
      }),
    })];

    for(let i = 0; i < iteration; i++) {
      lineArr = this.iterate(lineArr);
    }

    let fractal = lineArr;

    fractal.forEach((line) => {
      let p = px({
        x: line.start.x,
        y: line.start.y,
      });

      this.ctx.fillRect(p.x, p.y, 1, 1);
    });
  }

  iterate(lineArr) {
    let ret = [];
    lineArr.forEach((line) => {
      let tmp = this.ifs(line);
      ret = ret.concat(tmp);
    });

    return ret;
  }

  ifs(line) {
    let ret = [];

    ns.gArr.forEach((g) => {
      let l = new Line({
        start: plus(mult(sub(g.line.end, g.line.start), line.start), g.line.start),
        end  : plus(mult(sub(g.line.end, g.line.start), line.end  ), g.line.start),
      });

      ret.push(l);
    });

    return ret;
  }
}