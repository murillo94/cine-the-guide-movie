import language from '../language/iso.json';

test('should verify the file type', () => {
  expect(typeof language).toBe('object');
});

test('should verify the object length', () => {
  const { length } = Object.keys(language);

  expect(length).toBe(508);
});

test('should verify the object properties', () => {
  for (const prop in language) {
    if (language.hasOwnProperty(prop)) {
      expect(typeof prop).toBe('string');
    }
  }
});
