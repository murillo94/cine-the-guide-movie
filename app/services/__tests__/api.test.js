import request from '../api';

test('should verify if request movie', async () => {
  const data = await request('movie/424694', {}, true);

  expect(data).toBe(200);
});

test('should verify if request person', async () => {
  const data = await request('person/17838', {}, true);

  expect(data).toBe(200);
});

test('should verify if request movies list', async () => {
  const data = await request('discover/movie', { page: 1 }, true);

  expect(data).toBe(200);
});

test('should verify if request movie search', async () => {
  const data = await request(
    'search/movie',
    { page: 1, query: 'Tomb Raider' },
    true
  );

  expect(data).toBe(200);
});

test('should verify if request movies list with genre X', async () => {
  const data = await request(
    'discover/movie',
    { page: 1, with_genres: '12' },
    true
  );

  expect(data).toBe(200);
});
