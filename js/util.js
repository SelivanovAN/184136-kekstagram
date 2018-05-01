'use strict';

window.util = (function () {

  var ESC_KEYCODE = 27;
  return {
    getRandomIndex: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },

    onPopupEscPress: function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        window.util.closePopup();
      }
    },

    openPopup: function () {
      window.setup.classList.remove('hidden');
      document.addEventListener('keydown', window.util.onPopupEscPress);
    },

    closePopup: function () { // пересмотреть лекцию про модули
      var coordinatesSetupTop = window.setup.style.top;
      var coordinatesSetupLeft = window.setup.style.left;
      window.setup.classList.add('hidden');
      document.removeEventListener('keydown', window.util.onPopupEscPress);
      window.setup.style.top = coordinatesSetupTop;
      window.setup.style.left = coordinatesSetupLeft;
    }
  };
})();
