'use strict';

// --------- создаем галерею ---------

(function () {
  window.gallery = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content;

  // --------- функция создания DOM-элемента на основе JS-объекта-шаблона ---------
  var renderPhoto = function (photo, index) {
    var photoElement = pictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__link').setAttribute('data-id', index);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
    photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;
    return photoElement;
  };

  // var fragment = document.createDocumentFragment();
  // // --------- функция заполнения фрагмента DOM-элементами на основе массива ---------
  // for (var i = 0; i < window.photos.length; i++) {
  //   fragment.appendChild(renderPhoto(window.photos[i], i));
  // }
  //
  // window.gallery.appendChild(fragment);
  var successHandler = function (photos) {
    var fragment = document.createDocumentFragment();
    window.photos = photos;
    var countPhotos = 25;

    for (var i = 0; i < countPhotos; i++) {
      fragment.appendChild(renderPhoto(window.photos[i], i));
    }
    window.gallery.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 5; margin: 0 auto; background-color: red;';
    node.style.position = 'absolute';
    node.style.display = 'flex';
    node.style.left = 0;
    node.style.right = 0;
    node.style.top = '25%';
    node.style.alignItems = 'center';
    node.style.justifyContent = 'center';
    node.style.width = '50%';
    node.style.height = '100px';
    node.style.fontSize = '24px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);
})();
