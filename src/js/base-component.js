'use strict';

var BaseDOMComponent = function(element) {
  this.element = element;
};

BaseDOMComponent.prototype = {
  append: function(container) {
    container.appendChild(this.element);
  },

  remove: function() {
    this.element.parentNode.removeChild(this.element);
  }
};

module.exports = BaseDOMComponent;
