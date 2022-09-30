import React from 'react';
import PropTypes from 'prop-types';

import { errorContainerStyles, responseContainerStyles } from './styles';

export const Response = ({ loading, status, error, data }) => (
    <>
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
    </>
);

Response.propTypes = {
    loading: PropTypes.bool,
    status: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    error: PropTypes.object,
    data: PropTypes.object,
};
