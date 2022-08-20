<div align="center">
        <img src="https://raw.githubusercontent.com/nutboltu/storybook-addon-mock/master/assets/logo.svg" alt="Storybook addon mock" height="150" />
        <h1>Storybook Addon Mock</h1>
</div>

<p>
    <a href="https://github.com/nutboltu/storybook-addon-mock/actions">
        <img src="https://github.com/nutboltu/storybook-addon-mock/workflows/CI/badge.svg" alt="Actions Status" />
    </a>
    <a href="#">
        <img src="https://img.shields.io/npm/dm/storybook-addon-mock.svg" alt="Npm download" />
    </a>
    <a href="https://badge.fury.io/js/storybook-addon-mock">
        <img src="https://badge.fury.io/js/storybook-addon-mock.svg" alt="npm version" />
    </a>
     <a href="https://github.com/nutboltu/storybook-addon-mock/blob/main/LICENSE">
        <img src="https://img.shields.io/github/license/nutboltu/storybook-addon-mock" alt="License" />
    </a>
</p>

[![NPM](https://nodei.co/npm/storybook-addon-mock.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/storybook-addon-mock/)

> <h4> 📣 We are working on Version 3.0.0 with a more robust UI and validation. Please stay tuned. The new major version will be released soon!
</h4>

This addon allows you to mock fetch or XMLHttprequest requests in storybook. If your component depends on backend requests, and your backend requests are not ready yet to feed your component, this addon provides mock response to build your component.

[Live Demo :rocket:](https://nutboltu.github.io/storybook-addon-mock)

## Why we need this

There are few packages those help the developers to mock the backend requests while building components. But those packages aren't integrated properly in storybook and also there's no scope to play with those requests in the storybook. `storybook-addon-mock` provides a dedicated panel in the storybook which helps the developers to update the status and the response on the fly.

### Mock data properties

| Property   | Description                                                                                 | Required | Default |
| ---------- | :------------------------------------------------------------------------------------------ | :------- | :------ |
| `url`      | Supports both **named parameters** (`/:foo/:bar`) and **query parameters**.(`/foo?bar=true`) | Y        |    -    |
| `method`   | Supports `GET`, `POST`, `PUT`, `PATCH` and `DELETE` methods.                                                   |     -    | `GET`   |
| `status`   | All possible HTTP status codes.                                                              |     -    | `200`   |
| `response` | JSON format or function. <br/> <br/> Response function is a function that contains request object as a parameter. See the **Custom Response** section for example.  | Y        |    -    |
| `delay`    | Emulate delayed response time in milliseconds.                                              |     -    | `0`     |

> You can change the **status**, **response** and **delay** from the storybook panel on the fly! :rocket:

---

## How to use

Install the addon in your project as dev dependencies.

```bash
  yarn add -D storybook-addon-mock
```

### Using Storybook 6

Add the decorator in your addons, in `.storybook/main.js`:

```js
module.exports = {
    addons: ['storybook-addon-mock/register'],
};
```

Add decorator in the stories.

```js
import React from 'react';
import withMock from 'storybook-addon-mock';
import Component from './Component';

export default {
    title: 'Component',
    component: Component,
    decorators: [withMock],
};

const Template = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.parameters = {
    mockData: [
        {
            url: 'https://jsonplaceholder.typicode.com/todos/1',
            method: 'GET',
            status: 200,
            response: {
                data: 'Hello storybook-addon-mock!',
            },
        },
    ],
};
```

Thanks to [shilman](https://github.com/storybookjs/storybook/issues/14817) for this solution

### Using older versions of Storybook

Add the register in your `.storybook/addons.js` file

```js
import 'storybook-addon-mock/register';
```

Add `withMock` as a decorator in the stories.

```js
import React from 'react';
import withMock from 'storybook-addon-mock';

storiesOf('Mock Response Story', module)
    .addDecorator(withMock)
    .add('Story Item', () => <ComponentWithAPICall />, {
        mockData: [
            {
                url: 'https://jsonplaceholder.typicode.com/todos/1',
                method: 'GET',
                status: 200,
                response: {
                    data: 'Hello storybook-addon-mock!',
                },
            },
        ],
    });
```

### Custom Response

```js
import React from 'react';
import withMock from 'storybook-addon-mock';
import Component from './Component';

export default {
    title: 'Component',
    component: Component,
    decorators: [withMock],
};

const Template = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.parameters = {
    mockData: [
        {
            url: 'https://jsonplaceholder.typicode.com/todos/1',
            method: 'GET',
            status: 200,
            response: (request) => {
                const {
                    url,
                    method,
                    body,
                    searchParams,
                } = request;

                if (searchParams.id == 1) {
                     return {
                        data: 'Custom data for id 1',
                    };   
                } else if (body.name === 'mock') {
                    return {
                        data: 'Custom data for name mock',
                    }
                }
                return {
                    data: 'Default data',
                }
            },
        },
    ],
};
```

## User guide


[See the documentation - User guide](https://nutboltu.github.io/storybook-addon-mock)

## License

This project is licensed under the MIT License - see the LICENSE file in the source code for details.
