'use strict';

module.exports = {
  setCookie: function setCookie() {
    var dateNow = new Date();
    var yearNow = dateNow.getFullYear();
    var lastBirthDate = new Date(yearNow, 11, 9);
    var reviewMark = document.querySelector('input[name=review-mark]:checked');
    var reviewNameField = document.querySelector('#review-name');

    if(+dateNow > +lastBirthDate) {
      var dateToExpire = +dateNow + (+dateNow - +lastBirthDate);
    } else {
      dateToExpire = +dateNow + (+dateNow - (+new Date(yearNow - 1, 11, 9)));
    }

    window.Cookies.set('review-mark', reviewMark.value, {
      expires: dateToExpire
    });

    window.Cookies.set('review-name', reviewNameField.value, {
      expires: dateToExpire
    });
  }
};
