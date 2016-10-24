'use strict';

(function() {
  var reviews = [];

  var REWIES_LOAD_URL = 'http://localhost:1507/api/reviews';

  var callbackLoad = function(url, callback, callbackName) {
    if (!callbackName) {
      callbackName = 'cb' + String(Math.random()).slice(-6);
    }

    window[callbackName] = function(data) {
      callback(data);
    }

    var callbackScript = document.createElement('script');
    callbackScript.src = url + '?callback=' + callbackName;
    document.body.appendChild(callbackScript);
  };

  var reviewsForm = document.querySelector('.reviews-filter');

  reviewsForm.classList.add('invisible');

  var templateElement = document.querySelector('#review-template');

  var reviewsContainer = document.querySelector('.reviews-list');

  if ('content' in templateElement) {
    var elementToClone = templateElement.content.querySelector('.review');
  } else {
    elementToClone = templateElement.querySelector('.review');
  }

  var IMAGE_LOAD_TIMEOUT = 10000;

  var getReviewElement = function(data, container) {
    var reviewElement = elementToClone.cloneNode(true);

    container.appendChild(reviewElement);

    var reviewAuthorImg = new Image();
    var reviewLoadTimeout;

    reviewAuthorImg.onload = function() {
      clearTimeout(reviewLoadTimeout);
      reviewElement.querySelector('img').src = data.author.picture;
      reviewElement.querySelector('.review-author').title = data.author.name;
      reviewElement.querySelector('.review-rating').textContent = data.rating;
      reviewElement.querySelector('.review-text').textContent = data.description;
    };

    reviewAuthorImg.onerror = function() {
      reviewElement.classList.add('review-load-failure');
    };

    reviewAuthorImg.src = data.author.picture;

    reviewLoadTimeout = setTimeout(function() {
      reviewAuthorImg.src = '';
      reviewElement.classList.add('review-load-failure');
    }, IMAGE_LOAD_TIMEOUT);

    return reviewElement;
  };

  var renderReviews = function(reviews) {
    reviews.forEach(function(review) {
      getReviewElement(review, reviewsContainer);
    });
  };

  callbackLoad(REWIES_LOAD_URL, renderReviews);

  reviewsForm.classList.remove('invisible');
})();
