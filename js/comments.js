'use strict';

(function () {
  var template = document.querySelector('#comment').content.querySelector('li');
  var commentsDomElement = document.querySelector('.social__comments');

  var loadCommentsButton = document.querySelector('.social__comments-loader');
  var commentsNumber = 5;

  var renderComment = function (item) {
    commentsDomElement.innerHTML = '';
    var element = template.cloneNode(true);
    for (var i = 0; i < item.comments.length; i++) {
      element.querySelector('.social__picture').src = item.comments[i].avatar;
      element.querySelector('.social__text').textContent = item.comments[i].message;
    }
    return element;
  };

  var renderComments = function (items) {
    var fragment = document.createDocumentFragment();
    for (var k = 0; k < commentsNumber; k++) {
      fragment.appendChild(renderComment(items[k]));
    }
    commentsDomElement.appendChild(fragment);
    loadCommentsButton.addEventListener('click', function () {
      for (var j = 0; j < commentsNumber; j++) {
        commentsNumber++;
        if (items[j].comments.length > commentsNumber) {
          if (commentsNumber % 5 !== 0) {
            commentsDomElement.appendChild(renderComment(items[commentsNumber - 1]));
          }
        } else {
          loadCommentsButton.classList.add('hidden');
        }
      }
    });
  };

  window.renderComments = renderComments;

})();
