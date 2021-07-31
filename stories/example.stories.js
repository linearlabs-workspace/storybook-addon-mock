import React, { useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { storiesOf } from '@storybook/react';
import { Button } from '@storybook/react/demo';
import withMock from '../dist';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

const ErrorContainer = styled.div`
    color: red;
`;

const MockRequestComponent = () => {
    const [fetchResponse, setFetchResponse] = useState();
    const [fetchStatus, setFetchStatus] = useState();
    const [fetchError, setFetchError] = useState();
    const [axiosResponse, setAxiosResponse] = useState();
    const [axiosError, setAxiosError] = useState();
    const [axiosStatus, setAxiosStatus] = useState();

    const getFetchData = async () => {
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

            if (response.ok) {
                setFetchResponse(data);
                setFetchError();
            } else {
                setFetchResponse();
                setFetchError(data);
            }
            setFetchStatus(response.status);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log(err);
        }
    };

    const getAxiosData = async () => {
        try {
            const response = await axios.get(
                'https://jsonplaceholder.typicode.com/todos/1'
            );
            setAxiosResponse(response.data);
            setAxiosStatus(response.status);
            setAxiosError();
        } catch (error) {
            setAxiosResponse();
            setAxiosError(error.response.data);
            setAxiosStatus(error.response.status);
        }
    };
    return (
        <Container>
            <div>
                <h3>Using fetch</h3>
                <Button onClick={() => getFetchData()}>Click me!</Button>
                <div>
                    {fetchStatus && <div>Status: {fetchStatus}</div>}
                    {fetchError && (
                        <ErrorContainer>
                            Error:
                            <pre>{JSON.stringify(fetchError, null, 2)}</pre>
                        </ErrorContainer>
                    )}
                    {fetchResponse && (
                        <div>
                            Response:
                            <pre>{JSON.stringify(fetchResponse, null, 2)}</pre>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <h3>Using axios</h3>
                <Button onClick={() => getAxiosData()}>Click me!</Button>
                <div>
                    {axiosStatus && <div>Status: {axiosStatus}</div>}
                    {axiosError && (
                        <ErrorContainer>
                            Error:
                            <pre>{JSON.stringify(axiosError, null, 2)}</pre>
                        </ErrorContainer>
                    )}
                    {axiosResponse && (
                        <div>
                            Response:
                            <pre>{JSON.stringify(axiosResponse, null, 2)}</pre>
                        </div>
                    )}
                </div>
            </div>
        </Container>
    );
};
storiesOf('Storybook Addon Mock Request', module)
    .addDecorator(withMock)
    .add('Mocking fetch and axios', () => <MockRequestComponent />, {
        mockData: [
            {
                url: 'https://jsonplaceholder.typicode.com/todos/:id',
                method: 'GET',
                status: 200,
                response: {
                    data: 'This is a MOCK response!',
                },
            },
        ],
    });
