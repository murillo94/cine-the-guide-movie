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
          enableSwipeDown={true}
          enableImageZoom={true}
          enablePreload={true}
          saveToLocalByLongPress={false}
          pageAnimateTime={200}
          flipThreshold={10}
          maxOverflow={5}
          swipeDownThreshold={25}
          loadingRender={() => <Spinner color={'#fff'} />}
          onCancel={actionClose}
        />
      </Modal>
    );
  }
}
