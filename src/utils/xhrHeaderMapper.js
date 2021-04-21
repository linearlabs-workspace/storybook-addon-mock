export default function xhrHeaderMapper(xhr) {
  return Object.fromEntries(
    xhr
      .getAllResponseHeaders()
      .trim()
      .split(/\r?\n/)
      .map((h) => h.split(":").map(v => v.trim()))
      .filter(([k, v]) => !!k)
  );
}
