'use strict';

(function () {

  var mapPinsBlock = document.querySelector('.map__pins');
  var pinMain = mapPinsBlock.querySelector('.map__pin--main');
  var filters = document.querySelector('.map__filters');
  var COUNT = 5;
  var originalData = null;
  var displayableLabels = [];
  var MAXPRICE = 50000;
  var MINPRICE = 10000;

  var selectCriteria = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    wifi: false,
    dishwasher: false,
    parking: false,
    washer: false,
    elevator: false,
    conditioner: false,
    features: []
  };

  var renderPin = function (data, num) {
    var mapPin = window.map.pinTemplate.cloneNode(true);
    mapPin.style.left = data.location.x - 20 + 'px';
    mapPin.style.top = data.location.y + 44 + 'px';
    mapPin.children[0].src = data.author.avatar;
    mapPin.dataset.num = num;
    return mapPin;
  };

  var createPins = function (data) {
    var count = data.length > COUNT ? COUNT : data.length;
    if (count === 0) {
      return;
    }
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < count; i++) {
      var label = renderPin(data[i], i);
      fragment.appendChild(label);
      displayableLabels.push(label);
    }
    mapPinsBlock.appendChild(fragment);
  };

  window.map.dragPinMain();

  var renderPins = function () {
    window.map.activatePage();
    createPins(originalData);
    pinMain.removeEventListener('mouseup', renderPins);
  };

  var initFilters = function (data) {
    var filtered = function (field, item) {
      var result = true;
      if (selectCriteria[field] !== 'any') {
        result = selectCriteria[field] === item.offer[field];
      }
      return result;
    };
    filters.addEventListener('change', function (event) {
      event.preventDefault();
      var newData = [];
      var target = event.target;
      var filteredField = target.nodeName.toLowerCase() === 'input' ? target.value : target.id.slice(target.id.indexOf('-') + 1);
      var filteredValue = target.nodeName.toLowerCase() === 'input' ? target.checked : target.options[target.selectedIndex].value;
      selectCriteria[filteredField] = typeof filteredValue === 'boolean' || isNaN(filteredValue) ? filteredValue : parseInt(filteredValue, 10);
      for (var key in selectCriteria) {
        if (selectCriteria.hasOwnProperty(key)) {
          if (typeof selectCriteria[key] === 'boolean') {
            if (selectCriteria[key]) {
              if (!selectCriteria.features.includes(key)) {
                selectCriteria.features.push(key);
              }
            } else {
              if (selectCriteria.features.includes(key)) {
                var index = selectCriteria.features.indexOf(key);
                selectCriteria.features.splice(index, 1);
              }
            }
          }
        }
      }
      data.forEach(function (item) {
        if (selectCriteria.features.length > 0) {
          var checkFeatures = window.utils.checkEntry(item.offer.features, selectCriteria.features);
          if (checkFeatures) {
            newData.push(item);
          }
        } else {
          newData = data.slice();
        }
      });
      newData = newData.filter(function (item) {
        return filtered('type', item);
      }).filter(function (item) {
        return filtered('guests', item);
      }).filter(function (item) {
        return filtered('rooms', item);
      }).filter(function (item) {
        var result = true;
        if (selectCriteria.price !== 'any') {
          switch (selectCriteria.price) {
            case 'middle':
              result = item.offer.price >= MINPRICE && item.offer.price <= MAXPRICE;
              break;
            case 'low':
              result = item.offer.price < MINPRICE;
              break;
            case 'high':
              result = item.offer.price > MAXPRICE;
              break;
            default:
              break;
          }
        }
        return result;
      });
      window.debounce(function () {
        displayableLabels.forEach(function (item) {
          item.remove();
        });
        displayableLabels = [];
        window.data.set(newData);
        createPins(newData);
      });
    });
  };

  document.addEventListener('loadData', function (event) {
    event.preventDefault();
    originalData = window.data.get();
    initFilters(originalData);
    pinMain.addEventListener('mouseup', renderPins);
  });

})();
