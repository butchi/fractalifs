!function b(u,t,c){function h(bb,ub){if(!t[bb]){if(!u[bb]){var tb="function"==typeof require&&require;if(!ub&&tb)return tb(bb,!0);if(i)return i(bb,!0);var cb=new Error("Cannot find module '"+bb+"'");throw cb.code="MODULE_NOT_FOUND",cb}var hb=t[bb]={exports:{}};u[bb][0].call(hb.exports,function(b){var t=u[bb][1][b];return h(t?t:b)},hb,hb.exports,b,u,t,c)}return t[bb].exports}for(var i="function"==typeof require&&require,bb=0;bb<c.length;bb++)h(c[bb]);return h}({1:[function(b,u,t){"use strict";function c(b){return b&&b.__esModule?b:{"default":b}}function h(b,u){if(!(b instanceof u))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function b(b,u){for(var t=0;t<u.length;t++){var c=u[t];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(b,c.key,c)}}return function(u,t,c){return t&&b(u.prototype,t),c&&b(u,c),u}}(),bb=b("./ns"),ub=c(bb),tb=b("../module/Point"),cb=c(tb),hb=b("../module/Line"),ib=c(hb),bu=function(){function b(){var u=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};h(this,b),this.initialize(u)}return i(b,[{key:"initialize",value:function(){var b=this,u=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.arrow=document.createElementNS("http://www.w3.org/2000/svg","g"),this.$elm=$(this.arrow),this.lineElm=document.createElementNS("http://www.w3.org/2000/svg","line"),this.startPt=document.createElementNS("http://www.w3.org/2000/svg","circle"),this.endPt=document.createElementNS("http://www.w3.org/2000/svg","circle"),this.startPt.setAttribute("class","start-pt"),this.endPt.setAttribute("class","end-pt"),this.$container=$(".container"),ub["default"].$ctrlCanvas.append(this.arrow),this.line=u.line||new ib["default"]({start:new cb["default"]({x:0,y:0}),end:new cb["default"]({x:1,y:0})}),this.$container.one("mousedown",function(u){b.touchDownHandler(u)})}},{key:"touchDownHandler",value:function(b){var u=this,t=b.pageX,c=b.pageY;this.line.start.x=(t-128)/128,this.line.start.y=(c-128)/128,this.lineElm.setAttribute("x1",t),this.lineElm.setAttribute("y1",c),this.lineElm.setAttribute("x2",t),this.lineElm.setAttribute("y2",c),this.arrow.append(this.lineElm),this.startPt.setAttribute("cx",t),this.startPt.setAttribute("cy",c),this.endPt.setAttribute("cx",t),this.endPt.setAttribute("cy",c),this.arrow.append(this.startPt),this.$container.on("mousemove",function(b){u.touchMoveHandler(b)}),this.$container.one("mouseup",function(b){u.touchUpHandler(b)}),$(this.startPt).on("mousedown",function(b){$(u.startPt).on("mouseup",function(b){u.$container.off("mousemove"),u.$container.trigger("replot-fractal",12)}),u.$container.on("mousemove",function(b){var t=b.pageX,c=b.pageY;u.line.start.x=(t-128)/128,u.line.start.y=(c-128)/128,u.lineElm.setAttribute("x1",t),u.lineElm.setAttribute("y1",c),u.startPt.setAttribute("cx",t),u.startPt.setAttribute("cy",c),u.$container.trigger("replot-fractal",8)})}),$(this.endPt).on("mousedown",function(b){$(u.endPt).on("mouseup",function(b){u.$container.off("mousemove"),u.$container.trigger("replot-fractal",12)}),u.$container.on("mousemove",function(b){var t=b.pageX,c=b.pageY;u.line.end.x=(t-128)/128,u.line.end.y=(c-128)/128,u.lineElm.setAttribute("x2",t),u.lineElm.setAttribute("y2",c),u.endPt.setAttribute("cx",t),u.endPt.setAttribute("cy",c),u.$container.trigger("replot-fractal",8)})})}},{key:"touchMoveHandler",value:function(b){var u=b.pageX,t=b.pageY;this.line.end.x=(u-128)/128,this.line.end.y=(t-128)/128,this.lineElm.setAttribute("x2",u),this.lineElm.setAttribute("y2",t)}},{key:"touchUpHandler",value:function(b){var u=b.pageX,t=b.pageY;this.$container.off("mousemove"),this.line.end.x=(u-128)/128,this.line.end.y=(t-128)/128,this.lineElm.setAttribute("x2",u),this.lineElm.setAttribute("y2",t),this.endPt.setAttribute("cx",u),this.endPt.setAttribute("cy",t),this.arrow.append(this.endPt),this.$container.trigger("set-line")}}]),b}();t["default"]=bu},{"../module/Line":2,"../module/Point":4,"./ns":6}],2:[function(b,u,t){"use strict";function c(b,u){if(!(b instanceof u))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var h=function(){function b(b,u){for(var t=0;t<u.length;t++){var c=u[t];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(b,c.key,c)}}return function(u,t,c){return t&&b(u.prototype,t),c&&b(u,c),u}}(),i=function(){function b(){var u=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};c(this,b),this.type="line",this.start=u.start||u[0],this.end=u.end||u[1]}return h(b,[{key:"start",get:function(){return this[0]},set:function(b){this[0]=b}},{key:"end",get:function(){return this[1]},set:function(b){this[1]=b}}]),b}();t["default"]=i},{}],3:[function(b,u,t){"use strict";function c(b){return b&&b.__esModule?b:{"default":b}}function h(b,u){if(!(b instanceof u))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function b(b,u){for(var t=0;t<u.length;t++){var c=u[t];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(b,c.key,c)}}return function(u,t,c){return t&&b(u.prototype,t),c&&b(u,c),u}}(),bb=b("./Router"),ub=c(bb),tb=function(){function b(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};h(this,b),console.log("Hello, world!"),this.initialize(),console.log("Thanks, world!")}return i(b,[{key:"initialize",value:function(){var b=this;$(function(){b.router=new ub["default"]})}}]),b}();t["default"]=tb},{"./Router":5}],4:[function(b,u,t){"use strict";function c(b,u){if(!(b instanceof u))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var h=function(){function b(b,u){for(var t=0;t<u.length;t++){var c=u[t];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(b,c.key,c)}}return function(u,t,c){return t&&b(u.prototype,t),c&&b(u,c),u}}(),i=function(){function b(){var u=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};c(this,b),this.type="point",this.x=u.x||u[0]||0,this.y=u.y||u[1]||0}return h(b,[{key:"x",get:function(){return this[0]},set:function(b){this[0]=b}},{key:"y",get:function(){return this[1]},set:function(b){this[1]=b}}]),b}();t["default"]=i},{}],5:[function(b,u,t){"use strict";function c(b){return b&&b.__esModule?b:{"default":b}}function h(b,u){if(!(b instanceof u))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function b(b,u){for(var t=0;t<u.length;t++){var c=u[t];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(b,c.key,c)}}return function(u,t,c){return t&&b(u.prototype,t),c&&b(u,c),u}}(),bb=b("./ns"),ub=(c(bb),b("../page/Common")),tb=c(ub),cb=b("../page/Index"),hb=c(cb),ib=function(){function b(){h(this,b),this.initialize()}return i(b,[{key:"initialize",value:function(){var b=$("body");this.pageCommon=new tb["default"],b.hasClass("page-index")&&(this.pageIndex=new hb["default"])}}]),b}();t["default"]=ib},{"../page/Common":8,"../page/Index":9,"./ns":6}],6:[function(b,u,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),window.App=window.App||{};var c=window.App;t["default"]=c},{}],7:[function(b,u,t){"use strict";function c(b){return b&&b.__esModule?b:{"default":b}}function h(b,u){return new tb["default"]({0:b.x+u.x,1:b.y+u.y})}function i(b,u){return new tb["default"]({0:b.x-u.x,1:b.y-u.y})}function bb(b,u){return new tb["default"]({0:b.x*u.x-b.y*u.y,1:b.x*u.y+b.y*u.x})}Object.defineProperty(t,"__esModule",{value:!0}),t.plus=h,t.sub=i,t.mult=bb;var ub=b("./Point"),tb=c(ub)},{"./Point":4}],8:[function(b,u,t){"use strict";function c(b){return b&&b.__esModule?b:{"default":b}}function h(b,u){if(!(b instanceof u))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function b(b,u){for(var t=0;t<u.length;t++){var c=u[t];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(b,c.key,c)}}return function(u,t,c){return t&&b(u.prototype,t),c&&b(u,c),u}}(),bb=b("../module/ns"),ub=c(bb),tb=function(){function b(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};h(this,b),this.initialize()}return i(b,[{key:"initialize",value:function(){console.log("page common"),this.setEnvClass()}},{key:"setEnvClass",value:function(){var b=$("html");ub["default"].isSp=!1,ub["default"].isPc=!1,ub["default"].isTab=!1,b.hasClass("is-sp")&&(ub["default"].isSp=!0),b.hasClass("is-pc")&&(ub["default"].isPc=!0),b.hasClass("is-tab")&&(ub["default"].isTab=!0)}}]),b}();t["default"]=tb},{"../module/ns":6}],9:[function(b,u,t){"use strict";function c(b){return b&&b.__esModule?b:{"default":b}}function h(b,u){if(!(b instanceof u))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function b(b,u){for(var t=0;t<u.length;t++){var c=u[t];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(b,c.key,c)}}return function(u,t,c){return t&&b(u.prototype,t),c&&b(u,c),u}}(),bb=b("../module/ns"),ub=c(bb),tb=b("../module/Point"),cb=c(tb),hb=b("../module/Line"),ib=c(hb),bu=b("../module/Generator"),uu=c(bu),tu=b("../module/util"),cu=1e4,hu=function(){function b(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};h(this,b),this.initialize()}return i(b,[{key:"initialize",value:function(){var b=this;this.$container=$(".container"),this.canvas=document.createElement("canvas"),this.canvas.width=256,this.canvas.height=256,$(this.canvas).addClass("elm-canvas"),this.$container.append(this.canvas),ub["default"].$ctrlCanvas=$(".ctrl-canvas"),this.$container.append(ub["default"].$ctrlCanvas),this.ctx=this.canvas.getContext("2d"),ub["default"].gArr=[],$(".btn-add-generator").on("click",function(b){ub["default"].currentGenerator=new uu["default"],ub["default"].gArr.push(ub["default"].currentGenerator)}),this.$container.on("set-line",function(){b.plot(12)}),this.$container.on("replot-fractal",function(u,t){b.plot(t)})}},{key:"plot",value:function(){var b=this,u=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=Math.floor(Math.log(cu)/Math.log(ub["default"].gArr.length));u=Math.min(u,t),this.ctx.clearRect(0,0,256,256);for(var c=[new ib["default"]({start:new cb["default"]({x:0,y:0}),end:new cb["default"]({x:1,y:0})})],h=0;u>h;h++)c=this.iterate(c);var i=c;i.forEach(function(u){b.ctx.fillRect(128*u.start.x+128,128*u.start.y+128,1,1)})}},{key:"iterate",value:function(b){var u=this,t=[];return b.forEach(function(b){var c=u.ifs(b);t=t.concat(c)}),t}},{key:"ifs",value:function(b){var u=[];return ub["default"].gArr.forEach(function(t){var c=new ib["default"]({start:(0,tu.plus)((0,tu.mult)((0,tu.sub)(t.line.end,t.line.start),b.start),t.line.start),end:(0,tu.plus)((0,tu.mult)((0,tu.sub)(t.line.end,t.line.start),b.end),t.line.start)});u.push(c)}),u}}]),b}();t["default"]=hu},{"../module/Generator":1,"../module/Line":2,"../module/Point":4,"../module/ns":6,"../module/util":7}],10:[function(b,u,t){"use strict";function c(b){return b&&b.__esModule?b:{"default":b}}var h=b("./module/ns"),i=c(h),bb=b("./module/Main"),ub=c(bb);i["default"].main=new ub["default"]},{"./module/Main":3,"./module/ns":6}]},{},[10]);