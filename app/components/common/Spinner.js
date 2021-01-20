import React from 'react';
import { Platform, ActivityIndicator, View } from 'react-native';

import { darkBlue } from '../../utils/colors';

const Spinner = ({ style = {}, size = 50, color = darkBlue }) => (
  <View style={style}>
    {Platform.OS === 'ios' ? (
      <ActivityIndicator
        testID="activity-indicator"
        size="small"
        color={color}
      />
    ) : (
      <ActivityIndicator
        testID="activity-indicator"
        size={size}
        color={color}
      />
    )}
  </View>
);

export default Spinner;
