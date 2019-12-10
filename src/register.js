import React, { useState } from 'react';
import { addons, types } from '@storybook/addons';
import { useChannel, useParameter } from '@storybook/api';
import { AddonPanel } from '@storybook/components';

const ADDON_ID = 'mockAddon';
const PARAM_KEY = 'mockAddon';
const PANEL_ID = `${ADDON_ID}/panel`;

const MyPanel = () => {
    // const mockData = useParameter('mockData', []);
    const [mockData, setMockData] = useState([]);
    const emit = useChannel({
        STORY_RENDERED: id => { /* do something */ },
        'addons/mock/send': (parameters) => { 
            setMockData(parameters);
        },
      });

    const setSkip = (item) => {
        emit('addons/mock/receive', item);
    }  
    
    return (
        <>
            {
                mockData.map((item, index) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            checked={!item.skip}
                            onChange={() => setSkip(item)}
                        />
                        <pre key={index}>{JSON.stringify(item, null, 2)}</pre>
                    </div>
                ))
            }
            <div>hello</div>
        </>
    );
}


addons.register(ADDON_ID, api => {
  const render = ({ active, key }) => (
    <AddonPanel active={active} key={key}>
      <MyPanel />
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