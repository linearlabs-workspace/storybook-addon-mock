"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PARAM_KEY = exports.PANEL_ID = exports.GLOBAL_PARAM_KEY = exports.EVENTS = exports.ADDON_ID = void 0;
var ADDON_ID = 'storybook/addon-mock';
exports.ADDON_ID = ADDON_ID;
var PANEL_ID = "".concat(ADDON_ID, "/panel");
exports.PANEL_ID = PANEL_ID;
var PARAM_KEY = 'mockData';
exports.PARAM_KEY = PARAM_KEY;
var GLOBAL_PARAM_KEY = 'mockAddonConfigs';
exports.GLOBAL_PARAM_KEY = GLOBAL_PARAM_KEY;
var EVENTS = {
  SEND: "".concat(ADDON_ID, "/send"),
  UPDATE: "".concat(ADDON_ID, "/update")
};
exports.EVENTS = EVENTS;