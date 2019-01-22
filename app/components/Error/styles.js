import { StyleSheet } from 'react-native';
import { fontSizeResponsive } from '../../utils/Metrics';

const styles = StyleSheet.create({
  containerError: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: '100%'
  },
  errorInfo: {
    fontSize: fontSizeResponsive(2.6),
    color: '#8190A5',
    textAlign: 'center',
    padding: 25
  },
  loadingButton: {
    padding: 10,
    width: '50%',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#efefef'
  },
  loadingText: {
    fontSize: fontSizeResponsive(2.1),
    color: '#8190A5',
    textAlign: 'center'
  }
});

export default styles;
