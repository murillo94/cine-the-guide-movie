import { getItem, setItem } from '../asyncStorage';

test('should get item equal false', async () => {
  await setItem('@example', 10);

  const res = await getItem('@example');

  expect(res).toBe(false);
});

test('should get item equal correct value', async () => {
  await setItem('@example', JSON.stringify({ test: 10 }));

  const res = await getItem('@example', 'test');

  expect(res).toBe(true);
});
