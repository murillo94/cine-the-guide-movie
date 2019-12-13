import { notFound } from '../images';

test('should verify if exist notFound image in path', () => {
  expect(notFound).toBe(1);
});
