'use strict';

(function () {
  var uploadPicLabel = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var closeOverlay = document.querySelector('.img-upload__cancel');
  var hashtagsField = document.querySelector('.text__hashtags');
  var commentField = document.querySelector('.text__description');


  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE && document.activeElement !== commentField && document.activeElement !== hashtagsField) {
      closePicEditor();
    }
  };

  var openPicEditor = function () {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePicEditor = function () {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  uploadPicLabel.addEventListener('change', function () {
    openPicEditor();
    window.changeOverlay();
  });

  closeOverlay.addEventListener('click', function () {
    closePicEditor();
  });
})();

