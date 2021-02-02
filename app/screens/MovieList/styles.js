import { StyleSheet } from 'react-native';

import { getResponsiveFontSize } from '../../utils/dimensions';

import { white, lightGray, darkBlue } from '../../utils/colors';

const styles = StyleSheet.create({
  buttonFilter: {
    paddingRight: 15,
    paddingLeft: 20
  },
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'center'
  },
  containerList: {
    justifyContent: 'center',
    flex: 1
  },
  containerMainText: {
    paddingVertical: 25,
    paddingHorizontal: 20
  },
  textMain: {
    fontSize: getResponsiveFontSize(3),
    fontWeight: 'bold',
    color: darkBlue,
    width: '80%'
  },
  buttonGrid: {
    position: 'absolute',
    right: 12,
    top: 18,
    padding: 8,
    borderRadius: 100
  },
  buttonGridActive: {
    backgroundColor: lightGray
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  loadingMore: {
    paddingTop: 20,
    paddingBottom: 50,
    justifyContent: 'center',
    alignItems: 'center'
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
    color: darkBlue,
    textAlign: 'center'
  }
});

export default styles;
