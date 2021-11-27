import React from 'react';
import { storiesOf } from '@storybook/react';
import { GetRequest } from './components/get-request';
import { NonGetRequest } from './components/non-get-request';
import withMock from '../dist';

const mockData = [
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

// const mockCustomFunctionData = [
//     {
//         url: 'https://jsonplaceholder.typicode.com/todos/:id',
//         method: 'GET',
//         status: 200,
//         delay: 0,
//         response: (req) => {
//             return { data: 'This is a custom function.' };
//         },
//     },
// ];

storiesOf('Examples/Default/Fetch', module)
    .addDecorator(withMock)
    .add('GET request', () => <GetRequest title="Fetch GET Request" />, {
        mockData,
    })
    .add(
        'POST request',
        () => <NonGetRequest title="Fetch POST Request" method="POST" />,
        {
            mockData,
        }
    )
    .add(
        'PUT request',
        () => <NonGetRequest title="Fetch PUT Request" method="PUT" />,
        {
            mockData,
        }
    )
    .add(
        'PATCH request',
        () => <NonGetRequest title="Fetch PATCH Request" method="PATCH" />,
        {
            mockData,
        }
    )
    .add(
        'DELETE request',
        () => <NonGetRequest title="Fetch DELETE Request" method="DELETE" />,
        {
            mockData,
        }
    );

storiesOf('Examples/Default/Axios', module)
    .addDecorator(withMock)
    .add('GET request', () => <GetRequest title="Axios GET Request" />, {
        mockData,
    })
    .add(
        'POST request',
        () => <NonGetRequest title="Axios POST Request" method="POST" />,
        {
            mockData,
        }
    )
    .add(
        'PUT request',
        () => <NonGetRequest title="Axios PUT Request" method="PUT" />,
        {
            mockData,
        }
    )
    .add(
        'PATCH request',
        () => <NonGetRequest title="Axios PATCH Request" method="PATCH" />,
        {
            mockData,
        }
    )
    .add(
        'DELETE request',
        () => <NonGetRequest title="Axios DELETE Request" method="DELETE" />,
        {
            mockData,
        }
    );

// storiesOf('Examples/Custom Function', module)
//     .addDecorator(withMock)
//     .add(
//         'Fetch request',
//         () => <StoryContainer title="Fetch" onRequest={callFetch} />,
//         { mockData: mockCustomFunctionData }
//     )
//     .add(
//         'Axios request',
//         () => <StoryContainer title="Axios(XHR)" onRequest={callAxios} />,
//         { mockData: mockCustomFunctionData }
//     );
