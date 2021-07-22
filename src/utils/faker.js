/* eslint-disable no-restricted-globals */
import { newMockXhr } from 'mock-xmlhttprequest';
import responseBuilder from './responseBuilder';

let global =
  // eslint-disable-next-line no-undef
  (typeof globalThis !== 'undefined' && globalThis) ||
  (typeof self !== 'undefined' && self) ||
  (typeof global !== 'undefined' && global) ||
  {};

class Faker {
  constructor() {
    this.MockXhr = newMockXhr();
    this.MockXhr.onSend = this.mockXhrRequest;
    
    global.realFetch = global.fetch;
    global.realXMLHttpRequest = global.XMLHttpRequest;
    
    global.fetch = this.mockFetch;
    global.XMLHttpRequest = this.MockXhr;
    
    this.requestMap = {};
  }

  getRequests = () => Object.values(this.requestMap);

  getKey = (url, method) => [url, method.toLowerCase()].join('_');

  makeInitialRequestMap = (requests) => {
    if (!requests || !Array.isArray(requests)) {
      this.requestMap = {};
      return;
    }
    this.requestMap = requests.reduce((acc, cur) => {
      const key = this.getKey(cur.url, cur.method);
      acc[key] = {
        ...cur,
        skip: false,
      };
      return acc;
    }, {});
  };

  add = (api) => {
    const key = this.getKey(api.url, api.method);
    this.requestMap[key] = api;
  };

  setSkip = (url, method) => {
    const key = this.getKey(url, method);
    this.requestMap[key].skip = !this.requestMap[key].skip;
  };

  matchMock = (url, method = "GET") => {
    const key = this.getKey(url, method);
    // eslint-disable-next-line no-prototype-builtins
    if (this.requestMap.hasOwnProperty(key) && !this.requestMap[key].skip) {
      return this.requestMap[key];
    }
    return null;
  };

  mockFetch = (input, options) => {
    let method, url;
    if (typeof input === 'object') {
      method = options.method || input.method || 'GET';
      url = input.url;
    } else {
      method = options.method || 'GET';
      url = input;
    }
    const matched = this.matchMock(url, method);

    if (matched) {
      return new Promise(((resolve) => {
        const response = responseBuilder(
          url,
          matched.status || 200,
          matched.response,
        );
        resolve(response);
      }));
    }
    // eslint-disable-next-line no-restricted-globals
    return global.realFetch(input, options);
  };

  mockXhrRequest = (xhr) => {
    const { method, url } = xhr;
    const matched = this.matchMock(url, method);
    if (matched) {
      xhr.respond(matched.status || 200, {}, matched.response);
    } else {
      // eslint-disable-next-line new-cap
      const realXhr = new global.realXMLHttpRequest();
      realXhr.onreadystatechange = function onReadyStateChange() {
        if (realXhr.readyState === 4 && realXhr.status === 200) {
          xhr.respond(200, {}, this.responseText);
        }
      };
      realXhr.open(method, url);
      realXhr.send();
      realXhr.onerror = function onError() {
        return 'Request failed';
      };
    }
  };

  restore = () => {
    this.requestMap = {};
  };
}

export default new Faker();
