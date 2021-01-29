import React from 'react';
import { render } from '@testing-library/react-native';

import ImagesModal from '../modals/ImagesModal';

test('should verify if renders images modal', () => {
  const { container } = render(<ImagesModal />);

  expect(container).toBeTruthy();
});
