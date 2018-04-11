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


var gallery = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content;


// --------- Генерируется массив карточек количеством 25 шт из цикла ---------
var photos = [];
var getRandomIndex = function (min, max) { // функция генерации случайных данных
  return Math.floor(Math.random() * (max - min)) + min;
};

for (var j = 0; j < COUNT_PHOTOS; j++) {
  photos.push({
    url: 'photos/' + (j + 1) + '.jpg',
    likes: getRandomIndex(MIN_LIKES, MAX_LIKES),
    comments: shuffle(PHOTO_COMMENTS).slice(0, getrandomIndex(0, PHOTO_COMMENTS.length)),
    // comments: PHOTO_COMMENTS[getRandomIndex(0, PHOTO_COMMENTS.length - 1)],
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
  photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;
  return photoElement;
};
// ------------------

var fragment = document.createDocumentFragment();
for (var i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPhoto(photos[i]));
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
  var fragment = document.createDocumentFragment();
  for (var l = 0; l < photo.comments.length; l++) {
    var comment = socialComment.cloneNode(true);
    comment.querySelector('.social__picture').src = 'img/avatar-' + getRandomIndex(1, 6) + '.svg';
    comment.textContent = photo.comments[l];
    fragment.appendChild(comment);
  }
  socialComments.appendChild(fragment);
};
renderBigPicture(photos[0]);
bigPicture.classList.remove('hidden');
// document.querySelector('.big-picture').classList.remove('hidden'); // То тут должно быть?
