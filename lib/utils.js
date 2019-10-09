"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.importCDN = void 0;

var importCDN = function importCDN(url, name) {
  return new Promise(function (resolve) {
    var dom = document.createElement('script');
    dom.src = url;
    dom.type = 'text/javascript';

    dom.onload = function () {
      resolve(window[name]);
    };

    document.head.appendChild(dom);
  });
};

exports.importCDN = importCDN;