import { StyleSheet } from 'react-native';

import { fontSizeResponsive } from '../../../../utils/Metrics';

import { blue } from '../../../../styles/Colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  description: {
    fontSize: fontSizeResponsive(2.1),
    color: blue,
    textAlign: 'justify'
  }
});

export default styles;
