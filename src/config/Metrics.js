import { Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('screen');

// tam. fonte 20 -> 2.6
// tam. fonte 19 -> 2.5
// tam. fonte 17 -> 2.3
// tam. fonte 15 -> 2.1
export const fontSizeResponsive = (value) => {
  return Math.sqrt((height * height) + (width * width)) * (value / 100);
};