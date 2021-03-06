var key = 'yjtec-bmap-cache-position';
var source = window.localStorage;
export function getCachePoint() {
  var expired = source.getItem("".concat(key, "__expires__")) || Date.now + 1;
  var now = Date.now();

  if (now >= expired) {
    source.removeItem(key);
    source.removeItem("".concat(key, "__expires__"));
    return;
  }

  var value = source.getItem(key);
  return value ? JSON.parse(value) : null;
}
export function setCachePoint(value, expired) {
  source.setItem(key, JSON.stringify(value));

  if (expired) {
    source.setItem("".concat(key, "__expires__"), Date.now() + 1000 * 60 * expired);
  }

  return value;
}