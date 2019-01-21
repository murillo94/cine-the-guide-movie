import language from '../language/iso.json';

test('should verify the file type', () => {
  expect(typeof language).toBe('object');
});
