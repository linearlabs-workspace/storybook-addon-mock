declare const withMock: (options: RequestInfo[]) => any;

export default withMock;

export interface RequestInfo {
    url: string;
    response: object | ((request: ResponseRequestParam) => object);
    /** @default GET */
    method?: string;
    /** @default 200 */
    status?: number;
    /** @default 0 */
    delay?: number;
}

export interface ResponseRequestParam {
    method: string;
    url: url;
    body: RequestInit['body'];
    searchParams?: Record<string, string>;
}
