import { convertMinsToHrsMins } from '../time';

test('should convert minutes to hours and minutes', () => {
  expect(convertMinsToHrsMins(360)).toBe('06h 00m');
  expect(convertMinsToHrsMins(12)).toBe('00h 12m');
  expect(convertMinsToHrsMins(0)).toBe('00h 00m');
});
