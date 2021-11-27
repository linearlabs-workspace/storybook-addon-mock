import React from 'react';
import PropTypes from 'prop-types';
import { UserGuide } from '../user-guide';
import { containerStyles, headerStyles } from './styles';

export const StoryContainer = ({ title, children }) => (
    <div style={containerStyles}>
        <div>
            <div style={headerStyles}>
                <h2>{title}</h2>
            </div>
            {children}
        </div>
        <UserGuide />
    </div>
);

StoryContainer.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
};
