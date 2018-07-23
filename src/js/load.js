'use strict';

module.exports = function(url, callback, callbackName) {
  if (!callbackName) {
    callbackName = 'cb' + Date.now();
  }

  window[callbackName] = function(data) {
    callback(data);
  };

  var callbackScript = document.createElement('script');
  callbackScript.src = url + '?callback=' + callbackName;
  document.body.appendChild(callbackScript);
};
