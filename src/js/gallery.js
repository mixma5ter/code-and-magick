'use strict';

var CLASS_INVISIBLE = 'invisible';

var Gallery = function(picturesList) {
  this.pictures = picturesList;
  this.activePicture = 0;
  this.galleryContainer = document.querySelector('.overlay-gallery');
  this.controlLeft = document.querySelector('.overlay-gallery-control-left');
  this.controlRight = document.querySelector('.overlay-gallery-control-right');
  this.currentPicture = document.querySelector('.preview-number-current');
  this.totalPictures = document.querySelector('.preview-number-total');
  this.galleryClose = document.querySelector('.overlay-gallery-close');
  this.totalPictures.innerText = this.pictures.length;
};

Gallery.prototype = {
  show: function(pictureNum) {
    var self = this;

    this.galleryContainer.classList.remove(CLASS_INVISIBLE);

    this.galleryClose.onclick = function() {
      self.hide();
    };
    this.controlLeft.onclick = function() {
      if (pictureNum > 0) {
        pictureNum--;
        self.setActivePicture(pictureNum);
      }
    };
    this.controlRight.onclick = function() {
      if (pictureNum < self.pictures.length - 1) {
        pictureNum++;
        self.setActivePicture(pictureNum);
      }
    };

    this.setActivePicture(pictureNum);
  },

  hide: function() {
    this.galleryContainer.classList.add(CLASS_INVISIBLE);
    this.galleryClose.onclick = null;
    this.controlLeft.onclick = null;
    this.controlRight.onclick = null;
  },

  setActivePicture: function(pictureNum) {
    var galleryPreview = document.querySelector('.overlay-gallery-preview');

    this.activePicture = pictureNum;

    var image = new Image();
    image.src = this.pictures[pictureNum];

    if (galleryPreview.lastElementChild.nodeName === 'IMG') {
      galleryPreview.replaceChild(image, galleryPreview.lastElementChild);
    } else {
      galleryPreview.appendChild(image);
    }

    this.currentPicture.innerText = this.activePicture + 1;
  }
};

module.exports = Gallery;
