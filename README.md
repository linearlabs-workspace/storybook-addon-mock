# storybook-addon-mock

This addon allows you to mock fetch or xmlhttprequest requests in storybook. If your component depends on backend apis, and your backend apis are not ready yet to feed your component, then this addon provides mock apis to build your component.

## Why we need this

There are few packages those help the developers to mock the backend apis while building components. But those packages aren't integrated properly in storybook and also there's no scope to play with those apis in the storybook. `storybook-addon-mock` provides a dedicated panel in the storybook which helps the developer to view and update the apis with multiple scenarios.

## How to use

Install the addon in your project.

```bash
  yarn install -D storybook-addon-mock
```

Add the register in your `.storybook/addons.js` file

```js
import 'storybook-addon-mock/register';
```

Add `withMock` as a decrator in the stories.

```js
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '@storybook/react/demo';
import withMock from 'storybook-addon-mock';

storiesOf('Button', module)
  .addDecorator(withMock)
  .add('with text', () => <ComponentWithAPICall />, {
    mockData: [{
      url: 'https://jsonplaceholder.typicode.com/todos/1',
      method: 'GET',
      status: 200,
      response: {
        data: 'hello',
      },
    }],
  });
```

## Contributing

TBD
