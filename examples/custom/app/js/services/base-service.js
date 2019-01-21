export default class BaseService {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  call(method = 'GET', payload = {}) {
    return $.ajax({
      type: method,
      url: `${this.endpoint}`,
      data: payload,
      dataType: 'json',
      async: true,
    });
  }
}
