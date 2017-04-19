'use strict';

var utilities = require('../utilities');

var reviewAddBtn = document.querySelector('.reviews-controls-new');
var formContainer = document.querySelector('.overlay-container');
var formCloseButton = formContainer.querySelector('.review-form-close');
var reviewNameField = formContainer.querySelector('#review-name');
var reviewTextField = formContainer.querySelector('#review-text');
var reviewSubmitBtn = formContainer.querySelector('.review-submit');
var reviewLinkContainer = formContainer.querySelector('.review-fields');
var reviewNameLink = formContainer.querySelector('.review-fields-name');
var reviewTextLink = formContainer.querySelector('.review-fields-text');
var reviewMarkAll = formContainer.querySelectorAll('input[name=review-mark]');

function formValidation() {
  (function() {
    if(!reviewNameField.value) {
      reviewSubmitBtn.disabled = true;
      reviewLinkContainer.classList.add('review-fields-visible');
      reviewNameLink.classList.add('review-fields-label-visible');
    } else {
      reviewSubmitBtn.disabled = false;
      reviewNameLink.classList.remove('review-fields-label-visible');
    }
  }());

  (function() {
    var reviewMark = document.querySelector('input[name=review-mark]:checked');

    if(reviewMark.value < 3) {
      reviewTextField.required = true;
      reviewSubmitBtn.disabled = true;
      reviewLinkContainer.classList.add('review-fields-visible');
      reviewTextLink.classList.add('review-fields-label-visible');
    } else if(reviewMark.value >= 3) {
      reviewTextField.required = false;
      reviewSubmitBtn.disabled = false;
      reviewTextLink.classList.remove('review-fields-label-visible');
    }
  }());

  (function() {
    if(!reviewTextField.value & (reviewTextField.required === true)) {
      reviewSubmitBtn.disabled = true;
      reviewTextLink.classList.add('review-fields-visible');
      reviewTextLink.classList.add('review-fields-label-visible');
    } else {
      reviewSubmitBtn.disabled = false;
      reviewTextLink.classList.remove('review-fields-label-visible');
    }
  }());

  (function() {
    if(!reviewNameLink.classList.contains('review-fields-label-visible') & !reviewTextLink.classList.contains('review-fields-label-visible')) {
      reviewLinkContainer.classList.remove('review-fields-visible');
    } else {
      reviewLinkContainer.classList.add('review-fields-visible');
    }
  }());
}

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

reviewAddBtn.addEventListener('click', function() {
  window.addEventListener('keydown', onCloseKeydownHandler);

  var reviewMarkCookie = window.Cookies.get('review-mark');

  for(var i = 0; i < reviewMarkAll.length; i++) {
    if (reviewMarkAll[i].value === reviewMarkCookie) {
      reviewMarkAll[i].checked = true;
    }
  }

  reviewNameField.value = window.Cookies.get('review-name') || '';

  formValidation();
});

for(var i = 0; i < reviewMarkAll.length; i++) {
  reviewMarkAll[i].onchange = function() {
    formValidation();
  };
}

reviewNameField.oninput = function() {
  formValidation();
};

reviewTextField.oninput = function() {
  formValidation();
};

reviewSubmitBtn.addEventListener('click', function() {
  utilities.setCookie();
});

formCloseButton.onclick = function(evt) {
  evt.preventDefault();
  window.removeEventListener('keydown', onCloseKeydownHandler);
  form.close();
};

// Обработчик нажатия esc/enter
var onCloseKeydownHandler = function(evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    window.removeEventListener('keydown', onCloseKeydownHandler);
    form.close();
  }
};

module.exports = form;
