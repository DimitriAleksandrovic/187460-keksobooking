'use strict';

(function () {

  var mapPinsBlock = window.showcard.mapBlock.querySelector('.map__pins');
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var noticeForm = document.querySelector('.notice__form');
  var pinMain = mapPinsBlock.querySelector('.map__pin--main');

  var formElements = Array.from(noticeForm.querySelector('fieldset'));

  function activatePage() {
    noticeForm.classList.remove('notice__form--disabled');
    window.showcard.mapBlock.classList.remove('map--faded');
    formElements.forEach(function (item) {
      item.disabled = false;
    });
  }

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

        var limitCoords = {
          left: Math.round(pinMain.offsetWidth / 2),
          top: 180 - pinMain.offsetHeight,
          right: Math.round(pinMain.offsetParent.offsetWidth - pinMain.offsetWidth / 2),
          bottom: pinMain.offsetParent.offsetHeight - pinMain.offsetHeight
        };

        if ((pinMain.offsetTop - shift.y) < limitCoords.top) {
          pinMain.style.top = limitCoords.top + 'px';
        }
        if ((pinMain.offsetTop - shift.y) > limitCoords.bottom) {
          pinMain.style.top = limitCoords.bottom + 'px';
        }
        if ((pinMain.offsetLeft - shift.x) < limitCoords.left) {
          pinMain.style.left = limitCoords.left + 'px';
        }
        if ((pinMain.offsetLeft - shift.x) > limitCoords.right) {
          pinMain.style.left = limitCoords.right + 'px';
        }

        var finalCoords = {
          fx: Math.round(pinMain.offsetLeft + pinMain.offsetWidth / 2),
          fy: pinMain.offsetTop + pinMain.offsetHeight
        };

        noticeForm.address.value = 'x: ' + finalCoords.fx + ', y: ' + finalCoords.fy;
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
    mapPinsBlock: mapPinsBlock,
    pinTemplate: pinTemplate,
    noticeForm: noticeForm,
    pinMain: pinMain,
    dragPinMain: dragPinMain
  };

})();
