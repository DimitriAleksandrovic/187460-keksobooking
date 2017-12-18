'use strict';

(function () {

  var mapPinsBlock = document.querySelector('.map__pins');
  var pinMain = mapPinsBlock.querySelector('.map__pin--main');
  var filters = document.querySelector('.map__filters-container');
  var offerData = [];

  var typeFilter = document.querySelector('#housing-type');
  var priceFilter = document.querySelector('#housing-price');

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
    createPins(data);
    pinMain.removeEventListener('mouseup', putPinsOnMap);
  };

  var checkType = function (data, target) {
    var result = [];
    if (target.selectedIndex === 0) {
      result = data;
      console.log(result);
    } else {
      console.log(target.selectedIndex);
      console.log(target.value);
      result = data.filter(function (item) {
        return item.offer.type === 'house';
        // console.log(target.value);
      });
    }
    
    return result;
  };

  var initFilters = function (data) {
    console.log(data);
    filters.addEventListener('change', function (event) {
      event.preventDefault();
      var target = event.target;
      checkType (data, target);
      
    });
  };
  
  document.addEventListener('loadData', function (event) {
    event.preventDefault();
    data = window.data.get();
    initFilters (data);
    
    return data;
  });

  pinMain.addEventListener('mouseup', putPinsOnMap);

})();
