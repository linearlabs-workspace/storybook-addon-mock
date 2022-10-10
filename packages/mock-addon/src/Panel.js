import React from 'react';
import { useAddonState, useChannel } from '@storybook/api';
import { AddonPanel, Placeholder, ScrollArea } from '@storybook/components';

import { ADDON_ID, EVENTS } from './utils/constants';
import { MockItem } from './components/MockItem';
import { ErrorItem } from './components/ErrorItem';

export const Panel = (props) => {
    const [mockData, setState] = useAddonState(ADDON_ID, []);

    const emit = useChannel({
        [EVENTS.SEND]: (newMockData) => {
            setState(newMockData);
        },
    });

    const onChange = (item, key, value) => {
        emit(EVENTS.UPDATE, { item, key, value });
    };

    if (!mockData || mockData.length === 0) {
        return (
            <AddonPanel {...props}>
                <Placeholder>No mock data found.</Placeholder>
            </AddonPanel>
        );
    }

    return (
        <AddonPanel {...props}>
            <ScrollArea>
                {mockData.map((item, index) => {
                    const { errors, originalRequest } = item;
                    if (errors && errors.length) {
                        return (
                            <ErrorItem
                                key={index}
                                errors={errors}
                                originalRequest={originalRequest}
                                position={index}
                            />
                        );
                    }
                    // eslint-disable-next-line no-unused-vars
                    const { searchParamKeys, path, ...rest } = item;

                    return (
                        <MockItem
                            id={index}
                            key={index}
                            onChange={(key, value) =>
                                onChange(item, key, value)
                            }
                            {...rest}
                        />
                    );
                })}
            </ScrollArea>
        </AddonPanel>
    );
};
