import React from 'react';
import { TouchableOpacity } from 'react-native';

const TouchableOpacityCustom = ({
  activeOpacity = 0.5,
  style = {},
  onPress = () => null,
  children = null
}) => (
  <TouchableOpacity
    activeOpacity={activeOpacity}
    style={style}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);

export { TouchableOpacityCustom as TouchableOpacity };
