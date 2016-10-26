'use strict';

module.exports = {
  getReviewElement: function getReviewElement(data, container) {
    var IMAGE_LOAD_TIMEOUT = 10000;

    var templateElement = document.querySelector('#review-template');

    if ('content' in templateElement) {
      var elementToClone = templateElement.content.querySelector('.review');
    } else {
      elementToClone = templateElement.querySelector('.review');
    }

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
  }
};
