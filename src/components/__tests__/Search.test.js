import React from 'react';
import { render } from 'react-native-testing-library';
import Search from '../Search';

test('should verify TextInput', () => {
  const { getAllByType } = render(<Search />);
  const input = getAllByType('TextInput');

  expect(input).toHaveLength(1);
});

test('should verify placeholder', () => {
  const { getByPlaceholder } = render(<Search />);
  const input = getByPlaceholder(/Search/i);

  expect(input.props.placeholder).toBe('Search');
});
