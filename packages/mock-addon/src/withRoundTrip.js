import { useEffect } from 'react';
import { useChannel, useParameter } from '@storybook/addons';
import { EVENTS, PARAM_KEY, GLOBAL_PARAM_KEY } from './utils/constants';
import faker from './utils/faker';

export const withRoundTrip = (storyFn) => {
    const paramData = useParameter(PARAM_KEY, []);
    const globalParamData = useParameter(GLOBAL_PARAM_KEY, []);

    const emit = useChannel({
        [EVENTS.UPDATE]: (item, name, value) => {
            faker.update(item, name, value);
            emit(EVENTS.SEND, faker.getRequests());
        },
    });

    useEffect(() => {
        const data = [...globalParamData, ...paramData];
        faker.makeInitialRequestMap(data);
        emit(EVENTS.SEND, faker.getRequests());
    }, [paramData, globalParamData]);

    return storyFn();
};
