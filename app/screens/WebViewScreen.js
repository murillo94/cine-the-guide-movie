import React, { Component } from 'react';
import { WebView } from 'react-native';

import { Spinner } from './../components/Spinner';

export default class WebViewScreen extends Component {
  renderLoading = () => (
    <Spinner
      style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center' }}
    />
  );

  render() {
    const key = `https://www.youtube.com/embed/${
      this.props.navigation.state.params.key
    }?start=0`;
    return (
      <WebView
        useWebKit={true}
        source={{ uri: key }}
        startInLoadingState
        renderLoading={this.renderLoading}
      />
    );
  }
}
