import React, { useState } from 'react';
import { addons, types } from '@storybook/addons';
import { useChannel } from '@storybook/api';
import { AddonPanel, ScrollArea, Form } from '@storybook/components';
import styled from '@emotion/styled';
import { ADDONS_MOCK_SET_SKIP } from './utils/events';

const Checkbox = styled.div`
  input[type=checkbox]:checked {
    background: #1EA7FD;
  }
`;

const Item = styled.div`
  border: 1px #ddd solid;

  label:last-child {
    margin-bottom: 0;
    border-bottom: none;
  }
`;

const ADDON_ID = 'mockAddon';
const PARAM_KEY = 'mockAddon';
const PANEL_ID = `${ADDON_ID}/panel`;

const MockPanel = () => {
  const [mockData, setMockData] = useState([]);
  const emit = useChannel({
    ADDONS_MOCK_SEND_DATA: (parameters) => {
      setMockData(parameters);
    },
  });

  const setSkip = (item) => {
    emit(ADDONS_MOCK_SET_SKIP, item);
  };

  return (
    <ScrollArea>
      {
        mockData.map((item, index) => (
          <Item key={index}>
            <Form.Field label="Enabled">
              <Checkbox>
                <Form.Input
                  type="checkbox"
                  checked={!item.skip}
                  onChange={() => setSkip(item)}
                />
              </Checkbox>
            </Form.Field>
            <Form.Field label="URL">
              {' '}
              {item.url}
              {' '}
            </Form.Field>
            <Form.Field label="Method">
              {' '}
              {item.method}
              {' '}
            </Form.Field>
            <Form.Field label="Response">
              {' '}
              <code>{JSON.stringify(item.response, null, 2)}</code>
            </Form.Field>
            <Form.Field label="Headers">
              {' '}
              <code>{JSON.stringify(item.headers, null, 2)}</code>
            </Form.Field>
          </Item>
        ))
      }
    </ScrollArea>
  );
};

function register() {
  addons.register(ADDON_ID, () => {
    // eslint-disable-next-line react/prop-types
    const render = ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <MockPanel />
      </AddonPanel>
    );
    const title = 'Mock';

    addons.add(PANEL_ID, {
      type: types.PANEL,
      title,
      render,
      paramKey: PARAM_KEY,
    });
  });
}

export default register();
