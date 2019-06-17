'use strict';

var COMMENTS_LIST = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES_LIST = ['Sam', 'Jack', 'Clive', 'Mathew', 'Alex', 'Karl'];
var ESC_KEYCODE = 27;
var EFFECT_VALUE = '100%';
// var ENTER_KEYCODE = 13;

var template = document.querySelector('#picture').content.querySelector('a');
var picturesDomElement = document.querySelector('.pictures');
var uploadPicButton = document.querySelector('#upload-file');
var uploadOverlay = document.querySelector('.img-upload__overlay');
var closeOverlay = document.querySelector('.img-upload__cancel');
var effectPreviewOriginal = document.querySelector('.effects__preview--none');
var effectPreviewChrome = document.querySelector('.effects__preview--chrome');
var effectPreviewSepia = document.querySelector('.effects__preview--sepia');
var effectPreviewMarvin = document.querySelector('.effects__preview--marvin');
var effectPreviewPhobos = document.querySelector('.effects__preview--phobos');
var effectPreviewHeat = document.querySelector('.effects__preview--heat');
var previewPic = document.querySelector('.img-upload__preview');
var effectBar = document.querySelector('.img-upload__effect-level');
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelValue = document.querySelector('.effect-level__value');
var effectLevelDepth = document.querySelector('.effect-level__depth');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var getRandomCommentator = function () {
  var randomCommentator = {};
  var randomComment = COMMENTS_LIST[Math.floor(Math.random() * COMMENTS_LIST.length)];
  var randomName = NAMES_LIST[Math.floor(Math.random() * NAMES_LIST.length)];
  randomCommentator.avatar = 'img/avatar-' + getRandomInt(1, 6) + '.svg';
  randomCommentator.message = randomComment;
  randomCommentator.name = randomName;
  return randomCommentator;
};

var generateComments = function () {
  var randomInt = getRandomInt(1, 26);
  var comments = [];
  for (var i = 0; i < randomInt; i++) {
    comments.push(getRandomCommentator(6));
  }
  return comments;
};

var generateData = function (count) {
  var data = [];
  for (var i = 0; i < count; i++) {
    data.push(
        {
          url: 'photos/' + (i + 1) + '.jpg',
          likes: getRandomInt(1, 26),
          comments: generateComments()
        }
    );
  }
  return data;
};

var renderPhotos = function (array) {
  var fragment = document.createDocumentFragment();
  for (var k = 0; k < array.length; k++) {
    var element = template.cloneNode(true);
    var item = array[k];
    element.querySelector('.picture__comments').textContent = item.comments.length;
    element.querySelector('.picture__likes').textContent = item.likes;
    element.querySelector('.picture__img').src = item.url;
    fragment.appendChild(element);
  }
  picturesDomElement.appendChild(fragment);
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
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

uploadPicButton.addEventListener('click', function () {
  openPicEditor();
});

closeOverlay.addEventListener('click', function () {
  closePicEditor();
});

closeOverlay.addEventListener('keydown', function () {
  onPopupEscPress();
});

var changePicEffect = function (element, effect) {
  element.style.filter = effect;
};

effectBar.classList.add('hidden');

var showEffectBar = function () {
  if (effectBar.classList.contains('hidden')) {
    effectBar.classList.remove('hidden');
    effectLevelPin.style.left = EFFECT_VALUE;
    effectLevelDepth.style.width = EFFECT_VALUE;
  }
};

effectPreviewOriginal.addEventListener('click', function () {
  changePicEffect(previewPic, 'none');
  effectBar.classList.add('hidden');
});

effectPreviewChrome.addEventListener('click', function () {
  changePicEffect(previewPic, 'grayscale(' + measureEffectValue() + ')');
  showEffectBar();
});

effectPreviewSepia.addEventListener('click', function () {
  changePicEffect(previewPic, 'sepia(' + measureEffectValue() + ')');
  showEffectBar();
});

effectPreviewMarvin.addEventListener('click', function () {
  changePicEffect(previewPic, 'invert(' + measureEffectValue() + '%)');
  showEffectBar();
});

effectPreviewPhobos.addEventListener('click', function () {
  changePicEffect(previewPic, 'blur(' + measureEffectValue() + 'px)');
  showEffectBar();
});

effectPreviewHeat.addEventListener('click', function () {
  changePicEffect(previewPic, 'brightness(' + measureEffectValue() + ')');
  showEffectBar();
});

var measureEffectValue = function () {
  var pinOffsetLeft = effectLevelPin.style.left;
  if (effectBar.display !== 'none') {
    effectLevelValue.value = parseInt(pinOffsetLeft, 10);
  }
  return effectLevelValue.value;
};

// effectLevelPin.addEventListener('mouseup', function () {
// });

var photos = generateData(25);
renderPhotos(photos);
