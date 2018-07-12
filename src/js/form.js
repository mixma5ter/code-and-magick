'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var reviewMark = formContainer.querySelectorAll('input[name=review-mark]');
  var reviewMarkValue;
  var reviewMarkIndex;
  var reviewName = document.getElementById('review-name');
  var reviewText = document.getElementById('review-text');
  var reviewFields = formContainer.querySelector('.review-fields');
  var reviewFieldsName = formContainer.querySelector('.review-fields-name');
  var reviewFieldsText = formContainer.querySelector('.review-fields-text');
  var reviesSubmitBtn = formContainer.querySelector('.review-submit');

  var checkCookies = function() {
    if (window.Cookies.get('review-mark-index')) {
      reviewMark[(window.Cookies.get('review-mark-index'))].checked = true;
    }

    if (window.Cookies.get('review-name')) {
      reviewName.value = window.Cookies.get('review-name');
    }
  };

  var checkValidity = function() {
    for (var i = 0; i < reviewMark.length; i++) {
      if (reviewMark[i].checked) {
        reviewMarkValue = reviewMark[i].value;
        reviewMarkIndex = i;
      }
    }

    if (reviewName.value && reviewMarkValue > 2) {
      reviesSubmitBtn.disabled = false;
    } else if (reviewName.value && reviewMarkValue <= 2 && reviewText.value) {
      reviesSubmitBtn.disabled = false;
    } else {
      reviesSubmitBtn.disabled = true;
    }

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
  };

  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      checkCookies();
      checkValidity();
      cb();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
  };

  var setCookies = function() {
    var dateNow = new Date();
    var birthDate = new Date('1906-12-09');
    birthDate.setFullYear(dateNow.getFullYear());
    if (birthDate >= dateNow) {
      birthDate.setFullYear(dateNow.getFullYear() - 1);
    }
    var deleteCookie = ((dateNow - birthDate) / (24 * 60 * 60 * 1000));
    window.Cookies.set('review-mark', reviewMarkValue, {expires: deleteCookie});
    window.Cookies.set('review-mark-index', reviewMarkIndex, {expires: deleteCookie});
    window.Cookies.set('review-name', reviewName.value, {expires: deleteCookie});
  };

  formContainer.oninput = function(evt) {
    evt.preventDefault();
    checkValidity();
  };

  reviesSubmitBtn.onclick = function(evt) {
    evt.preventDefault();
    setCookies();
    form.close();
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;
})();
