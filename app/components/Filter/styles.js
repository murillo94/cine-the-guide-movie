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
    paddingHorizontal: 10
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 22
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100
  },
  buttonClose: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#47525E',
    paddingVertical: 9.1,
    flex: 0.23
  },
  buttonSave: {
    backgroundColor: '#47525E',
    borderWidth: 1,
    borderColor: '#47525E',
    flex: 0.67
  },
  buttonText: {
    fontSize: fontSizeResponsive(2.1),
    textAlign: 'center'
  },
  buttonTextSave: {
    color: '#fff',
    fontWeight: 'bold'
  },
  icon: {
    fontSize: fontSizeResponsive(2.8)
  }
});

export default styles;
