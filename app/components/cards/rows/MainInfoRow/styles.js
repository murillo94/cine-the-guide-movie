import { StyleSheet } from 'react-native';

import { getResponsiveFontSize } from '../../../../utils/dimensions';

import { blue } from '../../../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  description: {
    fontSize: getResponsiveFontSize(2.1),
    color: blue,
    textAlign: 'justify'
  }
});

export default styles;
