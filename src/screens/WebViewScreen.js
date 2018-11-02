import React, { Component } from 'react';
import { Platform, ActivityIndicator, View, WebView } from 'react-native';

export default class WebViewScreen extends Component {
  renderLoading = () => (
    <View
      style={{ flex: 1, backgroundColor: '#ffffff', justifyContent: 'center' }}
    >
      {Platform.OS === 'ios' ? (
        <ActivityIndicator size="small" color="#47525E" />
      ) : (
        <ActivityIndicator size={50} color="#47525E" />
      )}
    </View>
  );

  render() {
    const key = `https://www.youtube.com/embed/${
      this.props.navigation.state.params.key
    }?start=0`;
    return (
      <WebView
        source={{ uri: key }}
        startInLoadingState
        renderLoading={this.renderLoading}
      />
    );
  }
}
