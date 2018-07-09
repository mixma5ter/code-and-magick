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


  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  var reviewName = document.getElementById('review-name');
  var reviewText = document.getElementById('review-text');
  var reviewMark1 = document.getElementById('review-mark-1');
  var reviewMark2 = document.getElementById('review-mark-2');
  var reviewFieldsName = formContainer.querySelector('.review-fields-name');
  var reviewFieldsText = formContainer.querySelector('.review-fields-text');

  reviewName.oninput = function() {
    if (reviewName.value) {
      reviewFieldsName.classList.add('invisible');
    } else {
      reviewFieldsName.classList.remove('invisible');
      reviewName.style.outline = '2px solid red';
    }
  };

  reviewText.oninput = function() {
    if (reviewText.value) {
      reviewFieldsText.classList.add('invisible');
    } else if (reviewMark1.checked || reviewMark2.checked) {
      reviewFieldsText.classList.remove('invisible');
      reviewText.style.outline = '2px solid red';
    }
  };

  return form;
})();
