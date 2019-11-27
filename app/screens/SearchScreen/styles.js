import { StyleSheet } from 'react-native';

import { fontSizeResponsive } from '../../utils/Metrics';

import { white, darkBlue } from '../../styles/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
  containerList: {
    marginTop: 25
  },
  item: {
    alignItems: 'center',
    marginBottom: 25
  },
  itemText: {
    fontSize: fontSizeResponsive(2.5),
    color: darkBlue,
    textAlign: 'center'
  }
});

export default styles;
