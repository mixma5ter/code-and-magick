'use strict';

var getReviewElement = require('./review-element');
var Review = require('./review');


var renderReviews = function(reviews) {
  var reviewsForm = document.querySelector('.reviews-filter');
  var reviewsContainer = document.querySelector('.reviews-list');

  reviewsForm.classList.add('invisible');

  reviews.forEach(function(data) {
    return new Review(getReviewElement.getReviewElement(data, reviewsContainer), data);
  });

  reviewsForm.classList.remove('invisible');
};

var REWIES_LOAD_URL = 'http://localhost:1507/api/reviews';

var callbackLoad = require('../utilities');

callbackLoad.load(REWIES_LOAD_URL, renderReviews);

