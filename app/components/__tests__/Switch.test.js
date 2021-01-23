import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { Switch } from '../common/Switch';

import { gray, darkBlue } from '../../utils/colors';

test('should verify if calls switch', () => {
  const onValueChange = jest.fn();
  const { getByA11yRole } = render(<Switch onValueChange={onValueChange} />);
  const swtichButton = getByA11yRole('switch');

  expect(swtichButton.props.onTintColor).toBe(darkBlue);
  expect(swtichButton.props.tintColor).toBe(gray);

  fireEvent(swtichButton, 'onValueChange', true);

  expect(onValueChange).toHaveBeenCalledTimes(1);
});

test('should verify switch with label', () => {
  const onValueChange = jest.fn();
  const { getByA11yLabel } = render(
    <Switch onValueChange={onValueChange} accessibilityLabel="Change value" />
  );

  expect(getByA11yLabel('Change value')).toBeTruthy();
});
