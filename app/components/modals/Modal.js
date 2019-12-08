import React from 'react';
import Modal from 'react-native-modal';

const ModalCustom = ({
  children = null,
  isVisible = false,
  style = {},
  onModalShow = () => null,
  onClose = () => null
}) => (
  <Modal
    isVisible={isVisible}
    useNativeDriver
    hideModalContentWhileAnimating
    backdropOpacity={0.5}
    style={style}
    onModalShow={onModalShow}
    onBackdropPress={onClose}
    onBackButtonPress={onClose}
  >
    {children}
  </Modal>
);

export { ModalCustom as Modal };
