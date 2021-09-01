import React from 'react';
import PropTypes from 'prop-types';
import JSONInput from 'react-json-editor-ajrm';
import enLocale from 'react-json-editor-ajrm/locale/en';
import { Checkbox, Row, Container, Select, Input } from './styled';
import { Field } from '../Field';
import statusTextMap from '../../utils/statusMap';

const statusCodes = Object.keys(statusTextMap);

export const RequestItem = ({
    url,
    skip,
    method,
    status,
    response,
    delay,
    onToggle,
    onFieldChange,
}) => {
    const onChangeHandler = ({ target }) => {
        const { name, value, type } = target;

        if (type === 'number') {
            onFieldChange(+value, name);
        } else {
            onFieldChange(value, name);
        }
    };

    return (
        <Container>
            <Row>
                <Field label="URL"> {url} </Field>
                <Field label="Enable mock">
                    <Checkbox
                        type="checkbox"
                        checked={!skip}
                        onChange={onToggle}
                    />
                </Field>
            </Row>
            <Row>
                <Field label="Method"> {method} </Field>
                <Field label="Status">
                    <Select
                        name="status"
                        onChange={onChangeHandler}
                        value={status.toString()}
                    >
                        {statusCodes.map((option) => (
                            <option key={option}>{option}</option>
                        ))}
                    </Select>
                </Field>
            </Row>
            <Row>
                <Field />
                <Field label="Delay">
                    <Input
                        min={0}
                        name="delay"
                        value={delay}
                        type="number"
                        onChange={onChangeHandler}
                    />
                </Field>
            </Row>

            <Field label="Response">
                <JSONInput
                    name="response"
                    locale={enLocale}
                    onBlur={(value) =>
                        onFieldChange(value.jsObject, 'response')
                    }
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
                        body: {
                            fontFamily: 'inherit',
                            fontSize: '12px',
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
    url: PropTypes.string,
    skip: PropTypes.bool,
    method: PropTypes.string,
    delay: PropTypes.number,
    status: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    response: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onToggle: PropTypes.func,
    onStatusChange: PropTypes.func,
    onResponseChange: PropTypes.func,
    onFieldChange: PropTypes.func,
};
