import React from 'react';
import { render } from 'react-native-testing-library';

import ImagesModal from '../modals/ImagesModal';

test('should verify if renders images modal', () => {
  const { getByType } = render(<ImagesModal />);
  const modal = getByType('Modal');

  expect(getByType('Modal')).toBe(modal);
});
