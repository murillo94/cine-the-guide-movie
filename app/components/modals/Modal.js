import React, { forwardRef } from 'react';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';

const ModalCustom = forwardRef(
  (
    {
      children = null,
      style = {},
      onModalShow = () => null,
      onClose = () => null
    },
    ref
  ) => (
    <Portal>
      <Modalize
        ref={ref}
        useNativeDriver
        rootStyle={style}
        adjustToContentHeight
        onOpened={onModalShow}
        onOverlayPress={onClose}
        onBackButtonPress={onClose}
      >
        {children}
      </Modalize>
    </Portal>
  )
);

export { ModalCustom as Modal };
