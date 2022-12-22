import { addons, types } from '@storybook/addons';
import { ADDON_ID, PANEL_ID } from '../utils/constants';
import { Panel } from '../Panel';
addons.register(ADDON_ID, function () {
  // Register the panel
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Mock Request',
    match: function match(_ref) {
      var viewMode = _ref.viewMode;
      return viewMode === 'story';
    },
    render: Panel,
    paramKey: 'mockAddonConfigs'
  });
});