/* eslint-disable global-require */
export const notFound = require('../assets/images/not_found.png');

export const getImageApi = (path, width = 'w500') =>
  path ? { uri: `https://image.tmdb.org/t/p/${width}/${path}` } : notFound;
