import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { width } from '../../config/Metrics';
import styles from './styles';

export const Error = ({
  style = styles.containerError,
  icon = 'alert-octagon',
  textError = 'Something wrong has happened, please try again later.',
  textButton = 'Load',
  action = null
}) => {
  return (
    <View style={style}>
      <Feather name={icon} size={width * 0.2} color="#47525E" />
      <Text style={styles.errorInfo}>{textError}</Text>
      {action && (
        <TouchableOpacity
          style={styles.loadingButton}
          activeOpacity={0.5}
          onPress={action}
        >
          <Text style={styles.loadingText}>{textButton}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
