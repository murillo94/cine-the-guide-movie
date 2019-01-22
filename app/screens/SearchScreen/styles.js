import { StyleSheet } from 'react-native';
import { fontSizeResponsive } from '../../utils/Metrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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
    color: '#47525E',
    textAlign: 'center'
  }
});

export default styles;
