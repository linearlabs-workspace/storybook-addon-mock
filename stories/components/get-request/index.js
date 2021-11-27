import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    buttonStyles,
    inputStyles,
    formStyles,
    labelStyles,
    formGroupStyles,
} from './styles';
import { StoryContainer } from '../story-container';
import { ResponseContainer } from '../response-container';
import { DEFAULT_URL, callAxios, callFetch } from '../../utils';

export const GetRequest = ({ title, isFetch = true }) => {
    const [todoId, setTodoId] = useState('1');
    const [response, setResponse] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = `${DEFAULT_URL}/${todoId}`;

        setLoading(true);
        if (isFetch) {
            const fetchResponse = await callFetch({ url });
            setResponse(fetchResponse);
        } else {
            const axiosResponse = await callAxios({ url });
            setResponse(axiosResponse);
        }
        setLoading(false);
    };

    return (
        <StoryContainer title={title}>
            <form onSubmit={handleSubmit} style={formStyles}>
                <div style={formGroupStyles}>
                    <label style={labelStyles}>Id</label>
                    <input
                        style={inputStyles}
                        name="id"
                        onChange={(event) => setTodoId(event.target.value)}
                        defaultValue={todoId}
                    />
                </div>
                <input type="submit" value="Submit" style={buttonStyles} />
            </form>
            <ResponseContainer loading={loading} {...response} />
        </StoryContainer>
    );
};

GetRequest.propTypes = {
    title: PropTypes.string,
    isFetch: PropTypes.bool,
};
