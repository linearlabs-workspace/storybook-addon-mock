import React from 'react';
import { storiesOf } from '@storybook/react';
import { GetRequest } from './components/get-request';
import { NonGetRequest } from './components/non-get-request';
import { SearchParamsRequest } from './components/search-params-request';
import { callAxios, callFetch, callSuperAgent } from './utils';
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

const mockWithDelayData = [
    {
        url: 'https://jsonplaceholder.typicode.com/todos/:id',
        method: 'GET',
        status: 200,
        delay: 5000,
        response: {
            id: '1',
            name: 'Item 1',
        },
    },
    {
        url: 'https://jsonplaceholder.typicode.com/todos',
        method: 'POST',
        status: 201,
        delay: 5000,
        uploadFrameCount: 10,
        response: {
            message: 'New item created',
        },
    },
    {
        url: 'https://jsonplaceholder.typicode.com/todos/:id',
        method: 'PUT',
        status: 200,
        delay: 5000,
        uploadFrameCount: 100,
        response: {
            id: '1',
            name: 'Item 1',
        },
    },
    {
        url: 'https://jsonplaceholder.typicode.com/todos/:id',
        method: 'PATCH',
        status: 204,
        delay: 5000,
        uploadFrameCount: 100,
        response: null,
    },
    {
        url: 'https://jsonplaceholder.typicode.com/todos/:id',
        method: 'DELETE',
        status: 202,
        delay: 5000,
        uploadFrameCount: 100,
        response: null,
    },
];
const mockCustomFunctionData = [
    {
        url: 'https://jsonplaceholder.typicode.com/todos/:id',
        method: 'GET',
        status: 200,
        delay: 0,
        response: () => {
            return {
                id: '1',
                name: 'Customised name',
            };
        },
    },
    {
        url: 'https://jsonplaceholder.typicode.com/todos',
        method: 'POST',
        status: 201,
        delay: 0,
        response: (request) => {
            return {
                message: `${JSON.parse(request.body).name} is created.`,
            };
        },
    },
    {
        url: 'https://jsonplaceholder.typicode.com/todos/:id',
        method: 'PUT',
        status: 200,
        delay: 0,
        response: (request) => {
            return {
                id: '1',
                name: `${JSON.parse(request.body).name}`,
            };
        },
    },
    {
        url: 'https://jsonplaceholder.typicode.com/todos/:id',
        method: 'PATCH',
        status: 204,
        delay: 0,
        response: () => null,
    },
    {
        url: 'https://jsonplaceholder.typicode.com/todos/:id',
        method: 'DELETE',
        status: 202,
        delay: 0,
        response: () => null,
    },
];

const addDefaultStories = (storyBundle, name, apiFunc, data) => {
    storyBundle
        .add(
            'GET request',
            () => (
                <GetRequest title={`${name} GET Request`} callApi={apiFunc} />
            ),
            {
                mockData: data,
            }
        )
        .add(
            'POST request',
            () => (
                <NonGetRequest
                    title={`${name} POST Request`}
                    method="POST"
                    callApi={apiFunc}
                />
            ),
            {
                mockData: data,
            }
        )
        .add(
            'PUT request',
            () => (
                <NonGetRequest
                    title={`${name} PUT Request`}
                    method="PUT"
                    callApi={apiFunc}
                />
            ),
            {
                mockData: data,
            }
        )
        .add(
            'PATCH request',
            () => (
                <NonGetRequest
                    title={`${name} PATCH Request`}
                    method="PATCH"
                    callApi={apiFunc}
                />
            ),
            {
                mockData: data,
            }
        )
        .add(
            'DELETE request',
            () => (
                <NonGetRequest
                    title={`${name} DELETE Request`}
                    method="DELETE"
                    callApi={apiFunc}
                />
            ),
            {
                mockData: data,
            }
        );
};

const defaultFetchStories = storiesOf(
    'Examples/Default/Fetch',
    module
).addDecorator(withMock);
addDefaultStories(defaultFetchStories, 'Fetch', callFetch, mockData);

const defaultAxiosStories = storiesOf(
    'Examples/Default/Axios',
    module
).addDecorator(withMock);

addDefaultStories(defaultAxiosStories, 'Axios', callAxios, mockData);

const defaultSuperAgentStories = storiesOf(
    'Examples/Default/Superagent',
    module
).addDecorator(withMock);

addDefaultStories(
    defaultSuperAgentStories,
    'Superagent',
    callSuperAgent,
    mockData
);

storiesOf('Examples/Custom Function/Fetch', module)
    .addDecorator(withMock)
    .add(
        'GET request',
        () => <GetRequest title="Fetch GET Request" callApi={callFetch} />,
        {
            mockData: mockCustomFunctionData,
        }
    )
    .add(
        'POST request',
        () => (
            <NonGetRequest
                title="Fetch POST Request"
                method="POST"
                callApi={callFetch}
            />
        ),
        {
            mockData: mockCustomFunctionData,
        }
    )
    .add(
        'PUT request',
        () => (
            <NonGetRequest
                title="Fetch PUT Request"
                method="PUT"
                callApi={callFetch}
            />
        ),
        {
            mockData: mockCustomFunctionData,
        }
    )
    .add(
        'PATCH request',
        () => (
            <NonGetRequest
                title="Fetch PATCH Request"
                method="PATCH"
                callApi={callFetch}
            />
        ),
        {
            mockData: mockCustomFunctionData,
        }
    )
    .add(
        'DELETE request',
        () => (
            <NonGetRequest
                title="Fetch DELETE Request"
                method="DELETE"
                callApi={callFetch}
            />
        ),
        {
            mockData: mockCustomFunctionData,
        }
    );

storiesOf('Examples/Custom Function/Axios', module)
    .addDecorator(withMock)
    .add(
        'GET request',
        () => <GetRequest title="Axios GET Request" callApi={callAxios} />,
        {
            mockData: mockCustomFunctionData,
        }
    )
    .add(
        'POST request',
        () => (
            <NonGetRequest
                title="Axios POST Request"
                method="POST"
                callApi={callAxios}
            />
        ),
        {
            mockData: mockCustomFunctionData,
        }
    )
    .add(
        'PUT request',
        () => (
            <NonGetRequest
                title="Axios PUT Request"
                method="PUT"
                callApi={callAxios}
            />
        ),
        {
            mockData: mockCustomFunctionData,
        }
    )
    .add(
        'PATCH request',
        () => (
            <NonGetRequest
                title="Axios PATCH Request"
                method="PATCH"
                callApi={callAxios}
            />
        ),
        {
            mockData: mockCustomFunctionData,
        }
    )
    .add(
        'DELETE request',
        () => (
            <NonGetRequest
                title="Axios DELETE Request"
                method="DELETE"
                callApi={callAxios}
            />
        ),
        {
            mockData: mockCustomFunctionData,
        }
    );

storiesOf('Examples/Special Cases', module)
    .addDecorator(withMock)
    .add(
        'Axios request with uploadProgress',
        () => (
            <NonGetRequest
                title="Axios POST Request"
                method="POST"
                callApi={callAxios}
            />
        ),
        { mockData: mockWithDelayData }
    )
    .add(
        'Same API calls multiple times',
        () => (
            <SearchParamsRequest
                title="Same API calls multiple times"
                callApi={callFetch}
            />
        ),
        {
            mockData: [
                {
                    url: 'https://jsonplaceholder.typicode.com/todos?id=',
                    method: 'GET',
                    status: 200,
                    delay: 0,
                    response: (request) => {
                        if (request.searchParams.id === '1') {
                            return {
                                id: '1',
                                name: `This is customised for id ${request.searchParams.id}`,
                            };
                        } else if (request.searchParams.id === '2') {
                            return {
                                id: '2',
                                name: `Hello! id ${request.searchParams.id}`,
                            };
                        } else {
                            return {
                                id: '1',
                                name: 'Default name',
                            };
                        }
                    },
                },
            ],
        }
    );
