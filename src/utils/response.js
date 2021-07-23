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
    // this.blob = () => Promise.resolve(new Blob([responseText]));
    this.clone = () =>  new Response(url, status, responseText),
    this.headers = {
      keys: () => keys,
      entries: () => all,
      get: (n) => headers[n.toLowerCase()],
      has: (n) => n.toLowerCase() in headers,
    };
}

// export default function (url, status, responseText) {
//   const keys = [];
//   const all = [];
//   const headers = {};

//   const response = () => ({
//     // eslint-disable-next-line no-bitwise
//     ok: ((status / 100) | 0) === 2, // 200-299
//     statusText: statusTextMap[status.toString()],
//     status,
//     url,
//     text: () => Promise.resolve(responseText),
//     json: () => Promise.resolve(responseText),
//     blob: () => Promise.resolve(new Blob([response])),
//     clone: response,
//     headers: {
//       keys: () => keys,
//       entries: () => all,
//       get: (n) => headers[n.toLowerCase()],
//       has: (n) => n.toLowerCase() in headers,
//     },
//   });
//   return response();
// }
