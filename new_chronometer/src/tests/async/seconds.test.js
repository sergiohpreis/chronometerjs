import Chronometer from '../../chronometer';

describe('Chronometer Seconds', () => {
  test('chronometer.seconds should be equal 1 after 2 seconds', (done) => {
    const config = { schema: [3] };
    const chronometer = new Chronometer(config);
    chronometer.start();

    setTimeout(() => {
      expect(chronometer.seconds).toEqual(1);
      done();
    }, 2000);
  });

  test('chronometer.seconds should be equal 0 after 2 seconds', (done) => {
    const config = { schema: [0] };
    const chronometer = new Chronometer(config);
    chronometer.start();

    setTimeout(() => {
      expect(chronometer.seconds).toEqual(0);
      done();
    }, 2000);
  });
});
