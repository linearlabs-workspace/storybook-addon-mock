import React, { useState } from 'react';
import { addons, types } from '@storybook/addons';
import { useChannel } from '@storybook/api';
import { AddonPanel, ScrollArea } from '@storybook/components';

import { ADDONS_MOCK_UPDATE_DATA } from './utils/events';
import { RequestItem } from './components/RequestItem';

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

    const onSkip = (item) => {
        emit(ADDONS_MOCK_UPDATE_DATA, {
            item,
            key: 'skip',
            value: !item.skip,
        });
    };

    const onRequestChange = (item, key, value) => {
        emit(ADDONS_MOCK_UPDATE_DATA, {
            item,
            key,
            value,
        });
    };

    return (
        <ScrollArea>
            {mockData.map((item, index) => (
                <RequestItem
                    key={index}
                    url={item.url}
                    skip={item.skip}
                    method={item.method}
                    status={item.status}
                    response={item.response}
                    delay={item.delay}
                    onToggle={() => onSkip(item)}
                    onFieldChange={(value, name) =>
                        onRequestChange(item, name, value)
                    }
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
        const title = 'Mock Request';

        addons.add(PANEL_ID, {
            type: types.PANEL,
            title,
            render,
            paramKey: PARAM_KEY,
        });
    });
}

export default register();
