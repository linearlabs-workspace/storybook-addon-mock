function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
import { FORCE_RE_RENDER, STORY_CHANGED } from '@storybook/core-events';
import addons from '@storybook/addons';
import { EVENTS, PARAM_KEY, GLOBAL_PARAM_KEY } from './utils/constants';
import faker from './utils/faker';
var getParameter = function getParameter(parameters, key, defaultValue) {
  return parameters[key] || defaultValue;
};
var INITIAL_MOUNT_STATE = true;
var STORY_CHANGED_STATE = false;
var channel = addons.getChannel();
export var withRoundTrip = function withRoundTrip(storyFn, context) {
  var parameters = context.parameters;
  var paramData = getParameter(parameters, PARAM_KEY, []);
  var mockAddonConfigs = getParameter(parameters, GLOBAL_PARAM_KEY, {
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
    faker.makeInitialRequestMap(data);
    channel.emit(EVENTS.SEND, faker.getRequests());
    channel.on(STORY_CHANGED, function () {
      STORY_CHANGED_STATE = true;
    });
    channel.on(EVENTS.UPDATE, function (_ref) {
      var item = _ref.item,
        key = _ref.key,
        value = _ref.value;
      faker.update(item, key, value);
      var req = faker.getRequests();
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