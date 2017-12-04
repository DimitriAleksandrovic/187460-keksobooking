'use strict';

(function () {

  var advertsCount = 8;
  var titles = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'];
  var types = ['flat', 'house', 'bungalo'];
  var times = ['12:00', '13:00', '14:00'];
  var featuresFullList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  window.data = {
    getBookingData: function () {
      var arr = [];
      for (var i = 0; i < advertsCount; i++) {
        var x = window.getRandomNumber(300, 900);
        var y = window.getRandomNumber(100, 500);
        var time = times[window.getRandomNumber(0, times.length - 1)];
        var item = {};
        item.author = {
          avatar: 'img/avatars/user0' + (i + 1) + '.png',
        };
        item.offer = {
          title: window.getUnique(titles, i),
          address: x + ',' + y,
          price: window.getRandomNumber(1000, 1000000),
          type: types[window.getRandomNumber(0, types.length - 1)],
          rooms: window.getRandomNumber(1, 5),
          guests: window.getRandomNumber(1, 5),
          checkin: time,
          checkout: time,
          features: window.getRandomArr(featuresFullList),
          description: '',
          photos: [],
        };
        item.location = {
          coordX: x,
          coordY: y,
        };
        arr.push(item);
      }
      return arr;
    },
    translateOfferType: function (type) {
      var result = null;
      switch (type) {
        case 'flat' :
          result = 'Квартира';
          break;
        case 'bungalo' :
          result = 'Бунгало';
          break;
        case 'house' :
          result = 'Дом';
          break;
        default :
          break;
      }
      return result;
    },
  };

})();
