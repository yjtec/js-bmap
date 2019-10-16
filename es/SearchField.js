function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

    _this.setMapCenterByCity = function (city) {
      _this.map.clearOverlays();

      _this.map.centerAndZoom(city, 16);
    };

    _this.handleClick = function (e) {
      _this.handleChange(e.point);

      _this.getLocaltionInfo(e.point);
    };

    _this.getLocaltionInfo = function (point) {
      var geoc = new BMap.Geocoder();
      var onChange = _this.props.onChange;
      geoc.getLocation(point, function (rs) {
        var addComp = rs.addressComponents;

        var value = _objectSpread({}, point, {}, addComp);

        onChange(value);
      });
    };

    _this.getRelationList = function (value) {
      console.log(value);
      var map = _this.map;
      var handleChange = _this.handleChange;
      var getLocaltionInfo = _this.getLocaltionInfo;

      function myFun() {
        var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果

        map.centerAndZoom(pp, 16);
        handleChange(pp);
        getLocaltionInfo(pp);
      }

      var local = new BMap.LocalSearch(map, {
        //智能搜索
        onSearchComplete: myFun
      });
      local.search(value);
      var localList = new BMap.LocalSearch(map);
      localList.search(value);

      if (_this.props.getres) {
        _this.props.getres(localList.sf);
      }
    };

    _this.keywordTips = function () {
      var inputid = _this.props.inputid;
      var getRelationList = _this.getRelationList;
      var ac = new BMap.Autocomplete( //建立一个自动完成的对象
      {
        "input": inputid,
        "location": _this.map
      });
      ac.addEventListener("onconfirm", function (e) {
        //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        var myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
        getRelationList(myValue); //选择搜索第一条信息
      });
    };

    _this.handleChange = function (point) {
      _this.map.clearOverlays();

      var marker = getMarker(point);

      _this.map.addOverlay(marker);
    };

    _this.setMapCenter = function (lng, lat) {
      var point = getPoint(lng, lat);

      _this.map.centerAndZoom(point, 16);
    };

    _this.setPoint = function (point) {
      _this.setMapCenter(point.lng, point.lat);

      _this.handleChange(point);
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
      loading: true,
      searchinput: false
    };
    return _this;
  }

  _createClass(MapField, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this$props, searchinput, id, _this$state, lng, lat, isMark, BMap, point, top_left_navigation;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props = this.props, searchinput = _this$props.searchinput, id = _this$props.id;
                _this$state = this.state, lng = _this$state.lng, lat = _this$state.lat;
                isMark = false;
                _context.next = 5;
                return loadBdMap();

              case 5:
                BMap = _context.sent;

                if (lng && lat) {
                  _context.next = 14;
                  break;
                }

                _context.next = 9;
                return getPosition();

              case 9:
                point = _context.sent;
                lng = point.lng;
                lat = point.lat;
                _context.next = 15;
                break;

              case 14:
                isMark = true;

              case 15:
                this.setState({
                  loading: false,
                  lng: lng,
                  lat: lat,
                  isMark: isMark,
                  searchinput: searchinput == undefined || searchinput == 'false' ? false : true
                });
                this.map = new BMap.Map(id);
                this.map.addEventListener('click', this.handleClick);
                this.setMapCenter(lng, lat);

                if (isMark) {
                  this.handleChange(getPoint(lng, lat));
                } //执行关键字提示


                if (this.state.searchinput) {
                  this.keywordTips();
                }

                if (this.props.control == 'true') {
                  top_left_navigation = new BMap.NavigationControl();
                  this.map.enableScrollWheelZoom();
                  this.map.addControl(top_left_navigation);
                }

              case 22:
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

      var _this$props2 = this.props,
          value = _this$props2.value,
          rest = _objectWithoutProperties(_this$props2, ["value"]);

      return React.createElement("div", rest, React.createElement("div", {
        style: {
          width: '100%',
          lineHeight: '50px',
          textAlign: 'center'
        }
      }, "\u52A0\u8F7D\u4E2D..."));
    }
  }]);

  return MapField;
}(PureComponent);

MapField.defaultProps = {
  onChange: function onChange() {},
  inputid: "mapSearchInput"
};
export default MapField;