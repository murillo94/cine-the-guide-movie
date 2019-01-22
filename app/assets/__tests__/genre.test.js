import genre from '../genre/ids.json';

test('should verify the file type', () => {
  expect(typeof genre).toBe('object');
});
