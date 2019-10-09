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

import React, { PureComponent } from 'react';
import { loadBdMap, getPoint, getMarker } from './AsyncLoadMap';
import { getPosition } from './Geo';

var MapField =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(MapField, _PureComponent);

  function MapField(props) {
    var _this;

    _classCallCheck(this, MapField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MapField).call(this, props));

    _this.handleClick = function (e) {
      _this.handleChange(e.point);
    };

    _this.handleChange = function (point) {
      _this.map.clearOverlays();

      var marker = getMarker(point);

      _this.map.addOverlay(marker);

      _this.props.onChange(point);
    };

    _this.setMapCenter = function (lng, lat) {
      var point = getPoint(lng, lat);

      _this.map.centerAndZoom(point, 16);
    };

    var _props$value = props.value,
        _props$value$lng = _props$value.lng,
        _lng = _props$value$lng === void 0 ? null : _props$value$lng,
        _props$value$lat = _props$value.lat,
        _lat = _props$value$lat === void 0 ? null : _props$value$lat;

    _this.state = {
      lat: null,
      lng: null,
      loading: true
    };
    return _this;
  }

  _createClass(MapField, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this$state, lng, lat, isMark, BMap, point;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$state = this.state, lng = _this$state.lng, lat = _this$state.lat;
                isMark = false;
                _context.next = 4;
                return loadBdMap();

              case 4:
                BMap = _context.sent;

                if (lng && lat) {
                  _context.next = 13;
                  break;
                }

                _context.next = 8;
                return getPosition();

              case 8:
                point = _context.sent;
                lng = point.lng;
                lat = point.lat;
                _context.next = 14;
                break;

              case 13:
                isMark = true;

              case 14:
                this.setState({
                  loading: false,
                  lng: lng,
                  lat: lat,
                  isMark: isMark
                });
                this.map = new BMap.Map('bmap');
                this.map.addEventListener('click', this.handleClick);
                this.setMapCenter(lng, lat);

                if (isMark) {
                  this.handleChange(getPoint(lng, lat));
                }

              case 19:
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
    key: "render",
    value: function render() {
      var loading = this.state.loading;

      var _this$props = this.props,
          value = _this$props.value,
          rest = _objectWithoutProperties(_this$props, ["value"]);

      return React.createElement("div", _extends({}, rest, {
        id: "bmap"
      }), React.createElement("div", null, "\u52A0\u8F7D\u4E2D"));
    }
  }]);

  return MapField;
}(PureComponent);

MapField.defaultProps = {
  onChange: function onChange() {}
};
export default MapField;