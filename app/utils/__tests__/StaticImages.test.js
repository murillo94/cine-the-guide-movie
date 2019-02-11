import { notFound } from '../StaticImages';

test('should verify if exist notFound image in path', () => {
  expect(notFound).toBe(1);
});
