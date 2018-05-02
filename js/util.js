'use strict';

window.util = (function () {
  return {
    getRandomNumber: function (min, max) { // --------- функция генерации случайных чисел---------
      return Math.floor(Math.random() * (max - min)) + min;
    },

    openPopup: function () {
      window.setup.classList.remove('hidden');
      document.addEventListener('keydown', window.util.onPopupEscPress);
    },

    closePopup: function () {
      var coordinatesSetupTop = window.setup.style.top;
      var coordinatesSetupLeft = window.setup.style.left;
      window.setup.classList.add('hidden');
      document.removeEventListener('keydown', window.util.onPopupEscPress);
      window.setup.style.top = coordinatesSetupTop;
      window.setup.style.left = coordinatesSetupLeft;
    }
  };
})();
