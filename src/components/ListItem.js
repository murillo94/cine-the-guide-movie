import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Image from 'react-native-scalable-image';

import { fontSizeResponsive, width } from './../config/Metrics';
import language from './../assets/language/iso-langague.json';
import genre from './../assets/genre/genre_ids.json';

const getImageApi = image => {
  image = image || '';
  return image !== ''
    ? { uri: `https://image.tmdb.org/t/p/w500/${image}` }
    : require('./../assets/images/not_found.png');
};

const convertToDate = value => {
  const date = new Date(value);
  return date.getFullYear() || '';
};

const convertToUpperCaseFirstLetter = str => {
  str = language[str] || '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const convertGenre = (arr, type, isSearch) => {
  if (type === 'normal' || isSearch) {
    if (arr.length > 1) {
      return `${genre[arr[0]].name}, ${genre[arr[1]].name}`;
    }
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
    fontSize: fontSizeResponsive(2.6),
    color: '#47525E',
    fontWeight: 'bold'
  },
  textTwoTitle: {
    textAlign: 'center',
    fontSize: fontSizeResponsive(2),
    color: '#47525E',
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
    fontSize: fontSizeResponsive(2.1),
    color: '#8190A5'
  },
  trace: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: fontSizeResponsive(2.1),
    color: '#8190A5'
  },
  textPercent: {
    fontSize: fontSizeResponsive(2.1),
    color: '#8190A5',
    fontWeight: 'bold',
    marginBottom: 3
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingMore: {
    marginTop: 20,
    marginBottom: 30
  }
});
