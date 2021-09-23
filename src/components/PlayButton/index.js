import React from 'react';
import PropTypes from 'prop-types';

export const PlayButton = ({ play, small, onClick }) => {
    const buttonStyles = {
        boxSizing: 'border-box',
        height: small ? '12px' : '24px',
        borderColor: 'transparent transparent transparent #202020',
        transition: '100ms all ease',
        willChange: 'border-width',
        cursor: 'pointer',
        background: 'transparent',
        borderStyle: play ? 'double' : 'solid',
        borderWidth: play
            ? small
                ? '0px 0 0px 12px'
                : '0px 0 0px 24px'
            : '11px 0 11px 22px',
        padding: 0,
    };
    return <button style={buttonStyles} onClick={onClick} />;
};

PlayButton.propTypes = {
    play: PropTypes.bool,
    small: PropTypes.bool,
    onClick: PropTypes.func,
};

PlayButton.defaultProps = {
    play: false,
    small: false,
    onClick: null,
};
