import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

import Spinner from '../../components/common/Spinner';

import styles from './styles';

export default class WebViewScreen extends Component {
  renderLoading = () => <Spinner style={styles.container} />;

  render() {
    const { key } = this.props.navigation.state.params;

    return (
      <WebView
        source={{ uri: `https://www.youtube.com/embed/${key}?start=0` }}
        startInLoadingState
        renderLoading={this.renderLoading}
      />
    );
  }
}
