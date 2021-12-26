import React from 'react';
import PropTypes from 'prop-types';
import JSONInput from 'react-json-editor-ajrm';
import enLocale from 'react-json-editor-ajrm/locale/en';
import { Field } from '../Field';
import { GlobalStyles } from '../GlobalStyles';
import { PlayButton } from '../PlayButton';
import statusTextMap from '../../utils/statusMap';
import {
    containerStyles,
    rowStyles,
    selectStyles,
    inputStyles,
    noteStyles,
} from './styles';

const statusCodes = Object.keys(statusTextMap);

export const RequestItem = ({
    url,
    skip,
    method,
    status,
    response,
    delay,
    ignoreParams,
    onToggle,
    onFieldChange,
}) => {
    const onChangeHandler = ({ target }) => {
        const { name, value, type } = target;

        if (type === 'number') {
            onFieldChange(+value, name);
        } else if (value === 'false' || value === 'true') {
            onFieldChange(value === 'true', name);
        } else {
            onFieldChange(value, name);
        }
    };

    return (
        <div style={containerStyles}>
            <GlobalStyles />
            <div style={rowStyles}>
                <Field>
                    <PlayButton play={!skip} onClick={onToggle} />
                </Field>
                <Field />
            </div>
            <div style={rowStyles}>
                <Field label="URL"> {url} </Field>
                <Field label="Status">
                    <select
                        style={selectStyles}
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
                    {typeof response === 'function' ? (
                        <div style={noteStyles}>
                            This is a custom function. You can only change it
                            from the declaration.
                        </div>
                    ) : (
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
                                    background: '#ddd',
                                },
                                body: {
                                    fontFamily: 'inherit',
                                    fontSize: '12px',
                                },
                            }}
                            waitAfterKeyPress={1000}
                            height="120px"
                        />
                    )}
                </Field>
                <Field label="Ignore Params">
                    <input
                        type="radio"
                        name="ignoreParams"
                        value="true"
                        onChange={onChangeHandler}
                        checked={ignoreParams}
                    />{' '}
                    true
                    <input
                        type="radio"
                        name="ignoreParams"
                        value="false"
                        onChange={onChangeHandler}
                        checked={ignoreParams}
                    />{' '}
                    false
                </Field>
            </div>
        </div>
    );
};

RequestItem.propTypes = {
    url: PropTypes.string,
    skip: PropTypes.bool,
    method: PropTypes.string,
    delay: PropTypes.number,
    ignoreParams: PropTypes.bool,
    status: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    response: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
        PropTypes.func,
    ]),
    onToggle: PropTypes.func,
    onFieldChange: PropTypes.func,
};
