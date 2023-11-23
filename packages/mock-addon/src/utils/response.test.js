import { CustomResponse } from './response';

const mockURL = 'http://storybook-addon-mock.com';

describe('CustomResponse', () => {
    it('should return ok true if status is 2xx', () => {
        const actual = new CustomResponse(mockURL, 200, {});
        expect(actual.ok).toBe(true);
    });
    it('should return ok false if status is 3xx', () => {
        const actual = new CustomResponse(mockURL, 301, {});
        expect(actual.ok).toBe(false);
    });
    it('should return ok false if status is 4xx', () => {
        const actual = new CustomResponse(mockURL, 404, {});
        expect(actual.ok).toBe(false);
    });
    it('should return ok false if status is 503', () => {
        const actual = new CustomResponse(mockURL, 503, {});
        expect(actual.ok).toBe(false);
    });
    it('should return text as a string if responseText is string', async () => {
        const response = new CustomResponse(mockURL, 200, 'This is a string');
        const actualText = await response.text();
        const actualContentType = await response.headers.get('content-type');
        expect(actualText).toEqual('This is a string');
        expect(actualContentType).toEqual('text/plain');
    });
    it('should return text as a string if responseText is an object', async () => {
        const response = new CustomResponse(mockURL, 200, { key: 'test' });
        const actual = await response.text();
        // eslint-disable-next-line prettier/prettier
        expect(actual).toEqual("{\"key\":\"test\"}");
    });
    it('should return responseText in json()', async () => {
        const response = new CustomResponse(mockURL, 200, { key: 'test' });
        const actual = await response.json();
        // eslint-disable-next-line prettier/prettier
        expect(actual).toEqual({ key: 'test' });
    });
    it('should return a response with headers that contain required properties and methods', async () => {
        const response = new CustomResponse(mockURL, 200, {});
        const headers = response.headers;
        expect(headers).toBeDefined();
        const hasAll = Object.keys(Headers).every(
            (key) => headers[key] !== undefined
        );
        expect(hasAll).toBe(true);
    });
});
