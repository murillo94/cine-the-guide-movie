import React from 'react';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

import Spinner from '../common/Spinner';

import { white } from '../../utils/colors';

const ImagesModal = ({ showImage = false, images = [], onClose = null }) => (
  <Modal visible={showImage} transparent onRequestClose={onClose}>
    <ImageViewer
      imageUrls={images}
      enableSwipeDown
      enableImageZoom
      enablePreload
      saveToLocalByLongPress={false}
      pageAnimateTime={200}
      flipThreshold={10}
      maxOverflow={5}
      swipeDownThreshold={25}
      loadingRender={() => <Spinner color={white} />}
      onCancel={onClose}
    />
  </Modal>
);

export default ImagesModal;
