import { getResponsiveFontSize } from '../dimensions';

test('should verify type number', () => {
  expect(typeof getResponsiveFontSize(2)).toBe('number');
});
