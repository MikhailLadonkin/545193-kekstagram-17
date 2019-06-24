'use strict';

var ESC_KEYCODE = 27;
var COMMENTS_LIST = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES_LIST = ['Sam', 'Jack', 'Clive', 'Mathew', 'Alex', 'Karl'];
var template = document.querySelector('#picture').content.querySelector('a');
var picturesDomElement = document.querySelector('.pictures');
var pinLevel = document.querySelector('.effect-level__pin');
var effectLevelLine = document.querySelector('.effect-level__line');
var effectLevelDepth = document.querySelector('.effect-level__depth');
var previewPic = document.querySelector('.img-upload__preview');
var effectBar = document.querySelector('.img-upload__effect-level');
var effectsFieldset = document.querySelector('.img-upload__effects');
var uploadPicLabel = document.querySelector('#upload-file');
var uploadOverlay = document.querySelector('.img-upload__overlay');
var closeOverlay = document.querySelector('.img-upload__cancel');
var hashtagsField = document.querySelector('.text__hashtags');

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

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
  changeOverlay();
});

closeOverlay.addEventListener('click', function () {
  closePicEditor();
});

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== commentField && document.activeElement !== hashtagsField) {
    closePicEditor();
  }
};

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

var changeOverlay = function (percentage) {
  var checkedEffect = effectsFieldset.querySelector('input:checked');
  var filterValue;
  effectBar.classList.remove('hidden');
  switch (checkedEffect.value) {
    case 'chrome': filterValue = 'grayscale(' + percentage / 100 + ')'; break;
    case 'sepia': filterValue = 'sepia(' + percentage / 100 + ')'; break;
    case 'marvin': filterValue = 'invert(' + percentage + '%)'; break;
    case 'phobos': filterValue = 'blur(' + percentage / 100 * 3 + 'px)'; break;
    case 'heat': filterValue = 'brightness(' + percentage / 100 * 3 + ')'; break;
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
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var effectTotalWidth = effectLevelLine.offsetWidth;
    var effectLevelStart = effectLevelLine.getBoundingClientRect().right;
    var shift = effectTotalWidth - (effectLevelStart - moveEvt.clientX);
    var percentageLevel = shift / effectTotalWidth * 100;
    if (shift > 0 && shift < effectTotalWidth) {
      pinLevel.style.left = percentageLevel + '%';
      effectLevelDepth.style.width = percentageLevel + '%';
      changeOverlay(percentageLevel);
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

effectsFieldset.addEventListener('click', changeOverlay);
effectsFieldset.addEventListener('click', function () {
  changeOverlay(100);
});

commentField.addEventListener('change', validateCommentLength);
var photos = generateData(25);
renderPhotos(photos);

