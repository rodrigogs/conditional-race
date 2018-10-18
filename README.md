# conditional-race

[![Build Status](https://travis-ci.org/rodrigogs/conditional-race.svg?branch=master)](https://travis-ci.org/rodrigogs/conditional-race)
[![Maintainability](https://api.codeclimate.com/v1/badges/daa916d68e2291a6352a/maintainability)](https://codeclimate.com/github/rodrigogs/conditional-race/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/daa916d68e2291a6352a/test_coverage)](https://codeclimate.com/github/rodrigogs/conditional-race/test_coverage)

The conditionalRace function returns a `Promise` that is
settled the same way (and takes the same value) as the
first promise that settles and fulfills the passed condition function
amongst the promises of the iterable passed as argument.
If the iterable passed is empty, the promise returned will be forever pending.

If the iterable contains one or more non-promise value
and/or an already resolved/rejected promise,
then `conditionalRace` will resolve to the first of these values found in the iterable.

If no promise fulfills the conditional function, `null` is returned.

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

console.log(returnedCar.number) // 3
```
