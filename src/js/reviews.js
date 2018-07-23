'use strict';

var REVIEWS_LOAD_URL = 'http://localhost:1507/api/reviews';

var callbackLoad = function(url, callback, callbackName) {
  if (!callbackName) {
    callbackName = 'cb' + Date.now();
  }

  window[callbackName] = function(data) {
    callback(data);
  };

  var callbackScript = document.createElement('script');
  callbackScript.src = url + '?callback=' + callbackName;
  document.body.appendChild(callbackScript);
};

var reviewsFilter = document.querySelector('.reviews-filter');
var container = document.querySelector('.reviews-list');
var template = document.getElementById('review-template');
var templateContainer = 'content' in template ? template.content : template;

reviewsFilter.classList.add('invisible');

var IMAGE_LOAD_TIMEOUT = 10000;

var getReviewElement = function(arrayElem) {
  var reviewsItem = templateContainer.querySelector('.review').cloneNode(true);
  reviewsItem.querySelector('.review-author').textContent = arrayElem.author.name;
  reviewsItem.querySelector('.review-rating').textContent = arrayElem.rating;
  reviewsItem.querySelector('.review-text').textContent = arrayElem.description;

  var authorImg = new Image(124, 124);
  var authorImgTimeout = null;

  authorImg.onload = function() {
    clearTimeout(authorImgTimeout);
    reviewsItem.querySelector('.review-author').src = arrayElem.author.picture;
  };
  authorImg.onerror = function() {
    reviewsItem.classList.add('review-load-failure');
  };

  authorImg.src = arrayElem.author.picture;

  authorImgTimeout = setTimeout(function() {
    reviewsItem.classList.add('review-load-failure');
  }, IMAGE_LOAD_TIMEOUT);

  return reviewsItem;
};

var renderReviews = function(array) {
  array.forEach(function(arrayElem) {
    container.appendChild(getReviewElement(arrayElem));
  });
};

module.exports = callbackLoad(REVIEWS_LOAD_URL, function(data) {
  renderReviews(data);
}, '__jsonpCallback');

reviewsFilter.classList.remove('invisible');
