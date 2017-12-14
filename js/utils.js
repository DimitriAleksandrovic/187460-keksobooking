'use strict';

window.getRandomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

window.getUnique = function (arr, startIndex) {
  var index = window.getRandomNumber(startIndex, arr.length - 1);
  var tmp = arr[index];
  arr[index] = arr[startIndex];
  arr[startIndex] = tmp;
  return tmp;
};

window.getRandomArr = function (target) {
  var arr = [];
  var length = window.getRandomNumber(0, target.length - 1);
  for (var i = 0; i < length; i++) {
    arr.push(window.getUnique(target, i));
  }
  return arr;
};

window.clickHandler = function () {
  var args = Array.from(arguments);
  var callback = args[0];
  return function (event) {
    args.splice(0, 1, event);
    callback.apply(null, args);
  };
};

window.keyDownHandler = function () {
  var args = Array.from(arguments);
  var callback = args.splice(0, 1)[0];
  var keyCode = args.splice(0, 1)[0];
  return function (event) {
    args.unshift(event);
    if (event.keyCode === keyCode) {
      callback.apply(null, args);
    }
  };
};

window.ajax = function (settings) {
  var defSettings = {
    method: 'GET', // метод запроса
    url: '', // адрес запроса
    data: null, // передаваемые данные
    sinc: true, // синхронный или асинхронный запрос
    success: null, // колбэк, выполняется в случае успешно выполненого запроса
    sendError: null, // функция обработки ошибок
    type: '', // тип получаемых данных
    readyStateChange: null, // функция обработки ответа сервера
    headers: {} // заголовки для сервера
  };
  // сформируем опции запроса на основе дефолтных настроек и переданных опций
  var options = Object.assign({}, defSettings, settings);
  // создадим объект запроса
  var xhr = new XMLHttpRequest();
  xhr.responseType = options.type;
  xhr.open(options.method, options.url, options.sinc);
  // установим заголовок, сообщающий серверу, что это именно AJAX запрос
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  // установим остальные заголовки если есть
  for (var key in options.headers) {
    if (options.headers.hasOwnProperty(key)) {
      xhr.setRequestHeader(key, options.headers[key]);
    }
  }

  xhr.onreadystatechange = options.readyStateChange || function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      options.success(xhr.response);
    }
    if (xhr.readyState === 4 && xhr.status !== 200) {
      if (typeof options.sendError === 'function') {
        options.sendError(xhr.response);
      }
    }
  };

  xhr.onerror = function () {
    if (typeof options.sendError === 'function') {
      options.sendError('Что-то пошло не так');
    }
  };

  xhr.send(options.data);
};


