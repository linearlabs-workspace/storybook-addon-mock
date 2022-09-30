import { useEffect } from 'react';
import { FORCE_RE_RENDER } from '@storybook/core-events';
import { useChannel, useParameter } from '@storybook/addons';
import { EVENTS, PARAM_KEY, GLOBAL_PARAM_KEY } from './utils/constants';
import faker from './utils/faker';

export const withRoundTrip = (storyFn) => {
    const paramData = useParameter(PARAM_KEY, []);
    const mockAddonConfigs = useParameter(GLOBAL_PARAM_KEY, {
        refreshStoryOnUpdate: false,
        globalMockData: [],
    });

    const emit = useChannel({
        [EVENTS.UPDATE]: (item, name, value) => {
            faker.update(item, name, value);

            const { refreshStoryOnUpdate } = mockAddonConfigs;
            const req = faker.getRequests();
            emit(EVENTS.SEND, req);
            refreshStoryOnUpdate && emit(FORCE_RE_RENDER);
        },
    });

    useEffect(() => {
        const { globalMockData } = mockAddonConfigs;
        const data = [...globalMockData, ...paramData];
        faker.makeInitialRequestMap(data);
        emit(EVENTS.SEND, faker.getRequests());
    }, []);

    return storyFn();
};
