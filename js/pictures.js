'use strict';

var PHOTO_URLS = ['photos/{{i}}.jpg'];
var PHOTO_LIKES = [];
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
var userDialog = document.querySelector('.???'); // что тут должно быть?
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.pictures'); // Что тут должно быть?
var pictureTemplate = document.querySelector('#picture'); // Что тут должно быть?

var photos = []; // Создается массив карточек количеством 25 шт из цикла

var getRandomIndex = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

for (var j = 0; j < 25; j++) {
  photos.push({
    url: PHOTO_URLS[0], // как сделать перебор?
    likes: PHOTO_LIKES[getRandomIndex(15, 200)],
    comments: PHOTO_COMMENTS[getRandomIndex(0, PHOTO_COMMENTS.length - 1)],
    description: PHOTO_DESCRIPTIONS[getRandomIndex(0, PHOTO_DESCRIPTIONS.length - 1)]
  });
}
var renderPhoto = function (photo) {
  var photoElement = pictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
  photoElement.querySelector('.picture__stat--comments').textContent = photo.comments;
  return photoElement;
};
var fragment = document.createDocumentFragment();
for (var i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPhoto(photos[i]));
}

similarListElement.appendChild(fragment);
userDialog.querySelector('.big-picture').classList.remove('hidden'); // То тут должно быть?
