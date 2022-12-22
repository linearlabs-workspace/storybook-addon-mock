"use strict";

var _addons = require("@storybook/addons");
var _constants = require("../utils/constants");
var _Panel = require("../Panel");
_addons.addons.register(_constants.ADDON_ID, function () {
  // Register the panel
  _addons.addons.add(_constants.PANEL_ID, {
    type: _addons.types.PANEL,
    title: 'Mock Request',
    match: function match(_ref) {
      var viewMode = _ref.viewMode;
      return viewMode === 'story';
    },
    render: _Panel.Panel,
    paramKey: 'mockAddonConfigs'
  });
});