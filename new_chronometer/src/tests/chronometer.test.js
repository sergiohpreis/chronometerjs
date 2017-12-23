import Chronometer from '../chronometer';

describe('Smoke Tests Chronometer', () => {
  test('new Chronometer({}) should return a new instance', () => {
    expect(new Chronometer({}))
      .toBeInstanceOf(Chronometer);
  });

  test('new Chronometer({ hours: 10 }) should return { hours: 10 }', () => {
    expect(new Chronometer({ hours: 10 }))
      .toEqual({ hours: 10 });
  });

  test('new Chronometer({ hours: 10, minutes: 5 }) should return { hours: 10, minutes: 5 }', () => {
    expect(new Chronometer({ hours: 10, minutes: 5 }))
      .toEqual({ hours: 10, minutes: 5 });
  });

  test('new Chronometer({ hours: 10, minutes: 5, seconds: 3 }) should return { hours: 10, minutes: 5, seconds: 3 }', () => {
    expect(new Chronometer({ hours: 10, minutes: 5, seconds: 3 }))
      .toEqual({ hours: 10, minutes: 5, seconds: 3 });
  });
});

describe('Chronometer Exceptions', () => {
  test('new Chronometer() should throw an Error', () => {
    expect(() => new Chronometer())
      .toThrow('A configuration object must be passed on object instance');
  });
});
