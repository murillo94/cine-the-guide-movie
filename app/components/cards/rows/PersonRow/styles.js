import { StyleSheet } from 'react-native';

import { blue } from '../../../../utils/colors';

const styles = StyleSheet.create({
  containerCast: {
    marginRight: 30,
    alignItems: 'center',
    width: 80
  },
  titleCast: {
    marginTop: 10,
    color: blue,
    textAlign: 'center'
  },
  titleCharacter: {
    fontWeight: 'bold'
  },
  castPhoto: {
    borderRadius: 30,
    marginTop: 13
  },
  productionCompaniesPhoto: {
    borderRadius: 4,
    marginTop: 13
  }
});

export default styles;
