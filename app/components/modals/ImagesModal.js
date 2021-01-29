import React from 'react';
import ImageView from 'react-native-image-viewing';

const ImagesModal = ({
  showImage = false,
  images = [],
  onClose = () => null
}) => (
  <ImageView
    images={images}
    imageIndex={0}
    visible={showImage}
    onRequestClose={onClose}
  />
);

export default ImagesModal;
