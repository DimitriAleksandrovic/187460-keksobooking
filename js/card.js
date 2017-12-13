'use strict';

(function () {

  var advertTemplate = document.querySelector('template').content.querySelector('.map__card');

  var getOfferFeatures = function (data) {
    var featureList = document.createDocumentFragment();
    data.forEach(function (item) {
      var featureItem = document.createElement('li');
      featureItem.className = 'feature feature--' + item;
      featureList.appendChild(featureItem);
    });
    return featureList;
  }

  var translateOfferType = function (type) {
  var result = null;
  switch (type) {
    case 'flat':
      result = 'Квартира';
      break;
    case 'bungalo':
      result = 'Бунгало';
      break;
    case 'house':
      result = 'Дом';
      break;
    default:
      break;
    }
    return result;
  };

  window.card = {
    createAdvert: function (data) {
      var newAdvert = advertTemplate.cloneNode(true);
      newAdvert.querySelector('img').src = data.author.avatar;
      newAdvert.querySelector('h3').textContent = data.offer.title;
      newAdvert.querySelector('small').textContent = data.offer.address;
      newAdvert.querySelector('.popup__price').textContent = data.offer.price + '&#x20bd;/ночь';
      newAdvert.querySelector('h4').textContent = translateOfferType(data.offer.type);
      newAdvert.children[6].textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
      newAdvert.children[7].textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;

      var featureList = newAdvert.querySelector('.popup__features');
      featureList.innerHTML = '';
      featureList.appendChild(getOfferFeatures(data.offer.features));

      newAdvert.children[9].textContent = data.offer.description;
      return newAdvert;
    }
  };

})();
