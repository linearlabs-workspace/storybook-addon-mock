import React from 'react';
import { styled } from '@storybook/theming';
import PropTypes from 'prop-types';
import { Card } from '../Card';

const Container = styled.div`
    padding: 1rem;
`;

const H3 = styled.h3`
    font-weight: 500;
    margin-top: 1rem;
`;

const Li = styled.li`
    color: #ff4685;
    font-style: italic;
`;

export const ErrorItem = ({ errors, originalRequest, position }) => {
    return (
        <Card showHeader={false}>
            <Container>
                <code>{JSON.stringify(originalRequest, null, 2)}</code>
                <H3>mockData[{position}] has the following errors</H3>
                <ul>
                    {errors.map((error, index) => (
                        <Li key={index}>{error}</Li>
                    ))}
                </ul>
            </Container>
        </Card>
    );
};

ErrorItem.propTypes = {
    errors: PropTypes.arrayOf(PropTypes.string),
    originalRequest: PropTypes.any,
    position: PropTypes.number,
};
