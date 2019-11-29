import React from 'react';
import Modal from 'react-native-modal';

const ModalCustom = ({
  isVisible = false,
  onModalShow = () => null,
  onClose = () => null,
  style = {},
  children = null
}) => (
  <Modal
    isVisible={isVisible}
    onModalShow={onModalShow}
    onBackdropPress={onClose}
    onBackButtonPress={onClose}
    hideModalContentWhileAnimating
    useNativeDriver
    backdropOpacity={0.5}
    style={style}
  >
    {children}
  </Modal>
);

export { ModalCustom as Modal }; // eslint-disable-line import/prefer-default-export
