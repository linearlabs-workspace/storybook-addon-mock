import React from 'react';
import PropTypes from 'prop-types';

export const PlayButton = ({ play, onClick }) => {
    const buttonStyles = {
        boxSizing: 'border-box',
        height: '24px',
        borderColor: 'transparent transparent transparent #202020',
        transition: '100ms all ease',
        willChange: 'border-width',
        cursor: 'pointer',
        background: 'transparent',
        borderStyle: play ? 'double' : 'solid',
        borderWidth: play ? '0px 0 0px 24px' : '11px 0 11px 22px',
    };
    return <button style={buttonStyles} onClick={onClick} />;
};

PlayButton.propTypes = {
    play: PropTypes.bool,
    onClick: PropTypes.func,
};

PlayButton.defaultProps = {
    play: false,
    onClick: null,
};
