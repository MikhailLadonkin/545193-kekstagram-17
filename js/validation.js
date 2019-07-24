'use strict';

(function () {
  var hashtagsInput = document.querySelector('.text__hashtags');


  var validateHashtags = function () {
    var errorMessage;
    var value = hashtagsInput.value.replace(/\s+/g, ' ').trim().toLowerCase();
    var hashArr = value ? value.split(' ') : [];

    if (hashArr.length > 5) {
      errorMessage = 'You can add up to 5 hashtags';
    }
    hashArr.forEach(function (hash) {
      var hashtagArray = hashArr.slice();
      var repeatedHashtags = hashtagArray.filter(function (element, indexElement, array) {
        return indexElement !== array.indexOf(element) || indexElement !== array.lastIndexOf(element);
      });
      var gridArray = hash.match(/#/g);
      var gridCount = gridArray ? gridArray.length : 0;
      if (hash.charAt(0) !== '#') {
        errorMessage = 'The hashtag should start with "#"';
      } else if (hash.charAt(0) === '#' && hash.length < 2) {
        errorMessage = 'The hashtag should be informative';
      } else if (hash.charAt(0) === '#' && gridCount > 1) {
        errorMessage = 'The hashtags should be separated';
      } else if (hash.length > 20) {
        errorMessage = 'The hashtag can be up to 20 chars long';
      } else if (repeatedHashtags.length > 0) {
        errorMessage = 'The hashtags can not be repeated';
      }
    });

    if (errorMessage) {
      hashtagsInput.setCustomValidity(errorMessage);
      hashtagsInput.style.border = 'thick solid red';
    } else {
      hashtagsInput.style.border = '';
      hashtagsInput.setCustomValidity('');
    }
  };
  hashtagsInput.addEventListener('input', validateHashtags);
})();

