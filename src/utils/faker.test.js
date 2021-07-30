import { Faker } from './faker';

describe('Faker class', () => {
    describe('extractProtocolFromUrl', () => {
        const faker = new Faker();

        it('should remove protocol like http', () => {
            const input = 'http://google.com/test';
            const actual = faker.extractProtocolFromUrl(input);
            expect(actual).toEqual('google.com/test');
        });
        it('should remove protocol like https', () => {
            const input = 'https://google.com/test';
            const actual = faker.extractProtocolFromUrl(input);
            expect(actual).toEqual('google.com/test');
        });
    });
    describe('getKey', () => {
        const faker = new Faker();

        it('should return empty string if url and method are empty strings', () => {
            const actual = faker.getKey('', '');
            expect(actual).toEqual('');
        });
        it('should return a string binding url and method with underscore', () => {
            const actual = faker.getKey('google.com', 'GET');
            expect(actual).toEqual('google.com_get');
        });
    });
});
