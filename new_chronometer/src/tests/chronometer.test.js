import Chronometer from '../chronometer';

describe('Smoke Tests Chronometer', () => {
  test('new Chronometer({}) should return a new instance of Chronometer', () => {
    expect(new Chronometer({}))
      .toBeInstanceOf(Chronometer);
  });
});
