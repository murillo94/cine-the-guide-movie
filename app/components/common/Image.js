import React from 'react';
import { Image } from 'react-native';

const ImageCustom = ({
  accessibilityLabel,
  resizeMode = 'cover',
  uri = '',
  width,
  style
}) => (
  <Image
    accessibilityRole="image"
    accessibilityLabel={accessibilityLabel}
    resizeMode={resizeMode}
    source={{ ...uri }}
    style={[style, { width }]}
  />
);

export { ImageCustom as Image };
