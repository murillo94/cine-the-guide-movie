import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

import { Modal } from '../modals/Modal';

test('should verify if renders modal', () => {
  const { getByText } = render(
    <Modal>
      <Text>Test</Text>
    </Modal>
  );

  expect(getByText('Test')).toBeTruthy();
});
