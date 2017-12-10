'use strict';

(function () {

  function timeSinc(param1, param2) {
    param2.selectedIndex = param1.selectedIndex;
  }

  function roomsSincGuest(param1, param2) {
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
  }

  function getRoomsPrice(field1, field2) {
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
  }

  function limitPrice(field1, field2) {
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
  }

  window.synchronizeFields('change', window.map.noticeForm.timein, window.map.noticeForm.timeout, timeSinc);
  window.synchronizeFields('change', window.map.noticeForm.timeout, window.map.noticeForm.timein, timeSinc);

  window.synchronizeFields('change', window.map.noticeForm.type, window.map.noticeForm.price, getRoomsPrice);
  window.synchronizeFields('input', window.map.noticeForm.price, window.map.noticeForm.type, limitPrice);

  window.synchronizeFields('change', window.map.noticeForm.rooms, window.map.noticeForm.capacity, roomsSincGuest);

  window.map.noticeForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var checked = true;
    if (window.map.noticeForm.title.value.length < 30 || window.map.noticeForm.title.value.length > 100) {
      checked = false;
      window.map.noticeForm.title.style.border = '2px solid red';
      window.map.noticeForm.title.addEventListener('focus', function (evt) {
        evt.preventDefault();
        window.map.noticeForm.title.style.border = '';
      });
    }
    if (checked) {
      window.map.noticeForm.submit();
    }
  }, true);

})();
