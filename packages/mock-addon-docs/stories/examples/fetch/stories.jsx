import React from 'react';
import { FetchExample } from './index';
import { mockData } from '../../mock';

export default {
    title: 'Examples/Fetch',
    component: FetchExample,
    parameters: {
        mockData: mockData.slice(1, 2),
    },
};

const Template = () => <FetchExample />;

export const FetchCall = Template.bind({});
