import React from 'react';
import { mockData } from '../../../mock';
import { GetComponent } from '../../components/get-component';
import { callAxios } from '../../utils';

export default {
    title: 'Examples/Axios',
    component: GetComponent,
};

const Template = (args) => (
    <GetComponent title={`${args.name} GET Request`} callApi={callAxios} />
);

export const Get = Template.bind({});
Get.args = {
    name: 'Axios',
};

Get.parameters = {
    mockData: mockData.slice(0, 1),
};
