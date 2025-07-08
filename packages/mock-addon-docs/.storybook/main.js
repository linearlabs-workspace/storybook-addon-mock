import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import remarkGfm from 'remark-gfm';

const require = createRequire(import.meta.url);
const config = {
    stories: [
        '../stories/**/*.mdx',
        '../stories/**/stories.@(js|jsx|mjs|ts|tsx)',
    ],

    addons: [
        getAbsolutePath('../../mock-addon/src/preset/manager.js'),
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
    ],

    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
};
export default config;

function getAbsolutePath(value) {
    if (value.startsWith('.') || value.startsWith('/')) {
        return require.resolve(value);
    }

    return dirname(require.resolve(join(value, 'package.json')));
}
