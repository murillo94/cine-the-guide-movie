import React, { Component } from 'react';
import { Modal, View, Text } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const images = [
  {
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
  },
  {
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
  }
];

export default class SlideImages extends Component {
  renderLoading = () => (
    <View>
      <Text>Loading...</Text>
    </View>
  );

  render() {
    return (
      <Modal
        visible={true}
        transparent={true}
        onRequestClose={() => this.setState({ modalVisible: false })}
      >
        <ImageViewer
          imageUrls={images}
          index={0}
          loadingRender={() => this.renderLoading}
          enableSwipeDown={true}
        />
      </Modal>
    );
  }
}
