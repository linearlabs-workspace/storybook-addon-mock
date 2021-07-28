/* eslint-disable no-restricted-globals */
import { newMockXhr } from 'mock-xmlhttprequest';
import { match } from 'path-to-regexp';
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

    extractProtocolFromUrl = (url) => url.replace(/(^\w+:|^)\/\//, '');

    getRequests = () => Object.values(this.requestMap);

    getKey = (url, method) => [url, method.toLowerCase()].join('_');

    makeInitialRequestMap = (requests) => {
        if (!requests || !Array.isArray(requests)) {
            this.requestMap = {};
            return;
        }

        this.requestMap = requests.reduce((map, request) => {
            const normalizedUrl = this.extractProtocolFromUrl(request.url);
            const key = this.getKey(normalizedUrl, request.method);
            map[key] = {
                ...request,
                url: normalizedUrl,
                skip: false,
            };
            return map;
        }, {});
    };

    add = (request) => {
        const normalizedUrl = this.extractProtocolFromUrl(request.url);
        const key = this.getKey(normalizedUrl, request.method);
        this.requestMap[key] = request;
    };

    update = (item, fieldKey, value) => {
        const { url, method } = item;
        const normalizedUrl = this.extractProtocolFromUrl(url);
        const itemKey = this.getKey(normalizedUrl, method);
        this.requestMap[itemKey][fieldKey] = value;
    };

    matchMock = (url, method = 'GET') => {
        const normalizedUrl = this.extractProtocolFromUrl(url);

        for (let key in this.requestMap) {
            const { url: requestUrl, method: requestMethod } =
                this.requestMap[key];
            if (
                match(requestUrl)(normalizedUrl) &&
                method == requestMethod &&
                !this.requestMap[key].skip
            ) {
                return this.requestMap[key];
            }
        }

        return null;
    };

    mockFetch = (input, options) => {
        const request = new Request(input, options);
        const { url, method } = request;
        const matched = this.matchMock(url, method);

        if (matched) {
            return new Promise((resolve) => {
                resolve(
                    new Response(url, matched.status || 200, matched.response)
                );
            });
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

            const errorHandler = function () {
                return 'Network failed';
            };

            realXhr.onerror = errorHandler;
            realXhr.ontimeout = errorHandler;
        }
    };

    restore = () => {
        this.requestMap = {};
    };
}

export default new Faker();
