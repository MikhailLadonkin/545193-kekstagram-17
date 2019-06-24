'use strict';

(function () {
  window.pinLevel = document.querySelector('.effect-level__pin');
  window.effectLevelLine = document.querySelector('.effect-level__line');
  window.effectLevelDepth = document.querySelector('.effect-level__depth');
  var previewPic = document.querySelector('.img-upload__preview');
  var effectBar = document.querySelector('.img-upload__effect-level');
  window.effectsFieldset = document.querySelector('.img-upload__effects');
  window.changeOverlay = function (percentage) {
    var checkedEffect = window.effectsFieldset.querySelector('input:checked');
    var filterValue;
    effectBar.classList.remove('hidden');
    switch (checkedEffect.value) {
      case 'chrome': filterValue = 'grayscale(' + window.percentageLevel / 100 + ')'; break;
      case 'sepia': filterValue = 'sepia(' + window.percentageLevel / 100 + ')'; break;
      case 'marvin': filterValue = 'invert(' + window.percentageLevel + '%)'; break;
      case 'phobos': filterValue = 'blur(' + window.percentageLevel / 100 * 3 + 'px)'; break;
      case 'heat': filterValue = 'brightness(' + window.percentageLevel / 100 * 3 + ')'; break;
      default: {
        filterValue = 'none';
        effectBar.classList.add('hidden');
      }
    }
    previewPic.style.filter = filterValue;
    window.pinLevel.style.left = percentage + '%';
    window.effectLevelDepth.style.width = percentage + '%';
  };
  window.pinLevel.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var effectTotalWidth = window.effectLevelLine.offsetWidth;
      var effectLevelStart = window.effectLevelLine.getBoundingClientRect().right;
      var shift = effectTotalWidth - (effectLevelStart - moveEvt.clientX);
      window.percentageLevel = shift / effectTotalWidth * 100;
      if (shift > 0 && shift < effectTotalWidth) {
        window.pinLevel.style.left = window.percentageLevel + '%';
        window.effectLevelDepth.style.width = window.percentageLevel + '%';
        window.changeOverlay(window.percentageLevel);
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.effectsFieldset.addEventListener('click', window.changeOverlay);
  window.effectsFieldset.addEventListener('click', function () {
    window.changeOverlay(100);
  });
})();
