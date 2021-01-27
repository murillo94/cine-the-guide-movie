import React from 'react';
import { render } from '@testing-library/react-native';

import MovieRow from '../cards/rows/MovieRow';

const props = {
  item: {
    poster_path: '',
    original_language: 'ak',
    vote_average: 10,
    genre_ids: '',
    type: '',
    isSearch: false,
    title: 'Title'
  },
  numColumns: 1
};

test('should verify if has only one Image in list mode', () => {
  const { getByA11yRole, getByText } = render(<MovieRow {...props} />);

  expect(getByA11yRole('imagebutton')).toBeTruthy();
  expect(getByText('Title')).toBeTruthy();
  expect(getByText('10')).toBeTruthy();
  expect(getByText('Akan')).toBeTruthy();
});

test('should verify if has only one Image in columns mode', () => {
  const { getByA11yRole, queryByText } = render(
    <MovieRow {...props} numColumns={2} />
  );

  expect(getByA11yRole('imagebutton')).toBeTruthy();
  expect(queryByText('Title')).toBeTruthy();
  expect(queryByText('10')).not.toBeTruthy();
  expect(queryByText('Akan')).not.toBeTruthy();
});
