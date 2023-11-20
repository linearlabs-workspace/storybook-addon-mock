export function setRequestHeaders(xhr, headers) {
    for (let [key, value] of headers) {
        xhr.setRequestHeader(key, value);
    }
}

export function getResponseHeaderMap(xhr) {
    const headers = {};
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

export const textResponseHeaders = {
    'content-type': 'text/plain',
};
