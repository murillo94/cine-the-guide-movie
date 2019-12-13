import { StyleSheet } from 'react-native';

import { fontSizeResponsive } from '../../../../utils/dimensions';

import { blue } from '../../../../utils/colors';

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
