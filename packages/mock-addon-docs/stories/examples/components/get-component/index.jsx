import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    buttonStyles,
    inputStyles,
    formStyles,
    labelStyles,
    formGroupStyles,
} from './styles';
import { Container } from '../container';
import { Response } from '../response';
import { DEFAULT_URL } from '../../utils';

export const GetComponent = ({ title, callApi }) => {
    const [todoId, setTodoId] = useState('1');
    const [response, setResponse] = useState({});
    const [loading, setLoading] = useState(false);
    const url = `${DEFAULT_URL}/${todoId}`;

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const apiResponse = await callApi({ url });
        setResponse(apiResponse);
        setLoading(false);
    };

    return (
        <Container title={title}>
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
            <Response loading={loading} {...response} />
        </Container>
    );
};

GetComponent.propTypes = {
    title: PropTypes.string,
    callApi: PropTypes.func.isRequired,
};
