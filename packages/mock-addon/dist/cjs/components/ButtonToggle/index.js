"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonToggle = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _polished = require("polished");
var _theming = require("@storybook/theming");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Label = _theming.styled.label(function (_ref) {
  var theme = _ref.theme;
  return {
    lineHeight: '14px',
    alignItems: 'center',
    display: 'inline-block',
    position: 'relative',
    whiteSpace: 'nowrap',
    background: "".concat((0, _polished.opacify)(0.05, theme.appBorderColor)),
    padding: 0,
    border: '1px solid #1ea7fd',
    borderRadius: '0.75em',
    input: {
      appearance: 'none',
      width: '100%',
      height: '100%',
      position: 'absolute',
      left: 0,
      top: 0,
      margin: 0,
      padding: 0,
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      '&:focus': {
        outline: 'none'
      }
    },
    span: {
      textAlign: 'center',
      fontSize: theme.typography.size.s1,
      fontWeight: theme.typography.weight.bold,
      lineHeight: '1',
      cursor: 'pointer',
      display: 'inline-block',
      padding: '10px 5px',
      transition: 'all 100ms ease-out',
      userSelect: 'none',
      width: '50%',
      color: (0, _polished.transparentize)(0.4, theme.color.defaultText),
      background: 'transparent',
      '&:hover': {
        boxShadow: "".concat((0, _polished.opacify)(0.3, theme.appBorderColor), " 0 0 0 1px inset")
      },
      '&:active': {
        boxShadow: "".concat((0, _polished.opacify)(0.05, theme.appBorderColor), " 0 0 0 2px inset"),
        color: (0, _polished.opacify)(1, theme.appBorderColor)
      },
      '&:first-of-type': {
        paddingRight: 8,
        borderTopLeftRadius: '0.75em',
        borderBottomLeftRadius: '0.75em'
      },
      '&:last-of-type': {
        paddingLeft: 8,
        borderTopRightRadius: '0.75em',
        borderBottomRightRadius: '0.75em'
      }
    },
    'input:checked ~ span:last-of-type, input:not(:checked) ~ span:first-of-type': {
      // boxShadow: `${opacify(0.1, theme.appBorderColor)} 0 0 2px`,
      padding: '10px 5px'
    },
    'input:checked ~ span:last-of-type': {
      background: '#1ea7fd',
      color: theme.color.light
    },
    'input:not(:checked) ~ span:first-of-type': {
      background: theme.background.bar,
      color: theme.color.defaultText
    }
  };
});
var ButtonToggle = function ButtonToggle(_ref2) {
  var name = _ref2.name,
    value = _ref2.value,
    _onChange = _ref2.onChange,
    onBlur = _ref2.onBlur,
    onFocus = _ref2.onFocus;
  return /*#__PURE__*/_react["default"].createElement(Label, {
    htmlFor: name,
    title: value.toString()
  }, /*#__PURE__*/_react["default"].createElement("input", {
    id: name,
    type: "checkbox",
    onChange: function onChange(e) {
      return _onChange(e.target.checked);
    },
    checked: value || false,
    name: name,
    onBlur: onBlur,
    onFocus: onFocus
  }), /*#__PURE__*/_react["default"].createElement("span", null, "Off"), /*#__PURE__*/_react["default"].createElement("span", null, "On"));
};
exports.ButtonToggle = ButtonToggle;
ButtonToggle.propTypes = {
  name: _propTypes["default"].string.isRequired,
  value: _propTypes["default"].bool.isRequired,
  onChange: _propTypes["default"].func,
  onBlur: _propTypes["default"].func,
  onFocus: _propTypes["default"].func
};