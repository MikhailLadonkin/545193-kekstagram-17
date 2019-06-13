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
var picturesDomElement = document.querySelector('.pictures');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var getRandomCommentator = function (num) {
  var randomCommentator = {};
  var randomComment = COMMENTS_LIST[Math.floor(Math.random() * COMMENTS_LIST.length)];
  var randomName = NAMES_LIST[Math.floor(Math.random() * NAMES_LIST.length)];
  var avatars = [];
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

var photos = generateData(25);
renderPhotos(photos);
