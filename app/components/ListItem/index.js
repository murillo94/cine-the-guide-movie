import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Image from 'react-native-scalable-image';

import language from '../../assets/language/iso.json';
import genre from '../../assets/genre/ids.json';
import { width } from '../../utils/Metrics';
import styles from './styles';

const getImageApi = image => {
  return image
    ? { uri: `https://image.tmdb.org/t/p/w500/${image}` }
    : require('../../assets/images/not_found.png');
};

const convertToDate = value => {
  const date = new Date(value);
  return date.getFullYear() || '';
};

const convertToUpperCaseFirstLetter = (str = language[str]) => {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
};

const convertGenre = (arr, type, isSearch) => {
  if (type === 'normal' || isSearch) {
    if (arr.length > 1) return `${genre[arr[0]].name}, ${genre[arr[1]].name}`;
    return arr.length !== 0 ? `${genre[arr[0]].name}` : '';
  }
  return arr.length !== 0
    ? type !== genre[arr[0]].name
      ? `${type}, ${genre[arr[0]].name}`
      : type
    : type;
};

export default class ListItem extends React.PureComponent {
  render() {
    const { numColumns, item, type, isSearch, navigate } = this.props;
    if (numColumns === 1) {
      return (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigate('MovieDetails', { id: item.id })}
        >
          <View style={styles.containerItem}>
            <Image
              source={getImageApi(item.poster_path)}
              style={styles.photo}
              width={width * 0.33}
            />
            <View style={styles.item}>
              <View>
                <Text numberOfLines={2} style={styles.textTitle}>
                  {item.title}
                </Text>
                <View style={[styles.textRow, styles.containerSubTitle]}>
                  <Text style={styles.textSmall}>
                    {convertToDate(item.release_date)}
                  </Text>
                  {item.release_date !== '' &&
                    item.original_language !== 'xx' && (
                      <Text style={styles.trace}>|</Text>
                    )}
                  <Text numberOfLines={1} style={styles.textSmall}>
                    {convertToUpperCaseFirstLetter(item.original_language)}
                  </Text>
                </View>
                <Text numberOfLines={1} style={styles.textSmall}>
                  {convertGenre(item.genre_ids, type, isSearch)}
                </Text>
              </View>
              <View style={[styles.textRow, styles.containerReview]}>
                <View>
                  <Text style={styles.textPercent}>{item.vote_average}</Text>
                  <Text style={styles.textSmall}>Public</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={styles.containerTwoItem}
        activeOpacity={0.5}
        onPress={() => navigate('MovieDetails', { id: item.id })}
      >
        <View>
          <Image
            source={getImageApi(item.poster_path)}
            style={styles.photo}
            width={width * 0.33}
          />
        </View>
        <Text numberOfLines={2} style={styles.textTwoTitle}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  }
}
