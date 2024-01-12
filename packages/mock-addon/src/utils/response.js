import 'whatwg-fetch';
import statusTextMap from './statusMap';
import { defaultResponseHeaders } from './headers';

export function CustomResponse(url, status, responseText, headers) {
    const text =
        typeof responseText === 'string'
            ? responseText
            : JSON.stringify(responseText);

    return new Response(text, {
        ok: ((status / 100) | 0) === 2, // 200-299
        status: status,
        statusText: statusTextMap[status.toString()],
        headers: new Headers({
            ...defaultResponseHeaders,
            ...headers
        }),
        url
    });
}
