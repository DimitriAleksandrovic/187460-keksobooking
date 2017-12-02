'use strict';

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getUnique(arr, startIndex) {
  var index = getRandomNumber(startIndex, arr.length - 1);
  var tmp = arr[index];
  arr[index] = arr[startIndex];
  arr[startIndex] = tmp;
  return tmp;
}

function getRandomArr(target) {
  var arr = [];
  var length = getRandomNumber(0, target.length - 1);
  for (var i = 0; i < length; i++) {
    arr.push(getUnique(target, i));
  }
  return arr;
}

function clickHandler() {
  var args = Array.from(arguments);
  var callback = args[0];
  return function (event) {
    args.splice(0, 1, event);
    callback.apply(null, args);
  };
}

function keyDownHandler() {
  var args = Array.from(arguments);
  var callback = args.splice(0, 1)[0];
  var keyCode = args.splice(0, 1)[0];
  return function(event) {
    args.unshift(event);
    if(event.keyCode === keyCode) {
      callback.apply(null, args);
    }
  };
}
