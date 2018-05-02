'use strict';

// --------- отрисовываем изображения ---------

(function () {
  // module5-task1

  var scalePin = document.querySelector('.scale__pin');
  var scaleLevel = document.querySelector('.scale__level');
  var SLIDER_WIDTH = 450;

  var imageUploadImg = window.uploadOverlay.querySelector('.img-upload__preview img');

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

})();
