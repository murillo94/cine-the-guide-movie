/* eslint-disable global-require */
/* eslint-disable import/prefer-default-export */

export const notFound = require('../assets/images/not_found.png');

export const getImageApi = path =>
  path ? { uri: `https://image.tmdb.org/t/p/w500/${path}` } : notFound;
