(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ns = require('./ns');

var _ns2 = _interopRequireDefault(_ns);

var _Point = require('../module/Point');

var _Point2 = _interopRequireDefault(_Point);

var _Line = require('../module/Line');

var _Line2 = _interopRequireDefault(_Line);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Generator = function () {
  function Generator() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Generator);

    this.initialize(opts);
  }

  _createClass(Generator, [{
    key: 'initialize',
    value: function initialize() {
      var _this = this;

      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.arrow = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      this.$elm = $(this.arrow);

      this.lineElm = document.createElementNS('http://www.w3.org/2000/svg', 'line');

      this.arrowHeadElm = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      this.arrowHeadElm.setAttribute('class', 'arrow-head');
      this.arrowHeadElm.setAttribute('d', 'M2 0 L-16 8 L-10 0 L-16 -8 L2 0  Z');

      this.startPt = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      this.endPt = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

      this.startPt.setAttribute('class', 'start-pt');
      this.endPt.setAttribute('class', 'end-pt');

      this.$container = $('.container');

      _ns2.default.ctrlField.append(this.arrow);

      this.line = opts.line || new _Line2.default({
        start: new _Point2.default({
          x: 0,
          y: 0
        }),
        end: new _Point2.default({
          x: 1,
          y: 0
        })
      });

      this.$container.one('mousedown', function (evt) {
        _this.touchDownHandler(evt);
      });
    }
  }, {
    key: 'replace',
    value: function replace() {
      var startPx = (0, _util.px)(this.line.start);
      var endPx = (0, _util.px)(this.line.end);

      this.setStartLine(startPx);
      this.setEndLine(endPx);

      this.setStartPt(startPx);
      this.setEndPt(endPx);
      this.setArrowHead();
    }
  }, {
    key: 'touchDownHandler',
    value: function touchDownHandler(evt) {
      var _this2 = this;

      var x = evt.pageX;
      var y = evt.pageY;

      var pointPx = new _Point2.default({ x: x, y: y });
      var pointUnit = (0, _util.unit)(pointPx);

      if (_ns2.default.snapFlag) {
        pointUnit = _ns2.default.grid.nn(new _Point2.default({
          x: pointUnit.x,
          y: pointUnit.y
        }));
        pointPx = (0, _util.px)(pointUnit);
      }

      this.line.start = pointUnit;

      this.setStartLine(pointPx);
      this.setEndLine(pointPx);

      this.arrow.append(this.lineElm);

      this.setStartPt(pointPx);
      this.setEndPt(pointPx);
      this.setArrowHead();

      this.arrowHeadElm.setAttribute('visibility', 'hidden');
      this.arrow.append(this.arrowHeadElm);
      this.arrow.append(this.startPt);

      this.$container.on('mousemove', function (evt) {
        _this2.touchMoveHandler(evt);
      });

      this.$container.one('mouseup', function (evt) {
        _this2.touchUpHandler(evt);
      });

      $(this.startPt).on('mousedown', function (evt) {
        $(_this2.startPt).on('mouseup', function (evt) {
          _this2.$container.off('mousemove');

          _this2.$container.trigger('replot-fractal', 12);
        });

        _this2.$container.on('mousemove', function (evt) {
          _this2.startMoveHandler(evt);
        });
      });

      $(this.endPt).on('mousedown', function (evt) {
        _this2.$container.on('mouseup', function (evt) {
          _this2.$container.off('mousemove');

          _this2.$container.trigger('replot-fractal', 12);
        });

        _this2.$container.on('mousemove', function (evt) {
          _this2.endMoveHandler(evt);
        });
      });
    }
  }, {
    key: 'touchMoveHandler',
    value: function touchMoveHandler(evt) {
      var x = evt.pageX;
      var y = evt.pageY;

      var pointPx = new _Point2.default({ x: x, y: y });
      var pointUnit = (0, _util.unit)(pointPx);

      if (_ns2.default.snapFlag) {
        pointUnit = _ns2.default.grid.nn(new _Point2.default({
          x: pointUnit.x,
          y: pointUnit.y
        }));
        pointPx = (0, _util.px)(pointUnit);
      }

      this.setArrowHead();

      this.line.end = pointUnit;
      this.setEndLine(pointPx);
    }
  }, {
    key: 'touchUpHandler',
    value: function touchUpHandler(evt) {
      var x = evt.pageX;
      var y = evt.pageY;

      var pointPx = new _Point2.default({ x: x, y: y });
      var pointUnit = (0, _util.unit)(pointPx);

      if (_ns2.default.snapFlag) {
        pointUnit = _ns2.default.grid.nn(new _Point2.default({
          x: pointUnit.x,
          y: pointUnit.y
        }));
        pointPx = (0, _util.px)(pointUnit);
      }

      this.$container.off('mousemove');

      this.line.end.x = pointUnit.x;
      this.line.end.y = pointUnit.y;

      this.setEndLine(pointPx);
      this.setEndPt(pointPx);

      this.setArrowHead();

      this.arrowHeadElm.setAttribute('visibility', 'visible');

      this.arrow.append(this.endPt);

      this.$container.trigger('set-line');
    }
  }, {
    key: 'startMoveHandler',
    value: function startMoveHandler(evt) {
      var x = evt.pageX;
      var y = evt.pageY;

      var pointPx = new _Point2.default({ x: x, y: y });
      var pointUnit = (0, _util.unit)(pointPx);

      if (_ns2.default.snapFlag) {
        pointUnit = _ns2.default.grid.nn(new _Point2.default({
          x: pointUnit.x,
          y: pointUnit.y
        }));
        pointPx = (0, _util.px)(pointUnit);
      }

      this.line.start = pointUnit;

      this.setStartLine(pointPx);

      this.setStartPt(pointPx);

      this.setArrowHead();

      this.$container.trigger('replot-fractal', 8);
    }
  }, {
    key: 'endMoveHandler',
    value: function endMoveHandler(evt) {
      var x = evt.pageX;
      var y = evt.pageY;

      var pointPx = new _Point2.default({ x: x, y: y });
      var pointUnit = (0, _util.unit)(pointPx);

      if (_ns2.default.snapFlag) {
        pointUnit = _ns2.default.grid.nn(new _Point2.default({
          x: pointUnit.x,
          y: pointUnit.y
        }));
        pointPx = (0, _util.px)(pointUnit);
      }

      this.line.end = pointUnit;

      this.setEndLine(pointPx);

      this.setEndPt(pointPx);

      this.setArrowHead();

      this.$container.trigger('replot-fractal', 8);
    }
  }, {
    key: 'setStartPt',
    value: function setStartPt(p) {
      this.startPt.setAttribute('cx', p.x);
      this.startPt.setAttribute('cy', p.y);
    }
  }, {
    key: 'setEndPt',
    value: function setEndPt(p) {
      this.endPt.setAttribute('cx', p.x);
      this.endPt.setAttribute('cy', p.y);
    }
  }, {
    key: 'setArrowHead',
    value: function setArrowHead() {
      var p = (0, _util.px)(this.line.end);

      var angle = -this.line.arg() * 180 / Math.PI;

      this.arrowHeadElm.setAttribute('transform', 'rotate(' + angle + ', ' + p.x + ', ' + p.y + ') translate(' + p.x + ' ' + p.y + ')');
    }
  }, {
    key: 'setStartLine',
    value: function setStartLine(p) {
      this.lineElm.setAttribute('x1', p.x);
      this.lineElm.setAttribute('y1', p.y);
    }
  }, {
    key: 'setEndLine',
    value: function setEndLine(p) {
      this.lineElm.setAttribute('x2', p.x);
      this.lineElm.setAttribute('y2', p.y);
    }
  }]);

  return Generator;
}();

exports.default = Generator;

},{"../module/Line":3,"../module/Point":5,"./ns":7,"./util":9}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ns = require('./ns');

var _ns2 = _interopRequireDefault(_ns);

var _Point = require('./Point');

var _Point2 = _interopRequireDefault(_Point);

var _Line = require('./Line');

var _Line2 = _interopRequireDefault(_Line);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Grid = function () {
  function Grid() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Grid);

    this.initialize(opts);
  }

  _createClass(Grid, [{
    key: 'initialize',
    value: function initialize(opts) {
      this.canvas = opts.canvas;
      this.ctx = this.canvas.getContext('2d');

      this.type = opts.type;

      this.interval = opts.interval || 1;

      this.minX = Math.floor(_ns2.default.cornerUnit[0].x);
      this.minY = -Math.ceil(_ns2.default.cornerUnit[0].y);
      this.maxX = Math.ceil(_ns2.default.cornerUnit[1].x);
      this.maxY = -Math.floor(_ns2.default.cornerUnit[1].y);

      this.lineArr = [];
      this.pointArr = [];

      this.axisArr = [];

      if (this.type === 'square') {
        for (var y = this.minY; y <= this.maxY; y += this.interval) {
          this.lineArr.push(new _Line2.default({
            start: new _Point2.default({
              x: this.minX,
              y: y
            }),
            end: new _Point2.default({
              x: this.maxX,
              y: y
            })
          }));
        }

        for (var x = this.minX; x <= this.maxX; x += this.interval) {
          this.lineArr.push(new _Line2.default({
            start: new _Point2.default({
              x: x,
              y: this.minY
            }),
            end: new _Point2.default({
              x: x,
              y: this.maxY
            })
          }));
        }

        for (var _y = this.minY; _y < this.maxY; _y += this.interval) {
          for (var _x2 = this.minX; _x2 < this.maxX; _x2 += this.interval) {
            this.pointArr.push(new _Point2.default({ x: _x2, y: _y }));
          }
        }

        this.axisArr.push(new _Line2.default({
          start: new _Point2.default({
            x: 0,
            y: this.minY
          }),
          end: new _Point2.default({
            x: 0,
            y: this.maxY
          })
        }));

        this.axisArr.push(new _Line2.default({
          start: new _Point2.default({
            x: this.minX,
            y: 0
          }),
          end: new _Point2.default({
            x: this.maxX,
            y: 0
          })
        }));
      }
    }
  }, {
    key: 'plot',
    value: function plot() {
      var _this = this;

      this.lineArr.forEach(function (line) {
        var start = (0, _util.px)(line.start);
        var end = (0, _util.px)(line.end);

        _this.ctx.beginPath();
        _this.ctx.moveTo(start.x, start.y);
        _this.ctx.lineTo(end.x, end.y);
        _this.ctx.strokeStyle = '#ccc';
        _this.ctx.stroke();
      });

      this.axisArr.forEach(function (axis) {
        var start = (0, _util.px)(axis.start);
        var end = (0, _util.px)(axis.end);

        _this.ctx.beginPath();
        _this.ctx.moveTo(start.x, start.y);
        _this.ctx.lineTo(end.x, end.y);
        _this.ctx.strokeStyle = '#000';
        _this.ctx.stroke();
      });
    }
  }, {
    key: 'nn',
    value: function nn(p) {
      var min = Infinity;
      var ret = void 0;

      this.pointArr.forEach(function (point) {
        var tmp = (0, _util.sub)(p, point).abs();

        if (tmp < min) {
          ret = point;
          min = tmp;
        }
      });

      return ret;
    }
  }]);

  return Grid;
}();

exports.default = Grid;

},{"./Line":3,"./Point":5,"./ns":7,"./util":9}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('./util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Line = function () {
  function Line() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Line);

    this.type = 'line';

    this.start = opts.start || opts[0];
    this.end = opts.end || opts[1];
  }

  _createClass(Line, [{
    key: 'width',
    value: function width() {
      return (0, _util.sub)(this.end, this.start).x;
    }
  }, {
    key: 'height',
    value: function height() {
      return (0, _util.sub)(this.end, this.start).y;
    }
  }, {
    key: 'abs',
    value: function abs() {
      return (0, _util.sub)(this.end, this.start).abs();
    }
  }, {
    key: 'arg',
    value: function arg() {
      return (0, _util.sub)(this.end, this.start).arg();
    }
  }, {
    key: 'start',
    get: function get() {
      return this[0];
    },
    set: function set(val) {
      this[0] = val;
    }
  }, {
    key: 'end',
    get: function get() {
      return this[1];
    },
    set: function set(val) {
      this[1] = val;
    }
  }]);

  return Line;
}();

exports.default = Line;

},{"./util":9}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Router = require('./Router');

var _Router2 = _interopRequireDefault(_Router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Main = function () {
  function Main() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Main);

    console.log('Hello, world!');

    this.initialize();

    console.log('Thanks, world!');
  }

  _createClass(Main, [{
    key: 'initialize',
    value: function initialize() {
      var _this = this;

      $(function () {
        _this.router = new _Router2.default();
      });
    }
  }]);

  return Main;
}();

exports.default = Main;

},{"./Router":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = function () {
  function Point() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Point);

    this.type = 'point';

    this.x = opts.x || opts[0] || 0;
    this.y = opts.y || opts[1] || 0;
  }

  _createClass(Point, [{
    key: 'abs',
    value: function abs() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  }, {
    key: 'arg',
    value: function arg() {
      return Math.atan2(this.y, this.x);
    }
  }, {
    key: 'x',
    get: function get() {
      return this[0];
    },
    set: function set(val) {
      this[0] = val;
    }
  }, {
    key: 'y',
    get: function get() {
      return this[1];
    },
    set: function set(val) {
      this[1] = val;
    }
  }]);

  return Point;
}();

exports.default = Point;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ns = require('./ns');

var _ns2 = _interopRequireDefault(_ns);

var _Common = require('../page/Common');

var _Common2 = _interopRequireDefault(_Common);

var _Index = require('../page/Index');

var _Index2 = _interopRequireDefault(_Index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Router = function () {
  function Router() {
    _classCallCheck(this, Router);

    this.initialize();
  }

  _createClass(Router, [{
    key: 'initialize',
    value: function initialize() {
      var $body = $('body');

      this.pageCommon = new _Common2.default();

      if ($body.hasClass('page-index')) {
        this.pageIndex = new _Index2.default();
      }
    }
  }]);

  return Router;
}();

exports.default = Router;

},{"../page/Common":10,"../page/Index":11,"./ns":7}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * グローバル直下に変数を置かないよう、ネームスペースを切る。
 * ネームスペース以下の変数にアクセスしたいときは各クラスでこれをimportする
 */

window.App = window.App || {};
var ns = window.App;
exports.default = ns;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var presetLi = {
  ccurve: {
    name: 'C曲線',
    generator: [[0, 0, 1 / 2, 1 / 2], [1 / 2, 1 / 2, 1, 0]]
  },
  dragon: {
    name: 'ドラゴン曲線',
    generator: [[0, 0, 1 / 2, 1 / 2], [1, 0, 1 / 2, 1 / 2]]
  },
  koch: {
    name: 'コッホ曲線',
    generator: [[0, 0, 1 / 3, 0], [1 / 3, 0, 1 / 2, Math.sqrt(3) / 6], [1 / 2, Math.sqrt(3) / 6, 2 / 3, 0], [2 / 3, 0, 1, 0]]
  },
  sierpinskiCarpet: {
    name: 'シェルピンスキーのカーペット',
    generator: [[0, 0, 1 / 3, 0], [1 / 3, 0, 2 / 3, 0], [2 / 3, 0, 1, 0], [0, 1 / 3, 1 / 3, 1 / 3], [2 / 3, 1 / 3, 1, 1 / 3], [0, 2 / 3, 1 / 3, 2 / 3], [1 / 3, 2 / 3, 2 / 3, 2 / 3], [2 / 3, 2 / 3, 1, 2 / 3]]
  },
  sierpinskiGasket: {
    name: 'シェルピンスキーのギャスケット',
    generator: [[0, 0, 1 / 2, 0], [1 / 2, 0, 1, 0], [1 / 4, Math.sqrt(3) / 4, 3 / 4, Math.sqrt(3) / 4]]
  },
  cantorDust: {
    name: 'カントールの塵集合',
    generator: [[0, 0, 1 / 3, 0], [2 / 3, 0, 1, 0], [0, 2 / 3, 1 / 3, 2 / 3], [2 / 3, 2 / 3, 1, 2 / 3]]
  },
  minkowskiSausage: {
    name: 'ミンコフスキーのソーセージ',
    generator: [[0, 0, 1 / 4, 0], [1 / 4, 0, 1 / 4, 1 / 4], [1 / 4, 1 / 4, 1 / 2, 1 / 4], [1 / 2, 1 / 4, 1 / 2, 0], [1 / 2, 0, 1 / 2, -1 / 4], [1 / 2, -1 / 4, 3 / 4, -1 / 4], [3 / 4, -1 / 4, 3 / 4, 0], [3 / 4, 0, 1, 0]]
  }
};

exports.default = presetLi;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plus = plus;
exports.sub = sub;
exports.mult = mult;
exports.px = px;
exports.unit = unit;

var _ns = require('./ns');

var _ns2 = _interopRequireDefault(_ns);

var _Point = require('./Point');

var _Point2 = _interopRequireDefault(_Point);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function plus(a, b) {
  return new _Point2.default({
    x: a.x + b.x,
    y: a.y + b.y
  });
}

function sub(a, b) {
  return new _Point2.default({
    x: a.x - b.x,
    y: a.y - b.y
  });
}

function mult(a, b) {
  return new _Point2.default({
    x: a.x * b.x - a.y * b.y,
    y: a.x * b.y + a.y * b.x
  });
}

function px(p) {
  return new _Point2.default({
    x: p.x * 200 + _ns2.default.width / 2,
    y: -p.y * 200 + _ns2.default.height / 2
  });
}

function unit(p) {
  return new _Point2.default({
    x: (p.x - _ns2.default.width / 2) / 200,
    y: -(p.y - _ns2.default.height / 2) / 200
  });
}

},{"./Point":5,"./ns":7}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ns = require('../module/ns');

var _ns2 = _interopRequireDefault(_ns);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Common = function () {
  function Common() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Common);

    this.initialize();
  }

  _createClass(Common, [{
    key: 'initialize',
    value: function initialize() {
      console.log('page common');

      this.setEnvClass();
    }
  }, {
    key: 'setEnvClass',
    value: function setEnvClass() {
      var $html = $('html');

      _ns2.default.isSp = false;
      _ns2.default.isPc = false;
      _ns2.default.isTab = false;

      if ($html.hasClass('is-sp')) {
        _ns2.default.isSp = true;
      }
      if ($html.hasClass('is-pc')) {
        _ns2.default.isPc = true;
      }
      if ($html.hasClass('is-tab')) {
        _ns2.default.isTab = true;
      }
    }
  }]);

  return Common;
}();

exports.default = Common;

},{"../module/ns":7}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ns = require('../module/ns');

var _ns2 = _interopRequireDefault(_ns);

var _Point = require('../module/Point');

var _Point2 = _interopRequireDefault(_Point);

var _Line = require('../module/Line');

var _Line2 = _interopRequireDefault(_Line);

var _Grid = require('../module/Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _Generator = require('../module/Generator');

var _Generator2 = _interopRequireDefault(_Generator);

var _presetList = require('../module/preset-list');

var _presetList2 = _interopRequireDefault(_presetList);

var _util = require('../module/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MAX_POINTS = 10000;
var iterationHq = 12;
var iterationLq = 8;
// const iterationHq = 6;
// const iterationLq = 6;

var Index = function () {
  function Index() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Index);

    this.initialize();
  }

  _createClass(Index, [{
    key: 'initialize',
    value: function initialize() {
      var _this = this;

      this.$container = $('.container');

      this.canvas = document.querySelector('.elm-canvas');

      this.circleImg = new Image();
      this.circleImg.src = 'img/circle.png';

      this.lineImg = new Image();
      this.lineImg.src = 'img/line.svg';

      this.squareImg = new Image();
      this.squareImg.src = 'img/square.png';

      _ns2.default.ctrlField = document.querySelector('.ctrl-field');

      $(window).on('resize', function () {
        _this.setSize();

        _this.plot(iterationLq);

        _ns2.default.gArr.forEach(function (elm) {
          elm.replace();
        });
      });

      this.setSize();

      _ns2.default.cornerPx = [new _Point2.default({
        x: 0,
        y: 0
      }), new _Point2.default({
        x: _ns2.default.width,
        y: _ns2.default.height
      })];

      _ns2.default.cornerUnit = [(0, _util.unit)(_ns2.default.cornerPx[0]), (0, _util.unit)(_ns2.default.cornerPx[1])];

      this.$container.append(_ns2.default.ctrlField);

      this.ctx = this.canvas.getContext('2d');

      _ns2.default.grid = new _Grid2.default({
        type: 'square',
        interval: 1 / 4,
        canvas: this.canvas
      });

      _ns2.default.grid.plot();

      var $snap = $('[data-js-class~="snap"]');

      $snap.on('change', function () {
        _ns2.default.snapFlag = $snap.prop('checked');
      }).trigger('change');

      _ns2.default.gArr = [];

      $('.btn-add-generator').on('click', function (_evt) {
        _ns2.default.currentGenerator = new _Generator2.default();

        _ns2.default.gArr.push(_ns2.default.currentGenerator);
      });

      this.$container.on('set-line', function () {
        _this.plot(iterationHq);
      });

      this.$container.on('replot-fractal', function (_evt, iteration) {
        _this.plot(iteration);
      });

      var $preset = $('[data-js-class~="preset"]');
      var $presetList = $('[data-js-class~="preset__list"]');
      var $presetInput = $('[data-js-class~="preset__input"]');

      $('[data-js-class~="preset__list"]').on('click', 'li', function (evt) {
        var key = $(evt.target).attr('data-value');
        var name = $(evt.target).text();

        $(evt.target).parents('.mdl-select').addClass('is-dirty').children('input').val(name);

        $presetInput.trigger('change', {
          key: key,
          name: name
        });
      });

      $presetInput.on('change', function (evt) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        function getGenerator(arr) {
          var ret = [];
          arr.forEach(function (item) {
            ret.push(new _Generator2.default({
              line: new _Line2.default({
                start: new _Point2.default({
                  x: item[0],
                  y: item[1]
                }),
                end: new _Point2.default({
                  x: item[2],
                  y: item[3]
                })
              })
            }));
          });

          return ret;
        }

        var name = opts.name || $(evt.target).val();

        var key = _.findKey(_presetList2.default, function (item) {
          return item.name === name;
        });

        if (key === '') {
          return;
        }

        _ns2.default.ctrlField.innerHTML = '';

        _ns2.default.gArr = getGenerator(_presetList2.default[key].generator);

        _ns2.default.gArr.forEach(function (g) {
          var startPx = (0, _util.px)(g.line.start);
          var endPx = (0, _util.px)(g.line.end);

          g.touchDownHandler({
            pageX: startPx.x,
            pageY: startPx.y
          });

          _this.$container.off('mousedown');
          _this.$container.off('mousemove');
          _this.$container.off('mouseup');

          g.touchUpHandler({
            pageX: endPx.x,
            pageY: endPx.y
          });
        });
      });

      Object.keys(_presetList2.default).forEach(function (key) {
        var preset = _presetList2.default[key];

        $presetList.append('<li class="mdl-menu__item" data-value="' + key + '">' + preset.name + '</li>');
      });
    }
  }, {
    key: 'setSize',
    value: function setSize() {
      _ns2.default.width = $(window).width();
      _ns2.default.height = $(window).height();

      this.canvas.width = _ns2.default.width;
      this.canvas.height = _ns2.default.height;

      $(_ns2.default.ctrlField).attr('width', _ns2.default.width);
      $(_ns2.default.ctrlField).attr('height', _ns2.default.height);
      $(_ns2.default.ctrlField).attr('viewBox', '0 0 256 256');
    }
  }, {
    key: 'plot',
    value: function plot() {
      var _this2 = this;

      var iteration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      var maxIteration = Math.floor(Math.log(MAX_POINTS) / Math.log(_ns2.default.gArr.length));
      iteration = Math.min(iteration, maxIteration);
      this.ctx.clearRect(0, 0, _ns2.default.width, _ns2.default.height);

      _ns2.default.grid.plot();

      var lineArr = [new _Line2.default({
        start: new _Point2.default({
          x: 0,
          y: 0
        }),
        end: new _Point2.default({
          x: 1,
          y: 0
        })
      })];

      for (var i = 0; i < iteration; i++) {
        lineArr = this.iterate(lineArr);
      }

      var fractal = lineArr;

      fractal.forEach(function (line) {
        var p = (0, _util.px)({
          x: line.start.x,
          y: line.start.y
        });

        _this2.ctx.fillRect(p.x, p.y, 1, 1);
      });
    }
  }, {
    key: 'iterate',
    value: function iterate(lineArr) {
      var _this3 = this;

      var ret = [];
      lineArr.forEach(function (line) {
        var tmp = _this3.ifs(line);
        ret = ret.concat(tmp);
      });

      return ret;
    }
  }, {
    key: 'ifs',
    value: function ifs(line) {
      var ret = [];

      _ns2.default.gArr.forEach(function (g) {
        var l = new _Line2.default({
          start: (0, _util.plus)((0, _util.mult)((0, _util.sub)(g.line.end, g.line.start), line.start), g.line.start),
          end: (0, _util.plus)((0, _util.mult)((0, _util.sub)(g.line.end, g.line.start), line.end), g.line.start)
        });

        ret.push(l);
      });

      return ret;
    }
  }]);

  return Index;
}();

exports.default = Index;

},{"../module/Generator":1,"../module/Grid":2,"../module/Line":3,"../module/Point":5,"../module/ns":7,"../module/preset-list":8,"../module/util":9}],12:[function(require,module,exports){
'use strict';

var _ns = require('./module/ns');

var _ns2 = _interopRequireDefault(_ns);

var _Main = require('./module/Main');

var _Main2 = _interopRequireDefault(_Main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// エントリーポイント。indexからはライブラリとこれしか呼ばない

_ns2.default.main = new _Main2.default();

},{"./module/Main":4,"./module/ns":7}]},{},[12]);
