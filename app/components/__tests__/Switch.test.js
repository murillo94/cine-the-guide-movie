import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';

import { Switch } from '../common/Switch';

test('should verify if calls switch', () => {
  const onPressMock = jest.fn();
  const { getByTestId } = render(
    <Switch onPress={onPressMock} testID="act1" />
  );

  fireEvent.press(getByTestId('act1'));

  expect(onPressMock).toHaveBeenCalled();
  expect(onPressMock).toHaveBeenCalledTimes(1);
});
