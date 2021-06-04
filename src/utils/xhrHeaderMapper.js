// See https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders

/**
 * Extracts headers from an XHR and converst it to an object with a key/value per header
 * @param {XMLHttpRequest} xhr
 * @returns Object representation of the xhr's headers
 */
export default function xhrHeaderMapper(xhr) {
  return Object.fromEntries(
      xhr
      // Raw response headers
      .getAllResponseHeaders()
      .trim()
      // split by line
      .split(/\r?\n/)
      // split by colon and trim each part
      .map((h) => h.split(":").map(v => v.trim()))
      // ensure header exists
      .filter(([k, v]) => !!k)
  );
}
