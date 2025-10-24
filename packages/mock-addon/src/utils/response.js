import 'whatwg-fetch';
import statusTextMap from './statusMap';
import { defaultResponseHeaders } from './headers';

export function CustomResponse(url, status, responseText) {
    const text =
        typeof responseText === 'string'
            ? responseText
            : JSON.stringify(responseText);

    return new Response(text, {
        status: status,
        statusText: statusTextMap[status],
        headers: new Headers({
            ...defaultResponseHeaders,
        }),
        url,
    });
}
