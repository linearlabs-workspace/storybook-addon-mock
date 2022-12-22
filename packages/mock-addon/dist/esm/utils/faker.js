function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* eslint-disable no-restricted-globals */
import { newMockXhr } from 'mock-xmlhttprequest';
import { match } from 'path-to-regexp';
import { Request } from './request';
import { Response } from './response';
import { setRequestHeaders, getResponseHeaderMap, defaultResponseHeaders } from './headers';
import { arrayEquals } from './array';
import { getNormalizedUrl } from './url';
import { validate, schema } from './validator';
var global =
// eslint-disable-next-line no-undef
typeof globalThis !== 'undefined' && globalThis || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || {};
export var Faker = /*#__PURE__*/_createClass(function Faker() {
  var _this = this;
  _classCallCheck(this, Faker);
  _defineProperty(this, "getRequests", function () {
    return Object.values(_this.requestMap);
  });
  _defineProperty(this, "getKey", function () {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var searchParamKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
    return url && method ? [url].concat(_toConsumableArray(searchParamKeys), [method.toLowerCase()]).join('_') : '';
  });
  _defineProperty(this, "makeInitialRequestMap", function (requests) {
    if (!requests || !Array.isArray(requests)) {
      return;
    }
    _this.restore();
    requests.forEach(function (request) {
      _this.add(request);
    });
  });
  _defineProperty(this, "add", function (request) {
    var _getNormalizedUrl = getNormalizedUrl(request.url),
      path = _getNormalizedUrl.path,
      searchParamKeys = _getNormalizedUrl.searchParamKeys;
    var key = _this.getKey(path, searchParamKeys, request.method);
    var errors = validate(request, schema);
    if (errors && errors.length) {
      _this.requestMap[key] = {
        errors: errors,
        originalRequest: request
      };
      return;
    }
    _this.requestMap[key] = _objectSpread(_objectSpread({}, request), {}, {
      path: path,
      searchParamKeys: searchParamKeys,
      method: request.method || 'GET',
      status: request.status || 200,
      delay: request.delay || 0,
      skip: false,
      errors: []
    });
  });
  _defineProperty(this, "update", function (item, fieldKey, value) {
    var url = item.url,
      method = item.method;
    var _getNormalizedUrl2 = getNormalizedUrl(url),
      path = _getNormalizedUrl2.path,
      searchParamKeys = _getNormalizedUrl2.searchParamKeys;
    var itemKey = _this.getKey(path, searchParamKeys, method);
    if (
    // eslint-disable-next-line no-prototype-builtins
    _this.requestMap.hasOwnProperty(itemKey) &&
    // eslint-disable-next-line no-prototype-builtins
    _this.requestMap[itemKey].hasOwnProperty(fieldKey)) {
      _this.requestMap[itemKey][fieldKey] = value;
    }
  });
  _defineProperty(this, "matchMock", function (url) {
    var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
    var _getNormalizedUrl3 = getNormalizedUrl(url),
      path = _getNormalizedUrl3.path,
      searchParamKeys = _getNormalizedUrl3.searchParamKeys;
    for (var key in _this.requestMap) {
      var _this$requestMap$key = _this.requestMap[key],
        requestUrl = _this$requestMap$key.url,
        requestMethod = _this$requestMap$key.method;
      var _getNormalizedUrl4 = getNormalizedUrl(requestUrl),
        requestPath = _getNormalizedUrl4.path,
        requestSearchKeys = _getNormalizedUrl4.searchParamKeys;
      if (match(requestPath)(path) && method == requestMethod && arrayEquals(searchParamKeys, requestSearchKeys) && !_this.requestMap[key].skip) {
        return _this.requestMap[key];
      }
    }
    return null;
  });
  _defineProperty(this, "mockFetch", function (input, options) {
    var request = new Request(input, options);
    var url = request.url,
      method = request.method;
    var matched = _this.matchMock(url, method);
    if (matched) {
      var response = matched.response,
        status = matched.status,
        _matched$delay = matched.delay,
        delay = _matched$delay === void 0 ? 0 : _matched$delay;
      return new Promise(function (resolve) {
        setTimeout(function () {
          if (typeof response === 'function') {
            resolve(new Response(url, status, response(request)));
          } else {
            resolve(new Response(url, status, response));
          }
        }, +delay);
      });
    }
    // eslint-disable-next-line no-restricted-globals
    return global.realFetch(input, options);
  });
  _defineProperty(this, "mockXhrRequest", function (request) {
    var method = request.method,
      url = request.url,
      body = request.body;
    var matched = _this.matchMock(url, method);
    if (matched) {
      var response = matched.response,
        status = matched.status,
        _matched$delay2 = matched.delay,
        delay = _matched$delay2 === void 0 ? 0 : _matched$delay2;
      setTimeout(function () {
        if (typeof response === 'function') {
          var data = response(new Request(url, {
            method: method,
            body: body
          }));
          request.respond(+status, defaultResponseHeaders, JSON.stringify(data));
        } else {
          request.respond(+status, defaultResponseHeaders, JSON.stringify(response));
        }
      }, +delay);
    } else {
      // eslint-disable-next-line new-cap
      var realXhr = new global.realXMLHttpRequest();
      realXhr.open(method, url);
      setRequestHeaders(realXhr, new Map(Object.entries(request.requestHeaders.getHash())));
      realXhr.withCredentials = request.withCredentials;
      realXhr.onreadystatechange = function onReadyStateChange() {
        if (realXhr.readyState === 4 && realXhr.status === 200) {
          request.respond(200, getResponseHeaderMap(realXhr), realXhr.responseText);
        }
      };
      realXhr.send(body);
      var errorHandler = function errorHandler() {
        return 'Network failed';
      };
      realXhr.onerror = errorHandler;
      realXhr.ontimeout = errorHandler;
    }
  });
  _defineProperty(this, "restore", function () {
    _this.requestMap = {};
  });
  this.MockXhr = newMockXhr();
  this.MockXhr.onSend = this.mockXhrRequest;
  global.realFetch = global.fetch;
  global.realXMLHttpRequest = global.XMLHttpRequest;
  global.fetch = this.mockFetch;
  global.XMLHttpRequest = this.MockXhr;
  this.requestMap = {};
});
export default new Faker();