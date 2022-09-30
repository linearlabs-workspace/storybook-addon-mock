export const customFunctinBlock = `
parameters = {
    mockData: [
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
    ],
};
`;
