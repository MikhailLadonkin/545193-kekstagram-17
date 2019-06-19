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
var EFFECT_LEVEL = 100;
var ESC_KEYCODE = 27;

var template = document.querySelector('#picture').content.querySelector('a');
var picturesDomElement = document.querySelector('.pictures');
var uploadPicLabel = document.querySelector('#upload-file');
var uploadOverlay = document.querySelector('.img-upload__overlay');
var closeOverlay = document.querySelector('.img-upload__cancel');
var previewPic = document.querySelector('.img-upload__preview');
var effectBar = document.querySelector('.img-upload__effect-level');
var effectsFieldset = document.querySelector('.img-upload__effects');
var commentField = document.querySelector('.text__description');
var hashtagsField = document.querySelector('.text__hashtags');


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
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== commentField && document.activeElement !== hashtagsField) {
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
  changeOverlay();
});

closeOverlay.addEventListener('click', function () {
  closePicEditor();
});

var changeOverlay = function () {
  var checkedEffect = effectsFieldset.querySelector('input:checked');
  var filterValue;
  var pinLevel = document.querySelector('.effect-level__pin');
  if (!checkedEffect) {
    effectBar.classList.add('hidden');
  } else if (checkedEffect) {
    if (checkedEffect.value !== 'none') {
      effectBar.classList.remove('hidden');
    } else {
      effectBar.classList.add('hidden');
    }
  }
  switch (checkedEffect.value) {
    case 'chrome': filterValue = 'grayscale(' + pinLevel.offsetLeft / EFFECT_LEVEL + ')'; break;
    case 'sepia': filterValue = 'sepia(' + pinLevel.offsetLeft / EFFECT_LEVEL + ')'; break;
    case 'marvin': filterValue = 'invert(' + pinLevel.offsetLeft + '%)'; break;
    case 'phobos': filterValue = 'blur(' + pinLevel.offsetLeft / EFFECT_LEVEL + 'px)'; break;
    case 'heat': filterValue = 'brightness(' + pinLevel.offsetLeft / EFFECT_LEVEL + ')'; break;
    default: filterValue = 'none';
  }
  previewPic.style.filter = filterValue;
};

var validateCommentLength = function () {
  if (commentField.value.length > 140) {
    commentField.style.border = 'thick solid red';
    commentField.setCustomValidity('The message is too long');
  } else {
    commentField.style.border = '';
    commentField.setCustomValidity('');
  }
};

var photos = generateData(25);
renderPhotos(photos);
effectsFieldset.addEventListener('change', changeOverlay);
commentField.addEventListener('change', validateCommentLength);
