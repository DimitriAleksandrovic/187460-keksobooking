'use strict';

(function () {

  var BUNGALO_MINPRICE = 0;
  var FLAT_MINPRICE = 1000;
  var HOUSE_MINPRICE = 5000;
  var PALACE_MINPRICE = 10000;

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
        value = FLAT_MINPRICE;
        break;
      case 'bungalo':
        value = BUNGALO_MINPRICE;
        break;
      case 'house':
        value = HOUSE_MINPRICE;
        break;
      case 'palace':
        value = PALACE_MINPRICE;
        break;
    }
    field2.value = value;
  };

  var limitPrice = function (field1, field2) {
    var value = field2.value;
    if (value === 'flat' && field1.value < FLAT_MINPRICE) {
      field1.value = FLAT_MINPRICE;
    }
    if (value === 'bungalo' && field1.value < BUNGALO_MINPRICE) {
      field1.value = BUNGALO_MINPRICE;
    }
    if (value === 'house' && field1.value < HOUSE_MINPRICE) {
      field1.value = HOUSE_MINPRICE;
    }
    if (value === 'palace' && field1.value < PALACE_MINPRICE) {
      field1.value = PALACE_MINPRICE;
    }
  };

  window.synchronizeFields('change', noticeForm.timein, noticeForm.timeout, timeSinc);
  window.synchronizeFields('change', noticeForm.timeout, noticeForm.timein, timeSinc);

  window.synchronizeFields('change', noticeForm.type, noticeForm.price, getRoomsPrice);
  window.synchronizeFields('input', noticeForm.price, noticeForm.type, limitPrice);

  window.synchronizeFields('change', noticeForm.rooms, noticeForm.capacity, roomsSincGuest);

  var loadDataHandler = function () {
    var message = document.createElement('div');
    message.style = 'z-index: 100; margin: 0 auto; margin-top: 20px; text-align: center; color: green;';
    message.style.position = 'absolute';
    message.style.left = 0;
    message.style.right = 0;
    message.style.fontSize = '18px';
    message.textContent = 'Объявление успешно загружено';
    formSubmitBlock.insertAdjacentElement('beforeEnd', message);
    setTimeout(function () {
      message.style.display = 'none';
    }, 5000);
  };


  var loadDataError = function (message) {
    var renderErrorText = function () {
      var fragment = document.createDocumentFragment();
      message.forEach(function (item) {
        var row = document.createElement('p');
        row.textContent = 'Поле ' + item.fieldName + ': ' + item.errorMessage;
        fragment.appendChild(row);
      });
      return fragment;
    };
    var errorBox = document.querySelector('.error-save');
    if (!errorBox) {
      errorBox = document.createElement('div');
      errorBox.classList.add('error-save');
      errorBox.style.position = 'fixed';
      errorBox.style.left = 50 + '%';
      errorBox.style.top = 50 + '%';
      errorBox.style.transform = 'translate(-50%, -50%)';
      errorBox.style.zIndex = 9999;
      errorBox.style.fontSize = '21px';
      errorBox.style.display = 'hidden';
      errorBox.style.color = 'red';
      errorBox.style.border = '2px solid red';
      errorBox.style.borderRadius = '8px';
      errorBox.style.backgroundColor = 'white';
      errorBox.style.boxShadow = '2px 2px 3px black';
      errorBox.style.padding = '10px 20px';
      noticeForm.appendChild(errorBox);
    }
    errorBox.innerHTML = '';

    if (Object.prototype.toString.call(message) === '[object Array]') {
      errorBox.appendChild(renderErrorText());
    } else {
      errorBox.textContent += message;
    }

    errorBox.style.display = 'block';
    setTimeout(function () {
      errorBox.style.display = 'none';
    }, 5000);
  };

  noticeForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var checked = true;
    if (noticeForm.title.value.length < 30) {
      checked = false;
      loadDataError([{fieldName: '«Заголовок объявления»', errorMessage: 'должно быть не менее 30 символов'}]);
      noticeForm.title.style.border = '2px solid red';
      noticeForm.title.addEventListener('focus', function (evt) {
        evt.preventDefault();
        noticeForm.title.style.border = '';
      });
    }
    if (noticeForm.title.value.length > 100) {
      checked = false;
      loadDataError([{fieldName: '«Заголовок объявления»', errorMessage: 'должно быть не более 100 символов'}]);
      noticeForm.title.style.border = '2px solid red';
      noticeForm.title.addEventListener('focus', function (evt) {
        evt.preventDefault();
        noticeForm.title.style.border = '';
      });
    }

    if (checked) {
      window.backend.save(loadDataHandler, loadDataError, new FormData(noticeForm));
      noticeForm.reset();
    }
  }, true);


})();
