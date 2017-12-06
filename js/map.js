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

  mapBlock.addEventListener('click', window.clickHandler(showDetails, window.data.getBookingData()));

  mapBlock.addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.closest('.popup__close')) {
      closePopUp(event);
    }
  });

  document.addEventListener('keydown', window.keyDownHandler(closePopUp, ESC_KEYCODE));

  function dragPinMain() {
    pinMain.addEventListener('mousedown', function (event) {
      event.preventDefault();
      var startCoords = {
        x: event.clientX,
        y: event.clientY
      };

      function onMouseMove(moveEvt) {
        moveEvt.preventDefault();
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
        pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';

        if ((pinMain.offsetTop - shift.y) < 100) {
          pinMain.style.top = 100 + 'px';
        }
        if ((pinMain.offsetTop - shift.y) > 500) {
          pinMain.style.top = 500 + 'px';
        }
      }

      function onMouseUp(upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

    });
  }

  window.map = {
    activatePage: activatePage,
    mapBlock: mapBlock,
    mapPinsBlock: mapPinsBlock,
    pinTemplate: pinTemplate,
    noticeForm: noticeForm,
    pinMain: pinMain,
    dragPinMain: dragPinMain
  };

})();
