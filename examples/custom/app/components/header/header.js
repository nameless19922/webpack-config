import Base from '../base/base';

export default class Header extends Base {
  constructor() {
    super('.js-header');
  }

  init() {
    Array.prototype.forEach.call(this.elems, (item, index) => console.log(this.selector, index));
  }
}
