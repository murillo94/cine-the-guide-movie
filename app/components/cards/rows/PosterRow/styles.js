import { StyleSheet } from 'react-native';

import {
  getResponsiveFontSize,
  getResponsiveWidth
} from '../../../../utils/dimensions';

import { white, pink } from '../../../../utils/colors';

/* eslint-disable react-native/no-color-literals */

const styles = StyleSheet.create({
  containerMainPhoto: {
    width: '100%',
    height: getResponsiveWidth(60)
  },
  play: {
    position: 'absolute',
    zIndex: 1,
    bottom: -20,
    right: 15,
    borderRadius: getResponsiveWidth(32),
    backgroundColor: pink,
    width: getResponsiveWidth(16),
    height: getResponsiveWidth(16),
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
    fontSize: getResponsiveFontSize(3.8),
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
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  star: {
    marginRight: 5
  }
});

export default styles;
