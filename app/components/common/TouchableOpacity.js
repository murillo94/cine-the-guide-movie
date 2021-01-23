import React from 'react';
import { TouchableOpacity } from 'react-native';

const TouchableOpacityCustom = ({
  accessibilityLabel = '',
  activeOpacity = 0.5,
  style = {},
  onPress = () => null,
  children = null,
}) => (
  <TouchableOpacity
    accessibilityRole="button"
    accessibilityLabel={accessibilityLabel}
    activeOpacity={activeOpacity}
    style={style}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);

export { TouchableOpacityCustom as TouchableOpacity };
