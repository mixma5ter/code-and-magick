'use strict';

var filterData = require('./reviews/filter');

module.exports = {

  // загрузка и фильтрация данных из локального файла
  loadData: function(data, params, callback) {
    var loadedData = data.slice();

    var filteredData = filterData(loadedData, params.filter);
    var showData = filteredData.slice(params.from, params.to);

    callback(showData);
  },

  // загрузка данных с сервера
  callbackLoad: function(url, params, callback) {
    var xhr = new XMLHttpRequest();
    var loadedData = [];

    xhr.addEventListener('load', function(evt) {
      try {
        loadedData = JSON.parse(evt.target.response);
        callback(loadedData);
      } catch(err) {
        console.log(err);
      }
    });

    xhr.open('GET', url + '?' + 'from=' + params.from + '&to=' + params.to + '&filter=' + params.filter);
    xhr.timeout = 10000;
    xhr.send();
  },

  setCookie: function() {
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
  },

  throttle: function(func, delay) {
    var isThrottled = true;

    function funcWrapper() {
      if (isThrottled) {
        func();
        isThrottled = false;
      }
      setTimeout(function() {
        isThrottled = true;
      }, delay);
    }
    return funcWrapper;
  },

  inherit: function(ChildClass, ParentClass) {
    if (typeof ChildClass === 'function' && typeof ParentClass === 'function') {
      var EmptyConstructor = function() {};
      EmptyConstructor.prototype = ParentClass.prototype;
      ChildClass.prototype = new EmptyConstructor();
    } else {
      console.error('inherit: One or both parameters is not a function');
    }
  }
};
