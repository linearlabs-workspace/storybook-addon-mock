import React from 'react';
import PropTypes from 'prop-types';

export const Field = ({ label, children }) => {
    const fieldContainerStyles = {
        display: 'flex',
        flex: '1 0 0',
        flexDirection: 'row',
        justifyContent: label ? 'space-around' : 'flex-start',
        alignItems: 'center',
        borderBottom: '1px solid #ddd',
        padding: '12px',
    };

    const labelStyles = {
        fontWeight: '700',
        flex: '0.3 0 0',
        minWidth: '60px',
        fontSize: '14px',
    };

    const fieldItemStyles = {
        display: 'flex',
        flex: '0.7 0 0',
        fontSize: '14px',
    };

    return (
        <div style={fieldContainerStyles} label={label}>
            {label && <div style={labelStyles}>{label}</div>}
            <div className="storybook-addon-mock-fieldItem" style={fieldItemStyles}>
                <style>{`
                    .storybook-addon-mock-fieldItem > div > div > svg > path {
                        opacity: 0;
                    }
                    .storybook-addon-mock-fieldItem > div > div > div > span > div > div > svg > path {
                        opacity: 0;
                    }
                `}</style>
                {children}
            </div>
        </div>
    )
};

Field.propTypes = {
    label: PropTypes.string,
    children: PropTypes.node,
};

Field.defaultProps = {
    label: '',
    children: null,
};
