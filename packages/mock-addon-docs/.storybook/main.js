const config = {
    stories: [
        '../stories/**/*.mdx',
        '../stories/**/stories.@(js|jsx|mjs|ts|tsx)',
    ],
    addons: [
        '../../mock-addon/preset.js',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
};
export default config;
