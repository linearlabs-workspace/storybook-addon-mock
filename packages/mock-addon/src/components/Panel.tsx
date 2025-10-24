import React from 'react';
import { useAddonState, useChannel } from 'storybook/manager-api';
import {
    AddonPanel,
    Placeholder,
    ScrollArea,
} from 'storybook/internal/components';

import { ADDON_ID, EVENTS } from '../utils/constants';
import { MockItem } from './MockItem';
import { ErrorItem } from './ErrorItem';
import type { Addon_RenderOptions } from 'storybook/internal/types';

interface MockData {
    url: string;
    method: string;
    status: string | number;
    skip: boolean;
    delay: number;
    path: string;
    searchParamKeys: string[];
    errors: string[],
    originalRequest: unknown;
}

export const Panel = (props: Partial<Addon_RenderOptions>) => {
    const [state, setState] = useAddonState<{
        disableUsingOriginal: boolean;
        mockData: MockData[];
    }>(ADDON_ID, {
        mockData: [],
        disableUsingOriginal: false,
    });
    const emit = useChannel({
        [EVENTS.SEND]: (newState) => {
            setState(newState);
        },
    });

    const onChange = (item: MockData, key: string, value: any) => {
        emit(EVENTS.UPDATE, { item, key, value });
    };

    const { mockData, disableUsingOriginal } = state;
    if (!mockData || mockData.length === 0) {
        return (
            <AddonPanel {...props} active={props.active ?? false}>
                <Placeholder>No mock data found.</Placeholder>
            </AddonPanel>
        );
    }

    return (
        <AddonPanel {...props} active={props.active ?? false}>
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
                            disableUsingOriginal={disableUsingOriginal}
                            {...rest}
                        />
                    );
                })}
            </ScrollArea>
        </AddonPanel>
    );
};
