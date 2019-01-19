import { StyleSheet } from 'react-native';

import { fontSizeResponsive } from '../../config/Metrics';

const styles = StyleSheet.create({
  bgWhite: {
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 25,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3'
  },
  itemText: {
    fontSize: fontSizeResponsive(2.5),
    color: '#47525E',
    width: '80%'
  },
  itemTextVersion: {
    fontSize: fontSizeResponsive(2.5),
    color: '#8190A5'
  },
  itemNoBorder: {
    borderBottomWidth: 0
  },
  icon: {
    marginRight: 5
  }
});

export default styles;
