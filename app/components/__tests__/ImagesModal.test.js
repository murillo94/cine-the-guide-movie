import React from 'react';
import { render } from '@testing-library/react-native';

import ImagesModal from '../modals/ImagesModal';

test('should verify if renders images modal', () => {
  const { getByTestId } = render(<ImagesModal />);

  expect(getByTestId('modal')).toBeTruthy();
});
