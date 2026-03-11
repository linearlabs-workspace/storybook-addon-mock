export function setRequestHeaders(xhr: any, headers: Iterable<[string, string]>): void {
    for (let [key, value] of headers) {
        xhr.setRequestHeader(key, value);
    }
}

export function getResponseHeaderMap(xhr: any): Record<string, string | undefined> {
    const headers: Record<string, string | undefined> = {};
    xhr.getAllResponseHeaders()
        .trim()
        .split(/[\r\n]+/)
        .map((value) => value.split(/: /))
        .forEach((keyValue) => {
            if (keyValue[0]) {
                headers[keyValue[0].trim()] = keyValue[1] && keyValue[1].trim();
            }
        });
    return headers;
}

export const defaultResponseHeaders = {
    'content-type': 'application/json',
};
