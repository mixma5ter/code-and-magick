'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var reviewNameField = document.querySelector('#review-name');
  var reviewTextField = document.querySelector('#review-text');
  var reviewSubmitBtn = document.querySelector('.review-submit');
  var reviewLinkContainer = document.querySelector('.review-fields');
  var reviewNameLink = document.querySelector('.review-fields-name');
  var reviewTextLink = document.querySelector('.review-fields-text');
  var reviewMarkAll = document.querySelectorAll('input[name=review-mark]');
  var reviewAddBtn = document.querySelector('.reviews-controls-new');

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

  //function setCookie() {
  //  var dateNow = new Date();
  //  var yearNow = dateNow.getFullYear();
  //  var lastBirthDate = new Date(yearNow, 11, 9);
  //  var reviewMark = document.querySelector('input[name=review-mark]:checked');
  //
  //  if(+dateNow > +lastBirthDate) {
  //    var dateToExpire = +dateNow + (+dateNow - +lastBirthDate);
  //  } else {
  //    dateToExpire = +dateNow + (+dateNow - (+new Date(yearNow - 1, 11, 9)));
  //  }
  //
  //  window.Cookies.set('review-mark', reviewMark.value, {
  //    expires: dateToExpire
  //  });
  //
  //  window.Cookies.set('review-name', reviewNameField.value, {
  //    expires: dateToExpire
  //  });
  //}


  reviewSubmitBtn.addEventListener('click', function() {
    var cookie = require('./cookie');
    cookie.setCookie();
    //setCookie();
  });

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;
})();
