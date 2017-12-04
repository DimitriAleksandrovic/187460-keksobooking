'use strict';

var ESC_KEYCODE = 27;

(function () {

  var mapBlock = document.querySelector('.map');

  var mapPinsBlock = mapBlock.querySelector('.map__pins');
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var noticeForm = document.querySelector('.notice__form');
  var pinMain = mapPinsBlock.querySelector('.map__pin--main');

  var filters = mapBlock.querySelector('.map__filters-container');
  var formElements = Array.from(noticeForm.querySelector('fieldset'));
  var activePin = null;
  var currentAdvert = null;

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
      var advert = window.card.createAdvert(data[index]);
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

  mapBlock.addEventListener('click', window.clickHandler(showDetails, window.data.getBookingData())); // adverts

  mapBlock.addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.closest('.popup__close')) {
      closePopUp(event);
    }
  });

  document.addEventListener('keydown', window.keyDownHandler(closePopUp, ESC_KEYCODE));

  window.map = {
    activatePage: activatePage,
    mapPinsBlock: mapPinsBlock,
    pinTemplate: pinTemplate,
    noticeForm: noticeForm,
    pinMain: pinMain,
  };

})();
