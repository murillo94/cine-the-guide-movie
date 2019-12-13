import { fontSizeResponsive } from '../dimensions';

test('should verify type number', () => {
  expect(typeof fontSizeResponsive(2)).toBe('number');
});
