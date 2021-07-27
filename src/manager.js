import React, { useState } from "react";
import { addons, types } from "@storybook/addons";
import { useChannel } from "@storybook/api";
import { AddonPanel, ScrollArea } from "@storybook/components";

import { ADDONS_MOCK_UPDATE_STATE } from "./utils/events";
import { RequestItem } from "./components/RequestItem";

const ADDON_ID = "mockAddon";
const PARAM_KEY = "mockAddon";
const PANEL_ID = `${ADDON_ID}/panel`;

const MockPanel = () => {
  const [mockData, setMockData] = useState([]);
  const emit = useChannel({
    ADDONS_MOCK_SEND_DATA: (parameters) => {
      setMockData(parameters);
    },
  });

  const onSkip = (item) => {
    emit(ADDONS_MOCK_UPDATE_STATE, item, "skip", !item.skip);
  };

  const onStatusChange = (item, value) => {
    emit(ADDONS_MOCK_UPDATE_STATE, item, "status", value);
  };

  const onResponseChange = (item, value) => {
    emit(ADDONS_MOCK_UPDATE_STATE, item, "response", value);
  };

  return (
    <ScrollArea>
      {mockData.map((item, index) => (
        <RequestItem
          key={index}
          title={item.name || `Request ${index + 1}`}
          url={item.url}
          skip={item.skip}
          method={item.method}
          status={item.status}
          response={item.response}
          onToggle={() => onSkip(item)}
          onStatusChange={(event) => onStatusChange(item, event.target.value)}
          onResponseChange={(value) => onResponseChange(item, value.jsObject)}
        />
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
