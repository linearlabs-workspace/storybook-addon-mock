"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MockItem = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _theming = require("@storybook/theming");
var _blocks = require("@storybook/blocks");
var _components = require("@storybook/components");
var _Card = require("../Card");
var _statusMap = _interopRequireDefault(require("../../utils/statusMap"));
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var statusCodes = Object.keys(_statusMap["default"]);
var SBField = _components.Form.Field,
  Select = _components.Form.Select;
var ObjectContent = _theming.styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    display: flex;\n    flex: 1 0 0;\n    padding: 1rem;\n\n    > div {\n        flex: 1 0 0;\n    }\n"])));
var Method = _theming.styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    padding: 0.75rem;\n    font-weight: 700;\n    border-right: 1px solid #ddd;\n"])));
var Url = _theming.styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    padding: 0.75rem;\n    flex: 1;\n"])));
var UrlMethodContainer = _theming.styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n    display: flex;\n    align-items: center;\n    border: 1px solid #ddd;\n    background: #eee;\n    border-radius: 5px;\n"])));
var StatusDelayContainer = _theming.styled.div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n    display: flex;\n    align-items: center;\n    flex: 1 0 0;\n\n    > label:last-child {\n        margin-bottom: 0;\n    }\n"])));
var Field = (0, _theming.styled)(SBField)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n    border: none;\n    padding: 1rem 0 0.25rem 0;\n    flex: 0.5;\n    margin: 0;\n\n    > span {\n        min-width: 0;\n    }\n"])));
var MockItem = function MockItem(_ref) {
  var id = _ref.id,
    url = _ref.url,
    method = _ref.method,
    status = _ref.status,
    skip = _ref.skip,
    response = _ref.response,
    delay = _ref.delay,
    _onChange = _ref.onChange;
  return /*#__PURE__*/_react["default"].createElement(_Card.Card, {
    onToggle: function onToggle(value) {
      return _onChange('skip', !value);
    },
    enabled: !skip
  }, /*#__PURE__*/_react["default"].createElement(UrlMethodContainer, null, /*#__PURE__*/_react["default"].createElement(Method, null, method), /*#__PURE__*/_react["default"].createElement(Url, null, url)), /*#__PURE__*/_react["default"].createElement(StatusDelayContainer, null, /*#__PURE__*/_react["default"].createElement(Field, {
    label: "Status"
  }, /*#__PURE__*/_react["default"].createElement(Select, {
    onChange: function onChange(event) {
      return _onChange('status', event.target.value);
    },
    value: status,
    name: "status"
  }, statusCodes.map(function (code) {
    return /*#__PURE__*/_react["default"].createElement("option", {
      key: code,
      value: code
    }, code, " - ", _statusMap["default"][code]);
  }))), /*#__PURE__*/_react["default"].createElement(Field, {
    label: "Delay"
  }, /*#__PURE__*/_react["default"].createElement(_blocks.RangeControl, {
    name: "delay",
    value: delay,
    onChange: function onChange(value) {
      return _onChange('delay', value);
    },
    min: 0,
    max: 10000,
    step: 500
  }))), /*#__PURE__*/_react["default"].createElement(_components.TabsState, {
    initial: "response".concat(id)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    id: "response".concat(id),
    title: "Response"
  }, typeof response === 'function' ? /*#__PURE__*/_react["default"].createElement(_components.Placeholder, null, "This is a custom function. You can only change it from the declaration.") : /*#__PURE__*/_react["default"].createElement(ObjectContent, null, /*#__PURE__*/_react["default"].createElement(_blocks.ObjectControl, {
    name: "",
    value: response,
    onChange: function onChange(value) {
      return _onChange('response', value);
    }
  })))));
};
exports.MockItem = MockItem;
MockItem.propTypes = {
  id: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]).isRequired,
  url: _propTypes["default"].string.isRequired,
  method: _propTypes["default"].string.isRequired,
  status: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]).isRequired,
  skip: _propTypes["default"].bool.isRequired,
  response: _propTypes["default"].any,
  delay: _propTypes["default"].number.isRequired,
  onChange: _propTypes["default"].func.isRequired
};