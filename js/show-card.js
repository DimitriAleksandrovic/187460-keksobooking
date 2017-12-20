'use strict';

var ESC_KEYCODE = 27;

(function () {

  var mapBlock = document.querySelector('.map');
  var filters = mapBlock.querySelector('.map__filters-container');
  var activePin = null;
  var currentAdvert = null;

  var showCard = function (event) {
    var target = event.target.closest('.map__pin');
    if (target && !target.classList.contains('map__pin--main')) {
      event.preventDefault();
      var index = target.dataset.num;
      var advert = window.card.createAdvert(window.data.get()[index]); // !!!
      filters.insertAdjacentElement('beforeBegin', advert);
      target.classList.add('map__pin--active');
      if (activePin) {
        activePin.classList.remove('map__pin--active');
        currentAdvert.remove();
      }
      activePin = target;
      currentAdvert = advert;
    }
  };

  var closePopUp = function (event) {
    event.preventDefault();
    if (currentAdvert) {
      currentAdvert.remove();
      activePin.classList.remove('map__pin--active');
    }
  };

  document.addEventListener('loadData', function (event) {
    event.preventDefault();
    mapBlock.addEventListener('click', window.utils.clickHandler(showCard));
  });

  mapBlock.addEventListener('click', function (event) {
    if (event.target.closest('.popup__close')) {
      event.preventDefault();
      closePopUp(event);
    }
  });

  document.addEventListener('keydown', window.utils.keyDownHandler(closePopUp, ESC_KEYCODE));

  window.showcard = {
    mapBlock: mapBlock,
    showCard: showCard
  };

})();
