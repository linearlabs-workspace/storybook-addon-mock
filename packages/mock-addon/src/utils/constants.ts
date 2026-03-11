export interface MockRequest {
    url: string;
    method: string;
    status: number | string;
    response: any;
    delay?: number;
    skip?: boolean;
    path?: string;
    searchParamKeys?: string[];
    errors?: string[];
    originalRequest?: any;
    ignoreQueryParams?: boolean;
}

export const ADDON_ID = 'storybook/addon-mock';
export const PANEL_ID = `${ADDON_ID}/panel`;
export const PARAM_KEY = 'mockData';
export const GLOBAL_PARAM_KEY = 'mockAddonConfigs';
export const EVENTS = {
    SEND: `${ADDON_ID}/send`,
    UPDATE: `${ADDON_ID}/update`,
};
