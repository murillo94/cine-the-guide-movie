import React from 'react';
import { WebView } from 'react-native-webview';

import Screen from '../../components/common/Screen';
import Spinner from '../../components/common/Spinner';

import styles from './styles';

const Loading = () => <Spinner style={styles.container} />;

const MovieVideo = ({ route }) => {
  const { key } = route.params;

  return (
    <Screen>
      <WebView
        source={{ uri: `https://www.youtube.com/embed/${key}?start=0` }}
        startInLoadingState
        renderLoading={Loading}
      />
    </Screen>
  );
};

export default MovieVideo;
