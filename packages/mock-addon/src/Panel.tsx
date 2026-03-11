import React from 'react';
import { useAddonState, useChannel } from 'storybook/manager-api';
import {
    AddonPanel,
    Placeholder,
    ScrollArea,
} from 'storybook/internal/components';

import { ADDON_ID, EVENTS, MockRequest } from './utils/constants';
import { MockItem } from './components/MockItem';
import { ErrorItem } from './components/ErrorItem';

interface PanelState {
    mockData: MockRequest[];
    disableUsingOriginal: boolean;
}

export const Panel = (props: any) => {
    const [state, setState] = useAddonState<PanelState>(ADDON_ID, {
        mockData: [],
        disableUsingOriginal: false,
    });
    const emit = useChannel({
        [EVENTS.SEND]: (newState: PanelState) => {
            setState(newState);
        },
    });

    const onChange = (item: MockRequest, key: string, value: any) => {
        emit(EVENTS.UPDATE, { item, key, value });
    };

    const { mockData, disableUsingOriginal } = state;
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
                {mockData.map((item: MockRequest, index: number) => {
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
                            onChange={(key: string, value: any) =>
                                onChange(item, key, value)
                            }
                            disableUsingOriginal={disableUsingOriginal}
                            {...rest}
                        />
                    );
                })}
            </ScrollArea>
        </AddonPanel>
    );
};
