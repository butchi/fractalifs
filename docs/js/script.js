(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./Router":2}],2:[function(require,module,exports){
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

},{"../page/Common":4,"../page/Index":5,"./ns":3}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"../module/ns":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ns = require('../module/ns');

var _ns2 = _interopRequireDefault(_ns);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var p = [[[0, 0], [0.5, 0.5]], [[0.5, 0.5], [1, 0]]];

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
      var containerElm = document.querySelector('.container');

      this.canvas = document.createElement('canvas');
      this.canvas.width = 256;
      this.canvas.height = 256;

      containerElm.append(this.canvas);

      this.ctx = this.canvas.getContext('2d');

      this.ctrlPlot();

      this.plot();
    }
  }, {
    key: 'ctrlPlot',
    value: function ctrlPlot() {
      var _this = this;

      p.forEach(function (line) {
        _this.ctx.beginPath();
        _this.ctx.moveTo(line[0][0] * 128 + 128, line[0][1] * 128 + 128);
        _this.ctx.lineTo(line[1][0] * 128 + 128, line[1][1] * 128 + 128);
        _this.ctx.strokeStyle = 0xff0000;
        _this.ctx.stroke();
      });
    }
  }, {
    key: 'plot',
    value: function plot() {
      var _this2 = this;

      var tmp = [[0, 0]];

      for (var i = 0; i < 12; i++) {
        tmp = this.iterate(tmp);
      }

      var fractal = tmp;

      fractal.forEach(function (coord) {
        _this2.ctx.fillRect(coord[0] * 128 + 128, coord[1] * 128 + 128, 1, 1);
      });
    }
  }, {
    key: 'iterate',
    value: function iterate(ptArr) {
      var _this3 = this;

      var ret = [];
      ptArr.forEach(function (coord) {
        var tmp = _this3.ifs(coord);
        ret = ret.concat(tmp);
      });

      return ret;
    }
  }, {
    key: 'ifs',
    value: function ifs(pt) {
      var ret = [];

      p.forEach(function (line) {
        ret.push(plus(mult(sub(line[1], line[0]), pt), line[0]));
      });

      return ret;
    }
  }]);

  return Index;
}();

exports.default = Index;

},{"../module/ns":3}],6:[function(require,module,exports){
'use strict';

var _ns = require('./module/ns');

var _ns2 = _interopRequireDefault(_ns);

var _Main = require('./module/Main');

var _Main2 = _interopRequireDefault(_Main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// エントリーポイント。indexからはライブラリとこれしか呼ばない

_ns2.default.main = new _Main2.default();

},{"./module/Main":1,"./module/ns":3}]},{},[6]);
