import React from 'react';
import { Platform, ActivityIndicator, View } from 'react-native';

const Spinner = ({ style = {}, size = 50, color = '#47525E' }) => (
  <View style={style}>
    {Platform.OS === 'ios' ? (
      <ActivityIndicator size="small" color={color} />
    ) : (
      <ActivityIndicator size={size} color={color} />
    )}
  </View>
);

export default Spinner;
