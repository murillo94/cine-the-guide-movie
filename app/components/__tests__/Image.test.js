import React from 'react';
import { render } from '@testing-library/react-native';

import { Image } from '../common/Image';

test('should return default values', () => {
  const { getByA11yRole } = render(<Image />);

  const image = getByA11yRole('image');

  expect(image.props.resizeMode).toBe('cover');
});
