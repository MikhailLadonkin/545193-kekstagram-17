'use strict';
(function () {
  var ESC_KEYCODE = 27;

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    getRandomInt: getRandomInt
  };
})();
