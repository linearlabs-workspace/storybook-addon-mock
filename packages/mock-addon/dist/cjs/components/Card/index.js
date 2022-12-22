"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Card = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _theming = require("@storybook/theming");
var _ButtonToggle = require("../ButtonToggle");
var _templateObject, _templateObject2, _templateObject3;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var Container = _theming.styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    margin: 1rem;\n    border: 1px solid #ddd;\n    border-radius: 5px;\n    box-shadow: rgb(0 0 0 / 10%) 0px 1px 3px 0px;\n"])));
var Header = _theming.styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    display: flex;\n    justify-content: flex-end;\n    align-items: center;\n    padding: 0.5rem 1rem;\n"])));
var Content = _theming.styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    opacity: ", ";\n    pointer-events: ", ";\n    padding: 0 0.75rem;\n\n    > label:last-child {\n        padding: 1rem;\n        margin-bottom: 0;\n    }\n"])), function (props) {
  return props.enabled ? 1 : 0.5;
}, function (props) {
  return props.enabled ? 'inherit' : 'none';
});
var Card = function Card(_ref) {
  var children = _ref.children,
    onToggle = _ref.onToggle,
    _ref$enabled = _ref.enabled,
    enabled = _ref$enabled === void 0 ? true : _ref$enabled,
    _ref$showHeader = _ref.showHeader,
    showHeader = _ref$showHeader === void 0 ? true : _ref$showHeader;
  return /*#__PURE__*/_react["default"].createElement(Container, null, showHeader && /*#__PURE__*/_react["default"].createElement(Header, null, /*#__PURE__*/_react["default"].createElement(_ButtonToggle.ButtonToggle, {
    name: "Enabled",
    value: enabled,
    onChange: onToggle
  })), /*#__PURE__*/_react["default"].createElement(Content, {
    enabled: enabled
  }, children));
};
exports.Card = Card;
Card.propTypes = {
  children: _propTypes["default"].node.isRequired,
  onToggle: _propTypes["default"].func,
  enabled: _propTypes["default"].bool,
  showHeader: _propTypes["default"].bool
};
Card.defaultProps = {
  showHeader: true,
  enabled: true
};