import statusTextMap from './statusMap';

export default function (url, status, responseText, headers = {}) {
  const keys = Object.keys(headers);
  const all = Object.entries(headers);

  const response = () => ({
    // eslint-disable-next-line no-bitwise
    ok: ((status / 100) | 0) === 2, // 200-299
    statusText: statusTextMap[status.toString()],
    status,
    url,
    text: () => Promise.resolve(responseText),
    json: () => Promise.resolve(responseText),
    blob: () => Promise.resolve(new Blob([response])),
    clone: response,
    headers: {
      keys: () => keys,
      entries: () => all,
      get: (n) => headers[n.toLowerCase()],
      has: (n) => n.toLowerCase() in headers,
    },
  });
  return response();
}
