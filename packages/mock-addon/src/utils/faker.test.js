import { Faker } from './faker';

describe('Faker', () => {
    describe('getKey', () => {
        const faker = new Faker();

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
    describe('makeInitialRequestMap', () => {
        const faker = new Faker();
        beforeEach(() => {
            jest.resetAllMocks();
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
                { url: 'http://request.com', method: 'GET' },
                { url: 'http://request1.com', method: 'POST' },
            ];
            faker.makeInitialRequestMap(requests);
            expect(addSpy).toHaveBeenCalledTimes(2);
        });
    });

    describe('matchMock', () => {
        const faker = new Faker();
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
        ];
        faker.makeInitialRequestMap(requests);

        it('should return request if url matches', () => {
            const actual = faker.matchMock('http://request.com', 'GET');
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
    });

    describe('restore', () => {
        const faker = new Faker();
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
        faker.makeInitialRequestMap(requests);

        it('should clear the request map', () => {
            expect(faker.getRequests().length).toEqual(3);
            faker.restore();
            expect(faker.getRequests().length).toEqual(0);
        });
    });

    describe('mockFetch', () => {
        describe('abort signal', () => {
            const faker = new Faker();
            const requests = [
                {
                    url: 'http://request.com',
                    method: 'GET',
                    status: 200,
                    response: {},
                },
            ];

            faker.makeInitialRequestMap(requests);

            /**
             * @jest-environment jsdom
             */
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
    });
});
