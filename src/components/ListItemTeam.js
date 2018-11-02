import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

const getImageApi = image => {
  image = image || '';
  return image !== ''
    ? { uri: `https://image.tmdb.org/t/p/w500/${image}` }
    : require('./../assets/images/not_found.png');
};

export default class ListItemTeam extends React.PureComponent {
  render() {
    const { type, item, actionTeamDetail } = this.props;

    if (type === 'character' || type === 'job') {
      return (
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.containerCast}
          onPress={() => actionTeamDetail(item.id)}
        >
          {type === 'character' && (
            <Text
              numberOfLines={1}
              style={[styles.titleCast, styles.titleCharacter]}
            >
              {item.character || 'Uninformed'}
            </Text>
          )}
          {type === 'job' && (
            <Text
              numberOfLines={1}
              style={[styles.titleCast, styles.titleCharacter]}
            >
              {item.job || 'Uninformed'}
            </Text>
          )}
          <Image
            source={getImageApi(item.profile_path)}
            style={styles.castPhoto}
          />
          <Text numberOfLines={1} style={styles.titleCast}>
            {item.name || 'Uninformed'}
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.containerCast}>
        <Image
          source={getImageApi(item.logo_path)}
          style={styles.productionCompaniesPhoto}
          resizeMode="contain"
        />
        <Text numberOfLines={2} style={styles.titleCast}>
          {item.name || 'Uninformed'}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerCast: {
    marginRight: 30,
    alignItems: 'center',
    width: 80
  },
  titleCast: {
    marginTop: 10,
    color: '#8190A5',
    textAlign: 'center'
  },
  titleCharacter: {
    fontWeight: 'bold'
  },
  castPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 13
  },
  productionCompaniesPhoto: {
    width: '100%',
    height: 60,
    borderRadius: 4,
    marginTop: 13
  }
});
