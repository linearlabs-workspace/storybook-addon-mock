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
import { DEFAULT_URL } from '../../utils';

export const NonGetRequest = ({ title, method, callApi }) => {
    const [todoId, setTodoId] = useState('1');
    const [todoName, setTodoName] = useState('Item 1');
    const [response, setResponse] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url =
            method === 'POST' ? DEFAULT_URL : `${DEFAULT_URL}/${todoId}`;

        setLoading(true);
        const apiResponse = await callApi({
            url,
            method,
            body: { name: todoName },
        });
        setResponse(apiResponse);
        setLoading(false);
    };

    return (
        <StoryContainer title={title}>
            <form onSubmit={handleSubmit} style={formStyles}>
                {method !== 'POST' && (
                    <div style={formGroupStyles}>
                        <label style={labelStyles}>Id</label>
                        <input
                            style={inputStyles}
                            name="id"
                            onChange={(event) => setTodoId(event.target.value)}
                            defaultValue={todoId}
                        />
                    </div>
                )}

                {method !== 'DELETE' && (
                    <div style={formGroupStyles}>
                        <label style={labelStyles}>Name</label>
                        <input
                            style={inputStyles}
                            name="name"
                            onChange={(event) =>
                                setTodoName(event.target.value)
                            }
                            defaultValue={todoName}
                        />
                    </div>
                )}
                <input type="submit" value="Submit" style={buttonStyles} />
            </form>
            <ResponseContainer loading={loading} {...response} />
        </StoryContainer>
    );
};

NonGetRequest.propTypes = {
    title: PropTypes.string,
    method: PropTypes.string,
    callApi: PropTypes.func.isRequired,
};
