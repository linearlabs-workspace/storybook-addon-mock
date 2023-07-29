import { getBaseUrl } from './url';

export function Request(input, options = {}) {
    if (input instanceof URL) {
        this.method = options.method || 'GET';
        this.url = input.href;
        this.body = options.body || null;
    } else if (typeof input === 'object') {
        this.method = options.method || input.method || 'GET';
        this.url = input.url;
        this.body = options.body || input.body || null;
        this.signal = options.signal || input.signal || null;
    } else {
        this.method = options.method || 'GET';
        this.url = input;
        this.body = options.body || null;
        this.signal = options.signal || null;
    }

    const _url = getBaseUrl(this.url);

    if (_url.search) {
        this.searchParams = Object.fromEntries(
            new URLSearchParams(_url.search)
        );
    }
}
