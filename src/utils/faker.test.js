import { Faker } from './faker';

describe('Faker', () => {
    describe('getNormalizedUrl', () => {
        const faker = new Faker();

        it('should remove protocol like http', () => {
            const input = 'http://google.com/test';
            const actual = faker.getNormalizedUrl(input);
            expect(actual.path).toEqual('google.com/test');
            expect(actual.searchParamKeys).toEqual([]);
        });
        it('should return relative path', () => {
            const input = '/test/foo/bar';
            const actual = faker.getNormalizedUrl(input);
            expect(actual.path).toEqual('localhost/test/foo/bar');
            expect(actual.searchParamKeys).toEqual([]);
        });
        it('should return relative path without slash infront', () => {
            const input = 'test/foo/bar';
            const actual = faker.getNormalizedUrl(input);
            expect(actual.path).toEqual('localhost/test/foo/bar');
            expect(actual.searchParamKeys).toEqual([]);
        });
        it('should remove protocol like https', () => {
            const input = 'https://google.com/test';
            const actual = faker.getNormalizedUrl(input);
            expect(actual.path).toEqual('google.com/test');
            expect(actual.searchParamKeys).toEqual([]);
        });

        it('should keep port with the hostname', () => {
            const input = 'https://google.com:8080/test';
            const actual = faker.getNormalizedUrl(input);
            expect(actual.path).toEqual('google.com:8080/test');
            expect(actual.searchParamKeys).toEqual([]);
        });
        it('should return query params key with the hostname', () => {
            const input = 'https://google.com:8080/test?all=true&only=false';
            const actual = faker.getNormalizedUrl(input);
            expect(actual.path).toEqual('google.com:8080/test');
            expect(actual.searchParamKeys).toEqual(['all', 'only']);
        });
    });
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
});
