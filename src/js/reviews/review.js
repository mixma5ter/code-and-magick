'use strict';

var CLASS_ACTIVE = 'review-quiz-answer-active';

var Review = function(element, data) {
  this.data = data;
  this.element = element;
  this.quizAnswer = this.element.querySelectorAll('.review-quiz-answer');

  var self = this;

  for (var i = 0; i < this.quizAnswer.length; i++) {
    this.quizAnswer[i].onclick = function() {
      for (i = 0; i < this.quizAnswer.length; i++) {
        self.quizAnswer[i].classList.remove(CLASS_ACTIVE);
      }
      this.classList.add(CLASS_ACTIVE);
    };
  }
};

module.exports = Review;
