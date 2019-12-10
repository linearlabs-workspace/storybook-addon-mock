import responseBuilder from './responseBuilder';
import { newMockXhr } from 'mock-xmlhttprequest';

class Faker {
  constructor(list) {
    this.MockXhr = newMockXhr();
    this.MockXhr.onSend = this.mockXhrRequest;
    self.realFetch = self.fetch;
    self.realXMLHttpRequest = self.XMLHttpRequest;

    self.fetch = this.mockFetch;
    self.XMLHttpRequest = this.MockXhr;
    this.apiList = list || {};
  }

  getKey = (url, method) => `${url}_${method.toLowerCase()}`;

  getApis = () => Object.values(this.apiList);

  makeInitialApis = apis => {
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

  add = api => {
    const key = this.getKey(api.url, api.method);
    this.apiList[key] = api;
  };

  setSkip = (url, method) => {
    const key = this.getKey(url, method);
    this.apiList[key].skip = !this.apiList[key].skip;
  };

  matchMock = (url, method) => {
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
      return new Promise(function(resolve) {
        const response = responseBuilder(
          url,
          matched.status || 200,
          matched.response
        );
        resolve(response);
      });
    }
    return self.realFetch(url, options);
  };

  mockXhrRequest = xhr => {
    const { method, url } = xhr;
    const matched = this.matchMock(url, method);
    if (matched) {
      xhr.respond(matched.status || 200, {}, matched.response);
    } else {
      let realXhr = new self.realXMLHttpRequest();
      realXhr.onreadystatechange = function() {
        if (realXhr.readyState == 4 && realXhr.status == 200) {
          xhr.respond(200, {}, this.responseText);
        }
      };
      realXhr.open(method, url);
      realXhr.send();
      realXhr.onerror = function() {
        return 'Request failed';
      };
    }
  };

  restore = () => {
    this.apiList = {};
  };
}

export default Faker;
