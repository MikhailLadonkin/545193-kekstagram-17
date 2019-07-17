'use strict';

(function () {
  var template = document.querySelector('#picture').content.querySelector('a');
  var picturesDomElement = document.querySelector('.pictures');
  var filtersForm = document.querySelector('.img-filters__form');
  var filtersBlock = document.querySelector('.img-filters');
  var data = [];

  var renderPhoto = function (item) {
    var element = template.cloneNode(true);
    element.querySelector('.picture__comments').textContent = item.comments.length;
    element.querySelector('.picture__likes').textContent = item.likes;
    element.querySelector('.picture__img').src = item.url;
    element.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('picture__img')) {
        window.bigPicture.show(item);
      }
    });
    return element;
  };

  var renderPhotos = function (items) {
    var fragment = document.createDocumentFragment();
    for (var k = 0; k < items.length; k++) {
      fragment.appendChild(renderPhoto(items[k]));
    }
    picturesDomElement.appendChild(fragment);
  };

  var sortByComments = function (array) {
    var sortedByComments = array.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    }).slice(0, 9);
    return sortedByComments;
  };

  var sortByDate = function (arr) {
    var j;
    var temp;
    var sortedNew = arr.slice();
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = sortedNew[j];
      sortedNew[j] = sortedNew[i];
      sortedNew[i] = temp;
    }
    return sortedNew;
  };

  var clearPicturesHandler = function () {
    var addedPictures = picturesDomElement.querySelectorAll('.picture');
    addedPictures.forEach(function (picture) {
      picture.remove();
    });
  };

  var sortPictures = window.util.debounce(function (evt) {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }
    clearPicturesHandler();
    filtersForm.querySelectorAll('.img-filters__button').forEach(function (element) {
      element.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');
    if (evt.target.id === 'filter-discussed') {
      renderPhotos(sortByComments(data));
    } else if (evt.target.id === 'filter-new') {
      renderPhotos(sortByDate(data));
    } else {
      renderPhotos(data);
    }
  });

  var successHandler = function (items) {
    data = items;
    renderPhotos(data);
    filtersBlock.classList.remove('img-filters--inactive');
    filtersForm.addEventListener('click', sortPictures);
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
