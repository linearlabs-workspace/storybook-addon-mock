module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    esmodules: true,
                },
                modules: 'cjs',
            },
        ],
        '@babel/preset-react',
    ],
    ignore: ['**/*.test.js'],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-modules-commonjs',
    ],
};
