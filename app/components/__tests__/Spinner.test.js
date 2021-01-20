import React from 'react';
import { Platform } from 'react-native';
import { render } from '@testing-library/react-native';

import Spinner from '../common/Spinner';

import { darkBlue, white } from '../../utils/colors';

test('should render default values to iOS', () => {
  const { getByTestId } = render(<Spinner />);
  const spin = getByTestId('activity-indicator');

  expect(spin.props.size).toBe('small');
  expect(spin.props.color).toBe(darkBlue);
});

test('should render default values to Android', () => {
  Platform.OS = 'android';
  const { getByTestId } = render(<Spinner />);
  const spin = getByTestId('activity-indicator');

  expect(spin.props.size).toBe(50);
  expect(spin.props.color).toBe(darkBlue);
});

test('should render custom values', () => {
  Platform.OS = 'android';
  const { getByTestId } = render(<Spinner size={60} color={white} />);
  const spin = getByTestId('activity-indicator');

  expect(spin.props.size).toBe(60);
  expect(spin.props.color).toBe(white);
});
