'use strict';

var reviews = [];

var reviewsForm = document.querySelector('.reviews-filter');

reviewsForm.classList.add('invisible');

var reviewsContainer = document.querySelector('.reviews-list');

var renderReviews = function(reviews) {
  reviews.forEach(function(review) {
    var getReviewElement = require('./review-element');
    getReviewElement.getReviewElement(review, reviewsContainer);
  });
};

var REWIES_LOAD_URL = 'http://localhost:1507/api/reviews';

var callbackLoad = require('../utilities');

callbackLoad.JSONP(REWIES_LOAD_URL, renderReviews);

reviewsForm.classList.remove('invisible');
