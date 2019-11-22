function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
import style from './style.less';

var MapField =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(MapField, _PureComponent);

  function MapField(props) {
    var _this;

    _classCallCheck(this, MapField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MapField).call(this, props));

    _this.getDefault = function () {
      if (_this.props.value && _this.props.value.lng) {
        return _this.props.value;
      }

      if (_this.state.lng) {
        var _this$state = _this.state,
            loading = _this$state.loading,
            stateValue = _objectWithoutProperties(_this$state, ["loading"]);

        return stateValue;
      }

      return {
        lng: null,
        lat: null
      };
    };

    _this.setMapCenterByCity = function (city) {
      _this.map.clearOverlays();

      _this.map.centerAndZoom(city, 16);
    };

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

    var _lng = null;
    var _lat = null;

    if (props.value && props.value.lng && props.value.lat) {
      _lng = props.value.lng;
      _lat = props.value.lat;
    }

    _this.state = {
      lat: _lat,
      lng: _lng,
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
        var BMap, map, _this$getDefault, lng, lat, isMark, point;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return loadBdMap();

              case 2:
                BMap = _context.sent;
                map = new BMap.Map('bmap');
                this.map = map;
                /*兼容手机点击事件*/

                map.addEventListener("touchmove", function (e) {
                  map.enableDragging();
                }); // TODO: 触摸结束时触发次此事件  此时开启禁止拖动

                map.addEventListener("touchend", function (e) {
                  map.disableDragging();
                });
                map.disableDragging();
                map.enableScrollWheelZoom(true);
                /*监听事件结束*/

                map.addEventListener('click', this.handleClick);
                _this$getDefault = this.getDefault(), lng = _this$getDefault.lng, lat = _this$getDefault.lat;
                isMark = false;

                if (lng && lat) {
                  _context.next = 22;
                  break;
                }

                this.setState({
                  isGeo: true
                });
                _context.next = 16;
                return getPosition();

              case 16:
                point = _context.sent;
                lng = point.lng;
                lat = point.lat;
                this.setState({
                  isGeo: false
                });
                _context.next = 23;
                break;

              case 22:
                isMark = true;

              case 23:
                this.setState({
                  loading: false,
                  lng: lng,
                  lat: lat,
                  isMark: isMark
                });
                this.setMapCenter(lng, lat);
                this.handleChange(getPoint(lng, lat)); // if(!isMark){
                //   this.handleChange(getPoint(lng,lat));
                // }else{
                // }

              case 26:
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
      var _this$state2 = this.state,
          loading = _this$state2.loading,
          isGeo = _this$state2.isGeo;

      var _this$props = this.props,
          value = _this$props.value,
          rest = _objectWithoutProperties(_this$props, ["value"]);

      return React.createElement("div", _extends({}, rest, {
        id: "bmap"
      }), isGeo !== undefined && isGeo && React.createElement("div", null, "\u5B9A\u4F4D\u4E2D..."));
    }
  }]);

  return MapField;
}(PureComponent);

MapField.defaultProps = {
  onChange: function onChange() {}
};
export default MapField;