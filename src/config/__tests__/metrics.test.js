import { fontSizeResponsive } from '../Metrics';

test('should verify type number', () => {
  expect(typeof fontSizeResponsive(2)).toBe('number');
});
