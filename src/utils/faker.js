/* eslint-disable no-restricted-globals */
import { newMockXhr } from 'mock-xmlhttprequest';
import responseBuilder from './responseBuilder';
import xhrHeaderMapper from './xhrHeaderMapper';

class Faker {
  constructor() {
    this.MockXhr = newMockXhr();
    this.MockXhr.onSend = this.mockXhrRequest;
    self.realFetch = self.fetch;
    self.realXMLHttpRequest = self.XMLHttpRequest;
    self.fetch = this.mockFetch;
    self.XMLHttpRequest = this.MockXhr;
    this.apiList = {};
  }

  getApis = () => Object.values(this.apiList);

  getKey = (url, method) => [url, method.toLowerCase()].join('_');

  makeInitialApis = (apis) => {
    if (!apis || !Array.isArray(apis)) {
      this.apiList = {};
      return;
    }
    this.apiList = apis.reduce((acc, cur) => {
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
    this.apiList[key] = api;
  };

  setSkip = (url, method) => {
    const key = this.getKey(url, method);
    this.apiList[key].skip = !this.apiList[key].skip;
  };

  matchMock = (url, method = "GET") => {
    const key = this.getKey(url, method);
    if (this.apiList[key] && !this.apiList[key].skip) {
      return this.apiList[key];
    }
    return null;
  };

  mockFetch = (url, options) => {
    const { method } = options || {};
    const matched = this.matchMock(url, method);

    if (matched) {
      return new Promise(((resolve) => {
        const response = responseBuilder(
          url,
          matched.status || 200,
          matched.response,
          matched.headers || {}
        );
        resolve(response);
      }));
    }
    // eslint-disable-next-line no-restricted-globals
    return self.realFetch(url, options);
  };

  mockXhrRequest = (xhr) => {
    const { method, url } = xhr;
    const matched = this.matchMock(url, method);
    if (matched) {
      xhr.respond(
        matched.status || 200,
        matched.headers || {},
        matched.response
      );
    } else {
      // eslint-disable-next-line new-cap
      const realXhr = new self.realXMLHttpRequest();
      realXhr.onreadystatechange = function onReadyStateChange() {
        if (realXhr.readyState === 4 && realXhr.status === 200) {
          xhr.respond(200, xhrHeaderMapper(realXhr), this.responseText);
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
    this.apiList = {};
  };
}

export default new Faker();
