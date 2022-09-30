import React from 'react';
import PropTypes from 'prop-types';
import { containerStyles, headerStyles } from './styles';

export const Container = ({ title, children }) => (
    <div style={containerStyles}>
        <div>
            <h2 style={headerStyles}>{title}</h2>
            {children}
        </div>
    </div>
);

Container.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
};
