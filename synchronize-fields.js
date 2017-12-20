'use strict';

window.synchronizeFields = function (eventName, field1, field2, callback) {
  callback(field1, field2);
  field1.addEventListener(eventName, function () {
    callback(field1, field2);
  });
};
