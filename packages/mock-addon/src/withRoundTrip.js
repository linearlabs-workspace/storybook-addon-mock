import { FORCE_RE_RENDER, STORY_CHANGED } from '@storybook/core-events';
import addons from '@storybook/addons';
import { EVENTS, PARAM_KEY, GLOBAL_PARAM_KEY } from './utils/constants';
import faker from './utils/faker';

const getParameter = (parameters, key, defaultValue) => {
    return parameters[key] || defaultValue;
};

let INITIAL_MOUNT_STATE = true;
let STORY_CHANGED_STATE = false;

const channel = addons.getChannel();

export const withRoundTrip = (storyFn, context) => {
    const { parameters } = context;
    const paramData = getParameter(parameters, PARAM_KEY, []);
    const mockAddonConfigs = getParameter(parameters, GLOBAL_PARAM_KEY, {
        refreshStoryOnUpdate: false,
        globalMockData: [],
    });
    const { globalMockData, refreshStoryOnUpdate } = mockAddonConfigs;
    const data = [...globalMockData, ...paramData];

    /**
     * Initiate event listener for story change and update.
     * This state executes once to setup.
     */
    if (INITIAL_MOUNT_STATE) {
        faker.makeInitialRequestMap(data);

        channel.emit(EVENTS.SEND, faker.getRequests());

        channel.on(STORY_CHANGED, () => {
            STORY_CHANGED_STATE = true;
        });

        channel.on(EVENTS.UPDATE, ({ item, key, value }) => {
            faker.update(item, key, value);
            const req = faker.getRequests();
            channel.emit(EVENTS.SEND, req);
            refreshStoryOnUpdate && channel.emit(FORCE_RE_RENDER);
        });

        INITIAL_MOUNT_STATE = false;
    }

    /**
     * This state executes when a story change. So that it can
     * take the new parameters to setup the faker requests.
     */
    if (STORY_CHANGED_STATE) {
        faker.makeInitialRequestMap(data);
        channel.emit(EVENTS.SEND, faker.getRequests());
        STORY_CHANGED_STATE = false;
    }
    return storyFn(context);
};
