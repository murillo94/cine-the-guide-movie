import { getAvarageRating } from '../rating';

test('should return exact rating', () => {
  expect(getAvarageRating(9.9)).toStrictEqual([0, 1, 2, 3, 4]);
  expect(getAvarageRating(9.5)).toStrictEqual([0, 1, 2, 3, 4]);
  expect(getAvarageRating(9.4)).toStrictEqual([0, 1, 2, 3]);
});

test('should return empty rating', () => {
  expect(getAvarageRating(0)).toStrictEqual([]);
  expect(getAvarageRating(3.5)).toStrictEqual([]);
});
