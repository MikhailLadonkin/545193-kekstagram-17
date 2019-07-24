'use strict';

(function () {
  var COMMENTS_NUMBER = 5;
  var template = document.querySelector('#comment').content.querySelector('li');
  var commentsDomElement = document.querySelector('.social__comments');
  var loadCommentsButton = document.querySelector('.social__comments-loader');
  var lastIndex = 5;
  var currentIndex = 0;
  var comments = [];
  var bigPicture = document.querySelector('.big-picture');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var likesCount = bigPicture.querySelector('.likes-count');
  var cancelBigPicture = document.querySelector('.big-picture__cancel');
  var shownCommentsNumber = document.querySelector('.comments-count__shown');

  var renderComment = function (commentData) {
    var element = template.cloneNode(true);
    element.querySelector('.social__picture').src = commentData.avatar;
    element.querySelector('.social__text').textContent = commentData.message;
    return element;
  };

  var renderComments = function (arr) {
    var fragment = document.createDocumentFragment();
    arr.forEach(function (item) {
      fragment.appendChild(renderComment(item));
    });
    commentsDomElement.appendChild(fragment);
  };

  var renderNextBlockComments = function () {
    renderComments(comments.slice(currentIndex, lastIndex));
    shownCommentsNumber.innerHTML = lastIndex;
    currentIndex += COMMENTS_NUMBER;
    lastIndex += COMMENTS_NUMBER;
    if (currentIndex > comments.length - 1) {
      loadCommentsButton.classList.add('hidden');
      shownCommentsNumber.innerHTML = comments.length;
    }
  };

  loadCommentsButton.addEventListener('click', function () {
    renderNextBlockComments();
  });

  var show = function (data) {
    commentsDomElement.innerHTML = '';
    comments = data.comments;
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    bigPicture.querySelector('img').src = data.url;
    commentsCount.innerHTML = data.comments.length;
    likesCount.innerHTML = data.likes;
    renderNextBlockComments();
    document.addEventListener('keydown', onBigPicEscPress);
  };

  var closeBigPicture = function () {
    lastIndex = 5;
    currentIndex = 0;
    loadCommentsButton.classList.remove('hidden');
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onBigPicEscPress);
  };

  var onBigPicEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeBigPicture();
    }
  };

  cancelBigPicture.addEventListener('click', closeBigPicture);

  window.bigPicture = {
    show: show
  };

})();
