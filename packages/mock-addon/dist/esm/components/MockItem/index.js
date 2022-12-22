var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { ObjectControl, RangeControl } from '@storybook/blocks';
import { Form, Placeholder, TabsState } from '@storybook/components';
import { Card } from '../Card';
import statusTextMap from '../../utils/statusMap';
var statusCodes = Object.keys(statusTextMap);
var SBField = Form.Field,
  Select = Form.Select;
var ObjectContent = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    display: flex;\n    flex: 1 0 0;\n    padding: 1rem;\n\n    > div {\n        flex: 1 0 0;\n    }\n"])));
var Method = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    padding: 0.75rem;\n    font-weight: 700;\n    border-right: 1px solid #ddd;\n"])));
var Url = styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    padding: 0.75rem;\n    flex: 1;\n"])));
var UrlMethodContainer = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n    display: flex;\n    align-items: center;\n    border: 1px solid #ddd;\n    background: #eee;\n    border-radius: 5px;\n"])));
var StatusDelayContainer = styled.div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n    display: flex;\n    align-items: center;\n    flex: 1 0 0;\n\n    > label:last-child {\n        margin-bottom: 0;\n    }\n"])));
var Field = styled(SBField)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n    border: none;\n    padding: 1rem 0 0.25rem 0;\n    flex: 0.5;\n    margin: 0;\n\n    > span {\n        min-width: 0;\n    }\n"])));
export var MockItem = function MockItem(_ref) {
  var id = _ref.id,
    url = _ref.url,
    method = _ref.method,
    status = _ref.status,
    skip = _ref.skip,
    response = _ref.response,
    delay = _ref.delay,
    _onChange = _ref.onChange;
  return /*#__PURE__*/React.createElement(Card, {
    onToggle: function onToggle(value) {
      return _onChange('skip', !value);
    },
    enabled: !skip
  }, /*#__PURE__*/React.createElement(UrlMethodContainer, null, /*#__PURE__*/React.createElement(Method, null, method), /*#__PURE__*/React.createElement(Url, null, url)), /*#__PURE__*/React.createElement(StatusDelayContainer, null, /*#__PURE__*/React.createElement(Field, {
    label: "Status"
  }, /*#__PURE__*/React.createElement(Select, {
    onChange: function onChange(event) {
      return _onChange('status', event.target.value);
    },
    value: status,
    name: "status"
  }, statusCodes.map(function (code) {
    return /*#__PURE__*/React.createElement("option", {
      key: code,
      value: code
    }, code, " - ", statusTextMap[code]);
  }))), /*#__PURE__*/React.createElement(Field, {
    label: "Delay"
  }, /*#__PURE__*/React.createElement(RangeControl, {
    name: "delay",
    value: delay,
    onChange: function onChange(value) {
      return _onChange('delay', value);
    },
    min: 0,
    max: 10000,
    step: 500
  }))), /*#__PURE__*/React.createElement(TabsState, {
    initial: "response".concat(id)
  }, /*#__PURE__*/React.createElement("div", {
    id: "response".concat(id),
    title: "Response"
  }, typeof response === 'function' ? /*#__PURE__*/React.createElement(Placeholder, null, "This is a custom function. You can only change it from the declaration.") : /*#__PURE__*/React.createElement(ObjectContent, null, /*#__PURE__*/React.createElement(ObjectControl, {
    name: "",
    value: response,
    onChange: function onChange(value) {
      return _onChange('response', value);
    }
  })))));
};
MockItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  url: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  status: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  skip: PropTypes.bool.isRequired,
  response: PropTypes.any,
  delay: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};