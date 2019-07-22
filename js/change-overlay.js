'use strict';

(function () {
  var pinLevel = document.querySelector('.effect-level__pin');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var previewPic = document.querySelector('.img-upload__preview');
  var effectBar = document.querySelector('.img-upload__effect-level');
  var effectsFieldset = document.querySelector('.img-upload__effects');

  var changeOverlay = function (percentage) {
    var checkedEffect = effectsFieldset.querySelector('input:checked');
    var EFFECT_LEVEL_COUNT = percentage / 100;
    var PHOBOS_EFFECT_COUNT = percentage / 100 * 3;
    var HEAT_EFFECT_COUNT = percentage / 50 + 1;
    var filterValue;
    effectBar.classList.remove('hidden');
    switch (checkedEffect.value) {
      case 'chrome': filterValue = 'grayscale(' + EFFECT_LEVEL_COUNT + ')'; break;
      case 'sepia': filterValue = 'sepia(' + EFFECT_LEVEL_COUNT + ')'; break;
      case 'marvin': filterValue = 'invert(' + percentage + '%)'; break;
      case 'phobos': filterValue = 'blur(' + PHOBOS_EFFECT_COUNT + 'px)'; break;
      case 'heat': filterValue = 'brightness(' + HEAT_EFFECT_COUNT + ')'; break;
      default: {
        filterValue = 'none';
        effectBar.classList.add('hidden');
      }
    }
    previewPic.style.filter = filterValue;
    pinLevel.style.left = percentage + '%';
    effectLevelDepth.style.width = percentage + '%';
  };

  pinLevel.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startX = evt.clientX;
    var startLevelDepthWidth = effectLevelDepth.offsetWidth;
    var clickedPercentageLevel = startLevelDepthWidth / effectLevelLine.offsetWidth * 100;
    changeOverlay(clickedPercentageLevel);
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = moveEvt.clientX - startX;
      var levelWidth = startLevelDepthWidth + shift;
      var movedPercentageLevel = levelWidth / effectLevelLine.offsetWidth * 100;
      movedPercentageLevel = Math.max(0, movedPercentageLevel);
      movedPercentageLevel = Math.min(100, movedPercentageLevel);
      changeOverlay(movedPercentageLevel);
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  effectsFieldset.addEventListener('click', function () {
    changeOverlay(100);
  });

  window.changeOverlay = changeOverlay;
})();
