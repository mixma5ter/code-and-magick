'use strict';

var BaseDOMComponent = require('./base-component');
var utilities = require('./utilities');

var CLASS_INVISIBLE = 'invisible';

var Gallery = function(container, picturesList) {
  BaseDOMComponent.call(this, container);
  this.currentPicture = document.querySelector('.preview-number-current');
  this.totalPictures = document.querySelector('.preview-number-total');
  this.galleryClose = document.querySelector('.overlay-gallery-close');
  this.controlLeft = document.querySelector('.overlay-gallery-control-left');
  this.controlRight = document.querySelector('.overlay-gallery-control-right');

  this.pictures = picturesList;
  this.pictureIndex = 0;
  this.totalPictures.innerText = this.pictures.length;

  this.hide = this.hide.bind(this);
  this.onLeftClick = this.onLeftClick.bind(this);
  this.onRightClick = this.onRightClick.bind(this);
  this._reloadHash = this._reloadHash.bind(this);
  this.onHashChange = this.onHashChange.bind(this);

  window.addEventListener('hashchange', this.onHashChange);
};

utilities.inherit(Gallery, BaseDOMComponent);

Gallery.prototype = {
  onLeftClick: function() {
    if (this.pictureIndex > 1) {
      this.pictureIndex--;
      this._reloadHash();
    }
  },

  onRightClick: function() {
    if (this.pictureIndex < this.pictures.length) {
      this.pictureIndex++;
      this._reloadHash();
    }
  },

  onHashChange: function() {
    if (location.hash.indexOf('photo') === -1) {
      this.hide();
    } else {
      this.show(location.hash);
    }
  },

  _reloadHash: function() {
    this.pictureSrc = this.pictures[this.pictureIndex - 1];
    location.hash = '#photo' + this.pictureSrc;
    this.setPictureIndex();
  },

  show: function(pictureNum) {
    if (typeof pictureNum === 'number') {
      this.pictureIndex = pictureNum;
    } else if (typeof pictureNum === 'string') {
      if (pictureNum === '') {
        return;
      }
      this.pictureSrc = pictureNum.match(/#photo(\S+)/)[1];
      this.pictureIndex = this.pictures.indexOf(this.pictureSrc) + 1;
    }

    this.element.classList.remove(CLASS_INVISIBLE);

    this.galleryClose.addEventListener('click', this.hide);
    this.controlLeft.addEventListener('click', this.onLeftClick);
    this.controlRight.addEventListener('click', this.onRightClick);

    this._reloadHash();
  },
  hide: function() {
    location.hash = '';
    this.element.classList.add(CLASS_INVISIBLE);
    this.galleryClose.removeEventListener('click', this.hide);
    this.controlLeft.removeEventListener('click', this.onLeftClick);
    this.controlRight.removeEventListener('click', this.onRightClick);
  },

  setPictureIndex: function() {
    var galleryPreview = document.querySelector('.overlay-gallery-preview');

    var image = new Image();
    if (typeof this.pictureSrc === 'string') {
      image.src = this.pictureSrc;
      this.currentPicture.innerText = this.pictureIndex;

    } else if (typeof this.pictureIndex === 'number') {
      image.src = this.pictures[this.pictureIndex];
      this.currentPicture.innerText = this.pictureIndex + 1;
    }

    if (galleryPreview.lastElementChild.nodeName === 'IMG') {
      galleryPreview.replaceChild(image, galleryPreview.lastElementChild);
    } else {
      galleryPreview.appendChild(image);
    }
  },

  remove: function() {
    this.hide();
    window.removeEventListener('hashchange', this.onHashChange);
  }
};

module.exports = Gallery;
