function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { loadBdMap } from './AsyncLoadMap';

var Convertor =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var lng, lat, BMap, convertor, point;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            lng = _ref.lng, lat = _ref.lat;
            _context.next = 3;
            return loadBdMap();

          case 3:
            BMap = _context.sent;
            convertor = new BMap.Convertor();
            point = new BMap.Point(lng, lat);
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              convertor.translate([point], 1, 5, function (re) {
                if (re.status === 0) {
                  resolve(re.points[0]);
                } else {
                  reject(re);
                }
              });
            }));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function Convertor(_x) {
    return _ref2.apply(this, arguments);
  };
}();

export { Convertor };