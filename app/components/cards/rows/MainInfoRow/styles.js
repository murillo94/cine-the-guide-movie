import { StyleSheet } from 'react-native';

import { blue } from '../../../../styles/Colors';
import { fontSizeResponsive } from '../../../../utils/Metrics';

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
