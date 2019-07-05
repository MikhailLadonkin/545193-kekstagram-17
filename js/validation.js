'use strict';

(function () {
  var commentField = document.querySelector('.text__description');
  var hashtagsInput = document.querySelector('.text__hashtags');
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

  var validateHashtags = function () {
    var errorMessage;
    var value = hashtagsInput.value.replace(/\s+/g, ' ').trim().toLowerCase();
    var hashArr = value.split(' ');

    if (hashArr.length > 5) {
      errorMessage = 'You can add up to 5 hashtags';
    }

    for (var i = 0; i < hashArr.length; i++) {
      var characters = hashArr[i];
      var newHashtaagsList = hashArr.slice();
      var repeatedHashtags = [];
      for (var k = 0; k < newHashtaagsList.length - 1; k++) {
        if (newHashtaagsList[k + 1].toLowerCase() === newHashtaagsList[k].toLowerCase()) {
          repeatedHashtags.push(newHashtaagsList[i]);
        }
      }
      if (characters.charAt(0) !== '#') {
        errorMessage = 'The hashtag should start with "#"';
      } else if (characters.charAt(0) === '#' && characters.length < 2) {
        var hashtagsElementNumber = characters.match(/#/g).length;
        errorMessage = 'The hashtag should be informative';
      } else if (characters.charAt(0) === '#' && hashtagsElementNumber > 1) {
        errorMessage = 'The hashtags should be separated';
      } else if (characters.length > 20) {
        errorMessage = 'The hashtag can be up to 20 chars long';
      } else if (repeatedHashtags.length > 0) {
        errorMessage = 'The hashtags can not be repeated';
      }
    }

    if (errorMessage) {
      hashtagsInput.setCustomValidity(errorMessage);
      hashtagsInput.style.border = 'thick solid red';
    } else {
      hashtagsInput.style.border = '';
      hashtagsInput.setCustomValidity('');
    }
  };
  commentField.addEventListener('change', validateCommentLength);
  hashtagsInput.addEventListener('change', validateHashtags);
})();

