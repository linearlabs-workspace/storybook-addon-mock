import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styled from '@emotion/styled';
import { storiesOf } from '@storybook/react';
import withMock from '../dist';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

const ErrorContainer = styled.div`
    color: red;
`;

const ResponseContainer = styled.div`
    min-width: 300px;
`;

const Button = styled.button`
    border: 1px solid #127ec3;
    border-radius: 3px;
    background-color: #1fa7fd;
    cursor: pointer;
    font-size: 15px;
    padding: 12px;
    margin: 12px 0;
    color: white;
`;

const callFetch = async () => {
    let data = null;
    let error = null;
    let status = null;

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
        const responseData = await response.json();

        if (response.ok) {
            data = responseData;
        } else {
            error = responseData;
        }
        status = response.status;
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        error = err;
    }
    return {
        data,
        error,
        status,
    };
};

const callAxios = async () => {
    let data = null;
    let error = null;
    let status = null;

    try {
        const response = await axios.get(
            'https://jsonplaceholder.typicode.com/todos/1'
        );
        data = response.data;
        status = response.status;
    } catch (err) {
        error = err.response.data;
        status = err.response.status;
    }
    return {
        data,
        error,
        status,
    };
};

const MockExample = ({ title, onRequest }) => {
    const [response, setResponse] = useState({});
    const [loading, setLoading] = useState(false);

    const requestForData = async () => {
        setLoading(true);
        const fetchResponse = await onRequest();
        setLoading(false);
        setResponse(fetchResponse);
    };
    const { data, error, status } = response;
    return (
        <div>
            <h3>{title}</h3>
            <Button onClick={requestForData}>Click me!</Button>
            {loading ? (
                <ResponseContainer>Loading...</ResponseContainer>
            ) : (
                <ResponseContainer>
                    {status && <div>Status: {status}</div>}
                    {error && (
                        <ErrorContainer>
                            Error:
                            <pre>{JSON.stringify(error, null, 2)}</pre>
                        </ErrorContainer>
                    )}
                    {data && (
                        <div>
                            Response:
                            <pre>{JSON.stringify(data, null, 2)}</pre>
                        </div>
                    )}
                </ResponseContainer>
            )}
        </div>
    );
};

MockExample.propTypes = {
    title: PropTypes.string,
    onRequest: PropTypes.func,
};

const MockRequestComponent = () => {
    return (
        <Container>
            <MockExample title="Fetch" onRequest={callFetch} />
            <MockExample title="XHR(Axios)" onRequest={callAxios} />
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
                delay: 0,
                response: {
                    data: 'This is a MOCK response!',
                },
            },
        ],
    });
