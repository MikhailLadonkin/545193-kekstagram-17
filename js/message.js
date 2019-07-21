'use strict';

(function () {
  var templateSuccess = document.querySelector('#success').content.querySelector('div');
  var templateError = document.querySelector('#error').content.querySelector('div');

  var closeSuccessMessage = function () {
    document.querySelector('.success__inner').remove();
  };
  var closeErrorMessage = function () {
    document.querySelector('.error__inner').remove();
  };

  var closeMessage = function () {
    if (document.querySelector('.success__inner')) {
      closeSuccessMessage();
    } else if (document.querySelector('.error__inner')) {
      closeErrorMessage();
    }
    document.removeEventListener('keydown', onMessageEscPress);
    document.removeEventListener('click', onDocClickClose);
  };

  var onMessageEscPress = function (evt) {
    evt.preventDefault();
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeMessage();
    }
  };

  var onDocClickClose = function (evt) {
    if (document.querySelector('.success__inner')) {
      if (!document.querySelector('.success__inner').contains(evt.target)) {
        closeMessage();
      }
    } else if (document.querySelector('.error__inner')) {
      if (!document.querySelector('.error__inner').contains(evt.target)) {
        closeMessage();
      }
    }
  };

  var showSuccessMessage = function () {
    var element = templateSuccess.cloneNode(true);
    element.querySelector('.success__title').textContent = 'The pic has been successfully uploaded';
    element.querySelector('.success__button').textContent = 'Awesome';
    document.querySelector('main').appendChild(element);
    element.querySelector('.success__button').addEventListener('click', function () {
      closeMessage();
    });
    document.addEventListener('keydown', onMessageEscPress);
    document.addEventListener('click', onDocClickClose);
  };

  var showErrorMessage = function () {
    var element = templateError.cloneNode(true);
    element.querySelector('.error__title').textContent = 'Oops! Something went wrong!';
    element.querySelector('.error__button:nth-child(1)').textContent = 'Please try again';
    element.querySelector('.error__button:nth-child(2)').textContent = 'Choose another file';
    document.querySelector('main').appendChild(element);
    element.querySelectorAll('.error__button').forEach(function (item) {
      item.addEventListener('click', function () {
        closeMessage();
      });
    });
    document.addEventListener('keydown', onMessageEscPress);
    document.addEventListener('click', onDocClickClose);
  };
  window.message = {
    showOnSuccess: showSuccessMessage,
    showOnError: showErrorMessage
  };
})();
