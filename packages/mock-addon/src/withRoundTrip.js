import { useEffect } from 'react';
import { useChannel, useParameter } from '@storybook/addons';
import { EVENTS, PARAM_KEY } from './utils/constants';
import faker from './utils/faker';

export const withRoundTrip = (storyFn) => {
    const paramData = useParameter(PARAM_KEY, []);

    const emit = useChannel({
        [EVENTS.UPDATE]: (item, name, value) => {
            faker.update(item, name, value);
            emit(EVENTS.SEND, faker.getRequests());
        },
    });

    useEffect(() => {
        faker.makeInitialRequestMap(paramData);
        emit(EVENTS.SEND, faker.getRequests());
    }, [paramData]);

    return storyFn();
};
