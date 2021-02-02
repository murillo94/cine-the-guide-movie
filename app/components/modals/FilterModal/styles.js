import { StyleSheet } from 'react-native';

import {
  getResponsiveFontSize,
  getResponsiveHeight
} from '../../../utils/dimensions';
import { white, darkBlue } from '../../../utils/colors';

const styles = StyleSheet.create({
  containerModal: {
    backgroundColor: white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: getResponsiveHeight(70)
  },
  containerScroll: {
    padding: 25,
    marginVertical: 25
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: getResponsiveFontSize(2.5),
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
    fontSize: getResponsiveFontSize(2.4),
    color: darkBlue,
    fontWeight: 'bold',
    width: '100%'
  },
  optionTitle: {
    fontSize: getResponsiveFontSize(2.3),
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
  buttonSave: {
    backgroundColor: darkBlue,
    borderWidth: 1,
    borderColor: darkBlue,
    flex: 1
  },
  buttonText: {
    fontSize: getResponsiveFontSize(2.1),
    textAlign: 'center'
  },
  buttonTextSave: {
    color: white,
    fontWeight: 'bold'
  },
  icon: {
    fontSize: getResponsiveFontSize(2.8)
  }
});

export default styles;
