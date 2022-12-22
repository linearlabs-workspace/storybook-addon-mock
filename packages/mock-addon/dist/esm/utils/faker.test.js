import { Faker } from './faker';
describe('Faker', function () {
  describe('getKey', function () {
    var faker = new Faker();
    it('should return empty string if url and method are empty strings', function () {
      var actual = faker.getKey('', [], '');
      expect(actual).toEqual('');
    });
    it('should return a string binding url and method with underscore if searchParamKeys is empty', function () {
      var actual = faker.getKey('google.com', [], 'GET');
      expect(actual).toEqual('google.com_get');
    });
    it('should return a string binding url, search params keys, and method with underscore', function () {
      var actual = faker.getKey('google.com', ['all', 'only'], 'GET');
      expect(actual).toEqual('google.com_all_only_get');
    });
  });
  describe('makeInitialRequestMap', function () {
    var faker = new Faker();
    beforeEach(function () {
      jest.resetAllMocks();
    });
    it('should not call add method if request is empty', function () {
      var addSpy = jest.spyOn(faker, 'add');
      faker.makeInitialRequestMap();
      expect(addSpy).toHaveBeenCalledTimes(0);
    });
    it('should not call add method if request is not an array', function () {
      var addSpy = jest.spyOn(faker, 'add');
      faker.makeInitialRequestMap({});
      expect(addSpy).toHaveBeenCalledTimes(0);
    });
    it('should call add method if request is an array', function () {
      var addSpy = jest.spyOn(faker, 'add');
      var requests = [{
        url: 'http://request.com',
        method: 'GET'
      }, {
        url: 'http://request1.com',
        method: 'POST'
      }];
      faker.makeInitialRequestMap(requests);
      expect(addSpy).toHaveBeenCalledTimes(2);
    });
  });
  describe('matchMock', function () {
    var faker = new Faker();
    var requests = [{
      url: 'http://request.com',
      method: 'GET',
      status: 200,
      response: {},
      delay: 0
    }, {
      url: 'http://request1.com/1',
      method: 'PUT',
      status: 201,
      response: {},
      delay: 0
    }, {
      url: 'http://request2.com/:id',
      method: 'POST',
      status: 404,
      response: {},
      delay: 0
    }];
    faker.makeInitialRequestMap(requests);
    it('should return request if url matches', function () {
      var actual = faker.matchMock('http://request.com', 'GET');
      expect(actual.url).toEqual(requests[0].url);
      expect(actual.method).toEqual(requests[0].method);
      expect(actual.skip).toEqual(false);
    });
    it('should return null if url does not match', function () {
      var actual = faker.matchMock('http://notmatched.com', 'GET');
      expect(actual).toBeNull();
    });
    it('should return request if url matches with the regex', function () {
      var actual = faker.matchMock('http://request2.com/3', 'POST');
      expect(actual.url).toEqual(requests[2].url);
      expect(actual.method).toEqual(requests[2].method);
      expect(actual.skip).toEqual(false);
    });
  });
  describe('restore', function () {
    var faker = new Faker();
    var requests = [{
      url: 'http://request.com',
      method: 'GET',
      status: 200,
      response: {}
    }, {
      url: 'http://request1.com/1',
      method: 'PUT',
      status: 201,
      response: {}
    }, {
      url: 'http://request2.com/:id',
      method: 'POST',
      status: 404,
      response: {}
    }];
    faker.makeInitialRequestMap(requests);
    it('should clear the request map', function () {
      expect(faker.getRequests().length).toEqual(3);
      faker.restore();
      expect(faker.getRequests().length).toEqual(0);
    });
  });
});