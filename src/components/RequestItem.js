import React from 'react';
import PropTypes from 'prop-types';
import { Form } from '@storybook/components';
import JSONInput from 'react-json-editor-ajrm';
import styled from "@emotion/styled";

import statusTextMap from '../utils/statusMap';

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
`;

const Header = styled.div`
    font-size: 16px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
`;



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
            <Form.Field label="URL"> {url} </Form.Field>
            <Form.Field label="Method"> {method} </Form.Field>
            <Form.Field label="Status">
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
            </Form.Field>
            <Form.Field label="Response">
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
                        outerBox: {
                            overflow: 'scroll',
                        },
                        warningBox: {
                            background: 'white',
                        }
                    }}
                    waitAfterKeyPress={1000}
                    height="120px"
                />
            </Form.Field>
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
