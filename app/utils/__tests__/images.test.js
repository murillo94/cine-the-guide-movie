import { getImageApi } from '../images';

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
  expect(getImageApi()).toBe('');
});
