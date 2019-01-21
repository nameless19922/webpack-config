export default class Base {
  constructor(selector) {
    this.selector = selector;
    this.$el = $(selector);
    this.elems = [];
  }

  get() {
    this.elems = this.$el.toArray();

    return this;
  }

  render() {
    if (this.$el.length) {
      this.get().init();
    }
  }
}
