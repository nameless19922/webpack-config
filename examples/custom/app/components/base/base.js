export default class Base {
  constructor(selector) {
    this.selector = selector;
    this.elems = document.querySelectorAll(selector);
  }

  render() {
    if (this.elems.length) {
      this.init();
    }
  }
}
