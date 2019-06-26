'use strict';

(function () {
  var COMMENTS_LIST = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var NAMES_LIST = ['Sam', 'Jack', 'Clive', 'Mathew', 'Alex', 'Karl'];

  var getRandomCommentator = function () {
    var randomCommentator = {};
    var randomComment = COMMENTS_LIST[Math.floor(Math.random() * COMMENTS_LIST.length)];
    var randomName = NAMES_LIST[Math.floor(Math.random() * NAMES_LIST.length)];
    randomCommentator.avatar = 'img/avatar-' + window.util.getRandomInt(1, 6) + '.svg';
    randomCommentator.message = randomComment;
    randomCommentator.name = randomName;
    return randomCommentator;
  };

  var generateComments = function () {
    var randomInt = window.util.getRandomInt(1, 26);
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
            likes: window.util.getRandomInt(1, 26),
            comments: generateComments()
          }
      );
    }
    return data;
  };
  window.generateData = generateData;
})();
