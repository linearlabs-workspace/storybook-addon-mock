import remarkGfm from 'remark-gfm';

export default {
    stories: [
        '../stories/**/*stories.mdx',
        '../stories/**/*stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        {
            name: '@storybook/addon-docs',
            options: {
                mdxPluginOptions: {
                    mdxCompileOptions: {
                        remarkPlugins: [remarkGfm],
                    },
                },
            },
        },
        '@storybook/addon-viewport',
        '@storybook/addon-toolbars',
        '../../mock-addon/preset.js',
    ],
    framework: '@storybook/react-webpack5',
};
