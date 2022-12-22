function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import statusTextMap from '../utils/statusMap';
var methods = ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'];
var statusCodes = Object.keys(statusTextMap);
var isObject = function isObject(value) {
  return value && !Array.isArray(value) && _typeof(value) === 'object';
};
export var schema = {
  url: function url(value) {
    return typeof value === 'string';
  },
  method: function method(value) {
    return typeof value === 'string' && methods.find(function (method) {
      return method.toLowerCase() === value.toLowerCase();
    });
  },
  status: function status(value) {
    return value && statusCodes.indexOf(value.toString()) >= 0;
  },
  response: function response(value) {
    return (isObject(value) || Array.isArray(value) || typeof value === 'function') && value !== null;
  },
  delay: function delay(value) {
    return value ? typeof value === 'number' : true;
  }
};
export function validate(object, schema) {
  if (!isObject(object)) {
    return ["item: ".concat(JSON.stringify(object), " is not a valid object.")];
  }
  var errors = Object.keys(schema).filter(function (key) {
    return !schema[key](object[key]);
  }).map(function (key) {
    return key + ": ".concat(JSON.stringify(object[key]), " is not valid.");
  });
  return errors;
}