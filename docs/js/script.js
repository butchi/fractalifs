(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ns = require('./ns');

var _ns2 = _interopRequireDefault(_ns);

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

      this.line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

      this.startPt = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      this.endPt = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

      this.startPt.setAttribute('class', 'start-pt');
      this.endPt.setAttribute('class', 'end-pt');

      this.$container = $('.container');

      _ns2.default.$ctrlCanvas.append(this.arrow);

      this.point = opts.point || [[], []];

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

      this.point[0][0] = (x - 128) / 128;
      this.point[0][1] = (y - 128) / 128;

      this.line.setAttribute('x1', x);
      this.line.setAttribute('y1', y);
      this.line.setAttribute('x2', x);
      this.line.setAttribute('y2', y);

      this.arrow.append(this.line);

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

          _this2.point[0][0] = (x - 128) / 128;
          _this2.point[0][1] = (y - 128) / 128;

          _this2.line.setAttribute('x1', x);
          _this2.line.setAttribute('y1', y);

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

          _this2.point[1][0] = (x - 128) / 128;
          _this2.point[1][1] = (y - 128) / 128;

          _this2.line.setAttribute('x2', x);
          _this2.line.setAttribute('y2', y);

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

      this.point[1][0] = (x - 128) / 128;
      this.point[1][1] = (y - 128) / 128;

      this.line.setAttribute('x2', x);
      this.line.setAttribute('y2', y);
    }
  }, {
    key: 'touchUpHandler',
    value: function touchUpHandler(evt) {
      var x = evt.pageX;
      var y = evt.pageY;

      this.$container.off('mousemove');

      this.point[1][0] = (x - 128) / 128;
      this.point[1][1] = (y - 128) / 128;

      this.line.setAttribute('x2', x);
      this.line.setAttribute('y2', y);

      this.endPt.setAttribute('cx', x);
      this.endPt.setAttribute('cy', y);

      this.arrow.append(this.endPt);

      this.$container.trigger('set-line');
    }
  }, {
    key: 'p',
    get: function get() {
      return this.point;
    }
  }]);

  return Generator;
}();

exports.default = Generator;

},{"./ns":4}],2:[function(require,module,exports){
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

},{"./Router":3}],3:[function(require,module,exports){
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

},{"../page/Common":5,"../page/Index":6,"./ns":4}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{"../module/ns":4}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ns = require('../module/ns');

var _ns2 = _interopRequireDefault(_ns);

var _Generator = require('../module/Generator');

var _Generator2 = _interopRequireDefault(_Generator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MAX_POINTS = 10000;

function plus(a, b) {
  return {
    0: a[0] + b[0],
    1: a[1] + b[1]
  };
}

function sub(a, b) {
  return {
    0: a[0] - b[0],
    1: a[1] - b[1]
  };
}

function mult(a, b) {
  return {
    0: a[0] * b[0] - a[1] * b[1],
    1: a[0] * b[1] + a[1] * b[0]
  };
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

      var tmp = [[0, 0]];

      for (var i = 0; i < iteration; i++) {
        tmp = this.iterate(tmp);
      }

      var fractal = tmp;

      fractal.forEach(function (coord) {
        _this2.ctx.fillRect(coord[0] * 128 + 128, coord[1] * 128 + 128, 1, 1);
      });
    }
  }, {
    key: 'iterate',
    value: function iterate(coordArr) {
      var _this3 = this;

      var ret = [];
      coordArr.forEach(function (coord) {
        var tmp = _this3.ifs(coord);
        ret = ret.concat(tmp);
      });

      return ret;
    }
  }, {
    key: 'ifs',
    value: function ifs(pt) {
      var ret = [];

      _ns2.default.gArr.forEach(function (g) {
        ret.push(plus(mult(sub(g.p[1], g.p[0]), pt), g.p[0]));
      });

      return ret;
    }
  }]);

  return Index;
}();

exports.default = Index;

},{"../module/Generator":1,"../module/ns":4}],7:[function(require,module,exports){
'use strict';

var _ns = require('./module/ns');

var _ns2 = _interopRequireDefault(_ns);

var _Main = require('./module/Main');

var _Main2 = _interopRequireDefault(_Main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// エントリーポイント。indexからはライブラリとこれしか呼ばない

_ns2.default.main = new _Main2.default();

},{"./module/Main":2,"./module/ns":4}]},{},[7]);
