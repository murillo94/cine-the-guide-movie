import { getImageApi, notFound } from '../images';

test('should verify if exist notFound image in path', () => {
  expect(notFound).toBe(1);
});

test('should return path with default values', () => {
  expect(getImageApi('path.teste')).toStrictEqual({
    uri: 'https://image.tmdb.org/t/p/w500path.teste'
  });
});

test('should return path', () => {
  expect(getImageApi('path.teste', 'key', 'w200')).toStrictEqual({
    key: 'https://image.tmdb.org/t/p/w200path.teste'
  });
});

test('should return not found image', () => {
  expect(getImageApi()).toBe(1);
});
