'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');

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

  var reviesSubmitBtn = formContainer.querySelector('.review-submit');
  var reviewName = document.getElementById('review-name');
  var reviewText = document.getElementById('review-text');
  var reviewMark = formContainer.querySelectorAll('input[name=review-mark]');
  var reviewFields = formContainer.querySelector('.review-fields');
  var reviewFieldsName = formContainer.querySelector('.review-fields-name');
  var reviewFieldsText = formContainer.querySelector('.review-fields-text');

  reviesSubmitBtn.disabled = true;

  formContainer.oninput = function(evt) {
    evt.preventDefault();

    for (var i = 0; i < reviewMark.length; i++) {
      if (reviewMark[i].checked) {
        var reviewMarkValue = reviewMark[i].value;
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

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;
})();
