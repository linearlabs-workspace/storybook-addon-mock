import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '@storybook/react/demo';
import withMock from '../dist';

const ComponentWithFetchCall = () => {
  const [data, setData] = useState();
  const [headers, setHeaders] = useState();
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
      setData(await response.json());
      setHeaders(Object.fromEntries(response.headers.entries()));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  return (
    <>
      <Button onClick={() => getData()}>Click to get mock response</Button>
      <br />
      <strong>Body</strong>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <br />
      <strong>Headers</strong>
      <pre>{JSON.stringify(headers, null, 2)}</pre>
    </>
  );
};

const ComponentWithXHRCall = () => {
  const [data, setData] = useState();
  const [headers, setHeaders] = useState();
  const getData = async () => {
    try {
      await new Promise((resolve, reject) => {
        var oReq = new XMLHttpRequest();

        oReq.onload = function (e) {
          if (oReq.status === 200) {
            setData(JSON.parse(oReq.responseText));
            setHeaders(oReq.getAllResponseHeaders());

            resolve();
          } else {
            reject({ status: oReq.status, statusText: oReq.statusText });
          }
        };
        oReq.open("GET", 'https://jsonplaceholder.typicode.com/todos/1');
        oReq.send();
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  return (
    <>
      <Button onClick={() => getData()}>Click to get mock response</Button>
      <br />
      <strong>Body</strong>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <br />
      <strong>Headers</strong>
      <pre>{JSON.stringify(headers, null, 2)}</pre>
    </>
  );
};

storiesOf('Storybook Addon Mock', module)
  .addDecorator(withMock)
  .add('Getting Mock Fetch Response', () => <ComponentWithFetchCall />, {
    mockData: [{
      url: 'https://jsonplaceholder.typicode.com/todos/1',
      method: 'GET',
      status: 200,
      response: {
        data: 'This is a MOCK response!',
      },
      headers: {
        'content-type': 'application/json',
      },
    }],
  })
  .add('Getting Mock XHR Response', () => <ComponentWithXHRCall />, {
    mockData: [{
      url: 'https://jsonplaceholder.typicode.com/todos/1',
      method: 'GET',
      status: 200,
      response: {
        data: 'This is a MOCK response!',
      },
      headers: {
        'content-type': 'application/json',
      },
    }],
  });
