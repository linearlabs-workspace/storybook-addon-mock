import React from 'react';
import { customMockData, mockData } from '../../../mock';
import { GetComponent } from '../../components/get-component';
import { callSuperAgent } from '../../utils';
import { customFunctinBlock } from '../../utils/code-blocks';

export default {
    title: 'Examples/Superagent',
    component: GetComponent,
};

const Template = (args) => (
    <GetComponent title={args.title} callApi={callSuperAgent} />
);

export const Get = Template.bind({});
Get.args = {
    title: 'Superagent (GET request)',
};

Get.parameters = {
    mockData: mockData.slice(0, 1),
};

export const ResponseFunction = Template.bind({});
ResponseFunction.args = {
    title: 'Superagent (Response function)',
    code: customFunctinBlock,
};

ResponseFunction.parameters = {
    mockData: customMockData,
};
