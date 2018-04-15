'use strict';
var COUNT_PHOTOS = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_NUMBER_COMMENTS = 1;
var MAX_NUMBER_COMMENTS = 6;
var PHOTO_COMMENTS = [
  'Всё отлично',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var PHOTO_DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];
var gallery = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content;

// --------- функция генерации случайных чисел---------
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// --------- фукнция перемешивания массива ---------
function shuffle(array) {
  var j;
  var temp;
  var i;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// --------- Генерируется массив фоток количеством 25 шт из цикла (функция генерации случайных данных) ---------
var photos = [];
for (var j = 0; j < COUNT_PHOTOS; j++) {
  photos.push({
    url: 'photos/' + (j + 1) + '.jpg',
    likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
    comments: shuffle(PHOTO_COMMENTS).slice(0, getRandomNumber(0, PHOTO_COMMENTS.length - 1)),
    description: PHOTO_DESCRIPTIONS[getRandomNumber(0, PHOTO_DESCRIPTIONS.length - 1)]
  });
}

// --------- Заполняем данными сгенерированные карточки (функция создания DOM-элемента на основе JS-объекта )---------
var renderPhoto = function (photo, index) {
  // функция создания DOM-элемента на основе JS-объекта
  // функция заполнения блока DOM-элементами на основе массива JS-объектов
  var photoElement = pictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__link').setAttribute('data-id', index);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
  photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;
  return photoElement;
};

var fragment = document.createDocumentFragment();
// --------- функция заполнения блока DOM-элементами на основе массива ---------
for (var i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPhoto(photos[i], i));
}

gallery.appendChild(fragment);

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
    comment.querySelector('.social__picture').src = 'img/avatar-' + getRandomNumber(MIN_NUMBER_COMMENTS, MAX_NUMBER_COMMENTS) + '.svg';
    comment.childNodes[comment.childNodes.length - 1].nodeValue = photo.comments[l];
    fragmentBigPicture.appendChild(comment);
  }
  socialComments.appendChild(fragmentBigPicture);
};
// renderBigPicture(photos[0]);
// bigPicture.classList.remove('hidden');

var socialCommentCount = document.querySelector('.social__comment-count');
var socialCommentLoad = document.querySelector('.social__comment-loadmore');

socialCommentCount.classList.add('visually-hidden');
socialCommentLoad.classList.add('visually-hidden');

// --------- Module4-task1 ---------
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
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
  evt.preventDefault(); //  - это что?
  evt.stopPropagation(); //  - это что?
  uploadOverlay.classList.remove('hidden');
});

// ----------- Закрываем форму редактирования ----------
var closeForm = function () {
  if (!uploadOverlay.classList.contains('hidden')) { // contains - это что?
    uploadOverlay.classList.add('hidden');
  }
};

uploadClose.addEventListener('click', function () {
  closeForm();
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
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

buttonPlus.addEventListener('click', function (evt) {
  evt.preventDefault();
  if (scaleValueNumber >= MIN_SCALE && scaleValueNumber < MAX_SCALE) {
    scaleValueNumber = scaleValueNumber + STEP_SCALE;
    uploadForm.querySelector('.resize__control--value').value = scaleValueNumber.toString();
    imageUpload.style.transform = 'scale(' + scaleValueNumber / 100 + ')';
  }
});

// ----------- Применяем эффекты ----------
uploadForm.addEventListener('change', function (evt) {
  evt.preventDefault();
  var target = evt.target.closest('.img-upload__effects');
  if (target) {
    imagePreview.className = 'effects__preview--' + evt.target.value;
  }
});

// ----------- Показываем фотографии в полноэкранном формате ----------
var showBigPic = function () {
  gallery.addEventListener('click', function (evt) {
    // evt.preventDefault();
    var target = evt.target;
    while (!target.classList.contains('pictures')) {
      if (target.classList.contains('picture__link')) {
        var idPhoto = parseInt(target.dataset.id, 10);
        renderBigPicture(photos[idPhoto]);
        bigPicture.classList.remove('hidden');
        return;
      }
      target = target.parentNode;
    }
  });
};

showBigPic(photos);

// ----------- Закрываем окно bigPicture ----------
var btnCloseBigPicture = bigPicture.querySelector('.big-picture__cancel');

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
};

btnCloseBigPicture.addEventListener('click', function () {
  closeBigPicture();
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeBigPicture();
  }
});

window.addEventListener('keydown', function (evt) {
  var focused = document.activeElement;
  if (evt.keyCode === ENTER_KEYCODE && focused === btnCloseBigPicture) {
    closeBigPicture();
  }
});
