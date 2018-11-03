import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { fontSizeResponsive, width } from './../config/Metrics';

export const Error = ({
  style = styles.containerError,
  icon = '',
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

const styles = StyleSheet.create({
  containerError: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: '100%'
  },
  errorInfo: {
    fontSize: fontSizeResponsive(2.6),
    color: '#8190A5',
    textAlign: 'center',
    padding: 25
  },
  loadingButton: {
    padding: 10,
    width: '50%',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#efefef'
  },
  loadingText: {
    fontSize: fontSizeResponsive(2.1),
    color: '#8190A5',
    textAlign: 'center'
  }
});
