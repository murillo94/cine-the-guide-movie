import React from 'react';
import { render } from 'react-native-testing-library';

import PersonRow from '../cards/rows/PersonRow';

const props = {
  item: {
    profile_path: '',
    poster_path: ''
  }
};

test('should verify if has only one Image in character mode', () => {
  const { getAllByType } = render(<PersonRow {...props} type="character" />);
  const image = getAllByType('Image');

  expect(image).toHaveLength(1);
});

test('should verify if has only one Image in production mode', () => {
  const { getAllByType } = render(<PersonRow {...props} />);
  const image = getAllByType('Image');

  expect(image).toHaveLength(1);
});

test('should verify if title text has numberOfLines equal to 1 in character mode', () => {
  const { getAllByType } = render(<PersonRow {...props} type="character" />);
  const [title, name] = getAllByType('Text');

  expect(title.props.numberOfLines).toBe(1);
  expect(name.props.numberOfLines).toBe(1);
});

test('should verify if title text has numberOfLines equal to 2 in production mode', () => {
  const { getAllByType } = render(<PersonRow {...props} />);
  const [name] = getAllByType('Text');

  expect(name.props.numberOfLines).toBe(2);
});
