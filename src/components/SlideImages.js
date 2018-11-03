import React from 'react';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

import { Spinner } from './Spinner';

export default class SlideImages extends React.PureComponent {
  render() {
    const { showImage, images, actionClose } = this.props;
    return (
      <Modal
        visible={showImage}
        transparent={true}
        onRequestClose={actionClose}
      >
        <ImageViewer
          imageUrls={images}
          index={0}
          maxOverflow={60}
          loadingRender={() => <Spinner color={'#fff'} />}
          enableSwipeDown={true}
          enableImageZoom={true}
          enablePreload={true}
          saveToLocalByLongPress={false}
          onCancel={actionClose}
        />
      </Modal>
    );
  }
}
