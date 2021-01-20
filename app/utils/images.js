export const getImageApi = (path, key = 'uri', width = 'w500') =>
  path ? { [key]: `https://image.tmdb.org/t/p/${width}${path}` } : '';
