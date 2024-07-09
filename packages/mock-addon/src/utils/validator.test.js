import { validate, schema } from './validator';

describe('Validator', () => {
    it('should return empty error array if validation passed', () => {
        const mock = {
            url: 'https://jsonplaceholder.typicode.com/todos/:id',
            method: 'GET',
            status: 200,
            delay: 0,
            response: {
                id: '1',
                name: 'Item 1',
            },
        };
        const actual = validate(mock, schema);
        expect(actual).toEqual([]);
    });

    it('should return error if the object is invalid', () => {
        const mock = [];
        const actual = validate(mock, schema);
        expect(actual).toEqual(['item: [] is not a valid object.']);
    });
    describe('validate url', () => {
        it('should return empty error array if url is absolute', () => {
            const mock = {
                url: 'https://jsonplaceholder.typicode.com/todos/:id',
                method: 'GET',
                status: 200,
                delay: 0,
                response: {
                    id: '1',
                    name: 'Item 1',
                },
            };
            const actual = validate(mock, schema);
            expect(actual).toEqual([]);
        });

        it('should return empty error array if url is relative', () => {
            const mock = {
                url: '/jsonplaceholder.typicode.com/todos/:id',
                method: 'GET',
                status: 200,
                delay: 0,
                response: {
                    id: '1',
                    name: 'Item 1',
                },
            };
            const actual = validate(mock, schema);
            expect(actual).toEqual([]);
        });

        it('should return rul error array if url is not a string', () => {
            const mock = {
                url: {},
                method: 'GET',
                status: 200,
                delay: 0,
                response: {
                    id: '1',
                    name: 'Item 1',
                },
            };
            const actual = validate(mock, schema);
            expect(actual).toEqual(['url: {} is not valid.']);
        });
    });
    describe('validate status', () => {
        it('should return not valid status error if status is not in the status code list', () => {
            const mock = {
                url: 'https://jsonplaceholder.typicode.com/todos/:id',
                method: 'GET',
                status: 600,
                delay: 0,
                response: {
                    id: '1',
                    name: 'Item 1',
                },
            };
            const actual = validate(mock, schema);
            expect(actual).toEqual(['status: 600 is not valid.']);
        });

        it('should return not valid status error if status is a string', () => {
            const mock = {
                url: 'https://jsonplaceholder.typicode.com/todos/:id',
                method: 'GET',
                status: 'string',
                delay: 0,
                response: {
                    id: '1',
                    name: 'Item 1',
                },
            };
            const actual = validate(mock, schema);
            expect(actual).toEqual(['status: "string" is not valid.']);
        });

        it('should return not valid status error if status is null', () => {
            const mock = {
                url: 'https://jsonplaceholder.typicode.com/todos/:id',
                method: 'GET',
                status: null,
                delay: 0,
                response: {
                    id: '1',
                    name: 'Item 1',
                },
            };
            const actual = validate(mock, schema);
            expect(actual).toEqual(['status: null is not valid.']);
        });
    });
    describe('validate method', () => {
        it('should return not valid method error if method is not in the allowed method list', () => {
            const mock = {
                url: 'https://jsonplaceholder.typicode.com/todos/:id',
                method: 'INVALID_METHOD',
                status: 200,
                delay: 0,
                response: {
                    id: '1',
                    name: 'Item 1',
                },
            };
            const actual = validate(mock, schema);
            expect(actual).toEqual(['method: "INVALID_METHOD" is not valid.']);
        });

        it('should return not valid method error if method is not a string', () => {
            const mock = {
                url: 'https://jsonplaceholder.typicode.com/todos/:id',
                method: [],
                status: 200,
                delay: 0,
                response: {
                    id: '1',
                    name: 'Item 1',
                },
            };
            const actual = validate(mock, schema);
            expect(actual).toEqual(['method: [] is not valid.']);
        });

        it('should return not valid method error if method is null', () => {
            const mock = {
                url: 'https://jsonplaceholder.typicode.com/todos/:id',
                method: null,
                status: 200,
                delay: 0,
                response: {
                    id: '1',
                    name: 'Item 1',
                },
            };
            const actual = validate(mock, schema);
            expect(actual).toEqual(['method: null is not valid.']);
        });
    });
    describe('validate response', () => {
        it('should return empty error if response is an object', () => {
            const mock = {
                url: 'https://jsonplaceholder.typicode.com/todos/:id',
                method: 'GET',
                status: 200,
                delay: 0,
                response: {
                    id: '1',
                    name: 'Item 1',
                },
            };
            const actual = validate(mock, schema);
            expect(actual).toEqual([]);
        });

        it('should return empty error if response is an array', () => {
            const mock = {
                url: 'https://jsonplaceholder.typicode.com/todos/:id',
                method: 'GET',
                status: 200,
                delay: 0,
                response: [
                    {
                        id: '1',
                        name: 'Item 1',
                    },
                ],
            };
            const actual = validate(mock, schema);
            expect(actual).toEqual([]);
        });

        it('should return empty error if response is a function', () => {
            const mock = {
                url: 'https://jsonplaceholder.typicode.com/todos/:id',
                method: 'GET',
                status: 200,
                delay: 0,
                response: () => {},
            };
            const actual = validate(mock, schema);
            expect(actual).toEqual([]);
        });

        it('should return empty error if response is a string', () => {
            const mock = {
                url: 'https://jsonplaceholder.typicode.com/todos/:id',
                method: 'GET',
                status: 200,
                delay: 0,
                response: 'string',
            };
            const actual = validate(mock, schema);
            expect(actual).toEqual([]);
        });

        it('should return empty error if response is null', () => {
            const mock = {
                url: 'https://jsonplaceholder.typicode.com/todos/:id',
                method: 'GET',
                status: 200,
                delay: 0,
                response: null,
            };
            const actual = validate(mock, schema);
            expect(actual).toEqual([]);
        });

        it('should return not valid response error if response is undefined', () => {
            const mock = {
                url: 'https://jsonplaceholder.typicode.com/todos/:id',
                method: 'GET',
                status: 200,
                delay: 0,
                response: undefined,
            };
            const actual = validate(mock, schema);
            expect(actual).toEqual(['response: undefined is not valid.']);
        });
    });
    describe('validate delay', () => {
        it('should return empty error if delay is an object', () => {
            const mock = {
                url: 'https://jsonplaceholder.typicode.com/todos/:id',
                method: 'GET',
                status: 200,
                delay: 0,
                response: {
                    id: '1',
                    name: 'Item 1',
                },
            };
            const actual = validate(mock, schema);
            expect(actual).toEqual([]);
        });

        it('should return not valid delay error if delay is a string', () => {
            const mock = {
                url: 'https://jsonplaceholder.typicode.com/todos/:id',
                method: 'GET',
                status: 200,
                delay: 'string',
                response: {
                    id: '1',
                    name: 'Item 1',
                },
            };
            const actual = validate(mock, schema);
            expect(actual).toEqual(['delay: "string" is not valid.']);
        });

        it('should return empty error if delay is null', () => {
            const mock = {
                url: 'https://jsonplaceholder.typicode.com/todos/:id',
                method: 'GET',
                status: 200,
                delay: null,
                response: {
                    id: '1',
                    name: 'Item 1',
                },
            };
            const actual = validate(mock, schema);
            expect(actual).toEqual([]);
        });
    });
    describe('validate multiple fields', () => {
        it('should return empty error if response is an object', () => {
            const mock = {
                url: 200,
                method: 'INVALID_METHOD',
                status: 800,
                delay: 0,
                response: {
                    id: '1',
                    name: 'Item 1',
                },
            };
            const actual = validate(mock, schema);
            expect(actual).toEqual([
                'url: 200 is not valid.',
                'method: "INVALID_METHOD" is not valid.',
                'status: 800 is not valid.',
            ]);
        });
    });
});
