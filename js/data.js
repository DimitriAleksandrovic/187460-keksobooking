'use strict';

(function () {

  var mapBlock = document.querySelector('.map');

  var offerData = null;
  var loadData = new Event('loadData', {bubbles: true, cancelable: true});

  mapBlock.style.overflow = 'visible';

  var onLoad = function (data) {
    offerData = data;
    document.dispatchEvent(loadData);
  };

  var onError = function (errorMessage) {
    var message = document.createElement('div');
    message.style = 'z-index: 100; margin: 0 auto; margin-top: 29%; width: 50%; text-align: center; color: white; background-color: red; box-shadow: 3px 3px 3px black';
    message.style.position = 'absolute';
    message.style.left = 0;
    message.style.right = 0;
    message.style.fontSize = '24px';
    message.textContent = errorMessage;
    mapBlock.insertAdjacentElement('afterbegin', message);
  };

  window.backend.load(onLoad, onError);

  window.data = {
    onLoad: onload,
    onError: onError
  };
  window.data.get = function () {
    return offerData;
  };
  
})();
