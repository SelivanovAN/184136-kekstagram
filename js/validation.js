'use strict';

// ----------- module4-task2---------- проверка хеш-тегов и комментов

(function () {
  var hashtagsContainer = document.querySelector('.text__hashtags'); // double form

  function searchForSameValues(arr) {
    for (var i = 0; i < arr.length; i++) {
      var arrValue = arr[i];
      for (var l = 0; l < arr.length; l++) {
        if (arr[l] === arrValue && l !== i) {
          return true;
        }
      }
    }
    return false;
  }

  var HASHTAG_CODE = '#';

  hashtagsContainer.addEventListener('input', function () {
    hashtagsContainer.setCustomValidity('');
    var textHashtags = hashtagsContainer.value;
    var hashtags = textHashtags.split(' ');
    var sameValue = searchForSameValues(hashtags);
    if (sameValue) {
      hashtagsContainer.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
    }
    if (hashtags.length > 5) {
      hashtagsContainer.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
    }
    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i][0] !== HASHTAG_CODE) {
        hashtagsContainer.setCustomValidity('Хэш-тег начинается с символа #');
      }
      if (hashtags[i] === HASHTAG_CODE) {
        hashtagsContainer.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
      }
      if (hashtags[i].length > 21) {
        hashtagsContainer.setCustomValidity('Максимальная длина одного хэш-тега 20 символов');
      }
    }
  });

  // send information

  var form = document.querySelector('.img-upload__submit');

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      window.util.closePopup();
    });
    evt.preventDefault();
  });
})();
