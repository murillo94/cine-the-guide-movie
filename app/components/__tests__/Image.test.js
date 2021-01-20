import React from 'react';
import { render } from '@testing-library/react-native';

import { Image, notFound } from '../common/Image';

test('should verify if exist notFound image in path', () => {
  expect(notFound).toBe(1);
});

test('should return default values', () => {
  const { getByA11yRole } = render(<Image />);

  const image = getByA11yRole('image');

  expect(image.props.resizeMode).toBe('cover');
});
