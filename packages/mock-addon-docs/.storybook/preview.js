export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  globalMockData: [{
    url: 'http://localhost:0000',
    method: 'PUT',
    response: {},
  }]
}