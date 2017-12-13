'use strict';

(function () {

  var noticeForm = document.querySelector('.notice__form');
  var formSubmitBlock = noticeForm.querySelector('.form__element--submit');

  var timeSinc = function (param1, param2) {
    param2.selectedIndex = param1.selectedIndex;
  };

  var roomsSincGuest = function (param1, param2) {
    var optionsMapping = {
      1: [1],
      2: [1, 2],
      3: [1, 2, 3],
      100: [0]
    };
    var value = parseInt(param1.value, 10);
    var options = param2.options;
    var optionsLength = options.length;
    var availableOptions = optionsMapping[value];
    var curValue = null;

    for (var i = 0; i < optionsLength; i++) {
      curValue = parseInt(options[i].value, 10);
      if (availableOptions.indexOf(curValue) !== -1) {
        options[i].disabled = false;
        if (curValue === value || availableOptions.length === 1) {
          options[i].selected = true;
        }
      } else {
        options[i].disabled = true;
      }
    }
  };

  var getRoomsPrice = function (field1, field2) {
    var value = null;
    switch (field1.value) {
      case 'flat':
        value = 1000;
        break;
      case 'bungalo':
        value = 0;
        break;
      case 'house':
        value = 5000;
        break;
      case 'palace':
        value = 10000;
        break;
    }
    field2.value = value;
  };

  var limitPrice = function (field1, field2) {
    var value = field2.value;
    if (value === 'flat' && field1.value < 1000) {
      field1.value = 1000;
    }
    if (value === 'bungalo' && field1.value < 0) {
      field1.value = 0;
    }
    if (value === 'house' && field1.value < 5000) {
      field1.value = 5000;
    }
    if (value === 'palace' && field1.value < 10000) {
      field1.value = 10000;
    }
  };

  window.synchronizeFields('change', noticeForm.timein, noticeForm.timeout, timeSinc);
  window.synchronizeFields('change', noticeForm.timeout, noticeForm.timein, timeSinc);

  window.synchronizeFields('change', noticeForm.type, noticeForm.price, getRoomsPrice);
  window.synchronizeFields('input', noticeForm.price, noticeForm.type, limitPrice);

  window.synchronizeFields('change', noticeForm.rooms, noticeForm.capacity, roomsSincGuest);

  noticeForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var onLoad = function () {
      var message = document.createElement('div');
      message.style = 'z-index: 100; margin: 0 auto; margin-top: 20px; text-align: center; color: green;';
      message.style.position = 'absolute';
      message.style.left = 0;
      message.style.right = 0;
      message.style.fontSize = '18px';
      message.textContent = 'Объявление успешно загружено';
      formSubmitBlock.insertAdjacentElement('beforeEnd', message);
    };

    /* var rewriteTitle = function (txt) {

    };*/

    var checked = true;
    if (noticeForm.title.value.length < 30 || noticeForm.title.value.length > 100) {
      checked = false;
      noticeForm.title.style.border = '2px solid red';
      noticeForm.title.addEventListener('focus', function (evt) {
        evt.preventDefault();
        noticeForm.title.style.border = '';
      });
    }
    if (checked) {
      window.backend.save(onLoad, null, new FormData(noticeForm));
      event.preventDefault();
    }
  }, true);

})();
