import React from 'react';
import PropTypes from 'prop-types';
import { Form } from '@storybook/components';
import JSONInput from 'react-json-editor-ajrm';
// import styled from "@emotion/styled";

import statusTextMap from '../utils/statusMap';

const statusCodes = Object.keys(statusTextMap);

// const Item = styled.div`
//   border: 1px #ddd solid;

//   label:last-child {
//     margin-bottom: 0;
//     border-bottom: none;
//   }
// `;

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
        <>
            <Form.Field label={title}>
                <input type="checkbox" checked={!skip} onChange={onToggle} />
            </Form.Field>
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
                    }}
                    waitAfterKeyPress={1000}
                    height="100px"
                />
            </Form.Field>
        </>
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
