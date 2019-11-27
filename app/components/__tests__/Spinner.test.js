import React from 'react';
import { render } from 'react-native-testing-library';

import Spinner from '../common/Spinner';

test('should verify if renders spinner', () => {
  const { getByType } = render(<Spinner />);
  const spin = getByType('ActivityIndicator');

  expect(getByType('ActivityIndicator')).toBe(spin);
});
