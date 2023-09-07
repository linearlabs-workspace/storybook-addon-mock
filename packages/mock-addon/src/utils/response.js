import statusTextMap from './statusMap';
import { defaultResponseHeaders } from './headers';

export function Response(url, status, responseText) {
    this.headers = new Headers({
        ...defaultResponseHeaders,
    });
    // eslint-disable-next-line no-bitwise
    this.ok = ((status / 100) | 0) === 2; // 200-299
    this.statusText = statusTextMap[status.toString()];
    this.status = status;
    this.url = url;

    this.text = () =>
        Promise.resolve(
            typeof responseText === 'string'
                ? responseText
                : JSON.stringify(responseText)
        );
    this.json = () => Promise.resolve(responseText);
    this.clone = () => new Response(url, status, responseText);
}
