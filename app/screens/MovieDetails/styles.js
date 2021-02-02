import { StyleSheet } from 'react-native';

import { getResponsiveFontSize } from '../../utils/dimensions';

import { white, pink, blue } from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white
  },
  buttonShare: {
    paddingRight: 15,
    paddingLeft: 20
  },
  containerMovieInfo: {
    margin: 20,
    marginTop: 35
  },
  subTitleInfo: {
    fontSize: getResponsiveFontSize(2.1),
    color: blue,
    textAlign: 'justify'
  },
  readMore: {
    color: pink,
    marginTop: 5,
    textAlign: 'right'
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0
  }
});

export default styles;
