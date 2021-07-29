import styled from '@emotion/styled';

export const FieldContainer = styled.div`
    display: flex;
    flex: 1 0 0;
    flex-direction: row;
    justify-content: space-around;
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
`;

export const FieldItem = styled.div`
    display: flex;
    flex: 0.7 0 0;
`;
