'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 300;
  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    getRandomInt: getRandomInt,
    debounce: debounce
  };
})();
