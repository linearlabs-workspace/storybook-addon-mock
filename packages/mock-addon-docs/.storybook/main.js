module.exports = {
    stories: [
        '../stories/**/*.stories.mdx',
        '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '../../mock-addon/preset.js',
    ],
    framework: '@storybook/react',
    core: {
        builder: 'webpack5',
    },
    previewHead: (head) => `
      ${head}
      <style>
        .next {
          color: #9e9e9e;
          margin-bottom: 0.5rem;
        }
        .continue {
          outline: none;
          text-decoration: none;
          background: #1EA7FD;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 1rem;
          font-size: 1rem;
        }

        .link-item {
          display: flex;
          justify-content: space-between;
          padding: 20px 30px 20px 15px;
          border: 1px solid #00000010;
          border-radius: 5px;
          transition: background 150ms ease-out, border 150ms ease-out, transform 150ms ease-out;
          color: #333333;
          display: flex;
          align-items: flex-start;
          font-size: 12px;
        }

        .link-item:hover {
          border-color: #1EA7FD50;
          transform: translate3d(0, -3px, 0);
          box-shadow: rgba(0, 0, 0, 0.08) 0 3px 10px 0;
        }

        .link-item strong {
          font-weight: 500;
          display: block;
          margin-bottom: 2px;
        }

        .link-item-content {
            display: block;
        }
      </style>
    `,
};
