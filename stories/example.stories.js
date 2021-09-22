import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { storiesOf } from '@storybook/react';
import withMock from '../dist';

const containerStyles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
};

const errorContainerStyles = {
    color: 'red',
};

const responseContainerStyles = {
    minWidth: '300px',
};

const buttonStyles = {
    border: '1px solid #127ec3',
    borderRadius: '3px',
    backgroundColor: '#1fa7fd',
    cursor: 'pointer',
    fontSize: '15px',
    padding: '12px',
    margin: '12px 0',
    color: 'white',
};

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
            <button style={buttonStyles} onClick={requestForData}>
                Click me!
            </button>
            {loading ? (
                <div style={responseContainerStyles}>Loading...</div>
            ) : (
                <div style={responseContainerStyles}>
                    {status && <div>Status: {status}</div>}
                    {error && (
                        <div style={errorContainerStyles}>
                            Error:
                            <pre>{JSON.stringify(error, null, 2)}</pre>
                        </div>
                    )}
                    {data && (
                        <div>
                            Response:
                            <pre>{JSON.stringify(data, null, 2)}</pre>
                        </div>
                    )}
                </div>
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
        <div style={containerStyles}>
            <MockExample title="Fetch" onRequest={callFetch} />
            <MockExample title="XHR(Axios)" onRequest={callAxios} />
        </div>
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
