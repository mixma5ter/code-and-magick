'use strict';

require('./game/game-start');

var reviews = require('./reviews/reviews');

var Gallery = require('./gallery');

var pictures = document.querySelectorAll('.photogallery-image');

var picturesList = Array.prototype.map.call(pictures, function(picUrl) {
  var pictureUrl = document.createElement('a');
  pictureUrl.href = picUrl.childNodes[0].src;
  return pictureUrl.pathname;
});

var galleryContainer = document.querySelector('.overlay-gallery');
var gallery = new Gallery(galleryContainer, picturesList);

Array.prototype.forEach.call(pictures, function(picture, pictureNum) {
  picture.onclick = function() {
    location.hash = '#photo' + picturesList[pictureNum];
    gallery.show(location.hash);
  };
});

window.onload = gallery.onHashChange;

reviews.load();
