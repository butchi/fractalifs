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

      this.startPt = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      this.endPt = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

      this.startPt.setAttribute('class', 'start-pt');
      this.endPt.setAttribute('class', 'end-pt');

      this.$container = $('.container');

      _ns2.default.$ctrlCanvas.append(this.arrow);

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
    key: 'touchDownHandler',
    value: function touchDownHandler(evt) {
      var _this2 = this;

      var x = evt.pageX;
      var y = evt.pageY;

      this.line.start.x = (x - 128) / 128;
      this.line.start.y = (y - 128) / 128;

      this.lineElm.setAttribute('x1', x);
      this.lineElm.setAttribute('y1', y);
      this.lineElm.setAttribute('x2', x);
      this.lineElm.setAttribute('y2', y);

      this.arrow.append(this.lineElm);

      this.startPt.setAttribute('cx', x);
      this.startPt.setAttribute('cy', y);
      this.endPt.setAttribute('cx', x);
      this.endPt.setAttribute('cy', y);

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
          var x = evt.pageX;
          var y = evt.pageY;

          _this2.line.start.x = (x - 128) / 128;
          _this2.line.start.y = (y - 128) / 128;

          _this2.lineElm.setAttribute('x1', x);
          _this2.lineElm.setAttribute('y1', y);

          _this2.startPt.setAttribute('cx', x);
          _this2.startPt.setAttribute('cy', y);

          _this2.$container.trigger('replot-fractal', 8);
        });
      });

      $(this.endPt).on('mousedown', function (evt) {
        $(_this2.endPt).on('mouseup', function (evt) {
          _this2.$container.off('mousemove');

          _this2.$container.trigger('replot-fractal', 12);
        });

        _this2.$container.on('mousemove', function (evt) {
          var x = evt.pageX;
          var y = evt.pageY;

          _this2.line.end.x = (x - 128) / 128;
          _this2.line.end.y = (y - 128) / 128;

          _this2.lineElm.setAttribute('x2', x);
          _this2.lineElm.setAttribute('y2', y);

          _this2.endPt.setAttribute('cx', x);
          _this2.endPt.setAttribute('cy', y);

          _this2.$container.trigger('replot-fractal', 8);
        });
      });
    }
  }, {
    key: 'touchMoveHandler',
    value: function touchMoveHandler(evt) {
      var x = evt.pageX;
      var y = evt.pageY;

      this.line.end.x = (x - 128) / 128;
      this.line.end.y = (y - 128) / 128;

      this.lineElm.setAttribute('x2', x);
      this.lineElm.setAttribute('y2', y);
    }
  }, {
    key: 'touchUpHandler',
    value: function touchUpHandler(evt) {
      var x = evt.pageX;
      var y = evt.pageY;

      this.$container.off('mousemove');

      this.line.end.x = (x - 128) / 128;
      this.line.end.y = (y - 128) / 128;

      this.lineElm.setAttribute('x2', x);
      this.lineElm.setAttribute('y2', y);

      this.endPt.setAttribute('cx', x);
      this.endPt.setAttribute('cy', y);

      this.arrow.append(this.endPt);

      this.$container.trigger('set-line');
    }
  }]);

  return Generator;
}();

exports.default = Generator;

},{"../module/Line":2,"../module/Point":4,"./ns":6}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

},{}],3:[function(require,module,exports){
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

},{"./Router":5}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{"../page/Common":7,"../page/Index":8,"./ns":6}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{"../module/ns":6}],8:[function(require,module,exports){
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

var _Generator = require('../module/Generator');

var _Generator2 = _interopRequireDefault(_Generator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MAX_POINTS = 10000;

function plus(a, b) {
  return new _Point2.default({
    0: a.x + b.x,
    1: a.y + b.y
  });
}

function sub(a, b) {
  return new _Point2.default({
    0: a.x - b.x,
    1: a.y - b.y
  });
}

function mult(a, b) {
  return new _Point2.default({
    0: a.x * b.x - a.y * b.y,
    1: a.x * b.y + a.y * b.x
  });
}

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

      this.canvas = document.createElement('canvas');
      this.canvas.width = 256;
      this.canvas.height = 256;
      $(this.canvas).addClass('elm-canvas');

      this.$container.append(this.canvas);

      _ns2.default.$ctrlCanvas = $('.ctrl-canvas');

      this.$container.append(_ns2.default.$ctrlCanvas);

      this.ctx = this.canvas.getContext('2d');

      _ns2.default.gArr = [];

      $('.btn-add-generator').on('click', function (_evt) {
        _ns2.default.currentGenerator = new _Generator2.default();

        _ns2.default.gArr.push(_ns2.default.currentGenerator);
      });

      this.$container.on('set-line', function () {
        _this.plot(12);
      });

      this.$container.on('replot-fractal', function (_evt, iteration) {
        _this.plot(iteration);
      });
    }
  }, {
    key: 'plot',
    value: function plot() {
      var _this2 = this;

      var iteration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      var maxIteration = Math.floor(Math.log(MAX_POINTS) / Math.log(_ns2.default.gArr.length));
      iteration = Math.min(iteration, maxIteration);
      this.ctx.clearRect(0, 0, 256, 256);

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
        _this2.ctx.fillRect(line.start.x * 128 + 128, line.start.y * 128 + 128, 1, 1);
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
          start: plus(mult(sub(g.line.end, g.line.start), line.start), g.line.start),
          end: plus(mult(sub(g.line.end, g.line.end), line.start), g.line.start)
        });

        ret.push(l);
      });

      return ret;
    }
  }]);

  return Index;
}();

exports.default = Index;

},{"../module/Generator":1,"../module/Line":2,"../module/Point":4,"../module/ns":6}],9:[function(require,module,exports){
'use strict';

var _ns = require('./module/ns');

var _ns2 = _interopRequireDefault(_ns);

var _Main = require('./module/Main');

var _Main2 = _interopRequireDefault(_Main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// エントリーポイント。indexからはライブラリとこれしか呼ばない

_ns2.default.main = new _Main2.default();

},{"./module/Main":3,"./module/ns":6}]},{},[9]);
