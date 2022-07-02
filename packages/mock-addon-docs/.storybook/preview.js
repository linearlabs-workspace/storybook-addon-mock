export const parameters = {
  options: {
    storySort: {
      order: ['Introduction', 'Installation']
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
    globalMockData: [{
      url: 'http://localhost:0000',
      method: 'PUT',
      response: {},
    }],
    refreshStoryOnUpdate: true,
  }
}