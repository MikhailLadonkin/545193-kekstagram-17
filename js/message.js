'use strict';

(function () {
  var templateSuccess = document.querySelector('#success').content.querySelector('div');
  var templateError = document.querySelector('#error').content.querySelector('div');
  var closeMessage = function () {
    document.querySelector('.success__inner').remove();
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
    if (!document.querySelector('.success__inner').contains(evt.target)) {
      closeMessage();
    }
  };

  var successMessage = function () {
    var element = templateSuccess.cloneNode(true);
    element.querySelector('.success__title').textContent = 'The pic has been successfully uploaded';
    element.querySelector('.success__button').textContent = 'Awesome';
    document.querySelector('main').appendChild(element);
    element.querySelector('.success__button').addEventListener('click', function () {
      element.remove();
    });
    document.addEventListener('keydown', onMessageEscPress);
    document.addEventListener('click', onDocClickClose);
  };

  var errorMessage = function () {
    var element = templateError.cloneNode(true);
    element.querySelector('.error__title').textContent = 'Oops! Something went wrong!';
    element.querySelector('.error__button:nth-child(1)').textContent = 'Please try again';
    element.querySelector('.error__button:nth-child(2)').textContent = 'Choose another file';
    document.querySelector('main').appendChild(element);
    element.querySelectorAll('.error__button').forEach(function (item) {
      item.addEventListener('click', function () {
        element.remove();
      });
    });
    document.addEventListener('keydown', onMessageEscPress);
    document.addEventListener('click', onDocClickClose);
  };
  window.message = {
    success: successMessage,
    error: errorMessage
  };
})();
