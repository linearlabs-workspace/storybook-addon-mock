import axios from 'axios';
import request from 'superagent';

export const DEFAULT_URL = 'https://jsonplaceholder.typicode.com/todos';
export const DEFAULT_METHOD = 'GET';

export const callFetch = async ({
    method = DEFAULT_METHOD,
    url = DEFAULT_URL,
    body,
}) => {
    let data = null;
    let error = null;
    let status = null;

    try {
        const response = await fetch(url, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method,
            body: body ? JSON.stringify(body) : undefined,
        });
        const responseData = await response.json();

        if (response.ok) {
            data = responseData;
        } else {
            error = responseData;
        }
        status = response.status;
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        error = err;
    }
    return {
        data,
        error,
        status,
    };
};

export const callAxios = async ({
    method = DEFAULT_METHOD,
    url = DEFAULT_URL,
    body,
}) => {
    let data = null;
    let error = null;
    let status = null;

    try {
        const response = await axios({
            url,
            method,
            data: body ? JSON.stringify(body) : undefined,
        });
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

export const callSuperAgent = async ({
    method = DEFAULT_METHOD,
    url = DEFAULT_URL,
    body,
}) => {
    let data = null;
    let error = null;
    let status = null;

    try {
        const response = await request(method, url, body);
        data = response.body;
        status = response.status;
    } catch (err) {
        error = err.message;
        status = err.status;
    }
    return {
        data,
        error,
        status,
    };
};
