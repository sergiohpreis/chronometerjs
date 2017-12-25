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

    this.observables = [];

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
    // Object.keys(initialTime).forEach((item) => {
    //   this[item] = initialTime[item];
    // });
    this.currentTime = {
      ...initialTime,
    };
  }

  countdown() {
    if (this.currentTime.seconds === 0 && this.currentTime.minutes !== undefined) {
      this.currentTime.minutes = this.currentTime.minutes - 1;
      this.currentTime.seconds = 60;
    }

    if (this.currentTime.minutes === -1 && this.currentTime.hours !== undefined) {
      this.currentTime.hours = this.currentTime.hours - 1;
      this.currentTime.minutes = 59;
    }

    if ((this.currentTime.seconds === 0 && this.currentTime.minutes === undefined) ||
      (this.currentTime.minutes === 0 && this.currentTime.hours === undefined)) {
      return;
    }

    setTimeout(() => {
      this.currentTime.seconds = this.currentTime.seconds - 1;
      this.updateTime();
      this.notify(this.currentTime);
      this.countdown(this.seconds);
    }, 1000);
  }

  updateTime() {
    this.timeString = `${this.currentTime.hours ? numberToString(this.currentTime.hours) : '00'}:${this.currentTime.minutes ? numberToString(this.currentTime.minutes) : '00'}:${numberToString(this.currentTime.seconds)}`;
  }

  start() {
    this.prepare(this.initialTime);
    this.countdown(this.seconds);
  }

  subscribe(f) {
    this.observables.push(f);
  }

  notify(data) {
    this.observables.forEach(observer => observer(data));
  }
}

export default Chronometer;
