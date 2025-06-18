import { ADDON_ID, PANEL_ID } from '../utils/constants';
import { Panel } from '../Panel';
import { addons, types } from 'storybook/manager-api';

addons.register(ADDON_ID, () => {
    // Register the panel
    addons.add(PANEL_ID, {
        type: types.PANEL,
        title: 'Mock Request',
        match: ({ viewMode }) => viewMode === 'story',
        render: Panel,
        paramKey: 'mockAddonConfigs',
    });
});
