const api = 'https://api.themoviedb.org/3';

// The api key is ok to be exposed, it's free and only for self study. I know that the corretly way is to store in a .env file.
const key = '024d69b581633d457ac58359146c43f6';

const defaultContent = {
  api_key: key,
  language: 'en-US'
};

function queryString(obj) {
  return Object.entries(obj)
    .map(([key, val]) => `${key}=${val}`)
    .join('&');
}

export default async function request(url, content = {}) {
  const obj = { ...defaultContent, ...content };

  let response = await fetch(`${api}/${url}?${queryString(obj)}`);
  let data = await response.json();

  return data;
}
