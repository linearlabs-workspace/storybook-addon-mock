import React from 'react';
import addons, { makeDecorator } from '@storybook/addons';
import Faker from './utils/Faker';

const faker = new Faker();

export default makeDecorator({
  name: 'withMock',
  parameterName: 'mockData',
  // This means don't run this decorator if the notes decorator is not set
  skipIfNoParametersOrOptions: true,
  wrapper: (getStory, context, { parameters }) => {
    const channel = addons.getChannel();
    faker.makeInitialApis(parameters);
    // Our simple API above simply sets the notes parameter to a string,
    // which we send to the channel
    channel.emit('addons/mock/send', faker.getApis());
    // we can also add subscriptions here using channel.on('eventName', callback);
    channel.on('addons/mock/receive', function(item) {
        faker.setSkip(item.url, item.method);
        channel.emit('addons/mock/send', faker.getApis());
    });

    return getStory(context);
  }
});
