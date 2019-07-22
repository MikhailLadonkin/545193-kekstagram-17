'use strict';

(function () {
  var templateSuccess = document.querySelector('#success').content.querySelector('.success');
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var mainElement = document.querySelector('main');

  var close = function () {
    var messageElement = mainElement.querySelector('.success, .error');
    if (messageElement) {
      messageElement.remove();
      document.removeEventListener('keydown', onDocumentKeydown);
      document.removeEventListener('click', onDocumentClick);
    }
  };

  var onDocumentKeydown = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      close();
    }
  };

  var onDocumentClick = function (evt) {
    if (!document.querySelector('.success__inner, .error__inner').contains(evt.target)) {
      close();
    }
  };

  var showSuccess = function () {
    var element = templateSuccess.cloneNode(true);
    element.querySelector('.success__title').textContent = 'The pic has been successfully uploaded';
    element.querySelector('.success__button').textContent = 'Awesome';
    element.querySelector('.success__button').addEventListener('click', function (evt) {
      evt.stopPropagation();
      close();
    });
    mainElement.appendChild(element);
    document.addEventListener('keydown', onDocumentKeydown);
    document.addEventListener('click', onDocumentClick);
  };

  var showError = function () {
    var element = templateError.cloneNode(true);
    element.querySelector('.error__title').textContent = 'Oops! Something went wrong!';
    element.querySelector('.error__button:nth-child(1)').textContent = 'Please try again';
    element.querySelector('.error__button:nth-child(2)').textContent = 'Choose another file';
    element.querySelectorAll('.error__button').forEach(function (item) {
      item.addEventListener('click', function (evt) {
        evt.stopPropagation();
        close();
      });
    });

    mainElement.appendChild(element);
    document.addEventListener('keydown', onDocumentKeydown);
    document.addEventListener('click', onDocumentClick);
  };

  window.message = {
    showSuccess: showSuccess,
    showError: showError
  };
})();
