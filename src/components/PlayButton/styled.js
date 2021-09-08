import styled from '@emotion/styled';

export const ButtonContainer = styled.button`
    box-sizing: border-box;
    height: 24px;

    border-color: transparent transparent transparent #202020;
    transition: 100ms all ease;
    will-change: border-width;
    cursor: pointer;
    background: transparent;

    border-style: ${({ play }) => (play ? 'double' : 'solid')};
    border-width: ${({ play }) =>
        play ? '0px 0 0px 24px' : '11px 0 11px 22px'};
`;
