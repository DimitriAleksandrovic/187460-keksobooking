'use strict';

var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('.map--faded');
var mapPinsBlock = mapBlock.querySelector('.map__pins');
var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var advertTemplate = document.querySelector('template').content.querySelector('.map__card');
var filters = mapBlock.querySelector('.map__filters-container');

var advertsCount = 8;
var titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'];
var types = ['flat', 'house', 'bungalo'];
var times = ['12:00', '13:00', '14:00'];
var featuresFullList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getUnique(arr, startIndex) {
  var index = getRandomNumber(startIndex, arr.length - 1);
  var tmp = arr[index];
  arr[index] = arr[startIndex];
  arr[startIndex] = tmp;
  return tmp;
}

function getRandomArr(target) {
  var arr = [];
  var length = getRandomNumber(0, target.length - 1);
  for (var i = 0; i < length; i++) {
    arr.push(getUnique(target, i));
  }
  return arr;
}

function getBookingData() {
  var arr = [];
  for (var i = 0; i < advertsCount; i++) {
    var x = getRandomNumber(300, 900);
    var y = getRandomNumber(100, 500);
    var time = times[getRandomNumber(0, times.length - 1)];
    var item = {};
    item.author = {
      avatar: 'img/avatars/user0' + (i + 1) + '.png',
    };
    item.offer = {
      title: getUnique(titles, i),
      address: x + ',' + y,
      price: getRandomNumber(1000, 1000000),
      type: types[getRandomNumber(0, types.length - 1)],
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 5),
      checkin: time,
      checkout: time,
      features: getRandomArr(featuresFullList),
      description: '',
      photos: [],
    };
    item.location = {
      coordX: x,
      coordY: y,
    };
    arr.push(item);
  }
  return arr;
}

var adverts = getBookingData();

function renderPin(data) {
  var mapPin = pinTemplate.cloneNode(true);
  mapPin.style.left = data.location.coordX + 'px';
  mapPin.style.top = data.location.coordY + 'px';
  mapPin.children[0].src = data.author.avatar;
  return mapPin;
}

function putPinsOnMap() {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(renderPin(adverts[i]));
  }
  mapPinsBlock.appendChild(fragment);
}

function translateOfferType(type) {
  var result = null;
  switch (type) {
    case 'flat' :
      result = 'Квартира';
      break;
    case 'bungalo' :
      result = 'Бунгало';
      break;
    case 'house' :
      result = 'Дом';
      break;
    default :
      break;
  }
  return result;
}

function getOfferFeatures(data) {
  var featureList = document.createDocumentFragment();
  data.forEach(function (item) {
    var featureItem = document.createElement('li');
    featureItem.className = 'feature feature--' + item;
    featureList.appendChild(featureItem);
  });
  return featureList;
}

function createAdvert(data) {
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

putPinsOnMap();
filters.insertAdjacentElement('beforeBegin', createAdvert(adverts[0]));
