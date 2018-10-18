# conditional-race

Promise conditional race.

## Install
```bash
$ npm install conditional-race
```

## Usage
```javascript
const conditionalRace = require('conditional-race');

const run = car => new Promise(resolve => setTimeout(() => resolve(car), car.speed));

const cars = {
  car1: {
    number: 1,
    color: 'blue',
    speed: 80,
  },
  car2: {
    number: 2,
    color: 'red',
    speed: 100,
  },
  car3: {
    number: 3,
    color: 'blue',
    speed: 90,
  },
};

// Should return the first blue car to win the race
const returnedCar = await conditionalRace([
  run(cars.car1),
  run(cars.car2),
  run(cars.car3),
], car => car.color === 'blue');

console.log(car.number) // 3
```

[![Build Status](https://travis-ci.org/rodrigogs/conditional-race.svg?branch=master)](https://travis-ci.org/rodrigogs/conditional-race)
[![Maintainability](https://api.codeclimate.com/v1/badges/daa916d68e2291a6352a/maintainability)](https://codeclimate.com/github/rodrigogs/conditional-race/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/daa916d68e2291a6352a/test_coverage)](https://codeclimate.com/github/rodrigogs/conditional-race/test_coverage)
