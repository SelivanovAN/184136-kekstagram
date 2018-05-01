'use strict';

// --------- отрисовываем изображения ---------

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

  var fragment = document.createDocumentFragment();
  // --------- функция заполнения фрагмента DOM-элементами на основе массива ---------
  for (var i = 0; i < window.photos.length; i++) {
    fragment.appendChild(renderPhoto(window.photos[i], i));
  }

  window.gallery.appendChild(fragment);

})();
