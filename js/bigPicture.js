'use strict';

// --------- отрисовываем большое изображения ---------

(function () {
  var MIN_NUMBER_COMMENTS = 1;
  var MAX_NUMBER_COMMENTS = 6;
  var ESC_KEYCODE = 27; // double form

  var bigPicture = document.querySelector('.big-picture');

  window.renderBigPicture = function (photo) {
    bigPicture.querySelector('.big-picture__img img').src = photo.url;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.social__caption').textContent = photo.comments[0];
    var socialComments = bigPicture.querySelector('.social__comments');
    var socialComment = socialComments.querySelector('.social__comment').cloneNode(true);
    socialComments.innerHTML = '';
    var fragmentBigPicture = document.createDocumentFragment();
    for (var l = 0; l < photo.comments.length; l++) {
      var comment = socialComment.cloneNode(true);
      comment.querySelector('.social__picture').src = 'img/avatar-' + window.util.getRandomNumber(MIN_NUMBER_COMMENTS, MAX_NUMBER_COMMENTS) + '.svg';
      comment.childNodes[comment.childNodes.length - 1].nodeValue = photo.comments[l];
      fragmentBigPicture.appendChild(comment);
    }
    socialComments.appendChild(fragmentBigPicture);
  };

  var socialCommentCount = document.querySelector('.social__comment-count');
  var socialCommentLoad = document.querySelector('.social__comment-loadmore');

  socialCommentCount.classList.add('visually-hidden');
  socialCommentLoad.classList.add('visually-hidden');

  // ----------- Показываем фотографии в полноэкранном формате ----------
  window.gallery.addEventListener('click', function (evt) {
    var target = evt.target;
    while (!target.classList.contains('pictures')) {
      if (target.classList.contains('picture__link')) {
        var idPhoto = parseInt(target.dataset.id, 10);
        window.renderBigPicture(window.photos[idPhoto]);
        bigPicture.classList.remove('hidden');
        return;
      }
      target = target.parentNode;
    }
  });

  // ----------- Закрываем окно bigPicture ----------
  var btnCloseBigPicture = bigPicture.querySelector('.big-picture__cancel');

  var bigPictureCloseHandler = function () {
    bigPicture.classList.add('hidden');
  };

  btnCloseBigPicture.addEventListener('click', bigPictureCloseHandler);

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      bigPictureCloseHandler();
    }
  });
})();
