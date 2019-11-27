import React from 'react';
import { WebView } from 'react-native-webview';

import Spinner from '../../components/common/Spinner';

import styles from './styles';

const WebViewScreen = ({ navigation }) => {
  renderLoading = () => <Spinner style={styles.container} />;

  const { key } = navigation.state.params;

  return (
    <WebView
      source={{ uri: `https://www.youtube.com/embed/${key}?start=0` }}
      startInLoadingState
      renderLoading={renderLoading}
    />
  );
};

export default WebViewScreen;
