import axios from 'axios';

const DEFAULT_URL = 'https://jsonplaceholder.typicode.com/todos/1';
const DEFAULT_METHOD = 'GET';

export const callFetch = async (url = DEFAULT_URL, method = DEFAULT_METHOD) => {
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

export const callAxios = async (url = DEFAULT_URL, method = DEFAULT_METHOD) => {
    let data = null;
    let error = null;
    let status = null;

    try {
        const response = await axios({ url, method });
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
