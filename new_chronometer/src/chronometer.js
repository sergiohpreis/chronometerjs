class Chronometer {
  constructor(config) {
    if (config === undefined) {
      throw new Error('A configuration object must be passed on object instance');
    }

    this.hours = config.hours;
    this.minutes = config.minutes;
    this.seconds = config.seconds;
  }
}

export default Chronometer;
