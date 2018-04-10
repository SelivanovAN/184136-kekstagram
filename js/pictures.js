'use strict';
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SUR_NAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

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

var photos = []; // Создается массив карточек количеством 25 шт из цикла

var getRandomIndex = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

for (var j = 0; j < 25; j++) {
  photos.push({
    url: PHOTO_URLS[0],
    likes: PHOTO_LIKES[getRandomIndex(15, 200)],
    comments: PHOTO_COMMENTS[getRandomIndex(0, PHOTO_COMMENTS.length - 1)],
    description: PHOTO_DESCRIPTIONS[getRandomIndex(0, PHOTO_DESCRIPTIONS.length - 1)]
  });
}

var wizards = [];
for (var j = 0; j < 4; j++) {
  wizards.push({
    //name: WIZARD_NAMES[getRandomIndex(0, WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SUR_NAME[getRandomIndex(0, WIZARD_SUR_NAME.length - 1)],
    //coatColor: WIZARD_COAT_COLOR[getRandomIndex(0, WIZARD_COAT_COLOR.length - 1)],
    //eyesColor: WIZARD_EYES_COLOR[getRandomIndex(0, WIZARD_EYES_COLOR.length - 1)]
    url:
  });
}
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);
userDialog.querySelector('.setup-similar').classList.remove('hidden');
