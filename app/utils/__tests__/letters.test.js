import { convertToUpperCaseFirstLetter } from '../letters';

test('should convert upper case', () => {
  expect(convertToUpperCaseFirstLetter('test')).toBe('Test');
});
