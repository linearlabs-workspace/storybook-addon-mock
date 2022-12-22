import { getNormalizedUrl } from './url';
describe('Url', function () {
  describe('getNormalizedUrl', function () {
    it('should remove protocol like http', function () {
      var input = 'http://google.com/test';
      var actual = getNormalizedUrl(input);
      expect(actual.path).toEqual('google.com/test');
      expect(actual.searchParamKeys).toEqual([]);
    });
    it('should return relative path', function () {
      var input = '/test/foo/bar';
      var actual = getNormalizedUrl(input);
      expect(actual.path).toEqual('localhost/test/foo/bar');
      expect(actual.searchParamKeys).toEqual([]);
    });
    it('should return relative path without slash infront', function () {
      var input = 'test/foo/bar';
      var actual = getNormalizedUrl(input);
      expect(actual.path).toEqual('localhost/test/foo/bar');
      expect(actual.searchParamKeys).toEqual([]);
    });
    it('should remove protocol like https', function () {
      var input = 'https://google.com/test';
      var actual = getNormalizedUrl(input);
      expect(actual.path).toEqual('google.com/test');
      expect(actual.searchParamKeys).toEqual([]);
    });
    it('should keep port with the hostname', function () {
      var input = 'https://google.com:8080/test';
      var actual = getNormalizedUrl(input);
      expect(actual.path).toEqual('google.com:8080/test');
      expect(actual.searchParamKeys).toEqual([]);
    });
    it('should return query params key with the hostname', function () {
      var input = 'https://google.com:8080/test?all=true&only=false';
      var actual = getNormalizedUrl(input);
      expect(actual.path).toEqual('google.com:8080/test');
      expect(actual.searchParamKeys).toEqual(['all', 'only']);
    });
  });
});