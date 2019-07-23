'use strict';
(function () {

  var URL = {
    load: 'https://js.dump.academy/kekstagram/data',
    upload: 'https://js.dump.academy/kekstagram'
  };

  var createXHR = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 9000;

    return xhr;
  };

  window.upload = function (data, onSuccess, onError) {
    var xhr = createXHR(onSuccess, onError);
    xhr.open('POST', URL.upload);
    xhr.send(data);
  };
  window.load = function (onSuccess, onError) {
    var xhr = createXHR(onSuccess, onError);
    xhr.open('GET', URL.load);
    xhr.send();
  };
})();
