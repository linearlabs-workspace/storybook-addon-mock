export function Request(input, options = {}) {
    if (typeof input === 'object') {
        this.method = options.method || input.method || 'GET';
        this.url = input.url;
    } else {
        this.method = options.method || 'GET';
        this.url = input;
    }
}
