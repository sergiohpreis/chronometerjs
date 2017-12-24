import CONFIG from './constants';

class Chronometer {
  constructor(config) {
    if (!config) {
      throw new Error('The configuration object must be passed');
    }

    if (!config.schema) {
      throw new Error('The chronometer schema must be provided');
    }

    this.currentTime = '';
    this.interval = undefined;

    // Sets all config object as properties of the class
    this.configToProperties(config);
    this.convertSchema(this.schema);
  }

  configToProperties(config) {
    Object.keys(config).forEach((item) => {
      this[item] = config[item];
    });
  }

  convertSchema(schema) {
    this.initialTime = schema.reduce((acc, item, index) => {
      acc[CONFIG[index]] = item;
      return acc;
    }, {});
  }

  prepare(initialTime) {
    Object.keys(initialTime).forEach((item) => {
      this[item] = initialTime[item];
    });
  }

  countdown(seconds) {
    if (seconds === 0) {
      return;
    }

    setTimeout(() => {
      this.seconds = seconds - 1;
      this.updateCurrentTime();
      this.countdown(this.seconds);
    }, this.seconds === this.initialTime.seconds ? 0 : 1000);
  }

  updateCurrentTime() {
    this.currentTime = `00:00:${this.seconds}`;
  }

  start() {
    this.prepare(this.initialTime);
    this.countdown(this.seconds);
  }
}

export default Chronometer;
