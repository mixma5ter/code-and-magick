'use strict';

var getReviewElement = require('./review-element');
var Review = require('./review');
var callbackLoad = require('../utilities');

var REVIEWS_BLOCK = 3;

var CLASS_INVISIBLE = 'invisible';

var REWIES_LOAD_URL = 'http://localhost:1507/api/reviews';

var moreReviewsBtn = document.querySelector('.reviews-controls-more');
var reviewsFilter = document.querySelector('.reviews-filter');
var reviewsContainer = document.querySelector('.reviews-list');

var currentFilter = 'reviews-all';

var reviewBlockNumber = 0;

var loadReviews = function(filterID, blockNumber) {
  callbackLoad.load(REWIES_LOAD_URL, {
    from: blockNumber,
    to: blockNumber + REVIEWS_BLOCK,
    filter: filterID
  }, renderReviews);
};

var renderReviews = function(reviews) {
  reviewsFilter.classList.add(CLASS_INVISIBLE);

  reviews.forEach(function(data) {
    return new Review(getReviewElement.getReviewElement(data, reviewsContainer), data);
  });

  reviewsFilter.classList.remove(CLASS_INVISIBLE);

  if (reviews.length < REVIEWS_BLOCK) {
    moreReviewsBtn.classList.add(CLASS_INVISIBLE);
  } else {
    moreReviewsBtn.classList.remove(CLASS_INVISIBLE);
  }
};

reviewsFilter.addEventListener('change', function(evt) {
  if (evt.target.name === 'reviews') {
    reviewsContainer.innerHTML = '';
    reviewBlockNumber = 0;
    currentFilter = evt.target.id;
    loadReviews(currentFilter, reviewBlockNumber);
  }
});

moreReviewsBtn.addEventListener('click', function() {
  reviewBlockNumber = reviewBlockNumber + REVIEWS_BLOCK;
  loadReviews(currentFilter, reviewBlockNumber);
});

var reviews = {
  load: function() {
    loadReviews(currentFilter, reviewBlockNumber);
  }
};

module.exports = reviews;
