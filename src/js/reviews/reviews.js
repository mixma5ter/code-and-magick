'use strict';

var getReviewElement = require('./review-element');

var reviewsForm = document.querySelector('.reviews-filter');

reviewsForm.classList.add('invisible');

var reviewsContainer = document.querySelector('.reviews-list');

var renderReviews = function(reviews) {
  reviews.forEach(function(review) {
    getReviewElement.getReviewElement(review, reviewsContainer);
  });
};

var REWIES_LOAD_URL = 'http://localhost:1507/api/reviews';

var callbackLoad = require('../utilities');

callbackLoad.load(REWIES_LOAD_URL, renderReviews);

reviewsForm.classList.remove('invisible');
