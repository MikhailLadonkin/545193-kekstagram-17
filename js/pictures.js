'use strict';

(function () {

  var template = document.querySelector('#picture').content.querySelector('a');
  var picturesDomElement = document.querySelector('.pictures');

  var renderPhoto = function (item) {
    var element = template.cloneNode(true);
    element.querySelector('.picture__comments').textContent = item.comments.length;
    element.querySelector('.picture__likes').textContent = item.likes;
    element.querySelector('.picture__img').src = item.url;
    return element;
  };

  var renderPhotos = function (items) {
    var fragment = document.createDocumentFragment();
    for (var k = 0; k < items.length; k++) {
      fragment.appendChild(renderPhoto(items[k]));
    }
    picturesDomElement.appendChild(fragment);
  };

  var successHandler = function () {
    renderPhotos();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  window.load(successHandler, errorHandler);
})();
