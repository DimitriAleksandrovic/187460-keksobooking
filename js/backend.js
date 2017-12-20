'use strict';

(function () {

  var load = function (onLoad, onError) {
    var settings = {
      method: 'GET', // метод запроса
      url: 'https://1510.dump.academy/keksobooking/data', // адрес запроса
      success: onLoad, // колбэк, выполняется в случае успешно выполненого запроса
      sendError: onError, // функция обработки ошибок
      type: 'json', // тип получаемых данных
    };
    window.utils.ajax(settings);
  };

  var save = function (onLoad, onError, data) {
    var settings = {
      method: 'POST', // метод запроса
      url: 'https://1510.dump.academy/keksobooking', // адрес запроса
      success: onLoad, // колбэк, выполняется в случае успешно выполненого запроса
      sendError: onError, // функция обработки ошибок
      type: 'json', // тип получаемых данных
      data: data
    };
    window.utils.ajax(settings);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
