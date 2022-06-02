import React, { useState } from "react";
import { styled } from "@storybook/theming";
import { Badge, Form, Link, ObjectControl, Placeholder, RangeControl } from "@storybook/components";
import { Card } from '../Card';
import statusTextMap from '../../utils/statusMap';

const statusCodes = Object.keys(statusTextMap);

const { Field, Select } = Form;

const FieldContent = styled.div`
  display: flex;
  align-items: center;
  flex: 1 0 0;

  > div:first-child {
    margin-right: 0.75rem;
  }
`;

const ObjectContent = styled.div`
  display: flex;
  flex: 1 0 0;

  > div {
    flex: 1 0 0;
  }
`;


export const MockItem = ({
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
      <Field label="URL">
        <FieldContent>
          <Badge status="positive">{method}</Badge>
          <Link>{url}</Link>
        </FieldContent>
      </Field>
      <Field label="Status code">
        <Select onChange={(event) => onChange('status', event.target.value)} value={status} name="status">
          {
            statusCodes.map((code) => <option key={code}>{code}</option>)
          }
        </Select>
      </Field>
      <Field label="Response">
        {
          typeof response === 'function' ?
            <Placeholder>
                This is a custom function. You can only change it
                from the declaration.
            </Placeholder>
            : <ObjectContent>
              <ObjectControl
                name="response"
                value={response}
                onChange={(value) => onChange('response', value)}
              />
            </ObjectContent>
        }
      </Field>
      <Field label="Delay (ms)">
        <RangeControl
          name="delay"
          value={delay}
          onChange={(value) => onChange('delay', value)}
          min={0}
          max={10000}
          step={500}
        />
      </Field>
    </Card>
  )
};
