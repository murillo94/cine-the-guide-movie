import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import styles from './styles';

const Screen = ({ children }) => (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="dark-content" />
    {children}
  </SafeAreaView>
);

export default Screen;
