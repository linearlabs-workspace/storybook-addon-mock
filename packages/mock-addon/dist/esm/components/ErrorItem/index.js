var _templateObject, _templateObject2, _templateObject3;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
import React from 'react';
import { styled } from '@storybook/theming';
import PropTypes from 'prop-types';
import { Card } from '../Card';
var Container = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    padding: 1rem;\n"])));
var H3 = styled.h3(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    font-weight: 500;\n    margin-top: 1rem;\n"])));
var Li = styled.li(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    color: #ff4685;\n    font-style: italic;\n"])));
export var ErrorItem = function ErrorItem(_ref) {
  var errors = _ref.errors,
    originalRequest = _ref.originalRequest,
    position = _ref.position;
  return /*#__PURE__*/React.createElement(Card, {
    showHeader: false
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("code", null, JSON.stringify(originalRequest, null, 2)), /*#__PURE__*/React.createElement(H3, null, "mockData[", position, "] has the following errors"), /*#__PURE__*/React.createElement("ul", null, errors.map(function (error, index) {
    return /*#__PURE__*/React.createElement(Li, {
      key: index
    }, error);
  }))));
};
ErrorItem.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
  originalRequest: PropTypes.any,
  position: PropTypes.number
};