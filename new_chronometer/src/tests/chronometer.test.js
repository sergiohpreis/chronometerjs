import Chronometer from '../chronometer';

describe('Chronometer', () => {
  test('new Chronometer() should return a new instance', () => {
    expect(new Chronometer()).toBeInstanceOf(Chronometer);
  });
});
