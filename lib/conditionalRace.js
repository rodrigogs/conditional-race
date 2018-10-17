/**
 * The conditionalRace function returns a Promise that is
 * settled the same way (and takes the same value) as the
 * first promise that settles and fulfills the passed condition function
 * amongst the promises of the iterable passed as argument.
 *
 * If the iterable passed is empty, the promise returned will be forever pending.
 *
 * If the iterable contains one or more non-promise value
 * and/or an already resolved/rejected promise,
 * then Promise.race will resolve to the first of these values found in the iterable.
 *
 * If no promise fulfills the conditional function, null is returned.
 *
 * @param {Promise[]} promises
 * @param {Function<Boolean>} conditionFn
 * @returns {Promise<any>}
 */
const conditionalRace = (promises, conditionFn) => new Promise((resolve, reject) => {
  if (!(promises instanceof Array)) throw new Error('conditionaRace\'s first argument should be an array.');
  if (!(conditionFn instanceof Function)) throw new Error('conditionaRace\'s second argument should be a function.');

  let fulfilled = false;
  let elapsed = 0;

  promises.forEach(async (promise) => {
    try {
      const result = await promise;
      if (!fulfilled && conditionFn(result)) {
        resolve(result);
        fulfilled = true;
      }
    } catch (err) {
      if (!fulfilled) {
        reject(err);
        fulfilled = true;
      }
    }

    elapsed += 1;
    if (elapsed === promises.length && !fulfilled) resolve(null);
  });
});

module.exports = conditionalRace;
