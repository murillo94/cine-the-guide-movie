/* eslint-disable global-require */
import React from 'react';
import { Image } from 'react-native';

export const notFound = require('../../assets/images/not_found.png');

const ImageCustom = ({
  accessibilityRole = 'image',
  accessibilityLabel = '',
  resizeMode = 'cover',
  uri = '',
  width,
  height,
  style
}) => {
  const image = uri ? { ...uri } : notFound;

  return (
    <Image
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      resizeMode={resizeMode}
      source={image}
      style={[style, { width, height }]}
    />
  );
};

export { ImageCustom as Image };
