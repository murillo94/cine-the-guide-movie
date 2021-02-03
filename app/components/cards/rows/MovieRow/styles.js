import { StyleSheet } from 'react-native';

import { getResponsiveFontSize } from '../../../../utils/dimensions';

import {
  darkBlue,
  blue,
  white,
  lightRed,
  lightYellow,
  lightGreen
} from '../../../../utils/colors';

const styles = StyleSheet.create({
  containerItem: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    marginBottom: 20,
    flexDirection: 'row'
  },
  containerTwoItem: {
    paddingTop: 10,
    marginBottom: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%'
  },
  photo: {
    borderRadius: 8
  },
  item: {
    marginLeft: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1
  },
  textTitle: {
    fontSize: getResponsiveFontSize(2.6),
    color: darkBlue,
    fontWeight: 'bold'
  },
  textTwoTitle: {
    textAlign: 'center',
    fontSize: getResponsiveFontSize(2),
    color: darkBlue,
    fontWeight: 'bold',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 20
  },
  textRow: {
    flexDirection: 'row'
  },
  containerSubTitle: {
    marginTop: 3,
    marginBottom: 3
  },
  containerReview: {
    justifyContent: 'space-between',
    marginRight: 20
  },
  textSmall: {
    fontSize: getResponsiveFontSize(2.1),
    color: blue
  },
  trace: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: getResponsiveFontSize(2.1),
    color: blue
  },
  score: {
    minWidth: '25%',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 100
  },
  low: {
    backgroundColor: lightRed
  },
  mid: {
    backgroundColor: lightYellow
  },
  high: {
    backgroundColor: lightGreen
  },
  textPercent: {
    fontSize: getResponsiveFontSize(2.1),
    fontWeight: '500',
    color: white,
    textAlign: 'center'
  },
  containerModal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  containerError: {
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingMore: {
    marginTop: 20,
    marginBottom: 30
  }
});

export default styles;
