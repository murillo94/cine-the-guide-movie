import React from 'react';
import { Platform, ActivityIndicator, View } from 'react-native';

import { darkBlue } from '../../styles/Colors';

const Spinner = ({ style = {}, size = 50, color = darkBlue }) => (
  <View style={style}>
    {Platform.OS === 'ios' ? (
      <ActivityIndicator size="small" color={color} />
    ) : (
      <ActivityIndicator size={size} color={color} />
    )}
  </View>
);

export default Spinner;
