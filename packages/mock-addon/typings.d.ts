type JSONValue = string | number | boolean | JSONObject | JSONArray
type JSONArray = Array<JSONValue>
interface JSONObject {
    [x: string]: JSONValue
}

export type Method = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH' | 'OPTIONS'

export type Request = {
    body: string | null
    method: Method
    signal: AbortSignal | null
    url: string
    searchParams?: string
}

export type ResponseObj = JSONObject | JSONArray
export type ResponseFn = (request: Request) => JSONValue
export type Response = ResponseObj | ResponseFn

export type StorybookAddonMockData = {
    url: string
    /** @default GET */
    method: Method
    /** @default 0 */
    delay?: number
    status: number
    response: Response
}

declare module '@storybook/csf' {
    interface Parameters {
        mockAddonConfigs?: {
            globalMockData?: StorybookAddonMockData[]
            ignoreQueryParams?: boolean
            refreshStoryOnUpdate?: boolean
            disableUsingOriginal?: boolean
            disable?: boolean
        }
        mockData?: StorybookAddonMockData[]
    }
}
