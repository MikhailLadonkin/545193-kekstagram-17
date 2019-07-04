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
    var hashtagsList;
    if (hashtagsInput.value.indexOf(' ') <= -1) {
      if (hashtagsInput.value.charAt(0) !== '#') {
        hashtagsInput.style.border = 'thick solid red';
        hashtagsInput.setCustomValidity('The hashtag should start with "#"');
      } else if (hashtagsInput.value.charAt(0) === '#' && hashtagsInput.value < 2) {
        hashtagsInput.style.border = 'thick solid red';
        hashtagsInput.setCustomValidity('The hashtag should be informative');
      } else if (hashtagsInput.value.charAt(0) === '#' && hashtagsInput.value.match(/#/g).length > 1) {
        hashtagsInput.style.border = 'thick solid red';
        hashtagsInput.setCustomValidity('The hashtags should be separated');
      } else if (hashtagsInput.value.length > 20) {
        hashtagsInput.style.border = 'thick solid red';
        hashtagsInput.setCustomValidity('The hashtag can be up to 20 chars long');
      } else {
        hashtagsInput.style.border = '';
        hashtagsInput.setCustomValidity('');
      }
    }
    if (hashtagsInput.value.indexOf(' ') > -1) {
      hashtagsList = hashtagsInput.value.trim().split(' ');
      if (hashtagsList.length > 5) {
        hashtagsInput.style.border = 'thick solid red';
        hashtagsInput.setCustomValidity('You can add up to 5 hashtags');
      } else {
        hashtagsInput.style.border = '';
        hashtagsInput.setCustomValidity('');
        for (var i = 0; i < hashtagsList.length; i++) {
          var characters = hashtagsList[i];
          var hashtagsElementNumber = characters.match(/#/g).length;
          var newHashtaagsList = hashtagsList.slice();
          var repeatedHashtags = [];

          for (var k = 0; k < newHashtaagsList.length - 1; k++) {
            if (newHashtaagsList[k + 1].toLowerCase() === newHashtaagsList[k].toLowerCase()) {
              repeatedHashtags.push(newHashtaagsList[i]);
            }
          }

          if (characters.charAt(0) !== '#') {
            hashtagsInput.style.border = 'thick solid red';
            hashtagsInput.setCustomValidity('The hashtag should start with "#"');
          } else if (characters.charAt(0) === '#' && characters.length < 2) {
            hashtagsInput.style.border = 'thick solid red';
            hashtagsInput.setCustomValidity('The hashtag should be informative');
          } else if (characters.charAt(0) === '#' && hashtagsElementNumber > 1) {
            hashtagsInput.style.border = 'thick solid red';
            hashtagsInput.setCustomValidity('The hashtags should be separated');
          } else if (characters.length > 20) {
            hashtagsInput.style.border = 'thick solid red';
            hashtagsInput.setCustomValidity('The hashtag can be up to 20 chars long');
          } else if (repeatedHashtags.length > 0) {
            hashtagsInput.style.border = 'thick solid red';
            hashtagsInput.setCustomValidity('The hashtags can not be repeated');
          } else {
            hashtagsInput.style.border = '';
            hashtagsInput.setCustomValidity('');
          }
        }
      }
    }
  };
  commentField.addEventListener('change', validateCommentLength);
  hashtagsInput.addEventListener('change', validateHashtags);
})();

