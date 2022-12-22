"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorItem = void 0;
var _react = _interopRequireDefault(require("react"));
var _theming = require("@storybook/theming");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Card = require("../Card");
var _templateObject, _templateObject2, _templateObject3;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var Container = _theming.styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    padding: 1rem;\n"])));
var H3 = _theming.styled.h3(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    font-weight: 500;\n    margin-top: 1rem;\n"])));
var Li = _theming.styled.li(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    color: #ff4685;\n    font-style: italic;\n"])));
var ErrorItem = function ErrorItem(_ref) {
  var errors = _ref.errors,
    originalRequest = _ref.originalRequest,
    position = _ref.position;
  return /*#__PURE__*/_react["default"].createElement(_Card.Card, {
    showHeader: false
  }, /*#__PURE__*/_react["default"].createElement(Container, null, /*#__PURE__*/_react["default"].createElement("code", null, JSON.stringify(originalRequest, null, 2)), /*#__PURE__*/_react["default"].createElement(H3, null, "mockData[", position, "] has the following errors"), /*#__PURE__*/_react["default"].createElement("ul", null, errors.map(function (error, index) {
    return /*#__PURE__*/_react["default"].createElement(Li, {
      key: index
    }, error);
  }))));
};
exports.ErrorItem = ErrorItem;
ErrorItem.propTypes = {
  errors: _propTypes["default"].arrayOf(_propTypes["default"].string),
  originalRequest: _propTypes["default"].any,
  position: _propTypes["default"].number
};