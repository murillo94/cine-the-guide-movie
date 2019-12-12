import { StyleSheet } from 'react-native';

import { fontSizeResponsive, height } from '../../../utils/dimensions';

import { white, darkBlue, blue } from '../../../utils/colors';

const styles = StyleSheet.create({
  containerModal: {
    backgroundColor: white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: height * 0.7
  },
  containerScroll: {
    padding: 22,
    paddingTop: 0,
    marginTop: 22
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
    fontSize: fontSizeResponsive(2.4),
    fontWeight: 'bold',
    color: darkBlue,
    marginBottom: 7
  },
  titleName: {
    fontSize: fontSizeResponsive(2.6),
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
    fontSize: fontSizeResponsive(2.1),
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
  },
  containerRow: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 22
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: white,
    borderWidth: 1,
    borderColor: darkBlue,
    paddingVertical: 9.1,
    borderRadius: 100,
    width: '60%'
  },
  icon: {
    fontSize: fontSizeResponsive(2.8)
  }
});

export default styles;
