export const parameters = {
  options: {
    storySort: {
      order: ['Docs', ['Introduction', 'Installation', 'Advanced setup', 'User guide']],
      includeName: true
    }
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  mockAddonConfigs: {
    globalMockData: [],
    refreshStoryOnUpdate: true,
  }
}