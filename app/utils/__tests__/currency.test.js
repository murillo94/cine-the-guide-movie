import { convertToDolar } from '../currency';

test('should return formated dolar currency', () => {
  expect(convertToDolar(1000)).toBe('$1,000.00');
  expect(convertToDolar(0)).toBe('$0.00');
});

test('should return unformated currency', () => {
  expect(convertToDolar('')).toBe('Uninformed');
});
