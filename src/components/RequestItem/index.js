import React from 'react';
import PropTypes from 'prop-types';
// import { Form } from '@storybook/components';
import JSONInput from 'react-json-editor-ajrm';
import styled from '@emotion/styled';

import statusTextMap from '../../utils/statusMap';

const statusCodes = Object.keys(statusTextMap);

// const Item = styled.div`
//   border: 1px #ddd solid;

//   label:last-child {
//     margin-bottom: 0;
//     border-bottom: none;
//   }
// `;

const Container = styled.div`
    margin: 0 12px;
    border: 1px solid #ddd;
`;

const Header = styled.div`
    font-size: 16px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1 0 0;
`;

const FieldContainer = styled.div`
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

    :last {
        border-bottom: none;
    }
`;

const Label = styled.span`
    font-weight: 700;
`;

const FieldItem = styled.div`
    display: flex;
`;

const Field = ({ label, children }) => (
    <FieldContainer>
        <Label>{label}</Label>
        <FieldItem> {children} </FieldItem>
    </FieldContainer>
);

export const RequestItem = ({
    title,
    url,
    skip,
    method,
    status,
    response,
    onToggle,
    onStatusChange,
    onResponseChange,
}) => {
    return (
        <Container>
            <Header>
                <span>{title}</span>
                <input type="checkbox" checked={!skip} onChange={onToggle} />
            </Header>
            <Field label="URL"> {url} </Field>
            <Row>
                <Field label="Method"> {method} </Field>
                <Field label="Status">
                    <select onChange={onStatusChange}>
                        {statusCodes.map((option) => (
                            <option
                                key={option}
                                selected={option == status.toString()}
                            >
                                {option}
                            </option>
                        ))}
                    </select>
                </Field>
            </Row>

            <Field label="Response">
                <JSONInput
                    onBlur={onResponseChange}
                    placeholder={response}
                    colors={{
                        default: 'black',
                        background: 'white',
                        string: 'black',
                        number: 'black',
                        colon: 'black',
                        keys: 'black',
                        error: 'black',
                    }}
                    style={{
                        // outerBox: {
                        //     overflowY: 'scroll',
                        // },
                        warningBox: {
                            background: 'white',
                        },
                    }}
                    waitAfterKeyPress={1000}
                    height="120px"
                />
            </Field>
        </Container>
    );
};

RequestItem.propTypes = {
    title: PropTypes.string,
    url: PropTypes.string,
    skip: PropTypes.bool,
    method: PropTypes.string,
    status: PropTypes.string,
    response: PropTypes.object,
    onToggle: PropTypes.func,
    onStatusChange: PropTypes.func,
    onResponseChange: PropTypes.func,
};
