import React from 'react';
import { Platform, ActivityIndicator, View } from 'react-native';

export const Spinner = ({ size = 50, style = {}, color = '#47525E' }) => {
  return (
    <View style={style}>
      {Platform.OS === 'ios' ? (
        <ActivityIndicator size="small" color={color} />
      ) : (
        <ActivityIndicator size={size} color={color} />
      )}
    </View>
  );
};
