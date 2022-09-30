import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import {
    Form,
    ObjectControl,
    Placeholder,
    RangeControl,
    TabsState,
} from '@storybook/components';
import { Card } from '../Card';
import statusTextMap from '../../utils/statusMap';

const statusCodes = Object.keys(statusTextMap);

const { Field: SBField, Select } = Form;

const ObjectContent = styled.div`
    display: flex;
    flex: 1 0 0;
    padding: 1rem;

    > div {
        flex: 1 0 0;
    }
`;

const Method = styled.div`
    padding: 0.75rem;
    font-weight: 700;
    border-right: 1px solid #ddd;
`;

const Url = styled.div`
    padding: 0.75rem;
    flex: 1;
`;

const UrlMethodContainer = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    background: #eee;
    border-radius: 5px;
`;

const StatusDelayContainer = styled.div`
    display: flex;
    align-items: center;
    flex: 1 0 0;

    > label:last-child {
        margin-bottom: 0;
    }
`;

const Field = styled(SBField)`
    border: none;
    padding: 1rem 0 0.25rem 0;
    flex: 0.5;
    margin: 0;

    > span {
        min-width: 0;
    }
`;

export const MockItem = ({
    id,
    url,
    method,
    status,
    skip,
    response,
    delay,
    onChange,
}) => {
    return (
        <Card onToggle={(value) => onChange('skip', !value)} enabled={!skip}>
            <UrlMethodContainer>
                <Method>{method}</Method>
                <Url>{url}</Url>
            </UrlMethodContainer>
            <StatusDelayContainer>
                <Field label="Status">
                    <Select
                        onChange={(event) =>
                            onChange('status', event.target.value)
                        }
                        value={status}
                        name="status"
                    >
                        {statusCodes.map((code) => (
                            <option key={code} value={code}>
                                {code} - {statusTextMap[code]}
                            </option>
                        ))}
                    </Select>
                </Field>
                <Field label="Delay">
                    <RangeControl
                        name="delay"
                        value={delay}
                        onChange={(value) => onChange('delay', value)}
                        min={0}
                        max={10000}
                        step={500}
                    />
                </Field>
            </StatusDelayContainer>
            <TabsState initial={`response${id}`}>
                <div id={`response${id}`} title="Response">
                    {typeof response === 'function' ? (
                        <Placeholder>
                            This is a custom function. You can only change it
                            from the declaration.
                        </Placeholder>
                    ) : (
                        <ObjectContent>
                            <ObjectControl
                                name=""
                                value={response}
                                onChange={(value) =>
                                    onChange('response', value)
                                }
                            />
                        </ObjectContent>
                    )}
                </div>
            </TabsState>
        </Card>
    );
};

MockItem.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    url: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    status: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    skip: PropTypes.bool.isRequired,
    response: PropTypes.any,
    delay: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};
