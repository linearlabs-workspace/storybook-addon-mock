import React from 'react';
import { mockData } from '../../../mock';
import { GetComponent } from '../../components/get-component';
import { callSuperAgent } from '../../utils';

export default {
    title: 'Examples/Superagent',
    component: GetComponent,
};

const Template = (args) => (
    <GetComponent title={`${args.name} GET Request`} callApi={callSuperAgent} />
);

export const Get = Template.bind({});
Get.args = {
    name: 'Superagent',
};

Get.parameters = {
    mockData: mockData.slice(0, 1),
};
