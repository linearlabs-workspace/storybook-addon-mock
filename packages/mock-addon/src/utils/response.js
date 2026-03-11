import 'whatwg-fetch';
import statusTextMap from './statusMap';
import { defaultResponseHeaders } from './headers';

export function CustomResponse(url, status, responseText) {
    const statusCode = Number(status);
    const text =
        typeof responseText === 'string'
            ? responseText
            : JSON.stringify(responseText);

    return new Response(text, {
        ok: ((statusCode / 100) | 0) === 2, // 200-299
        status: statusCode,
        statusText: statusTextMap[statusCode],
        headers: new Headers({
            ...defaultResponseHeaders,
        }),
        url,
    });
}
