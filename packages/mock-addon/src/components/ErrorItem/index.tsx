import React from 'react';
import { styled } from 'storybook/theming';
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

interface ErrorItemProps {
    errors: string[];
    originalRequest: any;
    position: number;
}

export const ErrorItem = ({ errors, originalRequest, position }: ErrorItemProps) => {
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
