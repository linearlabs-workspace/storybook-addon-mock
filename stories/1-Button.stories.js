import React, { useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import withMock from '../src/index';

import { Button } from '@storybook/react/demo';

const ComponentWithAPICall = () => {
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos/1',
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'GET',
        }
      );
      const item = await response.json();
      console.log(item);
    } catch (err) {
      console.log(err);
    }
  };
  return (<Button onClick={() => getData()}>Hello Button</Button>);
}
storiesOf('Button', module)
  .addDecorator(withMock)
  .add('with text', () => <ComponentWithAPICall />, {
    mockData: [{
        url: 'https://jsonplaceholder.typicode.com/todos/1',
        method: 'GET',
        status: 200,
        response: {
          'data': 'hello'
        }
      }],
  });