import styled from '@emotion/styled';

export const FieldContainer = styled.div`
    display: flex;
    flex: 1 0 0;
    flex-direction: row;
    justify-content: ${({ label }) => (label ? 'space-around' : 'flex-start')};
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding: 12px;

    :first {
        border-top: 1px solid #ddd;
    }
`;

export const Label = styled.div`
    font-weight: 700;
    flex: 0.3 0 0;
    min-width: 60px;
    font-size: 14px;
`;

export const FieldItem = styled.div`
    display: flex;
    flex: 0.7 0 0;
    font-size: 14px;

    > div > div > svg > path {
        opacity: 0;
    }
    > div > div > div > span > div > div > svg > path {
        opacity: 0;
    }
`;
