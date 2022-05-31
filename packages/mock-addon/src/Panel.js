import React, { useEffect } from "react";
import { useAddonState, useChannel, useParameter } from "@storybook/api";
import { AddonPanel } from "@storybook/components";
import { ADDON_ID, EVENTS, PARAM_KEY } from "./utils/constants";
import faker from './utils/faker';
import { PanelContent, PanelContainer } from "./components/PanelContent";

export const Panel = (props) => {
  const [mockData, setState] = useAddonState(ADDON_ID, []);

  const paramData = useParameter(PARAM_KEY, []);
  
  const emit = useChannel({
    [EVENTS.SEND]: (newMockData) => setState(newMockData),
  });

  useEffect(() => {
    faker.makeInitialRequestMap(paramData);
    emit(EVENTS.SEND, faker.getRequests());
  }, [paramData])
  
  // onSkip

  // onRequestChange
  return (
    <AddonPanel {...props}>
      {/* <PanelContent
        results={results}
        fetchData={() => {
          emit(EVENTS.REQUEST);
        }}
        clearData={() => {
          emit(EVENTS.CLEAR);
        }}
      /> */}
      <PanelContainer />
    </AddonPanel>
  );
};
