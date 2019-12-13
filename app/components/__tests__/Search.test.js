import React from 'react';
import { render } from 'react-native-testing-library';

import InputSearch from '../common/InputSearch';

test('should verify if has only one TextInput', () => {
  const { getAllByType } = render(<InputSearch />);
  const input = getAllByType('TextInput');

  expect(input).toHaveLength(1);
});

test('should verify text in placeholder', () => {
  const { getByPlaceholder } = render(<InputSearch />);
  const input = getByPlaceholder(/Search/i);

  expect(input.props.placeholder).toBe('Search');
});
