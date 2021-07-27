import React, { useState } from "react";
import JSONInput from "react-json-editor-ajrm";
import { addons, types } from "@storybook/addons";
import { useChannel } from "@storybook/api";
import { AddonPanel, ScrollArea, Form } from "@storybook/components";
// import { SelectControl } from '@storybook/components/controls';
import styled from "@emotion/styled";
import { ADDONS_MOCK_SET_SKIP } from "./utils/events";
import statusTextMap from "./utils/statusMap";

const Item = styled.div`
  border: 1px #ddd solid;

  label:last-child {
    margin-bottom: 0;
    border-bottom: none;
  }
`;

const ADDON_ID = "mockAddon";
const PARAM_KEY = "mockAddon";
const PANEL_ID = `${ADDON_ID}/panel`;

const statusCodes = Object.keys(statusTextMap);

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
      {mockData.map((item, index) => (
        <Item key={index}>
          <Form.Field label="Mocked">
            <input
              type="checkbox"
              checked={!item.skip}
              onChange={() => setSkip(item)}
            />
          </Form.Field>
          <Form.Field label="URL"> {item.url} </Form.Field>
          <Form.Field label="Method"> {item.method} </Form.Field>
          {/* <Form.Field label="Response">
            {" "}
            <code>{JSON.stringify(item.response, null, 2)}</code>
            <textarea />
          </Form.Field> */}
          <Form.Field label="Status">
            <select>
              {statusCodes.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Form.Field>
          <Form.Field label="Response">
            <JSONInput
              id="a_unique_id"
              placeholder={item.response}
              colors={{
                default: '#D4D4D4',
                background: 'white',
                string: 'black',
                number: 'black',
                colon: 'black',
                keys: 'black',
              }}
              waitAfterKeyPress={1000}
              height="200px"
            />
          </Form.Field>
        </Item>
      ))}
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
    const title = "Mock Request";

    addons.add(PANEL_ID, {
      type: types.PANEL,
      title,
      render,
      paramKey: PARAM_KEY,
    });
  });
}

export default register();
