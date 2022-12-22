function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import { getBaseUrl } from './url';
export function Request(input) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (_typeof(input) === 'object') {
    this.method = options.method || input.method || 'GET';
    this.url = input.url;
    this.body = options.body || input.body || null;
  } else {
    this.method = options.method || 'GET';
    this.url = input;
    this.body = options.body || null;
  }
  var _url = getBaseUrl(this.url);
  if (_url.search) {
    this.searchParams = Object.fromEntries(new URLSearchParams(_url.search));
  }
}