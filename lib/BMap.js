"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;

var _react = _interopRequireWildcard(require("react"));

var _AsyncLoadMap = require("./AsyncLoadMap");

var _Geo = require("./Geo");

var _local = require("./utils/local");

var _GeoContext = _interopRequireDefault(require("./GeoContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function create(data) {
  return function (Ele) {
    var defaultConfig = {};

    if (data) {
      defaultConfig = _objectSpread({}, defaultConfig, {}, data);
    }

    return (
      /*#__PURE__*/
      function (_Component) {
        _inherits(Routecs, _Component);

        function Routecs(props) {
          var _this;

          _classCallCheck(this, Routecs);

          _this = _possibleConstructorReturn(this, _getPrototypeOf(Routecs).call(this, props));
          var defaultState = {};
          var _defaultConfig = defaultConfig,
              position = _defaultConfig.position,
              cacheTime = _defaultConfig.cacheTime;

          if (position) {
            defaultState.isGeo = true;
          }

          _this.state = _objectSpread({
            loading: true
          }, defaultState);
          return _this;
        }

        _createClass(Routecs, [{
          key: "componentDidMount",
          value: function () {
            var _componentDidMount = _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee() {
              var _defaultConfig2, position, cacheTime, renderPosition, BMap, cachePoint, point, tmp, thunk, expiredAt;

              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _defaultConfig2 = defaultConfig, position = _defaultConfig2.position, cacheTime = _defaultConfig2.cacheTime, renderPosition = _defaultConfig2.renderPosition;
                      _context.next = 3;
                      return (0, _AsyncLoadMap.loadBdMap)();

                    case 3:
                      BMap = _context.sent;
                      this.setState({
                        loading: false,
                        BMap: BMap
                      });

                      if (!position) {
                        _context.next = 36;
                        break;
                      }

                      //需要定位
                      cachePoint = (0, _local.getCachePoint)();

                      if (!cachePoint) {
                        _context.next = 11;
                        break;
                      }

                      this.setState({
                        isGeo: false,
                        point: cachePoint
                      });
                      _context.next = 36;
                      break;

                    case 11:
                      point = {};

                      if (!renderPosition) {
                        _context.next = 30;
                        break;
                      }

                      //console.log(renderPosition);
                      thunk = renderPosition();

                      if (!(thunk instanceof Promise)) {
                        _context.next = 20;
                        break;
                      }

                      _context.next = 17;
                      return thunk;

                    case 17:
                      tmp = _context.sent;
                      _context.next = 21;
                      break;

                    case 20:
                      tmp = thunk;

                    case 21:
                      if (!tmp) {
                        _context.next = 25;
                        break;
                      }

                      point = tmp;
                      _context.next = 28;
                      break;

                    case 25:
                      _context.next = 27;
                      return (0, _Geo.getPosition)();

                    case 27:
                      point = _context.sent;

                    case 28:
                      _context.next = 33;
                      break;

                    case 30:
                      _context.next = 32;
                      return (0, _Geo.getPosition)();

                    case 32:
                      point = _context.sent;

                    case 33:
                      expiredAt = cacheTime ? cacheTime : 10;
                      (0, _local.setCachePoint)(point, expiredAt);
                      this.setState({
                        isGeo: false,
                        point: point
                      });

                    case 36:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));

            function componentDidMount() {
              return _componentDidMount.apply(this, arguments);
            }

            return componentDidMount;
          }()
        }, {
          key: "renderLoadPos",
          value: function renderLoadPos() {
            var _defaultConfig3 = defaultConfig,
                renderPosLoading = _defaultConfig3.renderPosLoading;

            if (renderPosLoading) {
              return renderPosLoading;
            }

            return _react.default.createElement("div", null, "\u5B9A\u4F4D\u4E2D\u2026\u2026");
          }
        }, {
          key: "renderLoad",
          value: function renderLoad() {
            var _defaultConfig4 = defaultConfig,
                renderLoading = _defaultConfig4.renderLoading;

            if (renderLoading) {
              return renderLoading;
            }

            return _react.default.createElement("div", null, "\u52A0\u8F7D\u4E2D\u2026\u2026");
          }
        }, {
          key: "render",
          value: function render() {
            var _this$state = this.state,
                loading = _this$state.loading,
                rest = _objectWithoutProperties(_this$state, ["loading"]);

            var isGeo = rest.isGeo;
            var _defaultConfig5 = defaultConfig,
                position = _defaultConfig5.position;

            if (position && isGeo) {
              return this.renderLoadPos();
            }

            if (loading) {
              return this.renderLoad();
            }

            var ReturnEle = '';

            if (typeof Ele === 'function') {
              ReturnEle = _react.default.createElement(Ele, _extends({}, this.props, rest));
            } else if (_typeof(Ele) === 'object') {
              ReturnEle = _react.default.cloneElement(Ele, _objectSpread({}, this.props, {}, rest));
            }

            return _react.default.createElement(_GeoContext.default.Provider, {
              value: rest
            }, ReturnEle);
          }
        }]);

        return Routecs;
      }(_react.Component)
    );
  };
}