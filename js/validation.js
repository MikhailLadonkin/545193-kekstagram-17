'use strict';

(function () {
  var commentField = document.querySelector('.text__description');
  var validateCommentLength = function () {
    var MAX_LENGTH = 140;
    if (commentField.value.length > MAX_LENGTH) {
      commentField.style.border = 'thick solid red';
      commentField.setCustomValidity('The message is too long');
    } else {
      commentField.style.border = '';
      commentField.setCustomValidity('');
    }
  };
  commentField.addEventListener('change', validateCommentLength);
})();

