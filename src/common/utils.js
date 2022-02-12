export function request(url, fn) {
  fetch(url).then(r => r.json()).then(fn);
}