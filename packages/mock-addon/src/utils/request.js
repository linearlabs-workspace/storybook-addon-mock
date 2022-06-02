import { getBaseUrl } from './url';

export const setRequestHeaders = (xhr, headerContainers) => {
    const { _headers: headers } = headerContainers;
    for (let [key, value] of headers) {
        xhr.setRequestHeader(key, value);
    }
};

export function Request(input, options = {}) {
    if (typeof input === 'object') {
        this.method = options.method || input.method || 'GET';
        this.url = input.url;
        this.body = options.body || input.body || null;
    } else {
        this.method = options.method || 'GET';
        this.url = input;
        this.body = options.body || null;
    }

    const _url = getBaseUrl(this.url);

    if (_url.search) {
        this.searchParams = Object.fromEntries(
            new URLSearchParams(_url.search)
        );
    }
}
