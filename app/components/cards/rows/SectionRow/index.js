import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

const SectionRow = ({
  title = '',
  isLast = false,
  hasSubTitle = false,
  children = null
}) => (
  <View
    style={[
      !hasSubTitle && styles.container,
      isLast && styles.containerLast,
      hasSubTitle && styles.containerSubTitle
    ]}
  >
    <Text style={styles.title}>{title}</Text>
    {children}
  </View>
);

export default SectionRow;
