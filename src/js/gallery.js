'use strict';

var BaseDOMComponent = require('./base-component');
var utilities = require('./utilities');

var CLASS_INVISIBLE = 'invisible';

var Gallery = function(container, picturesList) {
  BaseDOMComponent.call(this, container);
  this.controlLeft = document.querySelector('.overlay-gallery-control-left');
  this.controlRight = document.querySelector('.overlay-gallery-control-right');
  this.currentPicture = document.querySelector('.preview-number-current');
  this.totalPictures = document.querySelector('.preview-number-total');
  this.galleryClose = document.querySelector('.overlay-gallery-close');

  this.pictures = picturesList;
  this.activePicture = 0;
  this.totalPictures.innerText = this.pictures.length;

  this.hide = this.hide.bind(this);
  this.onLeftClick = this.onLeftClick.bind(this);
  this.onRightClick = this.onRightClick.bind(this);
};

utilities.inherit(Gallery, BaseDOMComponent);

Gallery.prototype = {
  onLeftClick: function() {
    if (this.activePicture > 0) {
      this.activePicture--;
      this.setActivePicture();
    }
  },

  onRightClick: function() {
    if (this.activePicture < this.pictures.length - 1) {
      this.activePicture++;
      this.setActivePicture();
    }
  },

  show: function(pictureNum) {
    this.activePicture = pictureNum;
    this.element.classList.remove(CLASS_INVISIBLE);

    this.galleryClose.addEventListener('click', this.hide);
    this.controlLeft.addEventListener('click', this.onLeftClick);
    this.controlRight.addEventListener('click', this.onRightClick);

    this.setActivePicture();
  },
  hide: function() {
    this.element.classList.add(CLASS_INVISIBLE);
    this.galleryClose.removeEventListener('click', this.hide);
    this.controlLeft.removeEventListener('click', this.onLeftClick);
    this.controlRight.removeEventListener('click', this.onRightClick);
  },

  setActivePicture: function() {
    var galleryPreview = document.querySelector('.overlay-gallery-preview');

    var image = new Image();
    image.src = this.pictures[this.activePicture];

    if (galleryPreview.lastElementChild.nodeName === 'IMG') {
      galleryPreview.replaceChild(image, galleryPreview.lastElementChild);
    } else {
      galleryPreview.appendChild(image);
    }

    this.currentPicture.innerText = this.activePicture + 1;
  }
};

module.exports = Gallery;
