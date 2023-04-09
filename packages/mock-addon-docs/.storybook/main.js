export default {
    stories: [
        '../stories/**/*stories.mdx',
        '../stories/**/*stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-docs',
        '@storybook/addon-viewport',
        '@storybook/addon-toolbars',
        '../../mock-addon/preset.js',
    ],
    framework: '@storybook/react-webpack5',
};
