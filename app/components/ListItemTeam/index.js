import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from './styles';

const uninformed = 'Uninformed';

const getImageApi = image => {
  return image
    ? { uri: `https://image.tmdb.org/t/p/w500/${image}` }
    : require('../../assets/images/not_found.png');
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
              {item.character || uninformed}
            </Text>
          )}
          {type === 'job' && (
            <Text
              numberOfLines={1}
              style={[styles.titleCast, styles.titleCharacter]}
            >
              {item.job || uninformed}
            </Text>
          )}
          <Image
            source={getImageApi(item.profile_path)}
            style={styles.castPhoto}
          />
          <Text numberOfLines={1} style={styles.titleCast}>
            {item.name || uninformed}
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
          {item.name || uninformed}
        </Text>
      </View>
    );
  }
}
