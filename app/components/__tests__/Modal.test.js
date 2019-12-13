import React from 'react';
import { View } from 'react-native';
import { render } from 'react-native-testing-library';

import { Modal } from '../modals/Modal';

test('should verify if renders modal', () => {
  const { getByType } = render(
    <Modal>
      <View />
    </Modal>
  );
  const modal = getByType('Modal');

  expect(getByType('Modal')).toBe(modal);
});
