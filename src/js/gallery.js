'use strict';

// Временно создал массив с адресами изображений.
var pictures = ['img/screenshots/1.png', 'img/screenshots/2.png', 'img/screenshots/3.png', 'img/screenshots/4.png', 'img/screenshots/5.png', 'img/screenshots/6.png'];

var galleryPictureArray = document.querySelectorAll('.photogallery-image img');

var previewContainer = document.querySelector('.overlay-gallery');
var closeGallery = previewContainer.querySelector('.overlay-gallery-close');
var prevPicture = document.querySelector('.overlay-gallery-control-left');
var nextPicture = document.querySelector('.overlay-gallery-control-right');
var previewImageContainer = previewContainer.querySelector('.overlay-gallery-preview');
var previewNumber = document.querySelector('.preview-number-current');
var previewTotal = document.querySelector('.preview-number-total');

var fullSizePic = document.createElement('IMG');

var activePicture;

previewTotal.innerHTML = galleryPictureArray.length;

galleryPictureArray.forEach(function(item, i) {
  galleryPictureArray[i].onclick = function(e) {
    e.preventDefault();
    activePicture = i;
    showGallery();
  };
});

closeGallery.onclick = function(e) {
  e.preventDefault();
  hideGallery();
};

document.onkeydown = function(e) {
  if (e.keyCode === 27) {
    e.preventDefault();
    hideGallery();
  }
};

prevPicture.onclick = function(e) {
  e.preventDefault();
  if (activePicture === 0) {
    activePicture = galleryPictureArray.length - 1;
  } else {
    activePicture -= 1;
  }
  fullSizePic.src = pictures[activePicture];
  previewNumber.innerHTML = activePicture + 1;
};

nextPicture.onclick = function(e) {
  e.preventDefault();
  if (activePicture === galleryPictureArray.length - 1) {
    activePicture = 0;
  } else {
    activePicture += 1;
  }
  fullSizePic.src = pictures[activePicture];
  previewNumber.innerHTML = activePicture + 1;
};

var showGallery = function() {
  previewContainer.classList.remove('invisible');
  previewNumber.innerHTML = activePicture + 1;
  previewRender();
};

var hideGallery = function() {
  previewContainer.classList.add('invisible');
  deleteRender();
};

var previewRender = function() {
  fullSizePic.src = pictures[activePicture];
  previewImageContainer.appendChild(fullSizePic);
};

var deleteRender = function() {
  previewImageContainer.removeChild(fullSizePic);
};
