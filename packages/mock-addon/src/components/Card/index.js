import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { ButtonToggle } from '../ButtonToggle';

const Container = styled.div`
    margin: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: rgb(0 0 0 / 10%) 0px 1px 3px 0px;
`;

const Header = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0.5rem 1rem;
`;

const Content = styled.div`
    opacity: ${(props) => (props.enabled ? 1 : 0.5)};
    pointer-events: ${(props) => (props.enabled ? 'inherit' : 'none')};
    padding: 0 0.75rem;

    > label:last-child {
        padding: 1rem;
        margin-bottom: 0;
    }
`;

export const Card = ({
    children,
    onToggle,
    enabled = true,
    showHeader = true,
}) => {
    return (
        <Container>
            {showHeader && (
                <Header>
                    <ButtonToggle
                        name="Enabled"
                        value={enabled}
                        onChange={onToggle}
                    />
                </Header>
            )}
            <Content enabled={enabled}>{children}</Content>
        </Container>
    );
};

Card.propTypes = {
    children: PropTypes.node.isRequired,
    onToggle: PropTypes.func,
    enabled: PropTypes.bool,
    showHeader: PropTypes.bool,
};

Card.defaultProps = {
    showHeader: true,
    enabled: true,
};
