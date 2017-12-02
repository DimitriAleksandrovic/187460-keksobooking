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
