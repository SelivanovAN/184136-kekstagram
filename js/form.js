'use strict';

// --------- Module4-task1 --------- работа с формой

(function () {
  var ESC_KEYCODE = 27; // double bigPicture
  var uploadForm = document.querySelector('.img-upload__form');
  var uploadFile = uploadForm.querySelector('.img-upload__input');
  window.uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
  var uploadClose = uploadForm.querySelector('#upload-cancel');
  var buttonMinus = uploadForm.querySelector('.resize__control--minus');
  var buttonPlus = uploadForm.querySelector('.resize__control--plus');
  var scaleValue = uploadForm.querySelector('.resize__control--value').value;
  var scaleValueNumber = parseInt(scaleValue, 10);
  var imageUpload = uploadForm.querySelector('.img-upload__preview');
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var STEP_SCALE = 25;
  var imagePreview = uploadForm.querySelector('.img-upload__preview > img');

  // --------- Открываем форму для редактирования ---------
  uploadFile.addEventListener('change', function (evt) {
    evt.stopPropagation(); //  отменяет всплыв события
    window.uploadOverlay.classList.remove('hidden');
  });

  // ----------- Закрываем форму редактирования ----------
  var closeForm = function () {
    window.uploadOverlay.classList.add('hidden');
  };

  uploadClose.addEventListener('click', function () {
    closeForm();
  });

  var hashtagsContainer = document.querySelector('.text__hashtags'); // double validation
  var textDescription = document.querySelector('.text__description');

  // *если фокус находится в поле ввода хэш-тега или комментарий, нажатие на Esc не должно приводить к закрытию формы редактирования изображения

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE && document.activeElement !== hashtagsContainer && document.activeElement !== textDescription) {
      closeForm();
    }
  });
  // ----------- Маштабирование ----------
  buttonMinus.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (scaleValueNumber > MIN_SCALE && scaleValueNumber <= MAX_SCALE) {
      scaleValueNumber = scaleValueNumber - STEP_SCALE;
      uploadForm.querySelector('.resize__control--value').value = scaleValueNumber.toString();
      imageUpload.style.transform = 'scale(' + scaleValueNumber / 100 + ')';
    }
  });

  buttonPlus.addEventListener('click', function () {
    if (scaleValueNumber >= MIN_SCALE && scaleValueNumber < MAX_SCALE) {
      scaleValueNumber = scaleValueNumber + STEP_SCALE;
      uploadForm.querySelector('.resize__control--value').value = scaleValueNumber.toString();
      imageUpload.style.transform = 'scale(' + scaleValueNumber / 100 + ')';
    }
  });

  // ----------- Применяем эффекты ----------
  uploadForm.addEventListener('change', function (evt) {
    var target = evt.target.closest('.img-upload__effects');
    if (target) {
      imagePreview.className = 'effects__preview--' + evt.target.value;
    }
  });
})();
