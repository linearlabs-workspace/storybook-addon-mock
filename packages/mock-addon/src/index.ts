if (
    module &&
    'hot' in module &&
    module.hot &&
    typeof module.hot === 'object' &&
    'decline' in module.hot &&
    module.hot.decline &&
    typeof module.hot.decline === 'function'
) {
    module.hot.decline();
}

import { definePreviewAddon } from 'storybook/internal/csf';

import addonAnnotations from './preview';

export default () => definePreviewAddon(addonAnnotations);
