'use strict';

var jsonData = require('../data/data');
var utilities = require('../utilities');
var Review = require('./review');
var ReviewData = require('./review-data');

var REVIEWS_BLOCK = 3;
var CLASS_INVISIBLE = 'invisible';

var template = document.getElementById('review-template');
var templateContainer = 'content' in template ? template.content : template;
var moreReviewsBtn = document.querySelector('.reviews-controls-more');
var reviewsFilter = document.querySelector('.reviews-filter');
var reviewsContainer = document.querySelector('.reviews-list');

var defaultFilter = 'reviews-all';
var currentFilter = defaultFilter;

var reviewBlockArray = [];
var reviewBlockNumber = 0;

var twoWeeks = 2 * 7 * 24 * 60 * 60 * 1000;

// возвращает случайную дату из диапазона
var getRandomTimeStampInRange = function(range) {
  return Date.now() - parseInt(Math.random() * range);
};

// добавляет в обьект с данными случайную дату создания из диапазона в две недели
jsonData.forEach(function(item) {
  item.created = getRandomTimeStampInRange(twoWeeks);
});

var loadReviews = function(filterID, blockNumber) {
  utilities.loadData(jsonData, {
    from: blockNumber,
    to: blockNumber + REVIEWS_BLOCK,
    filter: filterID
  }, renderReviews);
};

var renderReviews = function(reviews) {
  reviewsFilter.classList.add(CLASS_INVISIBLE);

  reviews.forEach(function(data) {
    var cloneElem = templateContainer.querySelector('.review').cloneNode(true);
    var reviewItem = new Review(cloneElem, new ReviewData(data));
    reviewBlockArray.push(reviewItem);
    reviewsContainer.appendChild(reviewItem.element);
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
    reviewBlockArray.forEach(function(item) {
      item.remove();
    });
    reviewBlockArray = [];
    reviewBlockNumber = 0;
    currentFilter = evt.target.id;
    localStorage.setItem('lastCheckedFilter', currentFilter);
    loadReviews(currentFilter, reviewBlockNumber);
  }
});

moreReviewsBtn.addEventListener('click', function() {
  reviewBlockNumber = reviewBlockNumber + REVIEWS_BLOCK;
  loadReviews(currentFilter, reviewBlockNumber);
});

var reviews = {
  load: function() {
    var lastCheckedFilter = localStorage.getItem('lastCheckedFilter');

    if(lastCheckedFilter) {
      currentFilter = lastCheckedFilter;
      document.getElementById(lastCheckedFilter).checked = true;
    } else {
      currentFilter = defaultFilter;
    }
    loadReviews(currentFilter, reviewBlockNumber);
  }
};

module.exports = reviews;
