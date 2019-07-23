'use strict';

(function () {
  var uploadPicLabel = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var closeOverlay = document.querySelector('.img-upload__cancel');
  var hashtagsField = document.querySelector('.text__hashtags');
  var commentField = document.querySelector('.text__description');
  var zoomInPic = document.querySelector('.scale__control--bigger');
  var zoomOutPic = document.querySelector('.scale__control--smaller');
  var zoomValue = document.querySelector('.scale__control--value');
  var previewPic = document.querySelector('.img-upload__preview');
  var imgUploadForm = document.querySelector('.img-upload__form');
  var MAX_SCALE = 100;
  var MIN_SCALE = 0;
  var STEP_SCALE = 25;

  var scaleUp = function () {
    if (parseInt(zoomValue.value, 10) < MAX_SCALE && parseInt(zoomValue.value, 10) >= MIN_SCALE) {
      var value;
      value = parseInt(zoomValue.value, 10) + STEP_SCALE;
      zoomValue.value = value + '%';
      previewPic.style.transform = 'scale(' + value / 100 + ')';
    }
  };

  var scaleOut = function () {
    if (parseInt(zoomValue.value, 10) > MIN_SCALE && parseInt(zoomValue.value, 10) <= MAX_SCALE) {
      var value;
      value = parseInt(zoomValue.value, 10) - STEP_SCALE;
      zoomValue.value = value + '%';
      previewPic.style.transform = 'scale(' + value / 100 + ')';
    }
  };


  var changeZoom = function (value) {
    zoomValue.value = value + '%';
    previewPic.style.transform = 'scale(' + value / 100 + ')';
    zoomInPic.addEventListener('click', scaleUp);
    zoomOutPic.addEventListener('click', scaleOut);
  };


  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE && document.activeElement !== commentField && document.activeElement !== hashtagsField) {
      closePicEditor();
    }
  };

  var openPicEditor = function () {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    changeZoom(100);
  };

  var closePicEditor = function () {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onSuccessHandler = function () {
    closePicEditor();
    window.message.showSuccess();
    imgUploadForm.reset();
  };

  var onErrorHandler = function () {
    closePicEditor();
    window.message.showError();
    imgUploadForm.reset();
  };

  var uploadPic = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    window.upload(new FormData(imgUploadForm), onSuccessHandler, onErrorHandler);
  };
  imgUploadForm.addEventListener('submit', uploadPic);

  uploadPicLabel.addEventListener('change', function () {
    openPicEditor();
    window.changeOverlay();
  });

  closeOverlay.addEventListener('click', function () {
    closePicEditor();
  });
})();

