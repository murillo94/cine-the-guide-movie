import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { TouchableOpacity } from '../common/TouchableOpacity';

test('should verify if calls touchableOpacity', () => {
  const onPress = jest.fn();
  const { getByA11yRole } = render(<TouchableOpacity onPress={onPress} />);

  fireEvent.press(getByA11yRole('button'));

  expect(onPress).toHaveBeenCalledTimes(1);
});

test('should verify button with label', () => {
  const onPress = jest.fn();
  const { getByA11yLabel } = render(
    <TouchableOpacity onPress={onPress} accessibilityLabel="Change button" />
  );

  expect(getByA11yLabel('Change button')).toBeTruthy();
});
