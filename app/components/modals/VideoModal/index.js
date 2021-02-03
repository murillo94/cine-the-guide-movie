import React, { forwardRef, useRef, useState } from 'react';
import { WebView } from 'react-native-webview';

import { Modal } from '../Modal';
import Spinner from '../../common/Spinner';

import { getResponsiveHeight } from '../../../utils/dimensions';

import styles from './styles';

const Loading = () => <Spinner style={styles.container} />;

const VideoModal = forwardRef(({ keyId, onVisible, style }, ref) => {
  const webViewRef = useRef(null);
  const initialHeight = getResponsiveHeight(100);
  const [height, setHeight] = useState(initialHeight - 150);

  const handleLayout = ({ layout }) => {
    setHeight(layout.height);
  };

  return (
    <Modal ref={ref} onClose={onVisible} style={style} onLayout={handleLayout}>
      <WebView
        ref={webViewRef}
        source={{ uri: `https://www.youtube.com/embed/${keyId}?start=0` }}
        startInLoadingState
        renderLoading={Loading}
        style={{ height }}
      />
    </Modal>
  );
});

export default VideoModal;
