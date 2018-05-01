'use strict';

var MIN_NUMBER_COMMENTS = 1;
var MAX_NUMBER_COMMENTS = 6;

var bigPicture = document.querySelector('.big-picture');

var renderBigPicture = function (photo) {
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
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

// --------- Module4-task1 ---------
var ESC_KEYCODE = 27;
var uploadForm = document.querySelector('.img-upload__form');
var uploadFile = uploadForm.querySelector('.img-upload__input');
var uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
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
  uploadOverlay.classList.remove('hidden');
});

// ----------- Закрываем форму редактирования ----------
var closeForm = function () {
  uploadOverlay.classList.add('hidden');
};

uploadClose.addEventListener('click', function () {
  closeForm();
});

var hashtagsContainer = document.querySelector('.text__hashtags'); // double
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

// ----------- Показываем фотографии в полноэкранном формате ----------
window.gallery.addEventListener('click', function (evt) {
  var target = evt.target;
  while (!target.classList.contains('pictures')) {
    if (target.classList.contains('picture__link')) {
      var idPhoto = parseInt(target.dataset.id, 10);
      renderBigPicture(window.photos[idPhoto]);
      bigPicture.classList.remove('hidden');
      return;
    }
    target = target.parentNode;
  }
});

// ----------- Закрываем окно bigPicture ----------
var btnCloseBigPicture = bigPicture.querySelector('.big-picture__cancel');

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
};

btnCloseBigPicture.addEventListener('click', closeBigPicture);

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeBigPicture();
  }
});

// module5-task1

var scalePin = document.querySelector('.scale__pin');
var scaleLevel = document.querySelector('.scale__level');
var SLIDER_WIDTH = 450;

var imageUploadImg = uploadOverlay.querySelector('.img-upload__preview img');

var setSaturation = function () {
  var result;

  switch (currentEffect) {
    case 'chrome':
      result = 'grayscale(' + (positionPin / 100) + ')';
      break;
    case 'sepia':
      result = 'sepia(' + (positionPin / 100) + ')';
      break;
    case 'marvin':
      result = 'invert(' + positionPin + '%)';
      break;
    case 'phobos':
      result = 'blur(' + (positionPin * 3 / 100) + 'px)';
      break;
    case 'heat':
      result = 'brightness(' + ((positionPin * 2 / 100) + 1) + ')';
      break;
  }

  imageUploadImg.style.filter = result;
};

var positionPin = 0;
var currentEffect = 'none';

var effectsList = document.querySelector('.effects__list');
effectsList.addEventListener('change', function (evt) {
  currentEffect = evt.target.value;
  setSaturation();
});

scalePin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX
  };
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX
    };

    startCoords = {
      x: moveEvt.clientX
    };

    var leftOffsetPin = scalePin.offsetLeft - shift.x;
    if (leftOffsetPin >= 0 && SLIDER_WIDTH >= leftOffsetPin) {
      positionPin = (leftOffsetPin / SLIDER_WIDTH) * 100;
      scalePin.style.left = leftOffsetPin + 'px';
      scaleLevel.style.width = positionPin + '%';
      setSaturation();
    }

  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
