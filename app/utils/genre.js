import genre from '../data/genres.json';

export const convertTypeWithGenre = (arr, type, isSearch) => {
  if (type === 'normal' || isSearch) {
    if (arr.length > 1) return `${genre[arr[0]].name}, ${genre[arr[1]].name}`;
    return arr.length !== 0 ? `${genre[arr[0]].name}` : '';
  }

  return arr.length !== 0 && type !== genre[arr[0]].name
    ? `${type}, ${genre[arr[0]].name}`
    : type;
};

export const convertToGenres = (genre, messageNotFound = 'Uninformed') =>
  genre.length > 0
    ? genre.length > 1
      ? `${genre[0].name}, ${genre[1].name}`
      : genre[0].name
    : messageNotFound;
