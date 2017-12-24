import Chronometer from '../chronometer';

describe('Chronometer Schema', () => {
  test('config {schema: [10]} should return an initialTime equal to {seconds: 10}', () => {
    const config = { schema: [10] };
    const expected = { seconds: 10 };

    expect(new Chronometer(config).initialTime)
      .toEqual(expected);
  });

  test('config {schema: [10, 5]} should return an initialTime equal to {seconds: 10, minutes: 5}', () => {
    const config = { schema: [10, 5] };
    const expected = { seconds: 10, minutes: 5 };

    expect(new Chronometer(config).initialTime)
      .toEqual(expected);
  });

  test('config {schema: [10, 5, 3]} should return an initialTime equal to {seconds: 10, minutes: 5, hours: 3}', () => {
    const config = { schema: [10, 5, 3] };
    const expected = { seconds: 10, minutes: 5, hours: 3 };

    expect(new Chronometer(config).initialTime)
      .toEqual(expected);
  });
});

describe('Chronometer Exceptions', () => {
  test('new Chronometer() must throw "The configuration object must be passed"', () => {
    expect(() => { new Chronometer(); })
      .toThrow('The configuration object must be passed');
  });

  test('new Chronometer({}) must throw "The chronometer schema must be provided"', () => {
    expect(() => { new Chronometer({}); })
      .toThrow('The chronometer schema must be provided');
  });
});
