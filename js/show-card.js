'use strict';

var ESC_KEYCODE = 27;

(function () {

  var mapBlock = document.querySelector('.map');
  var filters = mapBlock.querySelector('.map__filters-container');
  var activePin = null;
  var currentAdvert = null;

  function showCard(event, data) {
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

  mapBlock.addEventListener('click', window.clickHandler(showCard, window.data.getBookingData()));

  mapBlock.addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.closest('.popup__close')) {
      closePopUp(event);
    }
  });

  document.addEventListener('keydown', window.keyDownHandler(closePopUp, ESC_KEYCODE));

  window.showcard = {
    mapBlock: mapBlock,
    showCard: showCard
  };

})();
