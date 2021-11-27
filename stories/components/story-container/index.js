import React from 'react';
import PropTypes from 'prop-types';
import { UserGuide } from '../user-guide';
import { containerStyles, headerStyles } from './styles';

export const StoryContainer = ({ title, children }) => (
    <div style={containerStyles}>
        <div>
            <h2 style={headerStyles}>{title}</h2>
            {children}
        </div>
        <UserGuide />
    </div>
);

StoryContainer.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
};
