'use strict';

var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('.map--faded');
var mapPinsBlock = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');

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

var avatarCount = [];
for (var i = 0; i < advertsCount; i++) {
  avatarCount[i] = i + 1;
}

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
    },
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
    },
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

var fragment = document.createDocumentFragment();
for (i = 0; i < adverts.length; i++) {
  fragment.appendChild(renderPin(adverts[i]));
}
mapPinsBlock.appendChild(fragment);

var advertTemplate = document.querySelector('template').content.querySelector('.map__card');

function createAdvert(data) {
  var newAdvert = advertTemplate.cloneNode(true);
  newAdvert.querySelector('img').src = data.author.avatar;
  newAdvert.querySelector('h3').textContent = data.offer.title;
  newAdvert.querySelector('small').textContent = data.offer.address;
  newAdvert.querySelector('.popup__price').textContent = data.offer.price + '&#x20bd;/ночь';
  var offerType = newAdvert.querySelector('h4').textContent;
    if (data.offer.type === 'flat') offerType = 'Квартира';
    if (data.offer.type === 'bungalo') offerType = 'Бунгало';
    if (data.offer.type === 'house') offerType = 'Дом';
  newAdvert.children[6].textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  newAdvert.children[7].textContent = 'Заезд после ' + data.offer.checkin + ', выезд до' + data.offer.checkout;

/* var featuresElement = newAdvert.querySelector('.popup__features').querySelector('li');
for (var i = 0; i < data.offer.features.length; i++) {
featuresElement[i].classList.add('feature feature--' + data.offer.features[i]);
};
var featuresList = newAdvert.querySelector('.popup__features');
console.log(featuresList);*/

  newAdvert.children[9].textContent = data.offer.description;
  return newAdvert;
};

// var fragmentAdvert = document.createDocumentFragment();
// fragmentAdvert.appendChild(createAdvert(adverts[0]));
mapPinsBlock.insertAdjacentHTML('afterend', createAdvert(adverts[0]));