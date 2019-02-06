const icon = require('../images/icon.png');
const notFound = require('../images/not_found.png');
const splash = require('../images/splash.png');

test('should verify if exists images in path', () => {
  expect(icon).toBe(1);
  expect(notFound).toBe(1);
  expect(splash).toBe(1);
});
