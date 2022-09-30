import React from 'react';
import { customMockData, mockData } from '../../../mock';
import { GetComponent } from '../../components/get-component';
import { callAxios } from '../../utils';
import { customFunctinBlock } from '../../utils/code-blocks';

export default {
    title: 'Examples/Axios',
    component: GetComponent,
};

const Template = (args) => (
    <GetComponent title={args.title} callApi={callAxios} code={args.code} />
);

export const Get = Template.bind({});
Get.args = {
    title: 'Axios (GET request)',
};

Get.parameters = {
    mockData: mockData.slice(0, 1),
};

export const ResponseFunction = Template.bind({});
ResponseFunction.args = {
    title: 'Axios (Response function)',
    code: customFunctinBlock,
};

ResponseFunction.parameters = {
    mockData: customMockData,
};
