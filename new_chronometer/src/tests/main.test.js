import Chronometer from '../chronometer';

describe('Schema', () => {
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

describe('Start', () => {
  test('chronometer.start should call setTimeout', () => {
    const config = { schema: [5] };
    const chronometer = new Chronometer(config);
    chronometer.start();

    expect(setTimeout).toHaveBeenCalledTimes(1);
    jest.clearAllTimers();
  });
});

describe('Seconds', () => {
  jest.useFakeTimers();

  test('{ schema: [0] } should be equal 0', () => {
    const config = { schema: [0] };
    const chronometer = new Chronometer(config);
    chronometer.start();

    jest.advanceTimersByTime(3000);

    expect(chronometer.currentTime.seconds).toEqual(0);
    jest.clearAllTimers();
  });

  test('{ schema: [10] } | chronometer.currentTime.seconds should return 7 after 3000ms', () => {
    const config = { schema: [10] };
    const chronometer = new Chronometer(config);
    chronometer.start();

    jest.advanceTimersByTime(3000);

    expect(chronometer.currentTime.seconds).toEqual(7);
  });
});

describe('Minutes', () => {
  jest.useFakeTimers();

  test('{ schema: [10, 5] } | chronometer.currentTime.minutes should return 4 after 60000ms', () => {
    const config = { schema: [10, 5] };
    const chronometer = new Chronometer(config);
    chronometer.start();

    jest.advanceTimersByTime(60000);

    expect(chronometer.currentTime.minutes).toEqual(4);
  });

  test('{ schema: [43, 5] }; | chronometer.currentTime.minutes should return 4 and chronometer.seconds should return 42 after 61000ms', () => {
    const config = { schema: [43, 5] };
    const chronometer = new Chronometer(config);
    chronometer.start();

    jest.advanceTimersByTime(61000);

    expect(chronometer.currentTime.minutes).toEqual(4);
    expect(chronometer.currentTime.seconds).toEqual(42);
  });
});

describe('Hours', () => {
  jest.useFakeTimers();

  test('{ schema: [10, 5, 4] } | chronometer.currentTime.hours should return 3 after 3600000ms', () => {
    const config = { schema: [10, 5, 4] };
    const chronometer = new Chronometer(config);
    chronometer.start();

    jest.advanceTimersByTime(3600000);

    expect(chronometer.currentTime.hours).toEqual(3);
  });

  test('{ schema: [10, 10, 11] } | chronometer.currentTime.hours should return 10 and chronometer.minutes should return 5 after 3900000ms', () => {
    const config = { schema: [10, 10, 11] };
    const chronometer = new Chronometer(config);
    chronometer.start();

    jest.advanceTimersByTime(3900000);

    expect(chronometer.currentTime.hours).toEqual(10);
    expect(chronometer.currentTime.minutes).toEqual(5);
  });

  test('{ schema: [10, 10, 11] } | chronometer.currentTime.hours should return 10, chronometer.minutes should return 5 and chronometer.seconds should return 7 after 3903000ms', () => {
    const config = { schema: [10, 10, 11] };
    const chronometer = new Chronometer(config);
    chronometer.start();

    jest.advanceTimersByTime(3903000);

    expect(chronometer.currentTime.hours).toEqual(10);
    expect(chronometer.currentTime.minutes).toEqual(5);
    expect(chronometer.currentTime.seconds).toEqual(7);
  });
});

describe('Time String', () => {
  test('{ schema: [10] } | chronometer.timeString should return "00:00:07" after 3000ms', () => {
    const config = { schema: [10] };
    const chronometer = new Chronometer(config);
    chronometer.start();

    jest.advanceTimersByTime(3000);

    expect(chronometer.timeString).toEqual('00:00:07');
  });

  test('{ schema: [20] } | chronometer.timeString should return "00:00:10" 10000ms', () => {
    const config = { schema: [20] };
    const chronometer = new Chronometer(config);
    chronometer.start();

    jest.advanceTimersByTime(10000);

    expect(chronometer.timeString).toEqual('00:00:10');
  });

  test('{ schema: [10, 20] } | chronometer.timeString should return "00:10:10" after 600000ms', () => {
    const config = { schema: [10, 20] };
    const chronometer = new Chronometer(config);
    chronometer.start();

    jest.advanceTimersByTime(600000);

    expect(chronometer.timeString).toEqual('00:10:10');
  });

  test('{ schema: [15, 11] } | chronometer.timeString should return "00:07:12" after 188000ms', () => {
    const config = { schema: [20, 10] };
    const chronometer = new Chronometer(config);
    chronometer.start();

    jest.advanceTimersByTime(188000);

    expect(chronometer.timeString).toEqual('00:07:12');
  });

  test('{ schema: [3, 47, 11]] } | chronometer.timeString should return "10:47:03" after 3600000ms', () => {
    const config = { schema: [3, 47, 11] };
    const chronometer = new Chronometer(config);
    chronometer.start();

    jest.advanceTimersByTime(3600000);

    expect(chronometer.timeString).toEqual('10:47:03');
  });

  test('{ schema: [8, 40, 10] } | chronometer.timeString should return "01" after 11103000ms', () => {
    const config = { schema: [8, 40, 10] };
    const chronometer = new Chronometer(config);
    chronometer.start();

    jest.advanceTimersByTime(11103000);

    expect(chronometer.timeString).toEqual('07:35:05');
  });
});

describe('Observables', () => {
  test('Should change the value of variable seconds to 7 after 3000ms', () => {
    let secondsElapsed;

    const config = { schema: [10] };
    const chronometer = new Chronometer(config);
    chronometer.start();

    const updateSeconds = (data) => {
      secondsElapsed = data.seconds;
    };

    chronometer.subscribe(updateSeconds);

    jest.advanceTimersByTime(3000);

    expect(secondsElapsed).toEqual(7);
  });

  test('Should change the value of variable seconds to 7 after 60000ms', () => {
    let minutesElapsed;

    const config = { schema: [10, 3] };
    const chronometer = new Chronometer(config);
    chronometer.start();

    const updateMinutes = (data) => {
      minutesElapsed = data.minutes;
    };

    chronometer.subscribe(updateMinutes);

    jest.advanceTimersByTime(60000);

    expect(minutesElapsed).toEqual(2);
  });

  test('Should change the value of variable seconds to 7 after 3600000ms', () => {
    let hoursElapsed;

    const config = { schema: [10, 3, 11] };
    const chronometer = new Chronometer(config);
    chronometer.start();

    const updateMinutes = (data) => {
      hoursElapsed = data.hours;
    };

    chronometer.subscribe(updateMinutes);

    jest.advanceTimersByTime(3600000);

    expect(hoursElapsed).toEqual(10);
  });
});

describe('Exceptions', () => {
  test('new Chronometer() must throw "The configuration object must be passed"', () => {
    expect(() => { new Chronometer(); })
      .toThrow('The configuration object must be passed');
  });

  test('new Chronometer({}) must throw "The chronometer schema must be provided"', () => {
    expect(() => { new Chronometer({}); })
      .toThrow('The chronometer schema must be provided');
  });
});
