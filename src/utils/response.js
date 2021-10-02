import statusTextMap from './statusMap';

export function Response(url, status, responseText) {
    const keys = [];
    const all = [];
    const headers = {};
    // eslint-disable-next-line no-bitwise
    this.ok = ((status / 100) | 0) === 2; // 200-299
    this.statusText = statusTextMap[status.toString()];
    this.status = status;
    this.url = url;

    this.text = () => Promise.resolve(responseText);
    this.json = () => Promise.resolve(responseText);
    (this.clone = () => new Response(url, status, responseText)),
        (this.headers = {
            keys: () => keys,
            entries: () => all,
            get: (n) => headers[n.toLowerCase()],
            has: (n) => n.toLowerCase() in headers,
        });
}
