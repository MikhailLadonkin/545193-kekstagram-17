'use strict';

(function () {
  window.commentField = {
    element: document.querySelector('.text__description')
  };
  var validateCommentLength = function () {
    var MAX_LENGTH = 140;
    if (window.commentField.element.value.length > MAX_LENGTH) {
      window.commentField.element.style.border = 'thick solid red';
      window.commentField.element.setCustomValidity('The message is too long');
    } else {
      window.commentField.element.style.border = '';
      window.commentField.element.setCustomValidity('');
    }
  };
  window.commentField.element.addEventListener('change', validateCommentLength);
})();

