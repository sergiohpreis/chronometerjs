/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _chronometer = __webpack_require__(1);

var _chronometer2 = _interopRequireDefault(_chronometer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = { schema: [10, 0, 1] };
var chronometer = new _chronometer2.default(config);
chronometer.start();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(2);

var _constants2 = _interopRequireDefault(_constants);

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Chronometer = function () {
  function Chronometer(config) {
    _classCallCheck(this, Chronometer);

    if (!config) {
      throw new Error('The configuration object must be passed');
    }

    if (!config.schema) {
      throw new Error('The chronometer schema must be provided');
    }

    this.observables = [];

    // Sets all config object as properties of the class
    this.configToProperties(config);
    this.convertSchema(this.schema);
  }

  _createClass(Chronometer, [{
    key: 'configToProperties',
    value: function configToProperties(config) {
      var _this = this;

      Object.keys(config).forEach(function (item) {
        _this[item] = config[item];
      });
    }
  }, {
    key: 'convertSchema',
    value: function convertSchema(schema) {
      this.initialTime = schema.reduce(function (acc, item, index) {
        acc[_constants2.default[index]] = item;
        return acc;
      }, {});
    }
  }, {
    key: 'prepare',
    value: function prepare(initialTime) {
      // Object.keys(initialTime).forEach((item) => {
      //   this[item] = initialTime[item];
      // });
      this.currentTime = _extends({}, initialTime);
    }
  }, {
    key: 'countdown',
    value: function countdown() {
      var _this2 = this;

      if (this.currentTime.seconds === 0 && this.currentTime.minutes !== undefined) {
        this.currentTime.minutes = this.currentTime.minutes - 1;
        this.currentTime.seconds = 60;
      }

      if (this.currentTime.minutes === -1 && this.currentTime.hours !== undefined) {
        this.currentTime.hours = this.currentTime.hours - 1;
        this.currentTime.minutes = 59;
      }

      if (this.currentTime.seconds === 0 && this.currentTime.minutes === undefined || this.currentTime.minutes === 0 && this.currentTime.hours === undefined) {
        return;
      }

      setTimeout(function () {
        _this2.currentTime.seconds = _this2.currentTime.seconds - 1;
        _this2.updateTime();
        _this2.notify(_this2.currentTime);
        _this2.countdown(_this2.seconds);
      }, 1000);
    }
  }, {
    key: 'updateTime',
    value: function updateTime() {
      this.timeString = (this.currentTime.hours ? (0, _utils2.default)(this.currentTime.hours) : '00') + ':' + (this.currentTime.minutes ? (0, _utils2.default)(this.currentTime.minutes) : '00') + ':' + (0, _utils2.default)(this.currentTime.seconds);
    }
  }, {
    key: 'start',
    value: function start() {
      this.prepare(this.initialTime);
      this.countdown(this.seconds);
    }
  }, {
    key: 'subscribe',
    value: function subscribe(f) {
      this.observables.push(f);
    }
  }, {
    key: 'notify',
    value: function notify(data) {
      this.observables.forEach(function (observer) {
        return observer(data);
      });
    }
  }]);

  return Chronometer;
}();

exports.default = Chronometer;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CONFIG = {
  2: 'hours',
  1: 'minutes',
  0: 'seconds'
};

exports.default = CONFIG;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var numberToString = function numberToString(number) {
  var numberFixed = number.toString();
  return numberFixed.length < 2 ? "0" + numberFixed : numberFixed;
};

exports.default = numberToString;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2JlMDlkZTU2OGJkZGY4YzUwNzAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jaHJvbm9tZXRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pbmRleC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJzY2hlbWEiLCJjaHJvbm9tZXRlciIsInN0YXJ0IiwiQ2hyb25vbWV0ZXIiLCJFcnJvciIsIm9ic2VydmFibGVzIiwiY29uZmlnVG9Qcm9wZXJ0aWVzIiwiY29udmVydFNjaGVtYSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwiaXRlbSIsImluaXRpYWxUaW1lIiwicmVkdWNlIiwiYWNjIiwiaW5kZXgiLCJjdXJyZW50VGltZSIsInNlY29uZHMiLCJtaW51dGVzIiwidW5kZWZpbmVkIiwiaG91cnMiLCJzZXRUaW1lb3V0IiwidXBkYXRlVGltZSIsIm5vdGlmeSIsImNvdW50ZG93biIsInRpbWVTdHJpbmciLCJwcmVwYXJlIiwiZiIsInB1c2giLCJkYXRhIiwib2JzZXJ2ZXIiLCJDT05GSUciLCJudW1iZXJUb1N0cmluZyIsIm51bWJlciIsIm51bWJlckZpeGVkIiwidG9TdHJpbmciLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFD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QixxQkFBZSxLQUFLSixXQUFMLENBQWlCSSxLQUFoQyxDQUF6QixHQUFrRSxJQUF2RixXQUErRixLQUFLSixXQUFMLENBQWlCRSxPQUFqQixHQUEyQixxQkFBZSxLQUFLRixXQUFMLENBQWlCRSxPQUFoQyxDQUEzQixHQUFzRSxJQUFySyxVQUE2SyxxQkFBZSxLQUFLRixXQUFMLENBQWlCQyxPQUFoQyxDQUE3SztBQUNEOzs7NEJBRU87QUFDTixXQUFLUyxPQUFMLENBQWEsS0FBS2QsV0FBbEI7QUFDQSxXQUFLWSxTQUFMLENBQWUsS0FBS1AsT0FBcEI7QUFDRDs7OzhCQUVTVSxDLEVBQUc7QUFDWCxXQUFLdEIsV0FBTCxDQUFpQnVCLElBQWpCLENBQXNCRCxDQUF0QjtBQUNEOzs7MkJBRU1FLEksRUFBTTtBQUNYLFdBQUt4QixXQUFMLENBQWlCSyxPQUFqQixDQUF5QjtBQUFBLGVBQVlvQixTQUFTRCxJQUFULENBQVo7QUFBQSxPQUF6QjtBQUNEOzs7Ozs7a0JBR1kxQixXOzs7Ozs7Ozs7Ozs7QUNwRmYsSUFBTTRCLFNBQVM7QUFDYixLQUFHLE9BRFU7QUFFYixLQUFHLFNBRlU7QUFHYixLQUFHO0FBSFUsQ0FBZjs7a0JBTWVBLE07Ozs7Ozs7Ozs7OztBQ05mLElBQU1DLGlCQUFpQixTQUFqQkEsY0FBaUIsQ0FBQ0MsTUFBRCxFQUFZO0FBQ2pDLE1BQU1DLGNBQWNELE9BQU9FLFFBQVAsRUFBcEI7QUFDQSxTQUFPRCxZQUFZRSxNQUFaLEdBQXFCLENBQXJCLFNBQTZCRixXQUE3QixHQUE2Q0EsV0FBcEQ7QUFDRCxDQUhEOztrQkFLZUYsYyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjYmUwOWRlNTY4YmRkZjhjNTA3MCIsImltcG9ydCBDaHJvbm9tZXRlciBmcm9tICcuL2Nocm9ub21ldGVyJztcblxuY29uc3QgY29uZmlnID0geyBzY2hlbWE6IFsxMCwgMCwgMV0gfTtcbmNvbnN0IGNocm9ub21ldGVyID0gbmV3IENocm9ub21ldGVyKGNvbmZpZyk7XG5jaHJvbm9tZXRlci5zdGFydCgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiaW1wb3J0IENPTkZJRyBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgbnVtYmVyVG9TdHJpbmcgZnJvbSAnLi91dGlscyc7XG5cbmNsYXNzIENocm9ub21ldGVyIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgaWYgKCFjb25maWcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IG11c3QgYmUgcGFzc2VkJyk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuc2NoZW1hKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjaHJvbm9tZXRlciBzY2hlbWEgbXVzdCBiZSBwcm92aWRlZCcpO1xuICAgIH1cblxuICAgIHRoaXMub2JzZXJ2YWJsZXMgPSBbXTtcblxuICAgIC8vIFNldHMgYWxsIGNvbmZpZyBvYmplY3QgYXMgcHJvcGVydGllcyBvZiB0aGUgY2xhc3NcbiAgICB0aGlzLmNvbmZpZ1RvUHJvcGVydGllcyhjb25maWcpO1xuICAgIHRoaXMuY29udmVydFNjaGVtYSh0aGlzLnNjaGVtYSk7XG4gIH1cblxuICBjb25maWdUb1Byb3BlcnRpZXMoY29uZmlnKSB7XG4gICAgT2JqZWN0LmtleXMoY29uZmlnKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICB0aGlzW2l0ZW1dID0gY29uZmlnW2l0ZW1dO1xuICAgIH0pO1xuICB9XG5cbiAgY29udmVydFNjaGVtYShzY2hlbWEpIHtcbiAgICB0aGlzLmluaXRpYWxUaW1lID0gc2NoZW1hLnJlZHVjZSgoYWNjLCBpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgYWNjW0NPTkZJR1tpbmRleF1dID0gaXRlbTtcbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xuICB9XG5cbiAgcHJlcGFyZShpbml0aWFsVGltZSkge1xuICAgIC8vIE9iamVjdC5rZXlzKGluaXRpYWxUaW1lKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgLy8gICB0aGlzW2l0ZW1dID0gaW5pdGlhbFRpbWVbaXRlbV07XG4gICAgLy8gfSk7XG4gICAgdGhpcy5jdXJyZW50VGltZSA9IHtcbiAgICAgIC4uLmluaXRpYWxUaW1lLFxuICAgIH07XG4gIH1cblxuICBjb3VudGRvd24oKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFRpbWUuc2Vjb25kcyA9PT0gMCAmJiB0aGlzLmN1cnJlbnRUaW1lLm1pbnV0ZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5jdXJyZW50VGltZS5taW51dGVzID0gdGhpcy5jdXJyZW50VGltZS5taW51dGVzIC0gMTtcbiAgICAgIHRoaXMuY3VycmVudFRpbWUuc2Vjb25kcyA9IDYwO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmN1cnJlbnRUaW1lLm1pbnV0ZXMgPT09IC0xICYmIHRoaXMuY3VycmVudFRpbWUuaG91cnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5jdXJyZW50VGltZS5ob3VycyA9IHRoaXMuY3VycmVudFRpbWUuaG91cnMgLSAxO1xuICAgICAgdGhpcy5jdXJyZW50VGltZS5taW51dGVzID0gNTk7XG4gICAgfVxuXG4gICAgaWYgKCh0aGlzLmN1cnJlbnRUaW1lLnNlY29uZHMgPT09IDAgJiYgdGhpcy5jdXJyZW50VGltZS5taW51dGVzID09PSB1bmRlZmluZWQpIHx8XG4gICAgICAodGhpcy5jdXJyZW50VGltZS5taW51dGVzID09PSAwICYmIHRoaXMuY3VycmVudFRpbWUuaG91cnMgPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY3VycmVudFRpbWUuc2Vjb25kcyA9IHRoaXMuY3VycmVudFRpbWUuc2Vjb25kcyAtIDE7XG4gICAgICB0aGlzLnVwZGF0ZVRpbWUoKTtcbiAgICAgIHRoaXMubm90aWZ5KHRoaXMuY3VycmVudFRpbWUpO1xuICAgICAgdGhpcy5jb3VudGRvd24odGhpcy5zZWNvbmRzKTtcbiAgICB9LCAxMDAwKTtcbiAgfVxuXG4gIHVwZGF0ZVRpbWUoKSB7XG4gICAgdGhpcy50aW1lU3RyaW5nID0gYCR7dGhpcy5jdXJyZW50VGltZS5ob3VycyA/IG51bWJlclRvU3RyaW5nKHRoaXMuY3VycmVudFRpbWUuaG91cnMpIDogJzAwJ306JHt0aGlzLmN1cnJlbnRUaW1lLm1pbnV0ZXMgPyBudW1iZXJUb1N0cmluZyh0aGlzLmN1cnJlbnRUaW1lLm1pbnV0ZXMpIDogJzAwJ306JHtudW1iZXJUb1N0cmluZyh0aGlzLmN1cnJlbnRUaW1lLnNlY29uZHMpfWA7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICB0aGlzLnByZXBhcmUodGhpcy5pbml0aWFsVGltZSk7XG4gICAgdGhpcy5jb3VudGRvd24odGhpcy5zZWNvbmRzKTtcbiAgfVxuXG4gIHN1YnNjcmliZShmKSB7XG4gICAgdGhpcy5vYnNlcnZhYmxlcy5wdXNoKGYpO1xuICB9XG5cbiAgbm90aWZ5KGRhdGEpIHtcbiAgICB0aGlzLm9ic2VydmFibGVzLmZvckVhY2gob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIoZGF0YSkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENocm9ub21ldGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Nocm9ub21ldGVyLmpzIiwiY29uc3QgQ09ORklHID0ge1xuICAyOiAnaG91cnMnLFxuICAxOiAnbWludXRlcycsXG4gIDA6ICdzZWNvbmRzJyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENPTkZJRztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb25zdGFudHMvaW5kZXguanMiLCJjb25zdCBudW1iZXJUb1N0cmluZyA9IChudW1iZXIpID0+IHtcbiAgY29uc3QgbnVtYmVyRml4ZWQgPSBudW1iZXIudG9TdHJpbmcoKTtcbiAgcmV0dXJuIG51bWJlckZpeGVkLmxlbmd0aCA8IDIgPyBgMCR7bnVtYmVyRml4ZWR9YCA6IG51bWJlckZpeGVkO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgbnVtYmVyVG9TdHJpbmc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9