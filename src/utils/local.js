const key = 'yjtec-bmap-cache-position';
const source = window.localStorage;
export function getCachePoint(){
  const expired = source.getItem(`${key}__expires__`) || Date.now+1;
  const now = Date.now();
  if(now >= expired){
    source.removeItem(key);
    source.removeItem(`${key}__expires__`);
    return;
  }
  const value = source.getItem(key);
  return value ? JSON.parse(value) : null;
}
export function setCachePoint(value,expired){
  source.setItem(key,JSON.stringify(value));
  if(expired){
    source.setItem(`${key}__expires__`,Date.now() + 1000*60*expired);
  }
  return value;
}