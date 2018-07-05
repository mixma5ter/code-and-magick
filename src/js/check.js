var getMessage = function (a, b) {
  if (typeof a === 'boolean') {
    if (a === true) {
      return 'Я попал в ' + b;
    }
    if (a === false) {
      return 'Я никуда не попал';
    }
  }
  if (typeof a === 'number') {
    return 'Я прыгнул на ' + (a * 100) + ' сантиметров';
  }
  if (typeof a === 'object' && typeof b !== 'object') {
    var numberOfSteps = 0;
    for (var i = 0; i < a.length; i++) {
      numberOfSteps += a[i];
    }
    return 'Я прошёл ' + numberOfSteps + ' шагов';
  }
  if (typeof a === 'object' && typeof b === 'object') {
    var distancePath = 0;
    for (var i = 0; i < a.length; i++) {
      distancePath += (a[i] * b[i]);
    }
    return 'Я прошёл ' + distancePath + ' метров';
  }
};
