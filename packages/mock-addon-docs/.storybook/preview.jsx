import {withRoundTrip} from "storybook-addon-mock/src/withRoundTrip";

const Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Docs', ['Introduction', 'Installation', 'User guide']],
        includeName: true
      }
    },
    mockAddonConfigs: {
      globalMockData: [],
      refreshStoryOnUpdate: true,
      disableUsingOriginal: false,
    },
  },
  decorators: [withRoundTrip],
}

export default Preview