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
var template = document.querySelector('#picture').content.querySelector('a');

var avatarsList = function () {
  var avatars = [];
  for (var i = 1; i <= 6; i++) {
    avatars.push('img/avatar-' + [i] + '.svg');
  }
  return avatars;
};

var photosList = function () {
  var photos = [];
  for (var j = 1; j <= 25; j++) {
    photos.push('photos/' + [j] + '.jpg');
  }
  return photos;
};
var imgInfo = {
  url: photosList(),
  likes: function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },
  comments: {
    avatar: avatarsList(),
    message: COMMENTS_LIST,
    name: NAMES_LIST
  },
  avatar: avatarsList(),
  name: NAMES_LIST
};
var newPhoto = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
var addElement = function () {
  for (var k = 0; k < 25; k++) {
    var element = template.cloneNode(true);
    element.querySelector('.picture__comments').textContent = imgInfo.comments.message[Math.floor(Math.random() * COMMENTS_LIST.length)];
    element.querySelector('.picture__likes').textContent = imgInfo.likes(15, 201);
    element.querySelector('.picture__img').src = imgInfo.url[Math.floor(Math.random() * imgInfo.url.length)];
    fragment.appendChild(element);
  }
  return fragment;
};
newPhoto.appendChild(addElement());
