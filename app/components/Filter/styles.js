import { StyleSheet } from 'react-native';
import { fontSizeResponsive, height } from '../../utils/Metrics';

const styles = StyleSheet.create({
  containerModal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    height: height * 0.7
  },
  containerScroll: {
    padding: 22
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: fontSizeResponsive(2.5),
    fontWeight: 'bold',
    color: '#47525E',
    padding: 22,
    paddingBottom: 18
  },
  containerSection: {
    marginBottom: 25
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 22,
    paddingLeft: 10,
    paddingRight: 10
  },
  optionSectionTitle: {
    fontSize: fontSizeResponsive(2.4),
    color: '#47525E',
    fontWeight: 'bold',
    width: '100%'
  },
  optionTitle: {
    fontSize: fontSizeResponsive(2.3),
    color: '#47525E',
    width: '80%'
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 22
  },
  button: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 100,
    width: '45%'
  },
  buttonClose: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#47525E'
  },
  buttonSave: {
    backgroundColor: '#47525E'
  },
  buttonText: {
    fontSize: fontSizeResponsive(2.1),
    textAlign: 'center'
  },
  buttonTextSave: {
    color: '#fff',
    fontWeight: 'bold'
  },
  buttonTextClose: {
    color: '#47525E'
  }
});

export default styles;
