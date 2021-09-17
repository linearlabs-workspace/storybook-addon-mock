import React from 'react';
import PropTypes from 'prop-types';
import JSONInput from 'react-json-editor-ajrm';
import enLocale from 'react-json-editor-ajrm/locale/en';
import { Field } from '../Field';
import { PlayButton } from '../PlayButton';
import statusTextMap from '../../utils/statusMap';

const containerStyles = {
    margin: '12px',
    border: '1px solid #ddd',
    borderBottom: 'none',
};

const selectStyles = {
    height: '32px',
    width: '80px',
    borderRadius: '2px',
    border: '1px solid #ddd',
    fontSize: '14px',
    padding: '4px 12px',
};

const inputStyles = {
    height: '32px',
    width: '80px',
    borderRadius: '2px',
    border: '1px solid #ddd',
    fontSize: '14px',
    padding: '4px 12px',
};

const rowStyles = {
    display: 'flex',
    flexDirection: 'row',
    flex: '1 0 0',
};

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
        <div style={containerStyles}>
            <div style={rowStyles}>
                <Field>
                    <PlayButton play={!skip} onClick={onToggle} />
                </Field>
                <Field />
            </div>
            <div style={rowStyles}>
                <Field label="URL"> {url} </Field>
                <Field label="Status">
                    <select style={selectStyles}
                        name="status"
                        onChange={onChangeHandler}
                        value={status.toString()}
                    >
                        {statusCodes.map((option) => (
                            <option key={option}>{option}</option>
                        ))}
                    </select>
                </Field>
            </div>
            <div style={rowStyles}>
                <Field label="Method"> {method} </Field>
                <Field label="Delay (ms)">
                    <input
                        min={0}
                        name="delay"
                        value={delay}
                        type="number"
                        onChange={onChangeHandler}
                        style={inputStyles}
                    />
                </Field>
            </div>
            <div style={rowStyles}>
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
                <Field />
            </div>
        </div>
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
    onFieldChange: PropTypes.func,
};
