import { Faker } from './faker';
// import { newMockXhr } from 'mock-xmlhttprequest';

// function setRealRequestInterceptors(realRequestInterceptor) {
//     global.XMLHttpRequest = newMockXhr();
//     global.XMLHttpRequest.onSend = realRequestInterceptor;
//     return () => {
//         delete global.XMLHttpRequest;
//     };
// }

let mockFaker = null;
function setupMockFaker(mockFakerRequests) {
    if (!mockFaker) {
        mockFaker = new Faker();
    }
    if (mockFakerRequests) {
        mockFaker.makeInitialRequestMap(mockFakerRequests);
    }

    const resetMock = () => {
        mockFaker.restore();
    };
    return [mockFaker, resetMock];
}

// function setupMocks(mockFakerRequests, realRequestInterceptor) {
//     let disposers = [];
//     if (realRequestInterceptor) {
//         disposers.push(setRealRequestInterceptors(realRequestInterceptor));
//     }

//     const [faker, fakerDisposer] = setupMockFaker(mockFakerRequests);
//     disposers.push(fakerDisposer);

//     return {
//         faker,
//         dispose: () => {
//             disposers.forEach((fn) => fn());
//             disposers = [];
//         },
//     };
// }

// async function getEntangledFakeAndRealXHRs(options) {
//     let realXHR = {};
//     let setHeaderSpy = undefined;
//     const originalXHR = global.realXMLHttpRequest;

//     global.realXMLHttpRequest = new Proxy(originalXHR, {
//         construct(target, args, newTarget) {
//             realXHR = Reflect.construct(target, args, newTarget);
//             setHeaderSpy = jest.spyOn(realXHR, 'setRequestHeader');
//             return realXHR;
//         },
//     });
//     const fakeXhr = new XMLHttpRequest();
//     const fakeXhrFinished = () =>
//         new Promise((resolve) => fakeXhr.addEventListener('loadend', resolve));

//     options.events?.forEach((event) => {
//         const mockFn = jest.fn().mockName(event.name);
//         event.listener = mockFn;
//         if (event.isPropertyHandler) {
//             fakeXhr[`on${event.name}`] = mockFn;
//         } else {
//             fakeXhr.addEventListener(event.name, mockFn);
//         }
//     });

//     fakeXhr.open(options.method, options.url);
//     fakeXhr.timeout = options.timeout;
//     fakeXhr.withCredentials = options.withCredentials;

//     if (options.headers) {
//         Object.entries(options.headers).forEach(([header, value]) =>
//             fakeXhr.setRequestHeader(header, value)
//         );
//     }

//     fakeXhr.send(JSON.stringify(options.body));

//     await fakeXhrFinished();

//     return {
//         fakeXhr,
//         realXHR,
//         setHeaderSpy,
//         events: options.events,
//         dispose() {
//             global.realXMLHttpRequest = originalXHR;
//         },
//     };
// }

// function assertEventListeners(realXHR, events) {
//     events.forEach((event) => {
//         if (event.isPropertyHandler) {
//             const eventName = `on${event.name}`;
//             if (!event.shouldTransfer) {
//                 expect(realXHR[eventName]).toBeFalsy();
//             } else {
//                 expect(realXHR[eventName]).toBe(event.listener);
//             }
//         }

//         if (event.shouldBeCalledTimes === -1) {
//             expect(event.listener).toHaveBeenCalled();
//         } else {
//             expect(event.listener).toHaveBeenCalledTimes(
//                 event.shouldBeCalledTimes
//             );
//         }
//     });
// }

describe('Faker - getKey', () => {
    const [faker, resetMock] = setupMockFaker();
    afterAll(() => {
        resetMock();
    });

    it('should return empty string if url and method are empty strings', () => {
        const actual = faker.getKey('', [], '');
        expect(actual).toEqual('');
    });

    it('should return a string binding url and method with underscore if searchParamKeys is empty', () => {
        const actual = faker.getKey('google.com', [], 'GET');
        expect(actual).toEqual('google.com_get');
    });

    it('should return a string binding url, search params keys, and method with underscore', () => {
        const actual = faker.getKey('google.com', ['all', 'only'], 'GET');
        expect(actual).toEqual('google.com_all_only_get');
    });
});

describe('Faker - makeInitialRequestMap', () => {
    const [faker, resetMock] = setupMockFaker();

    afterAll(() => {
        resetMock();
    });
    it('should not call add method if request is empty', () => {
        const addSpy = jest.spyOn(faker, 'add');
        faker.makeInitialRequestMap();
        expect(addSpy).toHaveBeenCalledTimes(0);
    });

    it('should not call add method if request is not an array', () => {
        const addSpy = jest.spyOn(faker, 'add');
        faker.makeInitialRequestMap({});
        expect(addSpy).toHaveBeenCalledTimes(0);
    });

    it('should call add method if request is an array', () => {
        const addSpy = jest.spyOn(faker, 'add');
        const requests = [
            {
                url: 'http://request.com',
                method: 'GET',
                status: 200,
                response: {},
                delay: 0,
            },
            {
                url: 'http://request1.com/1',
                method: 'PUT',
                status: 201,
                response: {},
                delay: 0,
            },
        ];
        faker.makeInitialRequestMap(requests);
        expect(addSpy).toHaveBeenCalledTimes(2);
    });
});

describe('Faker - matchMock', () => {
    const requests = [
        {
            url: 'http://request.com',
            method: 'GET',
            status: 200,
            response: {},
            delay: 0,
        },
        {
            url: 'http://request1.com/1',
            method: 'PUT',
            status: 201,
            response: {},
            delay: 0,
        },
        {
            url: 'http://request2.com/:id',
            method: 'POST',
            status: 404,
            response: {},
            delay: 0,
        },
        {
            url: 'http://request3.com?foo=1&bar=2',
            method: 'GET',
            status: 200,
            response: {},
            delay: 0,
        },
        {
            url: 'http://request4.com',
            method: 'GET',
            status: 200,
            response: {},
            delay: 0,
            ignoreQueryParams: true,
        },
        {
            url: 'http://request5.com?foo=1&bar=2',
            method: 'GET',
            status: 200,
            response: {},
            delay: 0,
            ignoreQueryParams: true,
        },
    ];

    const [faker, resetMock] = setupMockFaker();

    beforeEach(() => {
        faker.makeInitialRequestMap(requests);
    });

    afterEach(() => {
        resetMock();
    });

    it('should return request if url matches', () => {
        const actual = faker.matchMock('http://request.com', 'GET');
        expect(actual.url).toEqual(requests[0].url);
        expect(actual.method).toEqual(requests[0].method);
        expect(actual.skip).toEqual(false);
    });

    it('should return request if url matches but method only b/c GET=get', () => {
        const actual = faker.matchMock('http://request.com', 'get');
        expect(actual.url).toEqual(requests[0].url);
        expect(actual.method).toEqual(requests[0].method);
        expect(actual.skip).toEqual(false);
    });

    it('should return null if url does not match', () => {
        const actual = faker.matchMock('http://notmatched.com', 'GET');
        expect(actual).toBeNull();
    });

    it('should return request if url matches with the regex', () => {
        const actual = faker.matchMock('http://request2.com/3', 'POST');
        expect(actual.url).toEqual(requests[2].url);
        expect(actual.method).toEqual(requests[2].method);
        expect(actual.skip).toEqual(false);
    });

    it('should return request if url and query parameters match', () => {
        const actual = faker.matchMock(
            'http://request3.com?foo=1&bar=2',
            'GET'
        );
        expect(actual.url).toEqual(requests[3].url);
        expect(actual.method).toEqual(requests[3].method);
        expect(actual.skip).toEqual(false);
    });

    it('should return request if url and query parameters match with different order', () => {
        const actual = faker.matchMock(
            'http://request3.com?bar=2&foo=1',
            'GET'
        );
        expect(actual.url).toEqual(requests[3].url);
        expect(actual.method).toEqual(requests[3].method);
        expect(actual.skip).toEqual(false);
    });

    it('should return null if unexpected query parameters are provided', () => {
        const actual = faker.matchMock('http://request.com?foo=1', 'GET');
        expect(actual).toBeNull();
    });

    it('should return null if query parameters are missing', () => {
        const actual = faker.matchMock('http://request3.com?baz=1', 'GET');
        expect(actual).toBeNull();
    });

    it('should return request if unexpected query parameters are provided but are globally ignored', () => {
        faker.setIgnoreQueryParams(true);
        const actual = faker.matchMock('http://request.com?foo=1', 'GET');
        expect(actual.url).toEqual(requests[0].url);
        expect(actual.method).toEqual(requests[0].method);
        expect(actual.skip).toEqual(false);
    });

    it('should return request if query parameters are missing but are globally ignored', () => {
        faker.setIgnoreQueryParams(true);
        const actual = faker.matchMock('http://request3.com?baz=1', 'GET');
        expect(actual.url).toEqual(requests[3].url);
        expect(actual.method).toEqual(requests[3].method);
        expect(actual.skip).toEqual(false);
    });
});

describe('Faker - matchQueryParams', () => {
    const [faker, resetMock] = setupMockFaker();

    afterEach(() => {
        resetMock();
    });

    it('should return true if query parameters match', () => {
        const actual = faker.matchQueryParams(
            ['foo', 'bar'],
            ['foo', 'bar'],
            false
        );
        expect(actual).toBe(true);
    });

    it('should return true if query parameters match with different order', () => {
        const actual = faker.matchQueryParams(
            ['foo', 'bar'],
            ['bar', 'foo'],
            false
        );
        expect(actual).toBe(true);
    });

    it('should return false if unexpected query parameters are provided', () => {
        const actual = faker.matchQueryParams([], ['foo'], false);
        expect(actual).toBe(false);
    });

    it('should return false if query parameters are missing', () => {
        const actual = faker.matchQueryParams(['foo', 'bar'], ['baz'], false);
        expect(actual).toBe(false);
    });

    it('should return true if unexpected query parameters are provided but are globally ignored', () => {
        faker.setIgnoreQueryParams(true);
        const actual = faker.matchQueryParams([], ['foo'], false);
        expect(actual).toBe(true);
    });

    it('should return true if query parameters are missing but are globally ignored', () => {
        faker.setIgnoreQueryParams(true);
        const actual = faker.matchQueryParams([], ['foo'], false);
        expect(actual).toBe(true);
    });
});

describe('restore', () => {
    const requests = [
        {
            url: 'http://request.com',
            method: 'GET',
            status: 200,
            response: {},
        },
        {
            url: 'http://request1.com/1',
            method: 'PUT',
            status: 201,
            response: {},
        },
        {
            url: 'http://request2.com/:id',
            method: 'POST',
            status: 404,
            response: {},
        },
    ];

    const [faker, resetMock] = setupMockFaker();

    afterAll(() => {
        resetMock();
    });

    it('should clear the request map', () => {
        faker.makeInitialRequestMap(requests);
        expect(faker.getRequests().length).toEqual(3);
        faker.restore();
        expect(faker.getRequests().length).toEqual(0);
    });
});

describe('Faker - abort signal', () => {
    const [faker, resetMock] = setupMockFaker();
    beforeAll(() => {
        const requests = [
            {
                url: 'http://request.com',
                method: 'GET',
                status: 200,
                response: {},
            },
        ];

        faker.makeInitialRequestMap(requests);
    });

    afterAll(() => {
        resetMock();
    });

    it('should abort request if abort is called', (done) => {
        const abortController = new AbortController();

        fetch('http://request.com', {
            method: 'GET',
            signal: abortController.signal,
        })
            .then(() => {
                done(
                    'should have aborted, preventing resolve from being called'
                );
            })
            .catch((err) => {
                expect(err.name).toEqual('AbortError');
                expect(err.message).toEqual('The reason for aborting');
                done();
            });

        abortController.abort('The reason for aborting');
    });

    it('should not abort request if aborted signal is not supplied as fetch option', (done) => {
        const abortController = new AbortController();

        fetch('http://request.com', {
            method: 'GET',
            delay: 1000, // <- NOTE signal is not provided
        })
            .then((res) => {
                expect(res.status).toEqual(200);
                done();
            })
            .catch(() => {
                done.fail('should not catch');
            });

        abortController.abort('The reason for aborting');
    });
});

// describe('Faker - real XHR behaviour', () => {
//     const requests = [
//         {
//             url: 'http://request.com',
//             method: 'GET',
//             status: 200,
//             response: {},
//         },
//     ];

//     it('should reflect with 200', async () => {
//         // Data
//         const response = { data: 'mock data' };
//         const responseJSON = JSON.stringify(response);

//         const options = {
//             method: 'GET',
//             url: 'http://foo.bar',
//             timeout: 2000,
//             withCredentials: true,
//             events: [
//                 {
//                     name: 'abort',
//                     isPropertyHandler: true,
//                     shouldBeCalledTimes: 0,
//                     shouldTransfer: true,
//                 },
//                 {
//                     name: 'error',
//                     isPropertyHandler: true,
//                     shouldBeCalledTimes: 0,
//                     shouldTransfer: true,
//                 },
//                 {
//                     name: 'load',
//                     isPropertyHandler: true,
//                     shouldBeCalledTimes: 1,
//                     shouldTransfer: true,
//                 },
//                 {
//                     name: 'loadend',
//                     isPropertyHandler: true,
//                     shouldBeCalledTimes: 1,
//                     shouldTransfer: true,
//                 },
//                 {
//                     name: 'loadstart',
//                     isPropertyHandler: true,
//                     shouldBeCalledTimes: 1,
//                     shouldTransfer: false,
//                 },
//                 {
//                     name: 'progress',
//                     isPropertyHandler: true,
//                     shouldBeCalledTimes: -1,
//                     shouldTransfer: true,
//                 },
//                 {
//                     name: 'readystatechange',
//                     isPropertyHandler: true,
//                     shouldBeCalledTimes: 4,
//                     shouldTransfer: true,
//                 },
//                 {
//                     name: 'timeout',
//                     isPropertyHandler: true,
//                     shouldBeCalledTimes: 0,
//                     shouldTransfer: true,
//                 },
//                 {
//                     name: 'readystatechange',
//                     isPropertyHandler: false,
//                     shouldBeCalledTimes: 4,
//                     shouldTransfer: true,
//                 },
//             ],
//             headers: {
//                 foo: 'bar',
//             },
//         };

//         // Setup
//         const { dispose } = setupMocks(requests, (request) => {
//             request.respond(
//                 200,
//                 { 'Content-Type': 'application/json' },
//                 responseJSON
//             );
//         });

//         const {
//             fakeXhr,
//             realXHR,
//             setHeaderSpy,
//             events,
//             dispose: disposeFake,
//         } = await getEntangledFakeAndRealXHRs(options);

//         // Assert
//         expect(realXHR.timeout).toEqual(2000);
//         expect(realXHR.withCredentials).toEqual(true);

//         assertEventListeners(realXHR, events);

//         expect(setHeaderSpy).toHaveBeenCalledWith('foo', 'bar');
//         expect(fakeXhr.status).toEqual(200);
//         expect(fakeXhr.responseText).toEqual(responseJSON);
//         expect(fakeXhr.getResponseHeader('Content-Type')).toEqual(
//             'application/json'
//         );
//         expect(fakeXhr.statusText).toEqual('OK');
//         expect(fakeXhr.readyState).toEqual(fakeXhr.DONE);
//         expect(
//             events.find(
//                 (e) =>
//                     e.isPropertyHandler === false &&
//                     e.name === 'readystatechange'
//             ).listener
//         ).toHaveBeenCalledTimes(4);

//         // Teardown

//         dispose();
//         disposeFake();
//     });

//     it('should reflect with 202', async () => {
//         // Data
//         const response = { response: 'ok' };
//         const responseJSON = JSON.stringify(response);

//         const options = {
//             method: 'POST',
//             url: 'http://foo.com/api/user/1',
//             body: {
//                 name: 'yossi',
//                 age: '30',
//             },
//             timeout: 100,
//             withCredentials: false,
//             events: [
//                 {
//                     name: 'load',
//                     isPropertyHandler: true,
//                     shouldBeCalledTimes: 1,
//                     shouldTransfer: true,
//                 },
//                 {
//                     name: 'readystatechange',
//                     isPropertyHandler: false,
//                     shouldBeCalledTimes: 4,
//                     shouldTransfer: true,
//                 },
//             ],
//             headers: {
//                 foo: 'bar',
//             },
//         };

//         // Setup
//         const { dispose } = setupMocks(requests, (request) => {
//             request.respond(
//                 202,
//                 { 'Content-Type': 'application/json' },
//                 responseJSON
//             );
//         });

//         const {
//             fakeXhr,
//             realXHR,
//             setHeaderSpy,
//             events,
//             dispose: disposeFake,
//         } = await getEntangledFakeAndRealXHRs(options);

//         // Assert
//         expect(realXHR.timeout).toEqual(100);
//         expect(realXHR.withCredentials).toEqual(false);

//         assertEventListeners(realXHR, events);

//         expect(setHeaderSpy).toHaveBeenCalledWith('foo', 'bar');
//         expect(fakeXhr.status).toEqual(202);
//         expect(fakeXhr.responseText).toEqual(responseJSON);
//         expect(fakeXhr.getResponseHeader('Content-Type')).toEqual(
//             'application/json'
//         );
//         expect(fakeXhr.statusText).toEqual('Accepted');
//         expect(fakeXhr.readyState).toEqual(fakeXhr.DONE);
//         expect(
//             events.find(
//                 (e) =>
//                     e.isPropertyHandler === false &&
//                     e.name === 'readystatechange'
//             ).listener
//         ).toHaveBeenCalledTimes(4);

//         // Teardown

//         dispose();
//         disposeFake();
//     });

//     it('should reflect with 301', async () => {
//         // Data

//         const options = {
//             method: 'GET',
//             url: 'http://foo.com/',
//             timeout: 100,
//             withCredentials: true,
//             events: [
//                 {
//                     name: 'readystatechange',
//                     isPropertyHandler: false,
//                     shouldBeCalledTimes: 4,
//                     shouldTransfer: true,
//                 },
//             ],
//             headers: {
//                 foo: 'bar',
//             },
//         };

//         // Setup
//         const { dispose } = setupMocks(requests, (request) => {
//             request.respond(301, { Location: 'http://bar.com' }, '');
//         });

//         const {
//             fakeXhr,
//             realXHR,
//             setHeaderSpy,
//             events,
//             dispose: disposeFake,
//         } = await getEntangledFakeAndRealXHRs(options);

//         // Assert
//         expect(realXHR.timeout).toEqual(100);
//         expect(realXHR.withCredentials).toEqual(true);

//         assertEventListeners(realXHR, events);

//         expect(setHeaderSpy).toHaveBeenCalledWith('foo', 'bar');
//         expect(fakeXhr.status).toEqual(301);
//         expect(fakeXhr.responseText).toEqual('');
//         expect(fakeXhr.getResponseHeader('Location')).toEqual('http://bar.com');
//         expect(fakeXhr.statusText).toEqual('Moved Permanently');
//         expect(fakeXhr.readyState).toEqual(fakeXhr.DONE);
//         expect(
//             events.find(
//                 (e) =>
//                     e.isPropertyHandler === false &&
//                     e.name === 'readystatechange'
//             ).listener
//         ).toHaveBeenCalledTimes(4);

//         // Teardown

//         dispose();
//         disposeFake();
//     });

//     it('should reflect with 404', async () => {
//         // Data

//         const options = {
//             method: 'GET',
//             url: 'http://foo.com/',
//             timeout: 100,
//             withCredentials: true,
//         };

//         // Setup
//         const { dispose } = setupMocks(requests, (request) => {
//             request.respond(404, {}, '');
//         });

//         const {
//             fakeXhr,
//             realXHR,
//             dispose: disposeFake,
//         } = await getEntangledFakeAndRealXHRs(options);

//         // Assert
//         expect(realXHR.timeout).toEqual(100);
//         expect(realXHR.withCredentials).toEqual(true);

//         expect(fakeXhr.status).toEqual(404);
//         expect(fakeXhr.responseText).toEqual('');
//         expect(fakeXhr.statusText).toEqual('Not Found');
//         expect(fakeXhr.readyState).toEqual(fakeXhr.DONE);

//         // Teardown
//         dispose();
//         disposeFake();
//     });

//     it('should reflect with 500', async () => {
//         // Data

//         const options = {
//             method: 'GET',
//             url: 'http://foo.com/',
//             timeout: 100,
//             withCredentials: true,
//         };

//         // Setup
//         const { dispose } = setupMocks(requests, (request) => {
//             request.respond(500, {}, '');
//         });

//         const {
//             fakeXhr,
//             realXHR,
//             dispose: disposeFake,
//         } = await getEntangledFakeAndRealXHRs(options);

//         // Assert
//         expect(realXHR.timeout).toEqual(100);
//         expect(realXHR.withCredentials).toEqual(true);

//         expect(fakeXhr.status).toEqual(500);
//         expect(fakeXhr.responseText).toEqual('');
//         expect(fakeXhr.statusText).toEqual('Internal Server Error');
//         expect(fakeXhr.readyState).toEqual(fakeXhr.DONE);

//         // Teardown
//         dispose();
//         disposeFake();
//     });
// });
