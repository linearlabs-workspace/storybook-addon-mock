import { getNormalizedUrl } from './url';

describe('Url', () => {
    describe('getNormalizedUrl', () => {
        it('should remove protocol like http', () => {
            const input = 'http://google.com/test';
            const actual = getNormalizedUrl(input);
            expect(actual.path).toEqual('google.com/test');
            expect(actual.searchParamKeys).toEqual([]);
        });
        it('should return relative path', () => {
            const input = '/test/foo/bar';
            const actual = getNormalizedUrl(input);
            expect(actual.path).toEqual('localhost/test/foo/bar');
            expect(actual.searchParamKeys).toEqual([]);
        });
        it('should return relative path without slash infront', () => {
            const input = 'test/foo/bar';
            const actual = getNormalizedUrl(input);
            expect(actual.path).toEqual('localhost/test/foo/bar');
            expect(actual.searchParamKeys).toEqual([]);
        });
        it('should remove protocol like https', () => {
            const input = 'https://google.com/test';
            const actual = getNormalizedUrl(input);
            expect(actual.path).toEqual('google.com/test');
            expect(actual.searchParamKeys).toEqual([]);
        });

        it('should keep port with the hostname', () => {
            const input = 'https://google.com:8080/test';
            const actual = getNormalizedUrl(input);
            expect(actual.path).toEqual('google.com:8080/test');
            expect(actual.searchParamKeys).toEqual([]);
        });
        it('should return query params key with the hostname', () => {
            const input = 'https://google.com:8080/test?all=true&only=false';
            const actual = getNormalizedUrl(input);
            expect(actual.path).toEqual('google.com:8080/test');
            expect(actual.searchParamKeys).toEqual(['all', 'only']);
        });
    });
});
