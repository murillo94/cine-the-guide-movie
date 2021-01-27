import { sliceArrayLength } from '../array';

test('should slice array if array length is higher than number', () => {
  expect(sliceArrayLength([1, 2, 3, 4], 2)).toStrictEqual([1, 2]);
});

test('should return array if array length is less than number', () => {
  expect(sliceArrayLength([1, 2], 3)).toStrictEqual([1, 2]);
});
