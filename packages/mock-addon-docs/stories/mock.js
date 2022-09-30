export const mockData = [
    {
        url: 'https://jsonplaceholder.typicode.com/todos/:id',
        method: 'GET',
        status: 200,
        delay: 0,
        response: {
            id: '1',
            name: 'Item 1',
        },
    },
    {
        url: 'https://jsonplaceholder.typicode.com/todos',
        method: 'POST',
        status: 201,
        delay: 0,
        response: {
            message: 'New item created',
        },
    },
    {
        url: 'https://jsonplaceholder.typicode.com/todos/:id',
        method: 'PUT',
        status: 200,
        delay: 0,
        response: {
            id: '1',
            name: 'Item 1',
        },
    },
    {
        url: 'https://jsonplaceholder.typicode.com/todos/:id',
        method: 'PATCH',
        status: 204,
        delay: 0,
        response: null,
    },
    {
        url: 'https://jsonplaceholder.typicode.com/todos/:id',
        method: 'DELETE',
        status: 202,
        delay: 0,
        response: null,
    },
];

export const customMockData = [
    {
        url: 'https://jsonplaceholder.typicode.com/todos/1',
        method: 'GET',
        status: 200,
        response: (request) => {
            const { body, searchParams } = request;

            if (searchParams.id == 1) {
                return {
                    data: 'Custom data for id 1',
                };
            } else if (body.name === 'mock') {
                return {
                    data: 'Custom data for name mock',
                };
            }
            return {
                data: 'Default data',
            };
        },
    },
];
