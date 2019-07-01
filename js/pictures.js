'use strict';

(function () {
  var template = document.querySelector('#picture').content.querySelector('a');
  var picturesDomElement = document.querySelector('.pictures');
  var filtersForm = document.querySelector('.img-filters__form');
  var filtersBlock = document.querySelector('.img-filters');
  var data = [];
  // var DEBOUNCE_INTERVAL = 3000;
  // var debounce = function (cb) {
  //   var lastTimeout = null;

  //   return function () {
  //     var parameters = arguments;
  //     if (lastTimeout) {
  //       window.clearTimeout(lastTimeout);
  //     }
  //     lastTimeout = window.setTimeout(function () {
  //       cb.apply(null, parameters);
  //     }, DEBOUNCE_INTERVAL);
  //   };
  // };

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

  var sortComments = function (array) {
    var sortedByComments = array.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    }).slice(0, 9);
    return sortedByComments;
  };

  var sortLikes = function (array) {
    var sortedByLikes = array.slice().sort(function (a, b) {
      return b.likes - a.likes;
    });
    return sortedByLikes;
  };

  var sortNew = function (arr) {
    var j;
    var temp;
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr.slice().slice(0, 9);
  };

  var clearPictures = function () {
    var addedPictures = picturesDomElement.querySelectorAll('.picture');
    addedPictures.forEach(function (picture) {
      picture.remove();
    });
  };

  var successHandler = function (items) {
    data = items;
    var sortedPictures = {
      'filter-discussed': sortComments(data),
      'filter-new': sortNew(data),
      'filter-popular': sortLikes(data)
    };
    renderPhotos(sortLikes(items));
    filtersBlock.classList.remove('img-filters--inactive');
    filtersForm.addEventListener('click', function (evt) {
      for (var i = 0; i < Object.keys(sortedPictures).length; i++) {
        if (evt.target.id === Object.keys(sortedPictures)[i]) {
          clearPictures();
          renderPhotos(sortedPictures[Object.keys(sortedPictures)[i]]);
        }
      }
      // if (evt.target.id === 'filter-discussed') {
      //   clearPictures();
      //   renderPhotos(sortComments(data));
      // } else if (evt.target.id === 'filter-new') {
      //   clearPictures();
      //   renderPhotos(sortNew(data));
      // } else {
      //   clearPictures();
      //   renderPhotos(sortLikes(data));
      // }
    });
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
