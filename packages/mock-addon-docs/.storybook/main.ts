import remarkGfm from 'remark-gfm';

const config = {
    stories: [
        '../stories/**/*.mdx',
        '../stories/**/stories.@(js|jsx|mjs|ts|tsx)',
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
        import.meta.resolve('./local-preset.ts'),
    ],

    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
};
export default config;
