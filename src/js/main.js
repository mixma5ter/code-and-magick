'use strict';

require('./game/game-start');
require('./reviews/reviews');

var Gallery = require('./gallery');

var pictures = document.querySelectorAll('.photogallery-image');

var picturesList = [];
for (var i = 0; i < pictures.length; i++) {
  picturesList[i] = pictures[i].childNodes[0].src;
}

var gallery = new Gallery(picturesList);

Array.prototype.forEach.call(pictures, function(picture, pictureNum) {
  picture.onclick = function() {
    gallery.show(pictureNum);
  };
});
