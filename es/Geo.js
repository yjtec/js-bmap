function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { loadBdMap } from './AsyncLoadMap';

var getPosition =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(callback) {
    var point;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            point = {};
            _context.prev = 1;
            _context.next = 4;
            return getGeoLocation();

          case 4:
            point = _context.sent;
            _context.next = 12;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](1);
            _context.next = 11;
            return getCityLocation();

          case 11:
            point = _context.sent;

          case 12:
            return _context.abrupt("return", Promise.resolve(point));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 7]]);
  }));

  return function getPosition(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getGeoLocation =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var BMap, geolocation;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return loadBdMap();

          case 2:
            BMap = _context2.sent;
            geolocation = new BMap.Geolocation();
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              geolocation.getCurrentPosition(function (r) {
                if (this.getStatus() == window.BMAP_STATUS_SUCCESS) {
                  resolve(r.point);
                } else {
                  console.error('精确定位失败，状态码为：' + this.getStatus());
                  reject(this.getStatus());
                }
              });
            }));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getGeoLocation() {
    return _ref2.apply(this, arguments);
  };
}();

var getCityLocation =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var BMap;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return loadBdMap();

          case 2:
            BMap = _context3.sent;
            return _context3.abrupt("return", new Promise(function (resolve, reject) {
              var myCity = new BMap.LocalCity();
              myCity.get(function (r) {
                resolve(r.center);
              });
            }));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getCityLocation() {
    return _ref3.apply(this, arguments);
  };
}();

export { getPosition, getGeoLocation, getCityLocation };