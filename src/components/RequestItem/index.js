import React from 'react';
import PropTypes from 'prop-types';
import JSONInput from 'react-json-editor-ajrm';
import { Header, Row, Container } from './styled';
import { Field } from '../Field';
import statusTextMap from '../../utils/statusMap';

const statusCodes = Object.keys(statusTextMap);

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
