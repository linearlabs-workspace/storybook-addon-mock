import React from 'react';
import PropTypes from 'prop-types';
import { ButtonContainer } from './styled';

export const PlayButton = ({ play, onClick }) => {
    return <ButtonContainer play={play} onClick={onClick} />;
};

PlayButton.propTypes = {
    play: PropTypes.bool,
    onClick: PropTypes.func,
};

PlayButton.defaultProps = {
    play: false,
    onClick: null,
};
