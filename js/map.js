'use strict';

var ESC_KEYCODE = 27;
// var ENTER_KEYCODE = 13;

var mapBlock = document.querySelector('.map');
var mapPinsBlock = mapBlock.querySelector('.map__pins');
var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var advertTemplate = document.querySelector('template').content.querySelector('.map__card');
var filters = mapBlock.querySelector('.map__filters-container');

var noticeForm = document.querySelector('.notice__form');
var formElements = Array.from(noticeForm.querySelector('fieldset'));
var pinMain = mapPinsBlock.querySelector('.map__pin--main');

var activePin = null;
var currentAdvert = null;

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

function getBookingData() {
  var arr = [];
  for (var i = 0; i < advertsCount; i++) {
    var x = window.getRandomNumber(300, 900);
    var y = window.getRandomNumber(100, 500);
    var time = times[window.getRandomNumber(0, times.length - 1)];
    var item = {};
    item.author = {
      avatar: 'img/avatars/user0' + (i + 1) + '.png',
    };
    item.offer = {
      title: window.getUnique(titles, i),
      address: x + ',' + y,
      price: window.getRandomNumber(1000, 1000000),
      type: types[window.getRandomNumber(0, types.length - 1)],
      rooms: window.getRandomNumber(1, 5),
      guests: window.getRandomNumber(1, 5),
      checkin: time,
      checkout: time,
      features: window.getRandomArr(featuresFullList),
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

function renderPin(data, num) {
  var mapPin = pinTemplate.cloneNode(true);
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
  newAdvert.children[7].textContent = 'Заезд после ' + data.offer.checkin + ', выезд до' + data.offer.checkout;

  var featureList = newAdvert.querySelector('.popup__features');
  featureList.innerHTML = '';
  featureList.appendChild(getOfferFeatures(data.offer.features));

  newAdvert.children[9].textContent = data.offer.description;
  return newAdvert;
}

function activatePage() {
  noticeForm.classList.remove('notice__form--disabled');
  mapBlock.classList.remove('map--faded');
  formElements.forEach(function (item) {
    item.disabled = false;
  });
}

function showDetails(event, data) {
  event.preventDefault();
  var target = event.target.closest('.map__pin');
  if (target && !target.classList.contains('map__pin--main')) {
    var index = target.dataset.num;
    var advert = createAdvert(data[index]);
    filters.insertAdjacentElement('beforeBegin', advert);
    target.classList.add('map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
      currentAdvert.remove();
    }
    activePin = target;
    currentAdvert = advert;
  }
}

function closePopUp(event) {
  event.preventDefault();
  if (currentAdvert) {
    currentAdvert.remove();
    activePin.classList.remove('map__pin--active');
  }
}

pinMain.addEventListener('mouseup', function (event) {
  event.preventDefault();
  activatePage();
  createPins(adverts);
});

mapBlock.addEventListener('click', window.clickHandler(showDetails, adverts));

mapBlock.addEventListener('click', function (event) {
  event.preventDefault();
  if (event.target.closest('.popup__close')) {
    closePopUp(event);
  }
});

document.addEventListener('keydown', window.keyDownHandler(closePopUp, ESC_KEYCODE));

/// 
var timein = noticeForm.querySelector('#timein');
var timeout = noticeForm.querySelector('#timeout');
timein.addEventListener('input', function () {
  for (var j = 0; j < timein.options.length; j++) {
    if (timein.selectedIndex === j) {
      timeout.selectedIndex = j;
    }
  };
});

var roomsNumber = noticeForm.querySelector('#room_number');
var guestsNumber = noticeForm.querySelector('#capacity');
guestsNumber.selectedIndex = 2;
guestsNumber.options[0].disabled = true;
guestsNumber.options[1].disabled = true;
guestsNumber.options[3].disabled = true;
roomsNumber.addEventListener('input', function () {
  if (roomsNumber.selectedIndex === 1) {
    guestsNumber.selectedIndex = 1;
    guestsNumber.options[0].disabled = true;
    guestsNumber.options[1].disabled = false;
    guestsNumber.options[3].disabled = true;
  }
  else if (roomsNumber.selectedIndex === 2) {
    guestsNumber.selectedIndex = 0;
    guestsNumber.options[0].disabled = false;
    guestsNumber.options[3].disabled = true;
  }
  else if (roomsNumber.selectedIndex === 3) {
    guestsNumber.selectedIndex = 3;
    guestsNumber.options[0].disabled = true;
    guestsNumber.options[1].disabled = true;
    guestsNumber.options[2].disabled = true;
  }
  else if (roomsNumber.selectedIndex === 0) {
    guestsNumber.selectedIndex = 2;
    guestsNumber.options[0].disabled = true;
    guestsNumber.options[1].disabled = true;
    guestsNumber.options[3].disabled = true;
  }
}); 

/* var homeType = noticeForm.querySelector('#type');
var priceWanted = noticeForm.querySelector('#price');
priceWanted.min = '1000';
homeType.addEventListener('input', function () {
  
  if (homeType.selectedIndex === 0) {
    priceWanted.min = '1000';
  }
  else if (homeType.selectedIndex === 1) {
    priceWanted.min = '0';
  }
  else if (homeType.selectedIndex === 2) {
    priceWanted.min = '5000';
  }
  else if (homeType.selectedIndex === 3) {
    priceWanted.min = '10000';
  }
});*/

// console.log(priceWanted.placeholder);

/* var formSubmit = noticeForm.querySelector('.form__submit');
formSubmit.addEventListener('click', function (event) {
  event.preventDefault();
  for (var i = 0; i < formElements.length; i++) {
    if (formElements.validity.valid[i] == false) {
      formElements.style.border-color = 'red';
    };
  }
}) */

// ?массив formElements пустой
