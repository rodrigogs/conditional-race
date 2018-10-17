const conditionalRace = require('./conditionalRace');

describe('conditionalRace', () => {
  it('should return the first fulfilled promise which result matches the condition function', async () => {
    const p1 = new Promise(resolve => setTimeout(() => resolve(1), 100));
    const p2 = new Promise(resolve => setTimeout(() => resolve(2), 200));
    const p3 = new Promise(resolve => setTimeout(() => resolve(3), 150));

    const fulfilled = await conditionalRace([p1, p2, p3], result => result > 1);

    expect(fulfilled).toBe(3);
  });

  it('should resolve null when no promise value matches the condition function', async () => {
    const p1 = new Promise(resolve => setTimeout(() => resolve(1), 100));
    const p2 = new Promise(resolve => setTimeout(() => resolve(2), 200));
    const p3 = new Promise(resolve => setTimeout(() => resolve(3), 150));

    const fulfilled = await conditionalRace([p1, p2, p3], result => result === 0);

    expect(fulfilled).toBe(null);
  });

  it('should reject the race promise if any of the passed promises fail before a fulfilling result was found', async () => {
    const p1 = new Promise(resolve => setTimeout(() => resolve(1), 100));
    const p2 = new Promise(resolve => setTimeout(() => resolve(2), 200));
    const p3 = new Promise((resolve, reject) => setTimeout(() => reject(new Error('Foo')), 150));

    let error;
    try {
      await conditionalRace([p1, p2, p3], result => result > 1);
    } catch (err) {
      error = err;
    }

    if (!error) throw new Error('The above implementation should always throw an error');

    expect(error.message).toBe('Foo');
  });
});
