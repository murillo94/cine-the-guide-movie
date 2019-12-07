import isoLanguage from '../iso.json';

test('should verify the file type', () => {
  expect(typeof isoLanguage).toBe('object');
});

test('should verify the object length', () => {
  const { length } = Object.keys(isoLanguage);

  expect(length).toBe(508);
});

test('should verify the object properties', () => {
  for (const prop in isoLanguage) {
    if (isoLanguage.hasOwnProperty(prop)) {
      expect(typeof prop).toBe('string');
    }
  }
});
