import { StyleSheet } from 'react-native';

import { white, pink, blue, darkBlue } from '../../styles/Colors';
import { fontSizeResponsive, width } from '../../utils/Metrics';

/* eslint-disable react-native/no-color-literals */

const styles = StyleSheet.create({
  buttonShare: {
    paddingRight: 15,
    paddingLeft: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white
  },
  containerMainPhoto: {
    width,
    height: width * 0.6
  },
  mainPhoto: {
    width: '100%',
    height: '100%'
  },
  play: {
    position: 'absolute',
    zIndex: 1,
    bottom: -20,
    right: 15,
    borderRadius: width * 0.32,
    backgroundColor: pink,
    width: width * 0.16,
    height: width * 0.16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerMainPhotoInfo: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  containerBackgroundPhotoInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20
  },
  photoInfo: {
    fontSize: fontSizeResponsive(3.8),
    color: white,
    fontWeight: 'bold'
  },
  photoStar: {
    flexDirection: 'row',
    marginTop: 8
  },
  buttonPlay: {
    marginLeft: 5
  },
  star: {
    marginRight: 5
  },
  containerMovieInfo: {
    margin: 20,
    marginTop: 35
  },
  movieFirstInfo: {
    flexDirection: 'row'
  },
  movieInfo: {
    marginRight: 25
  },
  titleInfo: {
    fontSize: fontSizeResponsive(2.6),
    fontWeight: 'bold',
    color: darkBlue,
    marginBottom: 7
  },
  subTitleInfo: {
    fontSize: fontSizeResponsive(2.1),
    color: blue,
    textAlign: 'justify'
  },
  readMore: {
    color: pink,
    marginTop: 5,
    textAlign: 'right'
  },
  movieSecondInfo: {
    marginTop: 35
  },
  movieLastInfo: {
    marginBottom: 15
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0
  }
});

export default styles;
