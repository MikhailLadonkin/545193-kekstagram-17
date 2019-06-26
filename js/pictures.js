// 'use strict';

// (function () {

//   var template = document.querySelector('#picture').content.querySelector('a');
//   var picturesDomElement = document.querySelector('.pictures');

//   var renderPhotos = function (array) {
//     var fragment = document.createDocumentFragment();
//     for (var k = 0; k < array.length; k++) {
//       var element = template.cloneNode(true);
//       var item = array[k];
//       element.querySelector('.picture__comments').textContent = item.comments.length;
//       element.querySelector('.picture__likes').textContent = item.likes;
//       element.querySelector('.picture__img').src = item.url;
//       fragment.appendChild(element);
//     }
//     picturesDomElement.appendChild(fragment);
//   };
//   var photos = window.generateData(25);
//   renderPhotos(photos);
// })();

'use strict';

(function () {

  var template = document.querySelector('#picture').content.querySelector('a');
  var picturesDomElement = document.querySelector('.pictures');

  var renderPhotos = function (item) {
    var element = template.cloneNode(true);
    element.querySelector('.picture__comments').textContent = item.comments.length;
    element.querySelector('.picture__likes').textContent = item.likes;
    element.querySelector('.picture__img').src = item.url;
    return element;
  };


  var successHandler = function (items) {

    var fragment = document.createDocumentFragment();
    for (var k = 0; k < 25; k++) {
      fragment.appendChild(renderPhotos(items[k]));
    }
    picturesDomElement.appendChild(fragment);
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
  // var photos = window.load(renderPhotos, errorHandler);
  // renderPhotos(photos);
  // console.log(renderPhotos(window.load))
  // console.log(window.load)
})();
