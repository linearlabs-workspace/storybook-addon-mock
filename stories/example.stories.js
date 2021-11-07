import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { storiesOf } from '@storybook/react';
import { UserGuide } from './components/user-guide';
import withMock from '../dist';
import * as faker from 'faker';

const fakeyMcFakeData = Array.from(Array(50)).map(() => {
    const id = faker.random.uuid();
    const first_name = faker.name.firstName();
    const last_name = faker.name.firstName();
    return {
        id,
        email: `${first_name.toLowerCase()}.${last_name.toLowerCase()}@fake-email.com`,
        first_name,
        last_name,
    };
});

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
    minHeight: '130px',
    background: '#ddd',
    margin: '6px',
    padding: '12px',
};

const headerStyles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '6px',
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

const inputStyles = {
    border: '1px solid #127ec3',
    borderRadius: '3px',
    fontSize: '15px',
    padding: '12px',
    margin: '12px 0 12px 10px',
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

const callSearchAxios = async ({ search = '' }) => {
    let data = null;
    let error = null;
    let status = null;
    try {
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/todos?search=${search}&lite=true`
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

const callSearchFetch = async ({ search = '' }) => {
    let data = null;
    let error = null;
    let status = null;

    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/todos?search=${search}&lite=true`,
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
        <div style={containerStyles}>
            <div>
                <div style={headerStyles}>
                    <h2>{title}</h2>
                    <button style={buttonStyles} onClick={requestForData}>
                        Request
                    </button>
                </div>
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
            <UserGuide />
        </div>
    );
};

const MockSearchExample = ({ title, onRequest }) => {
    const [response, setResponse] = useState({});
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    const requestForData = async (search) => {
        setLoading(true);
        const fetchResponse = await onRequest({ search });
        setLoading(false);
        setResponse(fetchResponse);
    };
    const { data, error, status } = response;

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        requestForData(event.target.value);
    };
    useEffect(() => {
        requestForData(search);
    }, []);
    return (
        <div style={containerStyles}>
            <div>
                <div style={headerStyles}>
                    <h2>{title}</h2>
                    <input
                        style={inputStyles}
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>
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
            <UserGuide />
        </div>
    );
};

MockExample.propTypes = {
    title: PropTypes.string,
    onRequest: PropTypes.func,
};

const mockData = [
    {
        url: 'https://jsonplaceholder.typicode.com/todos?search=:search&lite=true',
        method: 'GET',
        status: 200,
        delay: 0,
        response: fakeyMcFakeData,

        searchFunc: (data, searchParamEntries) => {
            return searchParamEntries.search === ''
                ? data
                : data.filter(({ first_name, last_name }) => {
                      return (
                          first_name
                              .toLowerCase()
                              .startsWith(searchParamEntries.search) ||
                          last_name
                              .toLowerCase()
                              .startsWith(searchParamEntries.search)
                      );
                  });
        },
    },
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

storiesOf('Storybook-addon-mock', module)
    .addDecorator(withMock)
    .add(
        'Fetch request',
        () => <MockExample title="Fetch" onRequest={callFetch} />,
        { mockData }
    )
    .add(
        'Axios request',
        () => <MockExample title="Axios(XHR)" onRequest={callAxios} />,
        { mockData }
    )
    .add(
        'Axios Search request',
        () => (
            <MockSearchExample
                title="Axios Search"
                onRequest={callSearchAxios}
            />
        ),
        { mockData }
    )
    .add(
        'Fetch Search request',
        () => (
            <MockSearchExample
                title="Fetch Search"
                onRequest={callSearchFetch}
            />
        ),
        { mockData }
    );
