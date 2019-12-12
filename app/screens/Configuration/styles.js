import { StyleSheet } from 'react-native';

import { fontSizeResponsive } from '../../utils/dimensions';

import { white, darkBlue, blue, lightGray } from '../../utils/colors';

const styles = StyleSheet.create({
  bgWhite: {
    backgroundColor: white
  },
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 20,
    paddingTop: 25
  },
  section: {
    marginBottom: 40
  },
  sectionText: {
    marginBottom: 15,
    fontWeight: 'bold',
    fontSize: fontSizeResponsive(3)
  },
  item: {
    backgroundColor: white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 25,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: lightGray
  },
  itemText: {
    fontSize: fontSizeResponsive(2.5),
    color: darkBlue,
    width: '80%'
  },
  itemTextVersion: {
    fontSize: fontSizeResponsive(2.5),
    color: blue
  },
  itemNoBorder: {
    borderBottomWidth: 0
  },
  icon: {
    marginRight: 5
  }
});

export default styles;
