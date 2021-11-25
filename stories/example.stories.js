import React from 'react';
import { storiesOf } from '@storybook/react';
import { StoryContainer } from './components/story-container';
import withMock from '../dist';
import { callFetch, callAxios } from './utils';
// const callFetch = async () => {
//     let data = null;
//     let error = null;
//     let status = null;

//     try {
//         const response = await fetch(
//             'https://jsonplaceholder.typicode.com/todos/1',
//             {
//                 headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 method: 'GET',
//             }
//         );
//         const responseData = await response.json();

//         if (response.ok) {
//             data = responseData;
//         } else {
//             error = responseData;
//         }
//         status = response.status;
//     } catch (err) {
//         // eslint-disable-next-line no-console
//         console.log(err);
//         error = err;
//     }
//     return {
//         data,
//         error,
//         status,
//     };
// };

// const callAxios = async () => {
//     let data = null;
//     let error = null;
//     let status = null;

//     try {
//         const response = await axios.get(
//             'https://jsonplaceholder.typicode.com/todos/1'
//         );
//         data = response.data;
//         status = response.status;
//     } catch (err) {
//         error = err.response.data;
//         status = err.response.status;
//     }
//     return {
//         data,
//         error,
//         status,
//     };
// };

// const callPostFetch = async () => {
//     let data = null;
//     let error = null;
//     let status = null;

//     try {
//         const response = await fetch(
//             'https://jsonplaceholder.typicode.com/todos/1',
//             {
//                 headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 method: 'POST',
//                 body: JSON.stringify({
//                     name: 'foo',
//                 }),
//             }
//         );
//         const responseData = await response.json();

//         if (response.ok) {
//             data = responseData;
//         } else {
//             error = responseData;
//         }
//         status = response.status;
//     } catch (err) {
//         // eslint-disable-next-line no-console
//         console.log(err);
//         error = err;
//     }
//     return {
//         data,
//         error,
//         status,
//     };
// };

// const callPostAxios = async () => {
//     let data = null;
//     let error = null;
//     let status = null;

//     try {
//         const response = await axios.post(
//             'https://jsonplaceholder.typicode.com/todos/1',
//             { name: 'foo' }
//         );
//         data = response.data;
//         status = response.status;
//     } catch (err) {
//         error = err.response.data;
//         status = err.response.status;
//     }
//     return {
//         data,
//         error,
//         status,
//     };
// };

const mockData = [
    {
        url: 'https://jsonplaceholder.typicode.com/todos/:id',
        method: 'GET',
        status: 200,
        delay: 0,
        response: {
            data: 'Hello storybook-addon-mock!',
        },
    },
];

const mockCustomFunctionData = [
    {
        url: 'https://jsonplaceholder.typicode.com/todos/:id',
        method: 'POST',
        status: 200,
        delay: 0,
        response: (req) => {
            return { data: `Hello ${req}` };
        },
    },
];

storiesOf('Storybook Addon Mock/Default Behaviour', module)
    .addDecorator(withMock)
    .add(
        'Fetch request',
        () => <StoryContainer title="Fetch" onRequest={callFetch} />,
        { mockData }
    )
    .add(
        'Axios request',
        () => <StoryContainer title="Axios(XHR)" onRequest={callAxios} />,
        { mockData }
    );

storiesOf('Storybook Addon Mock/Custom Function', module)
    .addDecorator(withMock)
    .add(
        'Fetch request',
        () => <StoryContainer title="Fetch" onRequest={callFetch} />,
        { mockData: mockCustomFunctionData }
    )
    .add(
        'Axios request',
        () => <StoryContainer title="Axios(XHR)" onRequest={callAxios} />,
        { mockData: mockCustomFunctionData }
    );
