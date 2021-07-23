/* eslint-disable no-restricted-globals */
import { newMockXhr } from 'mock-xmlhttprequest';
// import responseBuilder from './responseBuilder';
import { Request } from './request';
import { Response } from './response';

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
  
    this.requestMap = requests.reduce((map, request) => {
      const key = this.getKey(request.url, request.method);
      map[key] = {
        ...request,
        skip: false,
      };
      return map;
    }, {});
  };

  add = (request) => {
    const key = this.getKey(request.url, request.method);
    this.requestMap[key] = request;
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
    const request  = new Request(input, options);
    const { url, method } = request;
    const matched = this.matchMock(url, method);

    if (matched) {
      return new Promise(((resolve) => {
        resolve(new Response(url, matched.status || 200, matched.response));
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
      realXhr.open(method, url);

      realXhr.onreadystatechange = function onReadyStateChange() {
        if (realXhr.readyState === 4 && realXhr.status === 200) {
          xhr.respond(200, {}, this.responseText);
        }
      };
    
      realXhr.send();
  
      const errorHandler = function() {
        return 'Network failed';
      }
      
      realXhr.onerror = errorHandler;
      realXhr.ontimeout = errorHandler;
    }
  };

  restore = () => {
    this.requestMap = {};
  };
}

export default new Faker();
