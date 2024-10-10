import { getBaseUrl } from './url';

export function Request(input, options = {}) {
    if (typeof input === 'object') {
        this.method = options.method || input.method || 'GET';
        this.url = input.url;
        this.headers = options.headers || input.headers || null;
        this.body = options.body || input.body || null;
        this.signal = options.signal || input.signal || null;
    } else {
        this.method = options.method || 'GET';
        this.url = input;
        this.headers = options.headers || null;
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
