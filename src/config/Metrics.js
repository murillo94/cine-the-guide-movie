import { Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('screen');

export const fontSizeResponsive = value => {
  const tempHeight = (16 / 9) * width;
  return (
    Math.sqrt(Math.pow(tempHeight, 2) + Math.pow(width, 2)) * (value / 100)
  );
};
