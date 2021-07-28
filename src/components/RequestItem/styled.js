import styled from '@emotion/styled';

export const Container = styled.div`
    margin: 12px;
    border: 1px solid #ddd;
    border-bottom: none;
`;

export const Header = styled.div`
    font-size: 16px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    border-bottom: 1px solid #ddd;

    > input {
        height: 20px;
        width: 20px;
    }
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1 0 0;
`;
