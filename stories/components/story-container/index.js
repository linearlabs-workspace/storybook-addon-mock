import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { UserGuide } from '../user-guide';
import {
    containerStyles,
    headerStyles,
    buttonStyles,
    errorContainerStyles,
    responseContainerStyles,
} from './styles';

export const StoryContainer = ({ title, onRequest }) => {
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

StoryContainer.propTypes = {
    title: PropTypes.string,
    onRequest: PropTypes.func,
};
