import { StyleSheet } from 'react-native';

import { fontSizeResponsive, height } from '../../../utils/dimensions';

import { white, darkBlue } from '../../../utils/colors';

const styles = StyleSheet.create({
  containerModal: {
    backgroundColor: white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: height * 0.7
  },
  containerScroll: {
    padding: 22
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: fontSizeResponsive(2.5),
    fontWeight: 'bold',
    color: darkBlue,
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
    color: darkBlue,
    fontWeight: 'bold',
    width: '100%'
  },
  optionTitle: {
    fontSize: fontSizeResponsive(2.3),
    color: darkBlue,
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
    backgroundColor: white,
    borderWidth: 1,
    borderColor: darkBlue,
    paddingVertical: 9.1,
    flex: 0.23
  },
  buttonSave: {
    backgroundColor: darkBlue,
    borderWidth: 1,
    borderColor: darkBlue,
    flex: 0.67
  },
  buttonText: {
    fontSize: fontSizeResponsive(2.1),
    textAlign: 'center'
  },
  buttonTextSave: {
    color: white,
    fontWeight: 'bold'
  },
  icon: {
    fontSize: fontSizeResponsive(2.8)
  }
});

export default styles;
