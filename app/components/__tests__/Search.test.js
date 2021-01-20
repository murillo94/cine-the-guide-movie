import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import InputSearch from '../common/InputSearch';

test('should verify text in placeholder', () => {
  const { getByA11yRole } = render(<InputSearch />);
  const input = getByA11yRole('search');

  expect(input).toBeTruthy();
});

test('should change value', () => {
  const { getByPlaceholderText, getByDisplayValue } = render(<InputSearch />);
  const input = getByPlaceholderText(/Search/i);

  fireEvent.changeText(input, 'Test');

  expect(getByDisplayValue('Test')).toBeTruthy();
});

test('should clear value', () => {
  const { getByPlaceholderText, queryByDisplayValue, getByA11yRole } = render(
    <InputSearch />
  );
  const input = getByPlaceholderText(/Search/i);

  fireEvent.changeText(input, 'Test');

  expect(queryByDisplayValue('Test')).toBeTruthy();

  fireEvent.press(getByA11yRole('button'));

  expect(queryByDisplayValue('Test')).not.toBeTruthy();
});
