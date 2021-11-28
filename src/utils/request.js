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

    const urlObject = new URL(this.url);

    if (urlObject.search) {
        this.searchParams = Object.fromEntries(
            new URLSearchParams(urlObject.search)
        );
    }
}
