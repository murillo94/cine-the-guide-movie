import React from 'react';
import Modal from 'react-native-modal';

const ModalCustom = ({
  isVisible = false,
  onModalShow = () => null,
  actionOpenClose = null,
  style = {},
  children = null
}) => (
  <Modal
    isVisible={isVisible}
    onModalShow={onModalShow}
    onBackdropPress={actionOpenClose}
    onBackButtonPress={actionOpenClose}
    hideModalContentWhileAnimating={true}
    useNativeDriver={true}
    backdropOpacity={0.5}
    style={style}
  >
    {children}
  </Modal>
);

export { ModalCustom as Modal };
