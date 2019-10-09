export const importCDN = (url, name) =>
  new Promise(resolve => {
    const dom = document.createElement('script');
    dom.src = url;
    dom.type = 'text/javascript';
    dom.onload = () => {
      resolve(window[name]);
    };
    document.head.appendChild(dom);
  });