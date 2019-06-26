'use strict';

(function () {

  var template = document.querySelector('#picture').content.querySelector('a');
  var picturesDomElement = document.querySelector('.pictures');

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
  var photos = window.generateData(25);
  renderPhotos(photos);
})();
