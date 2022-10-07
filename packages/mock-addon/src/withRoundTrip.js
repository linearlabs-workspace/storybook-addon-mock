import { FORCE_RE_RENDER } from '@storybook/core-events';
import addons from '@storybook/addons';
import { EVENTS, PARAM_KEY, GLOBAL_PARAM_KEY } from './utils/constants';
import faker from './utils/faker';

const getParameter = (parameters, key, defaultValue) => {
    return parameters[key] || defaultValue;
};

export const withRoundTrip = (storyFn, context) => {
    const { parameters } = context;
    const paramData = getParameter(parameters, PARAM_KEY, []);
    const mockAddonConfigs = getParameter(parameters, GLOBAL_PARAM_KEY, {
        refreshStoryOnUpdate: false,
        globalMockData: [],
    });

    const channel = addons.getChannel();

    const { globalMockData } = mockAddonConfigs;
    const data = [...globalMockData, ...paramData];
    faker.makeInitialRequestMap(data);
    channel.emit(EVENTS.SEND, faker.getRequests());

    channel.on(EVENTS.UPDATE, ({ item, key, value }) => {
        faker.update(item, key, value);
        const { refreshStoryOnUpdate } = mockAddonConfigs;
        const req = faker.getRequests();
        channel.emit(EVENTS.SEND, req);
        refreshStoryOnUpdate && channel.emit(FORCE_RE_RENDER);
    });
    // const emit = useChannel({
    //     [EVENTS.UPDATE]: (item, name, value) => {
    //         faker.update(item, name, value);

    //         const { refreshStoryOnUpdate } = mockAddonConfigs;
    //         const req = faker.getRequests();
    //         emit(EVENTS.SEND, req);
    //         refreshStoryOnUpdate && emit(FORCE_RE_RENDER);
    //     },
    // });

    // useEffect(() => {
    //     const { globalMockData } = mockAddonConfigs;
    //     const data = [...globalMockData, ...paramData];
    //     faker.makeInitialRequestMap(data);
    //     emit(EVENTS.SEND, faker.getRequests());
    // }, []);

    return storyFn();
};
