import React from 'react';
import { customMockData, mockData } from '../../../mock';
import { GetComponent } from '../../components/get-component';
import { callFetch } from '../../utils';
import { customFunctinBlock } from '../../utils/code-blocks';

export default {
    title: 'Examples/Fetch',
    component: GetComponent,
};

const Template = (args) => (
    <GetComponent title={`${args.name} GET Request`} callApi={callFetch} />
);

export const Get = Template.bind({});
Get.args = {
    title: 'Fetch (GET request)',
};

Get.parameters = {
    mockData: mockData.slice(0, 1),
};

export const ResponseFunction = Template.bind({});
ResponseFunction.args = {
    title: 'Fetch (Response function)',
};

ResponseFunction.parameters = {
    mockData: customMockData,
    code: customFunctinBlock,
};
