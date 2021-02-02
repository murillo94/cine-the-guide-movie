import { StyleSheet } from 'react-native';

import { getResponsiveFontSize } from '../../../../utils/dimensions';

import { darkBlue } from '../../../../utils/colors';

const styles = StyleSheet.create({
  container: {
    marginTop: 35
  },
  containerLast: {
    marginBottom: 15
  },
  containerSubTitle: {
    marginRight: 25
  },
  title: {
    fontSize: getResponsiveFontSize(2.6),
    fontWeight: 'bold',
    color: darkBlue,
    marginBottom: 7
  }
});

export default styles;
