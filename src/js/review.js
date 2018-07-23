'use strict';

var template = document.getElementById('review-template');
var templateContainer = 'content' in template ? template.content : template;
var IMAGE_LOAD_TIMEOUT = 10000;

module.exports = function(arrayElem) {
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
