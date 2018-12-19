import { requirePageDom } from './config';

describe('index', () => {
  beforeAll(() => {
    // for DOM Manipulation
    document.body.innerHTML = requirePageDom('index.njk')
  });

  test('init', () => {
    expect(true).toBeTruthy();
  });
});
