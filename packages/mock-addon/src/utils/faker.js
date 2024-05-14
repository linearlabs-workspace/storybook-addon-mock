/* eslint-disable no-restricted-globals */
import { newMockXhr } from 'mock-xmlhttprequest';
import { match } from 'path-to-regexp';
import { Request } from './request';
import { CustomResponse } from './response';
import {
    setRequestHeaders,
    getResponseHeaderMap,
    defaultResponseHeaders,
} from './headers';
import { arrayEquals } from './array';
import { getNormalizedUrl } from './url';
import { validate, schema } from './validator';

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
        this.ignoreQueryParams = false;
    }

    getRequests = () => Object.values(this.requestMap);

    getKey = (url = '', searchParamKeys = [], method = 'GET') =>
        url && method
            ? [url, ...searchParamKeys, method.toLowerCase()].join('_')
            : '';

    makeInitialRequestMap = (requests) => {
        if (!requests || !Array.isArray(requests)) {
            return;
        }

        this.restore();
        requests.forEach((request) => {
            this.add(request);
        });
    };

    setIgnoreQueryParams = (value) => {
        this.ignoreQueryParams = value;
    };

    add = (request) => {
        const { path, searchParamKeys } = getNormalizedUrl(request.url);
        const key = this.getKey(path, searchParamKeys, request.method);
        const errors = validate(request, schema);

        if (errors && errors.length) {
            this.requestMap[key] = {
                errors,
                originalRequest: request,
            };
            return;
        }

        this.requestMap[key] = {
            ...request,
            path,
            searchParamKeys,
            method: request.method || 'GET',
            status: request.status || 200,
            delay: request.delay || 0,
            skip: false,
            errors: [],
        };
    };

    update = (item, fieldKey, value) => {
        const { url, method } = item;
        const { path, searchParamKeys } = getNormalizedUrl(url);
        const itemKey = this.getKey(path, searchParamKeys, method);

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
        const { path, searchParamKeys } = getNormalizedUrl(url);

        for (let key in this.requestMap) {
            const { url: requestUrl, method: requestMethod } =
                this.requestMap[key];
            const { path: requestPath, searchParamKeys: requestSearchKeys } =
                getNormalizedUrl(requestUrl);
            if (
                match(requestPath)(path) &&
                method.toUpperCase() == requestMethod.toUpperCase() &&
                this.matchQueryParams(searchParamKeys, requestSearchKeys) &&
                !this.requestMap[key].skip
            ) {
                return this.requestMap[key];
            }
        }

        return null;
    };

    matchQueryParams = (searchParams, requestSearchParams) => {
        return (
            this.ignoreQueryParams ||
            arrayEquals(searchParams, requestSearchParams)
        );
    };

    mockFetch = (input, options) => {
        const request = new Request(input, options);
        const { url, method } = request;
        const matched = this.matchMock(url, method);

        if (!matched) {
            // eslint-disable-next-line no-restricted-globals
            return global.realFetch(input, options);
        }

        const { response, status, delay = 0 } = matched;

        let mockResponseSent = false;

        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                if (typeof response === 'function') {
                    resolve(CustomResponse(url, status, response(request)));
                } else {
                    resolve(CustomResponse(url, status, response));
                }

                mockResponseSent = true;
            }, +delay);

            request.signal?.addEventListener('abort', () => {
                if (mockResponseSent) {
                    return;
                }

                timeoutId && clearTimeout(timeoutId);

                const error = new Error(request.signal.reason);

                error.name = 'AbortError';

                reject(error);
            });
        });
    };

    mockXhrRequest = (request) => {
        const { method, url, body } = request;
        const matched = this.matchMock(url, method);
        if (matched) {
            const { response, status, delay = 0 } = matched;
            setTimeout(() => {
                if (typeof response === 'function') {
                    const data = response(new Request(url, { method, body }));
                    request.respond(
                        +status,
                        defaultResponseHeaders,
                        JSON.stringify(data)
                    );
                } else {
                    request.respond(
                        +status,
                        defaultResponseHeaders,
                        JSON.stringify(response)
                    );
                }
            }, +delay);
        } else {
            const RealXMLHTTPRequest = global.realXMLHttpRequest;
            const realXhr = new RealXMLHTTPRequest();
            const fakeXhr = request._responseReceiver;

            realXhr.open(method, url);

            realXhr.timeout = fakeXhr.timeout;
            realXhr.withCredentials = fakeXhr.withCredentials;
            this.transferEventListeners(fakeXhr, realXhr);
            setRequestHeaders(
                realXhr,
                new Map(Object.entries(request.requestHeaders.getHash()))
            );

            realXhr.addEventListener('readystatechange', () => {
                if (realXhr.readyState === XMLHttpRequest.DONE) {
                    request.respond(
                        realXhr.status,
                        getResponseHeaderMap(realXhr),
                        realXhr.responseText,
                        realXhr.statusText
                    );
                }
            });

            realXhr.addEventListener('abort', () => request.abort());
            realXhr.addEventListener('error', () => request.setNetworkError());
            realXhr.addEventListener('timeout', () =>
                request.setRequestTimeout()
            );

            realXhr.send(body);
        }
    };

    transferEventListeners(fakeXhr, realXhr) {
        fakeXhr._listeners.forEach((handlers, eventName) => {
            if (eventName === 'loadstart') {
                // We can't transfer loadstart because it fires as soon as the user calls xhr.start() and
                // before this method is called, so to avoid calling it twice, we refrain from transferring it.
                return;
            }

            handlers.forEach(
                ({ isEventHandlerProperty, listener, useCapture, once }) => {
                    if (isEventHandlerProperty) {
                        realXhr[`on${eventName}`] = listener;
                    } else {
                        realXhr.addEventListener(eventName, listener, {
                            once,
                            capture: useCapture,
                        });
                    }
                }
            );
        });

        fakeXhr._listeners.clear();
    }

    restore = () => {
        this.requestMap = {};
        this.ignoreQueryParams = false;
    };
}

export default new Faker();
