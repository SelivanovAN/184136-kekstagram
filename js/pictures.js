'use strict';
var COUNT_PHOTOS = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
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
var bigPicture = document.querySelector('.big-picture'); // Правильный селектор указал?
// bigPicture.classList.remove('hidden');

var gallery = document.querySelector('.pictures'); // Правильный селектор указал?
var pictureTemplate = document.querySelector('#picture'); // Правильный айдишник указал?

// --------- Генерируется массив карточек количеством 25 шт из цикла ---------
var photos = [];
var getRandomIndex = function (min, max) { // функция генерации случайных данных
  return Math.floor(Math.random() * (max - min)) + min;
};

for (var j = 0; j < COUNT_PHOTOS; j++) {
  photos.push({
    url: 'photos/' + (j + 1) + '.jpg', // правильно указал - проверить?
    likes: getRandomIndex(MIN_LIKES, MAX_LIKES), // правильно указал - проверить?
    comments: PHOTO_COMMENTS[getRandomIndex(0, PHOTO_COMMENTS.length - 1)],
    description: PHOTO_DESCRIPTIONS[getRandomIndex(0, PHOTO_DESCRIPTIONS.length - 1)]
  });
}
// ------------------

// --------- Заполняем данными сгенерированные карточки ---------
var renderPhoto = function (photo) {
  // функция создания DOM-элемента на основе JS-объекта
  // функция заполнения блока DOM-элементами на основе массива JS-объектов
  var photoElement = pictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
  photoElement.querySelector('.picture__stat--comments').textContent = photo.comments;
  return photoElement;
};
// ------------------

var fragment = document.createDocumentFragment();
for (var i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPhoto(photos[i]));
}

gallery.appendChild(fragment);
document.querySelector('.big-picture').classList.remove('hidden'); // То тут должно быть?
