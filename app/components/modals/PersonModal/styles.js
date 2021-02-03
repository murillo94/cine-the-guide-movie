import { StyleSheet } from 'react-native';

import {
  getResponsiveFontSize,
  getResponsiveHeight
} from '../../../utils/dimensions';
import { white, darkBlue, blue } from '../../../utils/colors';

const styles = StyleSheet.create({
  containerModal: {
    backgroundColor: white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: getResponsiveHeight(70)
  },
  containerScroll: {
    padding: 25,
    paddingTop: 0,
    marginVertical: 25
  },
  containerCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  photo: {
    borderRadius: 8
  },
  containerMainText: {
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  titleInfo: {
    fontSize: getResponsiveFontSize(2.4),
    fontWeight: 'bold',
    color: darkBlue,
    marginBottom: 7
  },
  titleName: {
    fontSize: getResponsiveFontSize(2.6),
    fontWeight: 'bold',
    color: darkBlue,
    marginBottom: 10
  },
  textItens: {
    marginLeft: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  textSmall: {
    fontSize: getResponsiveFontSize(2.1),
    color: blue
  },
  textJustify: {
    textAlign: 'justify'
  },
  textLineHeight: {
    lineHeight: 20
  },
  containerTitleMargin: {
    marginBottom: 7
  }
});

export default styles;
