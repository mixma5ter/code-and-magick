'use strict';

var REVIEWS_LOAD_URL = 'http://localhost:1507/api/reviews';
var container = document.querySelector('.reviews-list');
var reviewsFilter = document.querySelector('.reviews-filter');

reviewsFilter.classList.add('invisible');

//загрузка данных с сервера
var callbackLoad = require('./load');

//отрисовка отзыва
var getReviewElement = require('./review');

var renderReviews = function(array) {
  array.forEach(function(arrayElem) {
    container.appendChild(getReviewElement(arrayElem));
  });
};

callbackLoad(REVIEWS_LOAD_URL, function(data) {
  renderReviews(data);
  reviewsFilter.classList.remove('invisible');
}, '__jsonpCallback');
