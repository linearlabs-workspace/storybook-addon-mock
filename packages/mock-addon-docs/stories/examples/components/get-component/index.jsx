import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LinkTo from '@storybook/addon-links/react';

import {
    contentStyles,
    buttonStyles,
    inputStyles,
    formStyles,
    labelStyles,
    formGroupStyles,
    headerStyles,
} from './styles';
import { Container } from '../container';
import { Response } from '../response';
import { DEFAULT_URL } from '../../utils';

export const GetComponent = ({ title, callApi, code }) => {
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
            <div style={contentStyles}>
                <div>
                    <h3 style={headerStyles}>Sample form</h3>
                    <form onSubmit={handleSubmit} style={formStyles}>
                        <div style={formGroupStyles}>
                            <label style={labelStyles}>Id</label>
                            <input
                                style={inputStyles}
                                name="id"
                                onChange={(event) =>
                                    setTodoId(event.target.value)
                                }
                                defaultValue={todoId}
                            />
                        </div>
                        <input
                            type="submit"
                            value="Submit"
                            style={buttonStyles}
                        />
                    </form>
                    <Response loading={loading} {...response} />
                </div>
                <div>
                    {code && (
                        <span>
                            {' '}
                            To see the custom function implementation, go to{' '}
                            <LinkTo kind="Docs/Advanced Setup" story="page">
                                Advanced Setup &gt; 3. Custom response function
                            </LinkTo>
                        </span>
                    )}
                </div>
            </div>
        </Container>
    );
};

GetComponent.propTypes = {
    title: PropTypes.string,
    callApi: PropTypes.func.isRequired,
    code: PropTypes.string,
};
