import React from 'react';
import PropTypes from 'prop-types';
import { containerStyles, contentStyles, headerStyles } from './styles';

export const Container = ({ title, children }) => (
    <div style={containerStyles}>
        <div style={contentStyles}>
            <h2 style={headerStyles}>{title}</h2>
            {children}
        </div>
    </div>
);

Container.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
};
