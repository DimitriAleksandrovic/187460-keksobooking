'use strict';

(function () {

  function renderPin(data, num) {
    var mapPin = window.map.pinTemplate.cloneNode(true);
    mapPin.style.left = data.location.coordX - 20 + 'px';
    mapPin.style.top = data.location.coordY + 44 + 'px';
    mapPin.children[0].src = data.author.avatar;
    mapPin.dataset.num = num;
    return mapPin;
  }
  function createPins(data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderPin(data[i], i));
    }
    window.map.mapPinsBlock.appendChild(fragment);
  }

  window.map.dragPinMain();

  document.addEventListener('mouseup', function () {
    window.map.activatePage();
    createPins(window.data.getBookingData());

    // вот координаты!
    var finalCoords = {
      fx: window.map.pinMain.offsetLeft + 33,
      fy: window.map.pinMain.offsetTop + 65 + 22
    };
    console.log(finalCoords);
    return finalCoords; // ???
  });

  // console.log(finalCoords);

})();
