import genre from '../genres.json';

test('should verify the file type', () => {
  expect(typeof genre).toBe('object');
});

test('should verify the object length', () => {
  const { length } = Object.keys(genre);

  expect(length).toBe(19);
});

test('should verify the object properties', () => {
  for (const prop in genre) {
    if (genre.hasOwnProperty(prop)) {
      expect(typeof Number(prop)).toBe('number');
    }
  }
});
