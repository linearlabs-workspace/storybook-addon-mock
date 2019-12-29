import React, { useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '@storybook/react/demo';
import withMock from '../dist';

const ComponentWithAPICall = () => {
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
        },
      );
      const item = await response.json();
      // eslint-disable-next-line no-console
      console.log(item);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (<Button onClick={() => getData()}>Hello Button</Button>);
};
storiesOf('Mock API Example', module)
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
