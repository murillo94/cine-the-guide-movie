import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';

import { TouchableOpacity } from '../common/TouchableOpacity';

test('should verify if calls touchableOpacity', () => {
  const onPressMock = jest.fn();
  const { getByTestId } = render(
    <TouchableOpacity onPress={onPressMock} testID="act1" />
  );

  fireEvent.press(getByTestId('act1'));

  expect(onPressMock).toHaveBeenCalled();
  expect(onPressMock).toHaveBeenCalledTimes(1);
});
