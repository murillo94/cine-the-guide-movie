import React, { Component } from 'react';
import { WebView } from 'react-native';

import Spinner from './../components/Spinner';

import { white } from './../styles/Colors';

export default class WebViewScreen extends Component {
  renderLoading = () => (
    <Spinner
      style={{ flex: 1, backgroundColor: white, justifyContent: 'center' }}
    />
  );

  render() {
    const { key } = this.props.navigation.state.params;

    return (
      <WebView
        useWebKit={true}
        source={{ uri: `https://www.youtube.com/embed/${key}?start=0` }}
        startInLoadingState
        renderLoading={this.renderLoading}
      />
    );
  }
}
