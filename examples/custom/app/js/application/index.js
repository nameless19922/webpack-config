export default class Application {
  constructor(...modules) {
    this.esModules = modules;
  }

  getComponent(module) {
    const path = `${module}/${module}`;

    return import(/* webpackMode: "eager" */ `../../components/${path}.js`);
  }

  async* generateComponents() {
    /* eslint no-await-in-loop: off */
    for (let i = 0; i < this.esModules.length; i += 1) {
      yield await this.getComponent(this.esModules[i]);
    }
  }

  async run() {
    this.components = [];

    /* eslint no-restricted-syntax: off */
    for await (const item of this.generateComponents()) {
      const ComponentClass = item.default;
      const name = item.default.toString().match(/^function\s*([^\s(]+)/)[1].toLowerCase();

      this.components[name] = new ComponentClass();
      this.components[name].render();
    }
  }
}
