'use strict';
(function () {

  var Url = {
    LOAD: 'https://js.dump.academy/kekstagram/data',
    UPLOAD: 'https://js.dump.academy/kekstagram'
  };
  var successStatus = 200;
  var timeout = 9000;

  var createXHR = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === successStatus) {
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

    xhr.timeout = timeout;

    return xhr;
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = createXHR(onSuccess, onError);
    xhr.open('POST', Url.UPLOAD);
    xhr.send(data);
  };
  var load = function (onSuccess, onError) {
    var xhr = createXHR(onSuccess, onError);
    xhr.open('GET', Url.LOAD);
    xhr.send();
  };

  window.backend = {
    upload: upload,
    load: load
  };
})();
