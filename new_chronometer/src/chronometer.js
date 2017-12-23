class Chronometer {
  constructor(config) {
    if (config === undefined) {
      throw new Error('A configuration object must be passed on object instance');
    }

    Object.keys(config).forEach((item) => {
      this[item] = config[item];
    });
  }
}

export default Chronometer;
