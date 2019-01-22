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
    color: '#47525E',
    marginBottom: 7
  },
  titleName: {
    fontSize: fontSizeResponsive(2.6),
    fontWeight: 'bold',
    color: '#47525E',
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
    color: '#8190A5'
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
    padding: 22
  },
  button: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#47525E',
    padding: 10,
    borderRadius: 100,
    width: '100%'
  },
  buttonText: {
    fontSize: fontSizeResponsive(2.1),
    textAlign: 'center',
    color: '#47525E'
  }
});

export default styles;
