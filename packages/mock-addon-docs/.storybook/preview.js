export const parameters = {
  options: {
    storySort: {
      order: ['Docs', ['Introduction', 'Installation']],
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
    globalMockData: [{
      url: 'http://localhost:0000',
      method: 'PUT',
      status: 200,
      response: {},
    }],
    refreshStoryOnUpdate: true,
  }
}