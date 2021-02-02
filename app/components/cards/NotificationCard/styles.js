import { StyleSheet } from 'react-native';

import { getResponsiveFontSize } from '../../../utils/dimensions';

import { white, blue, lightGray } from '../../../utils/colors';

const styles = StyleSheet.create({
  containerError: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: white,
    width: '100%'
  },
  errorInfo: {
    fontSize: getResponsiveFontSize(2.6),
    color: blue,
    textAlign: 'center',
    padding: 25
  },
  loadingButton: {
    padding: 10,
    width: '50%',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: lightGray
  },
  loadingText: {
    fontSize: getResponsiveFontSize(2.1),
    color: blue,
    textAlign: 'center'
  }
});

export default styles;
