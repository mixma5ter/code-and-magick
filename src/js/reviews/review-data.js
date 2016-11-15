'use strict';

var ReviewData = function(data) {
  this.authorName = data.author.name;
  this.authorPicture = data.author.picture;
  this.created = data.created;
  this.reviewUsefulness = data.review_usefulness;
  this.rating = data.rating;
  this.description = data.description;
};

ReviewData.prototype = {
  getAuthorName: function() {
    return this.authorName;
  },
  getAuthorPicture: function() {
    return this.authorPicture;
  },
  getCreated: function() {
    return this.created;
  },
  getUsefulness: function() {
    return this.reviewUsefulness;
  },
  getRating: function() {
    return this.rating;
  },
  getDescription: function() {
    return this.description;
  },

  setAuthorName: function(name) {
    this.authorName = name;
  },
  setAuthorPicture: function(picture) {
    this.authorPicture = picture;
  },
  setCreated: function(created) {
    this.created = created;
  },
  setUsefulness: function(usefulness) {
    this.reviewUsefulness = usefulness;
  },
  setRating: function(rating) {
    this.rating = rating;
  },
  setDescription: function(description) {
    this.description = description;
  }
};

module.exports = ReviewData;
