'use strict';

var BaseDOMComponent = require('../base-component');
var utilities = require('../utilities');

var CLASS_ACTIVE = 'review-quiz-answer-active';

var Review = function(element, data) {
  this.data = data;
  BaseDOMComponent.call(this, this.getReviewElement(element));
  this.setUsefulnessOnClick = this.setUsefulnessOnClick.bind(this);
  this.quizList = this.element.querySelector('.review-quiz');
  this.quizAnswerYes = this.element.querySelector('.review-quiz-answer-yes');
  this.quizAnswerNo = this.element.querySelector('.review-quiz-answer-no');

  this.quizList.addEventListener('click', this.setUsefulnessOnClick);
};

utilities.inherit(Review, BaseDOMComponent);

Review.prototype = {
  setUsefulnessOnClick: function(evt) {
    if (evt.target.classList.contains('review-quiz-answer')) {
      var isUseful = evt.target === this.quizAnswerYes;
      this.data.updateUsefulness(isUseful, this.onUsefulnessUpdate.bind(this));
    }
  },

  onUsefulnessUpdate: function(isUseful) {
    if (isUseful) {
      this.quizAnswerYes.classList.add(CLASS_ACTIVE);
      this.quizAnswerNo.classList.remove(CLASS_ACTIVE);
    } else {
      this.quizAnswerNo.classList.add(CLASS_ACTIVE);
      this.quizAnswerYes.classList.remove(CLASS_ACTIVE);
    }
  },

  remove: function() {
    this.quizList.removeEventListener('click', this.setUsefulnessOnClick);
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

    reviewAuthorImg.src = this.data.getAuthorPicture();
    reviewText.textContent = this.data.getDescription();
    reviewElement.querySelector('.review-rating').classList.add('review-rating-' + ratingClasses[this.data.getRating() - 1]);

    return reviewElement;
  }
};

module.exports = Review;
