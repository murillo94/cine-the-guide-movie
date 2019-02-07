import React from 'react';
import { render } from 'react-native-testing-library';
import SlideImages from '../SlideImages';

test('should verify if renders slideImages', () => {
  const { getByType } = render(<SlideImages />);
  const modal = getByType('Modal');

  expect(getByType('Modal')).toBe(modal);
});
