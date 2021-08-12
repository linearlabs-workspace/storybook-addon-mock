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

export class Faker {
    constructor() {
        this.MockXhr = newMockXhr();
        this.MockXhr.onSend = this.mockXhrRequest;

        global.realFetch = global.fetch;
        global.realXMLHttpRequest = global.XMLHttpRequest;

        global.fetch = this.mockFetch;
        global.XMLHttpRequest = this.MockXhr;

        this.requestMap = {};
    }

    getNormalizedUrl = (url) => {
        const normalizedUrl = new URL(url);
        normalizedUrl.port = '';
        return normalizedUrl.toString().replace(/(^\w+:|^)\/\//, '');
    };

    getRequests = () => Object.values(this.requestMap);

    getKey = (url = '', method = '') =>
        url && method ? [url, method.toLowerCase()].join('_') : '';

    makeInitialRequestMap = (requests) => {
        if (!requests || !Array.isArray(requests)) {
            return;
        }

        requests.forEach((request) => {
            this.add(request);
        });
    };

    add = (request) => {
        const normalizedUrl = this.getNormalizedUrl(request.url);
        const key = this.getKey(normalizedUrl, request.method);
        this.requestMap[key] = {
            ...request,
            method: request.method || 'GET',
            status: request.status || 200,
            skip: false,
        };
    };

    update = (item, fieldKey, value) => {
        const { url, method } = item;
        const normalizedUrl = this.getNormalizedUrl(url);
        const itemKey = this.getKey(normalizedUrl, method);

        if (
            // eslint-disable-next-line no-prototype-builtins
            this.requestMap.hasOwnProperty(itemKey) &&
            // eslint-disable-next-line no-prototype-builtins
            this.requestMap[itemKey].hasOwnProperty(fieldKey)
        ) {
            this.requestMap[itemKey][fieldKey] = value;
        }
    };

    matchMock = (url, method = 'GET') => {
        const normalizedUrl = this.getNormalizedUrl(url);

        for (let key in this.requestMap) {
            const { url: requestUrl, method: requestMethod } =
                this.requestMap[key];
            const normalizedRequestUrl =
                this.getNormalizedUrl(requestUrl);
            if (
                match(normalizedRequestUrl)(normalizedUrl) &&
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
                resolve(new Response(url, matched.status, matched.response));
            });
        }
        // eslint-disable-next-line no-restricted-globals
        return global.realFetch(input, options);
    };

    mockXhrRequest = (xhr) => {
        const { method, url } = xhr;
        const matched = this.matchMock(url, method);
        if (matched) {
            xhr.respond(+matched.status, {}, matched.response);
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
