import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import NotificationCard from '../cards/NotificationCard';

test('should show the error message default', () => {
  const { getByText } = render(<NotificationCard />);
  const message = getByText(
    'Something wrong has happened, please try again later.'
  );

  expect(message).toBeTruthy();
});

test('should show the custom error message default', () => {
  const { getByText } = render(
    <NotificationCard textError="Please try again later." />
  );
  const message = getByText('Please try again later.');

  expect(message).toBeTruthy();
});

test('should show the button text', () => {
  const onPress = jest.fn();
  const { getByText } = render(
    <NotificationCard textButton="Enter" onPress={onPress} />
  );

  expect(getByText('Enter')).toBeTruthy();
});

test('should press button', () => {
  const onPress = jest.fn();
  const { getByText } = render(<NotificationCard onPress={onPress} />);

  fireEvent.press(getByText('Load'));

  expect(onPress).toHaveBeenCalledTimes(1);
});
