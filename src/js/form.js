'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var reviesSubmitBtn = formContainer.querySelector('.review-submit');

  var reviewMarksAll = formContainer.querySelectorAll('input[name=review-mark]');
  var reviewMark;//значение получаем из cookie, если оно есть.

  var reviewName = document.getElementById('review-name');
  var reviewText = document.getElementById('review-text');
  var reviewFields = formContainer.querySelector('.review-fields');
  var reviewFieldsName = formContainer.querySelector('.review-fields-name');
  var reviewFieldsText = formContainer.querySelector('.review-fields-text');

  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      cb();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
  };

  window.onload = function() {
    getCookies();
    checkValidity();
  };

  reviewName.oninput = function() {
    checkValidity();
  };

  reviewText.oninput = function() {
    checkValidity();
  };

  for(var i = 0; i < reviewMarksAll.length; i++) {
    reviewMarksAll[i].onchange = function() {
      checkValidity();
    };
  }

  reviesSubmitBtn.onclick = function(evt) {
    evt.preventDefault();
    setCookies();
    form.close();
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  /**
   * Проверка cookies.
   * Если они есть, устанавливает значения в поля формы.
   */
  function getCookies() {
    var reviewMarkCookie = window.Cookies.get('review-mark');
    for (var j = 0; j < reviewMarksAll.length; j++) {
      if (reviewMarksAll[j].value === reviewMarkCookie) {
        reviewMarksAll[j].checked = true;
      }
    }
    reviewName.value = window.Cookies.get('review-name') || '';
  }

  /**
   * Сохранение cookies.
   */
  function setCookies() {
    var dateNow = new Date();
    var birthDate = new Date('1906-12-09');
    birthDate.setFullYear(dateNow.getFullYear());
    if (birthDate >= dateNow) {
      birthDate.setFullYear(dateNow.getFullYear() - 1);
    }
    var dateToExpire = Math.floor((dateNow - birthDate) / (24 * 60 * 60 * 1000));
    window.Cookies.set('review-mark', reviewMark.value, {expires: dateToExpire});
    window.Cookies.set('review-name', reviewName.value, {expires: dateToExpire});
  }

  /**
   * Проверка формы.
   * Меняет поведение кнопки отправки отзыва.
   * Скрывает блок с посказками.
   */
  function checkValidity() {
    reviewMark = document.querySelector('input[name=review-mark]:checked');

    reviesSubmitBtn.disabled = !(reviewName.value && reviewMark.value > 2 || reviewName.value && reviewMark.value <= 2 && reviewText.value);

    if (reviewName.value) {
      reviewFieldsName.classList.add('invisible');
    } else {
      reviewFieldsName.classList.remove('invisible');
    }

    if (reviewText.value) {
      reviewFieldsText.classList.add('invisible');
    } else {
      reviewFieldsText.classList.remove('invisible');
    }

    if (reviewName.value && reviewText.value) {
      reviewFields.classList.add('invisible');
    } else {
      reviewFields.classList.remove('invisible');
    }
  }

  return form;
})();
