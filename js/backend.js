'use strict';

(function () {

  function load(onLoad, onError) {
    var settings = {
      method: 'GET', // метод запроса
      url: 'https://1510.dump.academy/keksobooking/data', // адрес запроса
      success: onLoad, // колбэк, выполняется в случае успешно выполненого запроса
      sendError: onError, // функция обработки ошибок
      type: 'json', // тип получаемых данных
    };
    window.ajax(settings);
  }
  function save(onLoad, onError, data) {
    var settings = {
      method: 'POST', // метод запроса
      url: ' https://1510.dump.academy/keksobooking', // адрес запроса
      success: onLoad, // колбэк, выполняется в случае успешно выполненого запроса
      sendError: onError, // функция обработки ошибок
      type: 'json', // тип получаемых данных
      data: data
    };
    window.ajax(settings);
  }

  window.backend = {};
  window.backend.load = load;
  window.backend.save = save;
})();
