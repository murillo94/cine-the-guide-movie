import React from 'react';
import { render } from 'react-native-testing-library';

import NotificationCard from '../cards/NotificationCard';

test('should verify the error message default', () => {
  const { queryByText } = render(<NotificationCard />);
  const message = queryByText(
    'Something wrong has happened, please try again later.'
  );

  expect(message).not.toBeNull();
});
