'use strict';

var BaseDOMComponent = require('../base-component');
var utilities = require('../utilities');

var CLASS_ACTIVE = 'review-quiz-answer-active';

var Review = function(element, data) {
  this.data = data;
  BaseDOMComponent.call(this, this.getReviewElement(element));
  this.onAnswerClick = this.onAnswerClick.bind(this);
  this.quizList = this.element.querySelector('.review-quiz');
  this.quizAnswer = this.element.querySelectorAll('.review-quiz-answer');

  for (var i = 0; i < this.quizAnswer.length; i++) {
    this.quizAnswer[i].addEventListener('click', this.onAnswerClick);
  }
};

utilities.inherit(Review, BaseDOMComponent);

Review.prototype = {
  onAnswerClick: function(evt) {
    if (evt.target.classList.contains('review-quiz-answer')) {
      Array.prototype.forEach.call(this.quizAnswer, function(answer) {
        answer.classList.remove(CLASS_ACTIVE);
      });
      evt.target.classList.add(CLASS_ACTIVE);
    }
  },

  remove: function() {
    this.quizList.removeEventListener('click', this.onAnswerClick);
    BaseDOMComponent.prototype.remove.call(this);
  },

  getReviewElement: function(reviewElement) {
    var reviewPicture = reviewElement.querySelector('.review-author');
    var reviewText = reviewElement.querySelector('.review-text');
    var ratingClasses = ['one', 'two', 'three', 'four', 'five'];
    var reviewAuthorImg = new Image(124, 124);

    reviewAuthorImg.onload = function() {
      reviewPicture.src = this.src;
    };

    reviewAuthorImg.onerror = function() {
      reviewElement.classList.add('review-load-failure');
    };

    reviewAuthorImg.src = this.data.author.picture;
    reviewText.textContent = this.data.description;
    reviewElement.querySelector('.review-rating').classList.add('review-rating-' + ratingClasses[this.data.rating - 1]);

    return reviewElement;
  }
};

module.exports = Review;
