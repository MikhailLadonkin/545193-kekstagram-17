'use strict';

(function () {
  var templateSuccess = document.querySelector('#success').content.querySelector('div');
  var templateError = document.querySelector('#error').content.querySelector('div');
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

  var closeMessage = function (item) {
    item.remove();
    document.removeEventListener('keydown', onMessageEscPress);
    document.removeEventListener('click', onDocClickClose);
  };

  var onMessageEscPress = function (evt) {
    evt.preventDefault();
    if (evt.keyCode === window.util.ESC_KEYCODE) {
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
    closeMessage(element);
    document.addEventListener('click', onDocClickClose);
  };

  var onDocClickClose = function (element) {
    closeMessage(element);
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
    closeMessage(element);
    document.addEventListener('click', onDocClickClose);
  };

  var onSuccessHandler = function () {
    imgUploadForm.classList.add('hidden');
    successMessage();
  };

  var onErrorHandler = function () {
    imgUploadForm.classList.add('hidden');
    errorMessage();
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

