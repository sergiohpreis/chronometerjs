import CONFIG from './constants';

class Chronometer {
  constructor(config) {
    if (!config) {
      throw new Error('The configuration object must be passed');
    }

    if (!config.schema) {
      throw new Error('The chronometer schema must be provided');
    }

    Object.keys(config).forEach((item) => {
      this[item] = config[item];
    });

    this.convertSchema(this.schema);
  }

  convertSchema(schema) {
    this.initialTime = schema.reduce((acc, item, index) => {
      acc[CONFIG[index]] = item;
      return acc;
    }, {});
  }
}

export default Chronometer;
