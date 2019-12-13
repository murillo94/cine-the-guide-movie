/* eslint-disable global-require */
export const notFound = require('../assets/images/not_found.png');

export const getImageApi = (path, key = 'uri', width = 'w500') =>
  path ? { [key]: `https://image.tmdb.org/t/p/${width}/${path}` } : notFound;
