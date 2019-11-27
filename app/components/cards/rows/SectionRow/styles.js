import { StyleSheet } from 'react-native';

import { fontSizeResponsive } from '../../../../utils/Metrics';

import { darkBlue } from '../../../../styles/Colors';

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
    fontSize: fontSizeResponsive(2.6),
    fontWeight: 'bold',
    color: darkBlue,
    marginBottom: 7
  }
});

export default styles;
