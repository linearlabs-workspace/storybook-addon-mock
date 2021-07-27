import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '@storybook/react/demo';
import withMock from '../dist';

const ComponentWithAPICall = () => {
    const [item, setItem] = useState();
    const getData = async () => {
        try {
            const response = await fetch(
                'https://jsonplaceholder.typicode.com/todos/1',
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: 'GET',
                }
            );
            const data = await response.json();
            setItem(data);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log(err);
        }
    };

    return (
        <>
            <Button onClick={() => getData()}>
                Click to get mock response
            </Button>
            <pre>{JSON.stringify(item, null, 2)}</pre>
        </>
    );
};
storiesOf('Storybook Addon Mock', module)
    .addDecorator(withMock)
    .add('Getting Mock API Response', () => <ComponentWithAPICall />, {
        mockData: [
            {
                url: 'https://jsonplaceholder.typicode.com/todos/1',
                method: 'GET',
                status: 200,
                response: {
                    data: 'This is a MOCK response!',
                },
            },
            {
                url: 'https://jsonplaceholder.typicode.com/todos/1',
                method: 'POST',
                status: 404,
                response: {
                    data: 'This is a MOCK response!',
                },
            },
        ],
    });
