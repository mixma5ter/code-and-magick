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
  var reviewFormGroupMark = formContainer.querySelector('.review-form-group-mark');
  var reviewMark = reviewFormGroupMark.getElementsByTagName('input');
  var reviewFieldsName = formContainer.querySelector('.review-fields-name');
  var reviewFieldsText = formContainer.querySelector('.review-fields-text');

  reviesSubmitBtn.setAttribute('disabled', 'disabled');

  formContainer.oninput = function(evt) {
    evt.preventDefault();//Отключение стандартного действия

    for (var i = 0; i < reviewMark.length; i++) {
      if (reviewMark[i].checked) {
        var reviewMarkValue = reviewMark[i].value;
      }
    }

    if (reviewName.value && reviewMarkValue > 2) {
      reviesSubmitBtn.removeAttribute('disabled', 'disabled');
      reviewFieldsName.classList.add('invisible');
    } else {
      reviesSubmitBtn.setAttribute('disabled', 'disabled');
      reviewFieldsName.classList.remove('invisible');
    }

    if (reviewText.value && reviewMarkValue > 2) {
      reviesSubmitBtn.removeAttribute('disabled', 'disabled');
      reviewFieldsText.classList.add('invisible');
    } else {
      reviesSubmitBtn.setAttribute('disabled', 'disabled');
      reviewFieldsText.classList.remove('invisible');
    }
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  // var reviewName = document.getElementById('review-name');
  // var reviewText = document.getElementById('review-text');
  // var reviewMark1 = document.getElementById('review-mark-1');
  // var reviewMark2 = document.getElementById('review-mark-2');
  // var reviewFieldsName = formContainer.querySelector('.review-fields-name');
  // var reviewFieldsText = formContainer.querySelector('.review-fields-text');
  // var reviesSubmitBtn = formContainer.querySelector('.review-submit');
  //
  // reviesSubmitBtn.setAttribute('disabled', 'disabled');
  //
  // reviewName.oninput = function () {
  //   if (reviewName.value) {
  //     reviesSubmitBtn.removeAttribute('disabled', 'disabled');
  //     reviewFieldsName.classList.add('invisible');
  //   } else {
  //     reviesSubmitBtn.setAttribute('disabled', 'disabled');
  //     reviewFieldsName.classList.remove('invisible');
  //   }
  // };
  //
  // reviewText.oninput = function() {
  //   if (reviewText.value) {
  //     reviewFieldsText.classList.add('invisible');
  //   } else {
  //     reviewFieldsText.classList.remove('invisible');
  //   }
  // };

  return form;
})();
