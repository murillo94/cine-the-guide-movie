import React, { memo } from 'react';
import { View, Text } from 'react-native';

import { TouchableOpacity } from '../../../common/TouchableOpacity';
import { Image } from '../../../common/Image';

import { width } from '../../../../utils/dimensions';
import { getImageApi } from '../../../../utils/images';
import { convertToUpperCaseFirstLetter } from '../../../../utils/letters';
import { convertToYear } from '../../../../utils/dates';
import { convertTypeWithGenre } from '../../../../utils/genre';

import { ROUTES } from '../../../../navigation/routes';

import isoLanguage from '../../../../data/iso.json';

import styles from './styles';

const getLanguage = value => {
  const str = isoLanguage[value] || '';

  return convertToUpperCaseFirstLetter(str);
};

const renderDivider = (releaseDate, originalLanguage) =>
  releaseDate && originalLanguage !== 'xx' ? (
    <Text style={styles.trace}>|</Text>
  ) : null;

const renderScore = voteAverage => {
  const color =
    voteAverage < 5
      ? 'low'
      : voteAverage >= 5 && voteAverage < 7
      ? 'mid'
      : 'high';

  return (
    <View style={[styles.score, styles[color]]}>
      <Text style={styles.textPercent}>{voteAverage}</Text>
    </View>
  );
};

const MovieRow = memo(
  ({ numColumns, item, type, isSearch, navigate }) => (
    <>
      {numColumns === 1 ? (
        <TouchableOpacity
          onPress={() =>
            navigate(ROUTES.MOVIE_DETAILS, { id: item.id, title: item.title })
          }
        >
          <View style={styles.containerItem}>
            <Image
              accessibilityLabel={`${item.title} image`}
              uri={getImageApi(item.poster_path)}
              width={width * 0.3}
              height={width * 0.4}
              style={styles.photo}
            />
            <View style={styles.item}>
              <View>
                <Text numberOfLines={2} style={styles.textTitle}>
                  {item.title}
                </Text>
                <View style={[styles.textRow, styles.containerSubTitle]}>
                  <Text style={styles.textSmall}>
                    {convertToYear(item.release_date)}
                  </Text>
                  {renderDivider(item.release_date, item.original_language)}
                  <Text numberOfLines={1} style={styles.textSmall}>
                    {getLanguage(item.original_language)}
                  </Text>
                </View>
                <Text numberOfLines={1} style={styles.textSmall}>
                  {convertTypeWithGenre(item.genre_ids, type, isSearch)}
                </Text>
              </View>
              <View style={[styles.textRow, styles.containerReview]}>
                {renderScore(item.vote_average)}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.containerTwoItem}
          onPress={() =>
            navigate(ROUTES.MOVIE_DETAILS, { id: item.id, title: item.title })
          }
        >
          <View>
            <Image
              accessibilityLabel={`${item.title} image`}
              uri={getImageApi(item.poster_path)}
              style={styles.photo}
              width={width * 0.3}
              height={width * 0.4}
            />
          </View>
          <Text numberOfLines={2} style={styles.textTwoTitle}>
            {item.title}
          </Text>
        </TouchableOpacity>
      )}
    </>
  ),
  (prevProps, nextProps) => prevProps.item.id === nextProps.item.id
);

export default MovieRow;
