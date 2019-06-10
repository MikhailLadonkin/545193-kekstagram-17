'use strict';
var photos = [];
var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var avatars = [];
var randomComment = comments[Math.floor(Math.random() * comments.length)];
var names = ['Sam', 'Jack', 'Clive', 'Mathew', 'Alex', 'Karl'];
var randomName = names[Math.floor(Math.random() * names.length)];
var template = document.querySelector('#picture').content.querySelector('a');

for (var i = 1; i <= 6; i++) {
  avatars.push('img/avatar-' + [i] + '.svg');
}

for (var j = 1; j <= 25; j++) {
  photos.push('photos/' + [j] + '.jpg');
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var imgInfo = {
  url: photos[Math.floor(Math.random() * photos.length)],
  likes: getRandomInt(15, 201),
  comments: randomComment,
  avatar: avatars[Math.floor(Math.random() * avatars.length)],
  name: randomName
};


var newPhoto = document.querySelector('.pictures');

for (var k = 0; k < 25; k++) {
  var element = template.cloneNode(true);
  element.children[1].children[0].textContent = imgInfo.comments;
  element.children[1].children[1].textContent = imgInfo.likes;
  element.children[0].src = imgInfo.url;
  newPhoto.appendChild(element);
}
