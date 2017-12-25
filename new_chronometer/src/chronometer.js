import CONFIG from './constants';
import numberToString from './utils';

class Chronometer {
  constructor(config) {
    if (!config) {
      throw new Error('The configuration object must be passed');
    }

    if (!config.schema) {
      throw new Error('The chronometer schema must be provided');
    }

    this.currentTime = '';

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

  countdown() {
    if (this.seconds === 0 && this.minutes !== undefined) {
      this.minutes = this.minutes - 1;
      this.seconds = 60;
    }

    if (this.minutes === -1 && this.hours !== undefined) {
      this.hours = this.hours - 1;
      this.minutes = 59;
    }

    if ((this.seconds === 0 && this.minutes === undefined) ||
    (this.minutes === 0 && this.hours === undefined)) {
      return;
    }

    setTimeout(() => {
      this.seconds = this.seconds - 1;
      this.updateCurrentTime();
      this.countdown(this.seconds);
    }, 1000);
  }

  updateCurrentTime() {
    this.currentTime = `${this.hours ? numberToString(this.hours) : '00'}:${this.minutes ? numberToString(this.minutes) : '00'}:${numberToString(this.seconds)}`;
  }

  start() {
    this.prepare(this.initialTime);
    this.countdown(this.seconds);
  }
}

export default Chronometer;
