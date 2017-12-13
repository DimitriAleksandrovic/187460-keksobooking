'use strict';

(function () {

  var mapPinsBlock = document.querySelector('.map__pins');
  var pinMain = mapPinsBlock.querySelector('.map__pin--main');

  var renderPin = function (data, num) {
    var mapPin = window.map.pinTemplate.cloneNode(true);
    mapPin.style.left = data.location.x - 20 + 'px';
    mapPin.style.top = data.location.y + 44 + 'px';
    mapPin.children[0].src = data.author.avatar;
    mapPin.dataset.num = num;
    return mapPin;
  };
  var createPins = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderPin(data[i], i));
    }
    mapPinsBlock.appendChild(fragment);
  };

  window.map.dragPinMain();

  var putPinsOnMap = function () {
    window.map.activatePage();
    createPins(window.data.get());
    pinMain.removeEventListener('mouseup', putPinsOnMap);
  };

  pinMain.addEventListener('mouseup', putPinsOnMap);

})();
