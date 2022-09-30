import React from 'react';
import { mockData } from '../../../mock';
import { GetComponent } from '../../components/get-component';
import { callFetch } from '../../utils';

export default {
    title: 'Examples/Fetch',
    component: GetComponent,
};

const Template = (args) => (
    <GetComponent title={`${args.name} GET Request`} callApi={callFetch} />
);

export const Get = Template.bind({});
Get.args = {
    name: 'Fetch',
};

Get.parameters = {
    mockData: mockData.slice(0, 1),
};
