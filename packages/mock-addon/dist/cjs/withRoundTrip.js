"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withRoundTrip = void 0;
var _coreEvents = require("@storybook/core-events");
var _addons = _interopRequireDefault(require("@storybook/addons"));
var _constants = require("./utils/constants");
var _faker = _interopRequireDefault(require("./utils/faker"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var getParameter = function getParameter(parameters, key, defaultValue) {
  return parameters[key] || defaultValue;
};
var INITIAL_MOUNT_STATE = true;
var STORY_CHANGED_STATE = false;
var channel = _addons["default"].getChannel();
var withRoundTrip = function withRoundTrip(storyFn, context) {
  var parameters = context.parameters;
  var paramData = getParameter(parameters, _constants.PARAM_KEY, []);
  var mockAddonConfigs = getParameter(parameters, _constants.GLOBAL_PARAM_KEY, {
    refreshStoryOnUpdate: false,
    globalMockData: []
  });
  var globalMockData = mockAddonConfigs.globalMockData,
    refreshStoryOnUpdate = mockAddonConfigs.refreshStoryOnUpdate;
  var data = [].concat(_toConsumableArray(globalMockData), _toConsumableArray(paramData));

  /**
   * Initiate event listener for story change and update.
   * This state executes once to setup.
   */
  if (INITIAL_MOUNT_STATE) {
    _faker["default"].makeInitialRequestMap(data);
    channel.emit(_constants.EVENTS.SEND, _faker["default"].getRequests());
    channel.on(_coreEvents.STORY_CHANGED, function () {
      STORY_CHANGED_STATE = true;
    });
    channel.on(_constants.EVENTS.UPDATE, function (_ref) {
      var item = _ref.item,
        key = _ref.key,
        value = _ref.value;
      _faker["default"].update(item, key, value);
      var req = _faker["default"].getRequests();
      channel.emit(_constants.EVENTS.SEND, req);
      refreshStoryOnUpdate && channel.emit(_coreEvents.FORCE_RE_RENDER);
    });
    INITIAL_MOUNT_STATE = false;
  }

  /**
   * This state executes when a story change. So that it can
   * take the new parameters to setup the faker requests.
   */
  if (STORY_CHANGED_STATE) {
    _faker["default"].makeInitialRequestMap(data);
    channel.emit(_constants.EVENTS.SEND, _faker["default"].getRequests());
    STORY_CHANGED_STATE = false;
  }
  return storyFn(context);
};
exports.withRoundTrip = withRoundTrip;