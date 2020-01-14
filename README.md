# Storybook Addon Mock

[![dependencies Status](https://david-dm.org/nutboltu/storybook-addon-mock/status.svg)](https://david-dm.org/nutboltu/storybook-addon-mock)
<a href="https://twitter.com/intent/follow?screen_name=nutboltu">
   <img src="https://img.shields.io/twitter/follow/nutboltu.svg?label=Follow%20@nutboltu" alt="Follow @nutboltu" />
</a>

[![NPM](https://nodei.co/npm/storybook-addon-mock.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/storybook-addon-mock/)

This addon allows you to mock fetch or xmlhttprequest requests in storybook. If your component depends on backend apis, and your backend apis are not ready yet to feed your component, then this addon provides mock apis to build your component.

![Screenshot](/docs/resources/storybook-addon-mock-preview.gif)

## Why we need this

There are few packages those help the developers to mock the backend apis while building components. But those packages aren't integrated properly in storybook and also there's no scope to play with those apis in the storybook. `storybook-addon-mock` provides a dedicated panel in the storybook which helps the developer to view and update the apis with multiple scenarios.

## How to use

Install the addon in your project as dev dependencies.

```bash
  yarn install -D storybook-addon-mock
```

Add the register in your `.storybook/addons.js` file

```js
import 'storybook-addon-mock/register';
```

Add `withMock` as a decorator in the stories.

```js
import React from 'react';
import withMock from 'storybook-addon-mock';

storiesOf('Storybook Addon Mock', module)
  .addDecorator(withMock)
  .add('Getting Mock API Response', () => <ComponentWithAPICall />, {
    mockData: [{
      url: 'https://jsonplaceholder.typicode.com/todos/1',
      method: 'GET',
      status: 200,
      response: {
        data: 'This is a Mock Response!',
      },
    }],
  });
```

## License

MIT Licensed. Copyright (c) Farhad Yasir.
