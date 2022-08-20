import React from 'react';
import PropTypes from 'prop-types';

import { errorContainerStyles, responseContainerStyles } from './styles';

export const ResponseContainer = ({
    loading,
    uploadProgress,
    status,
    error,
    data,
}) => (
    <>
        {loading ? (
            <div style={responseContainerStyles}>
                Loading...
                {!!uploadProgress && <span>{uploadProgress * 100} %</span>}
            </div>
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

ResponseContainer.propTypes = {
    loading: PropTypes.bool,
    uploadProgress: PropTypes.number,
    status: PropTypes.number,
    error: PropTypes.object,
    data: PropTypes.object,
};
