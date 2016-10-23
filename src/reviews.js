'use strict';

(function() {
  var reviews = [{
    "author": {
      "name": "Иванов Иван",
      "picture": "img/user-1.jpg"
    },
    "review_usefulness": 10,
    "rating": 2,
    "description": "Плохая игра: слишком сильно затягивает и невозможно оторваться. Я потерял работу, учебу, девушку и дар речи, но продолжаю играть. Это призыв о помощи: спасите."
  }, {
    "author": {
      "name": "Ксения Собчак",
      "picture": "img/user-3.png"
    },
    "review_usefulness": 6,
    "rating": 5,
    "description": "Все хорошо, мне нравится."
  }, {
    "author": {
      "name": "Ксюша Бородина",
      "picture": "img/user-2.png"
    },
    "review_usefulness": 3,
    "rating": 1,
    "description": "Все плохо, мне не нравится"
  }, {
    "author": {
      "name": "Мария Антуанетта",
      "picture": "img/user-1.jpg"
    },
    "review_usefulness": 4,
    "rating": 3,
    "description": "Невероятно чумовая игра. Пендальф-синий — мой герой)))) Он такой милашка. Благодаря ему я наконец нацчилась отвлекаться от работы и учёбы."
  }, {
    "author": {
      "name": "Дмитрий Карпов",
      "picture": "img/user-3.png"
    },
    "review_usefulness": 20,
    "rating": 4,
    "description": "Игра очень неплохая. Тут есть и трюки, и взлёты, и падения. Никогда не знаешь, что ждёт тебя впереди."
  }, {
    "author": {
      "name": "Максим Шаровары",
      "picture": "img/user-1.jpg"
    },
    "review_usefulness": 115,
    "rating": 2,
    "description": "Игра очень неплохая. Тут есть и трюки, и взлёты, и падения. Никогда не знаешь, что ждёт тебя впереди."
  }, {
    "author": {
      "name": "Зулейха Валиева",
      "picture": "img/user-3.png"
    },
    "review_usefulness": 10,
    "rating": 4,
    "description": "Игра очень неплохая. Тут есть и трюки, и взлёты, и падения. Никогда не знаешь, что ждёт тебя впереди."
  }, {
    "author": {
      "name": "Федор Непомнящих",
      "picture": "img/user-2.png"
    },
    "review_usefulness": 10,
    "rating": 3,
    "description": "Игра очень неплохая. Тут есть и трюки, и взлёты, и падения. Никогда не знаешь, что ждёт тебя впереди."
  }, {
    "author": {
      "name": "Макаронный Монстр",
      "picture": "img/user-1.jpg"
    },
    "review_usefulness": -3,
    "rating": 5,
    "description": "Игра очень неплохая. Тут есть и трюки, и взлёты, и падения. Никогда не знаешь, что ждёт тебя впереди."
  }, {
    "author": {
      "name": "Миклухо Маклай",
      "picture": "img/user-3.png"
    },
    "review_usefulness": 0,
    "rating": 2,
    "description": "Игра очень неплохая. Тут есть и трюки, и взлёты, и падения. Никогда не знаешь, что ждёт тебя впереди."
  }, {
    "author": {
      "name": "Муравьев Апостол",
      "picture": "img/user-2.png"
    },
    "review_usefulness": 0,
    "rating": 1,
    "description": "Игра очень неплохая. Тут есть и трюки, и взлёты, и падения. Никогда не знаешь, что ждёт тебя впереди."
  }, {
    "author": {
      "name": "Максим Горький",
      "picture": "img/user-3.png"
    },
    "review_usefulness": 8,
    "rating": 3,
    "description": "Игра очень неплохая. Тут есть и трюки, и взлёты, и падения. Никогда не знаешь, что ждёт тебя впереди."
  }, {
    "author": {
      "name": "Аноним",
      "picture": "img/ijwdoq"
    },
    "review_usefulness": 102,
    "rating": 3,
    "description": "Игра очень неплохая. Тут есть и трюки, и взлёты, и падения. Никогда не знаешь, что ждёт тебя впереди."
  }, {
    "author": {
      "name": "Иван Иванов",
      "picture": "img/user-1.jpg"
    },
    "review_usefulness": 5,
    "rating": 4,
    "description": "Игра очень неплохая. Тут есть и трюки, и взлёты, и падения. Никогда не знаешь, что ждёт тебя впереди."
  }, {
    "author": {
      "name": "Василиса Васильева",
      "picture": "img/user-2.png"
    },
    "review_usefulness": 0,
    "rating": 4,
    "description": "Игра очень неплохая. Тут есть и трюки, и взлёты, и падения. Никогда не знаешь, что ждёт тебя впереди."
  }, {
    "author": {
      "name": "Хороший Человек",
      "picture": "img/user-2.png"
    },
    "review_usefulness": 24,
    "rating": 3,
    "description": "Игра очень неплохая. Тут есть и трюки, и взлёты, и падения. Никогда не знаешь, что ждёт тебя впереди."
  }, {
    "author": {
      "name": "Гейб Ньюэлл",
      "picture": "img/dwjiqo9"
    },
    "review_usefulness": 10,
    "rating": 5,
    "description": "Игра очень интересная. Нравится возможность выбирать между героями, а самое крутое, что есть альтернативные концовки в игре. Она точно стоит своих денег."
  }]

  var reviewsForm = document.querySelector('.reviews-filter');

  reviewsForm.classList.add('invisible');

  var templateElement = document.querySelector('#review-template');

  var reviewsContainer = document.querySelector('.reviews-list');

  if ('content' in templateElement) {
    var elementToClone = templateElement.content.querySelector('.review');
  } else {
    elementToClone = templateElement.querySelector('.review');
  }

  var IMAGE_LOAD_TIMEOUT = 10000;

  var getReviewElement = function(data, container) {
    var reviewElement = elementToClone.cloneNode(true);

    container.appendChild(reviewElement);

    var reviewAuthorImg = new Image();
    var reviewLoadTimeout;

    reviewAuthorImg.onload = function() {
      clearTimeout(reviewLoadTimeout);
      reviewElement.querySelector('img').src = data.author.picture;
      reviewElement.querySelector('.review-author').title = data.author.name;
      reviewElement.querySelector('.review-rating').textContent = data.rating;
      reviewElement.querySelector('.review-text').textContent = data.description;
    };

    reviewAuthorImg.onerror = function() {
      reviewElement.classList.add('review-load-failure');
    };

    reviewAuthorImg.src = data.author.picture;

    reviewLoadTimeout = setTimeout(function() {
      reviewAuthorImg.src = '';
      reviewElement.classList.add('review-load-failure');
    }, IMAGE_LOAD_TIMEOUT);

    return reviewElement;
  };

  reviews.forEach(function(review) {
    getReviewElement(review, reviewsContainer);
  });

  reviewsForm.classList.remove('invisible');
})();
