"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Panel = void 0;
var _react = _interopRequireDefault(require("react"));
var _api = require("@storybook/api");
var _components = require("@storybook/components");
var _constants = require("./utils/constants");
var _MockItem = require("./components/MockItem");
var _ErrorItem = require("./components/ErrorItem");
var _excluded = ["searchParamKeys", "path"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var Panel = function Panel(props) {
  var _useAddonState = (0, _api.useAddonState)(_constants.ADDON_ID, []),
    _useAddonState2 = _slicedToArray(_useAddonState, 2),
    mockData = _useAddonState2[0],
    setState = _useAddonState2[1];
  var emit = (0, _api.useChannel)(_defineProperty({}, _constants.EVENTS.SEND, function (newMockData) {
    setState(newMockData);
  }));
  var _onChange = function onChange(item, key, value) {
    emit(_constants.EVENTS.UPDATE, {
      item: item,
      key: key,
      value: value
    });
  };
  if (!mockData || mockData.length === 0) {
    return /*#__PURE__*/_react["default"].createElement(_components.AddonPanel, props, /*#__PURE__*/_react["default"].createElement(_components.Placeholder, null, "No mock data found."));
  }
  return /*#__PURE__*/_react["default"].createElement(_components.AddonPanel, props, /*#__PURE__*/_react["default"].createElement(_components.ScrollArea, null, mockData.map(function (item, index) {
    var errors = item.errors,
      originalRequest = item.originalRequest;
    if (errors && errors.length) {
      return /*#__PURE__*/_react["default"].createElement(_ErrorItem.ErrorItem, {
        key: index,
        errors: errors,
        originalRequest: originalRequest,
        position: index
      });
    }
    // eslint-disable-next-line no-unused-vars
    var searchParamKeys = item.searchParamKeys,
      path = item.path,
      rest = _objectWithoutProperties(item, _excluded);
    return /*#__PURE__*/_react["default"].createElement(_MockItem.MockItem, _extends({
      id: index,
      key: index,
      onChange: function onChange(key, value) {
        return _onChange(item, key, value);
      }
    }, rest));
  })));
};
exports.Panel = Panel;